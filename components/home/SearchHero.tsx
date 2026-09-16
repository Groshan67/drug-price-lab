"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { siteStats, searchExamples } from "@/lib/data/mock";

export default function SearchHero() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="text-center pt-10 pb-8 px-4">
      <h1 className="text-xl sm:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
        قیمت دارو، مقایسه محصولات ژنریک و روند بازنگری را همه در یک صفحه بررسی کنید
      </h1>
      <p className="mt-3 text-sm text-ink-faint">
        <span className="font-bold text-brand tabular">
          {siteStats.totalItems.toLocaleString("fa-IR")}
        </span>{" "}
        قلم فهرست‌شده · رایگان
      </p>

      <form
        role="search"
        className="mt-6 max-w-xl mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="جستجو بر اساس نام دارو، نام ماده مؤثره یا کد YJ (کلید / برای جستجو)"
            className="w-full rounded-full border border-line bg-card py-3.5 pr-5 pl-14 text-sm shadow-card outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-shadow"
          />
          <button
            type="submit"
            aria-label="جستجو"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      <p className="mt-3 text-xs text-ink-faint">
        مثال‌ها:{" "}
        {searchExamples.map((ex, i) => (
          <span key={ex.label}>
            <span className="text-ink-soft">
              {ex.label} <span className="text-ink-faint">({ex.hint})</span>
            </span>
            {i < searchExamples.length - 1 ? "، " : ""}
          </span>
        ))}
      </p>
      <p className="mt-1 text-xs text-ink-faint">
        با ثبت دارو در «لیست پیگیری» آخرین قیمت و وضعیت بازنگری نمایش داده می‌شود
        (دکمه در صفحه دارو یا کلید{" "}
        <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-sans">
          F
        </kbd>
        )
      </p>
    </section>
  );
}
