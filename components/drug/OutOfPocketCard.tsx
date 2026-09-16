"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronUp, Plus, AlertTriangle } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

const dayPresets = [14, 28, 30, 56, 90];
const frequencyOptions = [
  { value: 1, label: "یک‌بار در روز (هر روز)" },
  { value: 2, label: "دو‌بار در روز" },
  { value: 3, label: "سه‌بار در روز" },
];

export default function OutOfPocketCard({ drug }: { drug: DrugDetail }) {
  const [expanded, setExpanded] = useState(false);
  const [count, setCount] = useState(drug.outOfPocket.dailyDoseCount);
  const [frequency, setFrequency] = useState(drug.outOfPocket.frequencyPerDay);
  const [days, setDays] = useState(drug.outOfPocket.defaultDays);

  const totalUnits = count * frequency * days;
  const medicationCost = drug.currentPrice * totalUnits;

  const computedRates = useMemo(
    () =>
      drug.outOfPocket.rates.map((r) => ({
        ...r,
        computedAmount: Math.round(medicationCost * (r.pct / 100)),
      })),
    [drug.outOfPocket.rates, medicationCost]
  );

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm font-bold">هزینه سهم بیمار در یک ماه</p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
          >
            {expanded ? (
              <>
                بستن
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                تغییر شرایط / مقایسه با داروی دیگر
                <ChevronLeft className="h-3 w-3" />
              </>
            )}
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

        {expanded && (
          <div className="mt-5 pt-5 border-t border-line">
            <div className="flex items-center justify-end mb-3">
              <button className="inline-flex items-center gap-1 rounded-lg border border-brand/30 text-brand px-3 py-1.5 text-xs font-medium hover:bg-brand-soft transition-colors">
                <Plus className="h-3.5 w-3.5" />
                مقایسه با داروی دیگر
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                className="w-16 rounded-lg border border-line bg-card px-2 py-1.5 text-center tabular outline-none focus:border-brand"
              />
              <span className="text-ink-soft">{drug.outOfPocket.unitLabel}</span>

              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="rounded-lg border border-line bg-card px-2 py-1.5 text-sm outline-none focus:border-brand"
              >
                {frequencyOptions.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>

              <span className="text-ink-faint">×</span>

              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
                className="w-16 rounded-lg border border-line bg-card px-2 py-1.5 text-center tabular outline-none focus:border-brand"
              />
              <span className="text-ink-soft">روز</span>

              <span className="text-xs text-ink-faint mr-2">پرکاربرد:</span>
              {dayPresets.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={cn(
                    "h-8 w-9 rounded-full text-xs font-medium border transition-colors tabular",
                    days === d
                      ? "bg-brand text-white border-brand"
                      : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
                  )}
                >
                  {d.toLocaleString("fa-IR")}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-line overflow-hidden">
              {computedRates.map((r, i) => (
                <div
                  key={r.label}
                  className={cn(
                    "flex items-center justify-between px-4 py-3",
                    i === 0 && "bg-brand-soft/40",
                    i > 0 && "border-t border-line"
                  )}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className={i === 0 ? "text-brand" : "text-ink"}>{r.label}</span>
                    {r.capLabel && (
                      <span className="rounded bg-gold-soft text-gold text-[10px] font-medium px-1.5 py-0.5">
                        سقف دارد
                      </span>
                    )}
                  </span>
                  <span className="text-lg font-bold tabular">
                    {r.computedAmount.toLocaleString("fa-IR")} <span className="text-xs font-normal">ین</span>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-ink-faint mt-3">
              هزینه دارو: {medicationCost.toLocaleString("fa-IR")} ین / {days.toLocaleString("fa-IR")} روز
              (قیمت دارو {drug.currentPrice.toLocaleString("fa-IR")} ین × {totalUnits.toLocaleString("fa-IR")}{" "}
              {drug.outOfPocket.unitLabel})
              <br />
              این هزینه شامل حق فنی توزیع دارو یا سایر هزینه‌های فنی نمی‌شود و صرفاً یک برآورد است.
            </p>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-gold-soft px-4 py-3 text-xs text-gold">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="leading-5">
                <span className="font-bold">پرداخت واقعی بر اساس سقف هزینه‌های درمانی پرهزینه محدود خواهد شد.</span>{" "}
                این سقف بر اساس سن، دسته درآمدی و مجموع هزینه‌های درمانی خانوار در همان ماه تعیین می‌شود؛ بنابراین
                صرفاً از روی هزینه این دارو قابل تعیین نیست. مبلغ نمایش داده‌شده پیش از اعمال سقف است. (
                <a href="#" className="underline">
                  سامانه هزینه‌های درمانی پرهزینه — وزارت بهداشت، کار و رفاه
                </a>
                )
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
