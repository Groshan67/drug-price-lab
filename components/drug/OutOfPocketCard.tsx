import { ChevronLeft } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function OutOfPocketCard({ drug }: { drug: DrugDetail }) {
  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm font-bold">هزینه سهم بیمار در یک ماه</p>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
          >
            تغییر شرایط / مقایسه با داروی دیگر
            <ChevronLeft className="h-3 w-3" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {drug.outOfPocket.rates.map((r) => (
            <p key={r.label} className="text-sm">
              <span className="text-ink-faint">{r.label}</span>{" "}
              <span className="font-bold tabular">{r.amount.toLocaleString("fa-IR")} ین</span>
              {r.capLabel && (
                <span className="mr-1.5 rounded bg-gold-soft text-gold text-[10px] font-medium px-1.5 py-0.5 align-middle">
                  {r.capLabel}
                </span>
              )}
            </p>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-2 leading-6">{drug.outOfPocket.note}</p>
      </div>
    </section>
  );
}
