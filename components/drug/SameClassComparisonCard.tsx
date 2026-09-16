"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

export default function SameClassComparisonCard({ drug }: { drug: DrugDetail }) {
  const [expanded, setExpanded] = useState(false);
  const [showOtherForms, setShowOtherForms] = useState(false);
  const s = drug.sameClassComparison;

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
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
            {!expanded && (
              <p className="text-xs text-ink-faint mt-1">
                محصولات نماینده هر طبقه‌بندی دارویی یکسان، به ترتیب تازه‌ترین فهرست‌شدن نمایش داده می‌شوند.
              </p>
            )}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors shrink-0"
          >
            {expanded ? (
              <>
                بستن
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                نمایش {s.ingredientCount.toLocaleString("fa-IR")} ماده مؤثره
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-line">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <span className="text-sm font-medium text-brand">
                {s.categoryLabel}{" "}
                <span className="text-ink-faint font-normal">کد طبقه‌بندی: {s.categoryCode}</span>
              </span>
              <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-soft transition-colors">
                <Download className="h-3.5 w-3.5" />
                خروجی CSV
              </button>
            </div>

            <div className="rounded-xl bg-brand-soft/40 border border-brand/10 px-4 py-3 text-xs text-ink-soft leading-6">
              {s.infoNote}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
              <div>
                <p className="text-xs text-ink-faint mb-0.5">در حال نمایش (استاندارد)</p>
                <p className="text-sm font-bold">
                  {drug.ingredientName} <span className="text-ink-faint font-normal">{drug.name}</span>
                </p>
              </div>
              <p className="text-lg font-bold text-brand tabular">
                {drug.currentPrice.toLocaleString("fa-IR")} <span className="text-xs font-normal">ین</span>
              </p>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-ink-faint border-b border-line">
                    <th className="text-right font-medium py-2">نام ماده مؤثره / محصول نماینده</th>
                    <th className="text-right font-medium py-2">قیمت دارو</th>
                    <th className="text-right font-medium py-2">فهرست‌شدن و محاسبه</th>
                    <th className="text-right font-medium py-2">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {s.rows.map((row) => (
                    <tr key={row.ingredientName}>
                      <td className="py-3">
                        <p className="font-medium flex items-center gap-2 flex-wrap">
                          {row.ingredientName}
                          {row.badge && (
                            <span className="rounded-full bg-plum-soft text-plum text-[10px] font-medium px-2 py-0.5">
                              {row.badge}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-ink-faint mt-0.5">{row.productName}</p>
                      </td>
                      <td className="py-3 font-bold tabular whitespace-nowrap">
                        {row.price.toLocaleString("fa-IR")} ین
                      </td>
                      <td className="py-3 text-xs text-ink-faint max-w-xs">{row.inclusionNote}</td>
                      <td className="py-3">
                        <div className="flex flex-col gap-1.5 items-start">
                          <button className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-soft hover:border-brand/40 hover:text-brand transition-colors">
                            مقایسه روند
                          </button>
                          <button className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-soft hover:border-brand/40 hover:text-brand transition-colors">
                            مشاهده جزئیات
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {s.otherDosageFormsCount > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setShowOtherForms((v) => !v)}
                  className="text-xs text-brand hover:underline"
                >
                  {showOtherForms ? "▴ پنهان کردن" : "▾ نمایش"} {s.otherDosageFormsCount.toLocaleString("fa-IR")}{" "}
                  شکل دارویی دیگر ({s.otherDosageFormsLabel})
                </button>
                {showOtherForms && (
                  <div className="mt-2 rounded-xl border border-dashed border-line p-4 text-xs text-ink-faint text-center">
                    داده {s.otherDosageFormsLabel} این طبقه‌بندی هنوز در این پیش‌نمایش نمایش داده نمی‌شود.
                  </div>
                )}
              </div>
            )}

            <p className="mt-4 text-xs text-ink-faint leading-6 border-t border-line pt-3">{s.footnote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
