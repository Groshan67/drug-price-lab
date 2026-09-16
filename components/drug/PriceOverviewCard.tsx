import Link from "next/link";
import { ExternalLink, ChevronLeft } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function PriceOverviewCard({ drug }: { drug: DrugDetail }) {
  const { recentRevision } = drug;
  return (
    <section className="px-4 mt-5">
      <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_auto] gap-4 rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div>
          <p className="text-xs text-ink-faint mb-1">قیمت دارو (یک عدد)</p>
          <p className="text-2xl font-bold tabular">
            {drug.currentPrice.toLocaleString("fa-IR")}
            <span className="text-sm font-normal text-ink-faint mr-1">ین</span>
          </p>
        </div>

        <div className="sm:border-r sm:border-line sm:pr-4">
          <p className="text-xs text-ink-faint mb-1">آخرین بازنگری</p>
          <p className="text-sm font-medium">
            {recentRevision.date}{" "}
            <span
              className={
                "font-bold tabular " +
                (recentRevision.changePercent > 0
                  ? "text-emerald"
                  : recentRevision.changePercent < 0
                    ? "text-rose"
                    : "text-ink-faint")
              }
            >
              {recentRevision.changePercent > 0 ? "+" : ""}
              {recentRevision.changePercent.toLocaleString("fa-IR")}٪
            </span>
          </p>
          <p className="text-xs text-ink-faint tabular mt-0.5">
            {recentRevision.from.toLocaleString("fa-IR")} ← {recentRevision.to.toLocaleString("fa-IR")} ین
          </p>
          <Link
            href="#revision-history"
            className="inline-flex items-center gap-1 text-xs text-brand mt-1.5 hover:underline"
          >
            مشاهده دلایل و مبانی بازنگری
            <ChevronLeft className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex sm:items-center">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            بروشور دارو (PMDA)
          </a>
        </div>
      </div>
    </section>
  );
}
