"use client";

import { useEffect, useRef } from "react";

/**
 * « Or liquide » — shader WebGL exclusif à la LP pilote, écrit sur le
 * gabarit du Silk de la home. Nappes de métal en fusion par déformation
 * de domaine (fbm warpé deux fois) : creux void-2, coulées laiton,
 * crêtes or, rares glints crème. Dérive lente, image fixe si
 * prefers-reduced-motion, pause hors viewport, DPR plafonné à 1.5.
 */

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uRes;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y) * 2.4;
  float t = uTime * 0.05;

  /* Déformation de domaine : le motif coule comme du métal en fusion */
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 1.6),
    fbm(p + vec2(5.2, 1.3) - t * 1.2)
  );
  vec2 r = vec2(
    fbm(p + 2.6 * q + vec2(1.7, 9.2) + t * 2.0),
    fbm(p + 2.6 * q + vec2(8.3, 2.8) - t * 1.4)
  );
  float f = fbm(p + 3.2 * r);

  vec3 base  = vec3(0.090, 0.082, 0.071);  /* --void-2 */
  vec3 brass = vec3(0.549, 0.463, 0.282);  /* --brass  */
  vec3 gold  = vec3(0.788, 0.663, 0.416);  /* --gold   */
  vec3 glint = vec3(0.937, 0.890, 0.784);  /* crème chaude */

  vec3 col = mix(base, brass, smoothstep(0.2, 0.8, f));
  col = mix(col, gold, smoothstep(0.55, 0.95, f * f + 0.35 * length(r)));
  col += glint * pow(clamp(q.x * r.y + 0.35, 0.0, 1.0), 10.0) * 0.35;

  /* Respiration très lente de l'ensemble */
  col *= 0.92 + 0.08 * sin(uTime * 0.18);

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col -= grain * 0.02;

  gl_FragColor = vec4(col, 1.0);
}`;

export function LiquidGoldBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // fallback : le fond void-2 du héros reste seul

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Triangle plein écran
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uRes = gl.getUniformLocation(program, "uRes");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const frame = () => {
      resize();
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(); // re-rend l'image fixe à la bonne taille
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting;
      if (nowVisible && !visible) {
        visible = true;
        if (!reduced) raf = requestAnimationFrame(frame);
      } else if (!nowVisible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`h-full w-full ${className}`} />;
}
