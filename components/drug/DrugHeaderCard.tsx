import Link from "next/link";
import { ChevronLeft, Star, AlertCircle } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

const supplyToneMap = {
  A: "bg-emerald-soft text-emerald",
  B: "bg-brand-soft text-brand-dark",
  C: "bg-gold-soft text-gold",
} as const;

export default function DrugHeaderCard({ drug }: { drug: DrugDetail }) {
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center flex-wrap gap-1 text-xs text-ink-faint mb-3">
          {drug.breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-1">
              {i > 0 && <ChevronLeft className="h-3 w-3 rotate-180" />}
              <Link href={b.href} className="hover:text-brand transition-colors">
                {b.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{drug.name}</h1>
            <p className="text-sm text-ink-faint mt-1">{drug.ingredientName}</p>
            <Link
              href={`/ingredient/${drug.ingredientSlug}`}
              className="inline-flex items-center gap-1 text-xs text-brand mt-1 hover:underline"
            >
              مشاهده همه استانداردها و اشکال دارویی مختلف
              <ChevronLeft className="h-3 w-3" />
            </Link>
          </div>

          <button
            type="button"
            className="flex flex-col items-center gap-0.5 rounded-xl border border-line bg-card px-4 py-2 text-xs text-ink-soft hover:border-gold/50 hover:text-gold transition-colors shrink-0"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Star className="h-3.5 w-3.5" />
              افزودن به لیست پیگیری
            </span>
            <span className="text-[10px] text-ink-faint">
              اطلاع‌رسانی در زمان بازنگری (کلید F)
            </span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {drug.isOriginal && (
            <span className="rounded-full bg-gold-soft text-gold text-xs font-medium px-3 py-1">
              محصول اصلی
            </span>
          )}
          <span className="rounded-full border border-line text-ink-soft text-xs font-medium px-3 py-1">
            واجد شرایط پرداخت اضافی داروی جدید:{" "}
            {drug.newDrugAddition.eligible ? "واجد شرایط" : "غیرواجد شرایط"} · تا{" "}
            {drug.newDrugAddition.asOf}
          </span>
          {drug.supplyStatus && (
            <span
              className={cn(
                "rounded-full text-xs font-medium px-3 py-1",
                supplyToneMap[drug.supplyStatus.level]
              )}
            >
              {drug.supplyStatus.label}
            </span>
          )}
        </div>

        <div className="mt-4 rounded-xl border-r-2 border-brand bg-brand-soft/40 px-4 py-3">
          <p className="text-sm text-ink leading-6">{drug.cumulativeChangeNote}</p>
          <p className="text-xs text-ink-faint mt-1">
            خلاصه خودکار بر اساس مبانی بازنگری · منبع: فهرست وزارت بهداشت، کار و رفاه از اقلام
            فهرست‌شده در استاندارد قیمت دارو / مستندات چوئیکیو
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-line bg-canvas p-1">
            {drug.dosageForms.map((d) => (
              <Link
                key={d.slug}
                href={`/drug/${d.slug}`}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  d.active ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                )}
              >
                {d.label}
              </Link>
            ))}
          </div>
          {drug.mgUnitPrice && (
            <p className="text-xs text-ink-faint">
              <span className="text-ink-soft font-medium">{drug.mgUnitPrice.value}</span> ·{" "}
              {drug.mgUnitPrice.comparisonNote}
            </p>
          )}
        </div>

        {drug.supplyIssue && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose/25 bg-rose-soft px-4 py-3.5">
            <AlertCircle className="h-4.5 w-4.5 text-rose shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-rose">{drug.supplyIssue.title}</p>
              <p className="text-sm text-ink-soft leading-6 mt-1">{drug.supplyIssue.message}</p>
              <p className="text-xs text-ink-faint mt-1.5">{drug.supplyIssue.sourceLabel}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
