import type { IngredientPageData } from "@/lib/data/ingredient-page";

export default function IngredientStatsBar({ data }: { data: IngredientPageData }) {
  const cells = [
    {
      label: "ترکیب محصولات",
      value: `پیشگام: ${data.stats.startingPitchers.toLocaleString("fa-IR")}، حمایتی: ${data.stats.reliefPitchers.toLocaleString("fa-IR")}`,
      note: null,
    },
    {
      label: "نسبت به محصول اصلی",
      value: data.stats.comparedToOriginal,
      note: data.stats.comparedToOriginalNote,
    },
    {
      label: "اولین فراخوان",
      value: data.stats.firstRecallYear,
      note: data.stats.firstRecallNote,
    },
    {
      label: "دامنه قیمت دارو",
      value: data.stats.priceRangeLabel,
      note: data.stats.priceRangeNote,
    },
  ];

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cells.map((c) => (
          <div key={c.label}>
            <p className="text-xs text-ink-faint mb-1">{c.label}</p>
            <p className="text-sm font-bold">{c.value}</p>
            {c.note && <p className="text-xs text-ink-faint mt-1 leading-5">{c.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
