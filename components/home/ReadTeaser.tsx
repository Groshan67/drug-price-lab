import Link from "next/link";
import { ChevronLeft, BookOpen } from "lucide-react";

export default function ReadTeaser() {
  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/insights"
          className="flex items-center gap-4 rounded-xl2 border border-line bg-card p-5 shadow-card hover:shadow-cardHover transition-shadow"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-ink-faint mb-1">مطالعه</p>
            <p className="text-sm font-bold">توضیح سیستم و گزارش‌ها</p>
            <p className="text-xs text-ink-faint mt-1 leading-5">
              گزارش درباره سازوکار سیستم قیمت‌گذاری دارو، چشم‌انداز بازنگری بعدی و داده‌های اصلی.
              مقالات توضیحی برای راستی‌آزمایی توضیحات داخلی شرکت.
            </p>
          </div>
          <ChevronLeft className="h-4 w-4 text-ink-faint shrink-0" />
        </Link>
      </div>
    </section>
  );
}
