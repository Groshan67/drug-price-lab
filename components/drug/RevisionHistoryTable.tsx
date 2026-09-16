import { Download, ChevronLeft } from "lucide-react";
import type { DrugDetail, PriceRevisionRow } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

const reasonBadge: Record<PriceRevisionRow["reason"], { label: string; tone: string } | null> = {
  lowest: { label: "کمترین قیمت دارو", tone: "bg-emerald-soft text-emerald" },
  regular: { label: "بازنگری معمول", tone: "bg-canvas text-ink-soft" },
  "market-expansion": { label: "بازمحاسبه گسترش بازار", tone: "bg-emerald-soft text-emerald" },
  "not-eligible": { label: "غیرمشمول سال میانی", tone: "bg-canvas text-ink-faint" },
  none: null,
};

export default function RevisionHistoryTable({ drug }: { drug: DrugDetail }) {
  return (
    <section id="revision-history" className="px-4 mt-4 scroll-mt-20">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-bold">تاریخچه بازنگری قیمت دارو — {drug.name}</p>
            <a href="#" className="inline-flex items-center gap-1 text-xs text-brand mt-1 hover:underline">
              مشاهده دلایل و مبانی بازنگری
              <ChevronLeft className="h-3 w-3" />
            </a>
          </div>
          <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-soft transition-colors shrink-0">
            <Download className="h-3.5 w-3.5" />
            خروجی CSV
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ink-faint border-b border-line">
                <th className="text-right font-medium py-2">تاریخ بازنگری</th>
                <th className="text-right font-medium py-2">قیمت دارو</th>
                <th className="text-right font-medium py-2">نسبت به بار قبل</th>
                <th className="text-right font-medium py-2">دلیل بازنگری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {drug.revisionHistory.map((r) => {
                const badge = reasonBadge[r.reason];
                const pct = r.changePercent ?? 0;
                const changeTone = pct > 0 ? "text-emerald font-medium" : pct < 0 ? "text-rose font-medium" : "text-ink-faint";
                const changeLabel = pct > 0 ? `+${pct.toLocaleString("fa-IR")}٪` : pct < 0 ? `${pct.toLocaleString("fa-IR")}٪` : "±۰٪";
                return (
                  <tr key={r.date}>
                    <td className="py-3 tabular">{r.date}</td>
                    <td className="py-3 font-bold tabular">{r.price.toLocaleString("fa-IR")} ین</td>
                    <td className={cn("py-3 tabular", changeTone)}>{changeLabel}</td>
                    <td className="py-3">
                      {badge ? (
                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", badge.tone)}>
                          {badge.label}
                        </span>
                      ) : (
                        <span className="text-ink-faint">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {drug.revisionHistoryMoreCount > 0 && (
          <button className="mt-3 text-xs text-ink-faint hover:text-brand transition-colors">
            ▾ مشاهده تاریخچه کامل بازنگری ({drug.revisionHistoryMoreCount.toLocaleString("fa-IR")} مورد دیگر)
          </button>
        )}

        <p className="mt-4 text-xs text-ink-faint leading-6 border-t border-line pt-3">
          «—» یعنی بدون تغییر در زمان تأیید خارج از رویداد بازنگری. «±۰٪» یعنی بدون تغییر قیمت در سال بازنگری.
          «فهرست‌شده با نام یکپارچه» یعنی بازنگری تحت نام یکپارچه اعلام شده (قیمت، قیمت نام یکپارچه است).
          «در فهرست نیست» یعنی در فهرست اقلام نیامده (با قیمت قبلی تکمیل شده است). برای مواردی که سازوکار تغییر
          آن‌ها از فهرست عمومی قابل تشخیص نیست به «مشاهده دلایل و مبانی بازنگری» مراجعه کنید. شناسه افزودن ایجاد
          داروی جدید تنها در تغییرات طبقه‌بندی بازنگری‌شده اعطا می‌شود و فهرست سالانه از نشان بالا در دسترس است.
        </p>
      </div>
    </section>
  );
}
