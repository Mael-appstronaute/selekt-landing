// Audit d'accessibilité automatique (axe-core, WCAG 2.1 AA) des pages du
// module Confiance. Usage : node scripts/a11y-confiance.mjs [url-privée]
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";

const urls = ["http://localhost:3010/confiance", ...process.argv.slice(2)];
const browser = await puppeteer.launch({ headless: "shell", args: ["--no-sandbox"] });
let blocking = 0;

for (const url of urls) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const results = await new AxePuppeteer(page)
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const serious = results.violations.filter((v) => ["critical", "serious"].includes(v.impact ?? ""));
  console.log(`\n${url}`);
  console.log(`  violations : ${results.violations.length} (bloquantes : ${serious.length})`);
  for (const v of results.violations) {
    console.log(`  - [${v.impact}] ${v.id} : ${v.help} (${v.nodes.length} nœud·s)`);
    for (const n of v.nodes.slice(0, 3)) console.log(`      ${n.target.join(" ")}`);
  }
  blocking += serious.length;
  await page.close();
}
await browser.close();
process.exit(blocking > 0 ? 1 : 0);
