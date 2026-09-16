import { ExternalLink, Search } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function IndicationsCard({ drug }: { drug: DrugDetail }) {
  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl2 border border-line bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold">موارد مصرف و کاربرد</p>
            <a href="#" className="inline-flex items-center gap-1 text-xs text-brand hover:underline shrink-0">
              منبع: بروشور دارو PMDA
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="text-sm text-ink-soft leading-6">{drug.indications}</p>
        </div>

        <div className="rounded-xl2 border border-line bg-card p-5 shadow-card">
          <p className="text-sm font-bold mb-3">بروشور دارو (PMDA)</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand text-white px-3 py-2 text-xs font-medium hover:bg-brand-dark transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              مشاهده بروشور دارو
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              جستجو در PMDA
            </a>
          </div>
          <p className="text-xs text-ink-faint mt-3 leading-6">
            برای جزئیات موارد مصرف، اثرات، مقدار مصرف، عوارض جانبی و موارد منع مصرف، به بروشور دارو PMDA
            (سازمان داروها و تجهیزات پزشکی) مراجعه کنید.
          </p>
          <p className="text-xs text-ink-soft mt-3 pt-3 border-t border-line">
            تاریخ فهرست‌شدن در استاندارد قیمت دارو:{" "}
            <span className="font-medium">{drug.calculationInfo.listingDate}</span>{" "}
            <span className="text-ink-faint">(رسمی)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
