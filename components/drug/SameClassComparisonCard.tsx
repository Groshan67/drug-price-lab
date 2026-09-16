import { ChevronDown } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function SameClassComparisonCard({ drug }: { drug: DrugDetail }) {
  const s = drug.sameClassComparison;

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-bold mb-1">مقایسه داروهای هم‌طبقه</p>
            <p className="text-sm text-ink-soft">
              {s.categoryLabel}:{" "}
              <span className="font-bold text-ink tabular">
                {s.ingredientCount.toLocaleString("fa-IR")} ماده مؤثره
              </span>
              ،{" "}
              <span className="tabular">
                {s.priceLow.toLocaleString("fa-IR")} تا {s.priceHigh.toLocaleString("fa-IR")} ین
              </span>
            </p>
            <p className="text-xs text-ink-faint mt-1">
              محصولات نماینده هر طبقه‌بندی دارویی یکسان، به ترتیب تازه‌ترین فهرست‌شدن نمایش داده می‌شوند.
            </p>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors shrink-0">
            نمایش {s.ingredientCount.toLocaleString("fa-IR")} ماده مؤثره
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
