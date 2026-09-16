import Link from "next/link";
import { Wallet, TrendingUp, Layers, History, Calculator, FileText } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

const infoRowsTop = (d: DrugDetail) => [
  { label: "نام ماده مؤثره", value: d.ingredientName, href: `/ingredient/${d.ingredientSlug}` },
  { label: "طبقه‌بندی اثر دارویی", value: d.ingredientInfo.category, href: `/category/${d.categorySlug}` },
  { label: "مشخصات", value: d.ingredientInfo.spec },
  { label: "شرکت سازنده", value: d.ingredientInfo.manufacturer },
];

const infoRowsBottom = (d: DrugDetail) => [
  { label: "تاریخ فهرست‌شدن", value: d.ingredientInfo.inclusionDate },
  { label: "آخرین بازنگری", value: d.ingredientInfo.finalRevision },
  { label: "وضعیت ژنریک", value: d.ingredientInfo.genericStatus },
  { label: "وضعیت عرضه", value: d.ingredientInfo.supplyStatus, alert: d.ingredientInfo.supplyStatusAlert },
];

const tagButtons = [
  { icon: Wallet, label: "سهم پرداختی" },
  { icon: TrendingUp, label: "روند" },
  { icon: Layers, label: "داروهای مشابه" },
  { icon: History, label: "تاریخچه بازنگری" },
  { icon: Calculator, label: "محاسبه" },
  { icon: FileText, label: "بروشور دارو" },
];

export default function IngredientOverviewCard({ drug }: { drug: DrugDetail }) {
  const changePercent = drug.recentRevision.changePercent;
  const sign = changePercent > 0 ? "+" : "";
  const changeTone = changePercent > 0 ? "text-emerald" : changePercent < 0 ? "text-rose" : "text-ink-faint";

  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
          {infoRowsTop(drug).map((row) => (
            <div key={row.label}>
              <p className="text-xs text-ink-faint mb-0.5">{row.label}</p>
              {row.href ? (
                <Link href={row.href} className="text-sm font-medium text-brand hover:underline">
                  {row.value}
                </Link>
              ) : (
                <p className="text-sm font-medium truncate">{row.value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 mt-4 pt-4 border-t border-line">
          {infoRowsBottom(drug).map((row) => (
            <div key={row.label}>
              <p className="text-xs text-ink-faint mb-0.5">{row.label}</p>
              <p className={cn("text-sm font-medium", row.alert && "text-rose")}>{row.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-5 pt-5 border-t border-line">
          <div>
            <p className="text-sm font-bold">
              {drug.name}{" "}
              <span className="tabular">{drug.currentPrice.toLocaleString("fa-IR")} ین</span>{" "}
              <span className={cn("text-xs font-medium", changeTone)}>
                / {drug.recentRevision.date} {sign}
                {changePercent.toLocaleString("fa-IR")}٪
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagButtons.map((t) => (
              <button
                key={t.label}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
