import type { CategoryDetailData } from "@/lib/data/category-detail";
import { cn } from "@/lib/utils";

export default function CategoryStatsBar({ data }: { data: CategoryDetailData }) {
  const tone = data.stats.prevRevisionAvg.trim().startsWith("−") || data.stats.prevRevisionAvg.trim().startsWith("-")
    ? "text-rose"
    : "text-emerald";

  const cells = [
    { label: "تعداد مواد مؤثره", value: data.stats.ingredientCountLabel, note: data.stats.ingredientCountNote },
    { label: "ترکیب محصول", value: data.stats.productComposition, note: data.stats.productCompositionNote },
    { label: "دامنه قیمت دارو", value: data.stats.priceRangeLabel, note: data.stats.priceRangeNote },
    {
      label: "بازنگری قبلی (میانگین)",
      value: data.stats.prevRevisionAvg,
      note: data.stats.prevRevisionAvgNote,
      tone,
    },
  ];

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cells.map((c) => (
          <div key={c.label}>
            <p className="text-xs text-ink-faint mb-1">{c.label}</p>
            <p className={cn("text-sm font-bold", c.tone)}>{c.value}</p>
            <p className="text-xs text-ink-faint mt-1 leading-5">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
