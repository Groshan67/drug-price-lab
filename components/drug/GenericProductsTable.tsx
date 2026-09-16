import { Download, ChevronDown } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

export default function GenericProductsTable({ drug }: { drug: DrugDetail }) {
  if (!drug.genericsListed) {
    return (
      <section className="px-4 mt-4">
        <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
          <p className="text-sm font-bold mb-3">فهرست محصولات ژنریک — {drug.name}</p>

          <p className="text-sm text-ink-soft leading-6">
            <span className="font-bold text-ink">محصول ژنریک هنوز فهرست نشده است (وضعیت انحصاری ادامه دارد).</span>{" "}
            {drug.ingredientInfo.inclusionDate}. تصمیم‌گیری درباره قواعد فهرست بلندمدت (G1/G2) پس از فهرست‌شدن
            محصول ژنریک انجام خواهد شد — برای جزئیات به «چشم‌انداز آینده» در بالا مراجعه کنید.
          </p>

          {drug.otherDosageForms && drug.otherDosageForms.length > 0 && (
            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap rounded-xl bg-emerald-soft border border-emerald/20 px-4 py-3">
              <p className="text-sm font-medium text-emerald">
                شکل دارویی/دوز دیگری از همین ماده مؤثره موجود است — {drug.otherDosageForms[0].label}
              </p>
              <button className="inline-flex items-center gap-1 rounded-lg border border-emerald/30 bg-card px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald hover:text-white transition-colors shrink-0">
                مقایسه سایر اشکال دارویی
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm font-bold">
            فهرست محصولات ژنریک — {drug.name} ({drug.genericProductsSummary.current} محصول فعال +{" "}
            {drug.genericProductsSummary.discontinued} محصول متوقف‌شده)
          </p>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs text-ink-soft hover:border-brand/40 hover:text-brand transition-colors">
              مرتب‌سازی: ارزان‌ترین
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-soft transition-colors">
              <Download className="h-3.5 w-3.5" />
              خروجی CSV
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 rounded-xl bg-canvas p-3 text-center">
          <div>
            <p className="text-xs text-ink-faint">نسبت محصول پیشگام</p>
            <p className="text-sm font-bold mt-0.5">۱۰۰٪</p>
          </div>
          <div>
            <p className="text-xs text-ink-faint">دامنه قیمت محصولات ژنریک</p>
            <p className="text-sm font-bold mt-0.5">۱ طبقه‌بندی</p>
          </div>
          <div>
            <p className="text-xs text-ink-faint">تعداد شرکت‌ها</p>
            <p className="text-sm font-bold mt-0.5">۱ شرکت</p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ink-faint border-b border-line">
                <th className="text-right font-medium py-2 pl-2 w-8"></th>
                <th className="text-right font-medium py-2">نام محصول</th>
                <th className="text-right font-medium py-2">شرکت سازنده</th>
                <th className="text-right font-medium py-2">قیمت دارو</th>
                <th className="text-right font-medium py-2">نسبت پیشگام</th>
                <th className="text-right font-medium py-2">بروشور دارو</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {drug.genericProducts.map((p) => (
                <tr key={p.name} className={cn(p.tag === "starting-pitcher" && "bg-gold-soft/50")}>
                  <td className="py-3 pl-2">
                    <span
                      className={cn(
                        "block h-2.5 w-2.5 rounded-full",
                        p.isCurrent ? "bg-brand" : "border border-line"
                      )}
                    />
                  </td>
                  <td className="py-3">
                    <p className="font-medium">
                      {p.name}
                      {p.isCurrent && (
                        <span className="mr-2 text-xs font-normal text-brand">در حال نمایش</span>
                      )}
                      {p.tag === "starting-pitcher" && (
                        <span className="mr-2 text-xs font-normal text-gold">محصول پیشگام</span>
                      )}
                    </p>
                  </td>
                  <td className="py-3 text-ink-soft">{p.manufacturer ?? "—"}</td>
                  <td className="py-3 font-medium tabular">{p.price.toLocaleString("fa-IR")} ین</td>
                  <td className="py-3 text-ink-soft">{p.startingRatio}</td>
                  <td className="py-3">
                    <a href="#" className="text-brand hover:underline text-xs">
                      بروشور دارو
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="mt-3 text-xs text-ink-faint hover:text-brand transition-colors">
          ▾ نمایش فهرست کدهای قدیمی پیش از ادغام (۴ شرکت)
        </button>
      </div>
    </section>
  );
}
