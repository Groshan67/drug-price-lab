import Link from "next/link";
import { Menu, Pill } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-card/95 backdrop-blur border-b border-line">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
          <Pill className="h-3.5 w-3.5" />
        </span>
        <span className="font-bold text-sm">دارونما</span>
      </Link>
      <button
        type="button"
        aria-label="باز کردن منو"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:bg-brand-soft"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  );
}
