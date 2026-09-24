import type { Metadata } from "next";
import { AdminApp } from "@/components/confiance/AdminApp";

export const metadata: Metadata = {
  title: "Back-office Confiance",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="mx-auto flex max-w-[1272px] flex-col px-4 pb-16 pt-[92px] md:px-8">
      <AdminApp />
    </div>
  );
}
