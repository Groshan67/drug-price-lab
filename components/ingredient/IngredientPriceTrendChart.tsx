"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";
import type { IngredientPriceTrendComparison } from "@/lib/data/ingredient-page";

type Mode = "yen" | "percent";

function shortTick(key: string) {
  const [y, m] = key.split("-");
  return `${toPersianDigits(y)}/${toPersianDigits(m)}`;
}

export default function IngredientPriceTrendChart({
  data,
}: {
  data: IngredientPriceTrendComparison;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState<Mode>("yen");

  const chartData = useMemo(() => {
    return data.periods.map((p, i) => {
      const row: Record<string, number | string | null> = { period: p.key, label: p.label };
      for (const s of data.series) {
        const raw = s.values[i];
        if (mode === "yen" || raw === null) {
          row[s.name] = raw;
        } else {
          const firstIdx = s.values.findIndex((v) => v !== null);
          const base = firstIdx >= 0 ? s.values[firstIdx] : null;
          row[s.name] = base ? Math.round((raw / base) * 1000) / 10 : null;
        }
      }
      return row;
    });
  }, [data, mode]);

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm font-bold">مقایسه روند قیمت دارو (محصول اصلی در برابر ژنریک)</p>
          <div className="flex items-center gap-2">
            {!collapsed && (
              <div className="inline-flex rounded-full border border-line p-0.5">
                {([
                  ["yen", "نمایش ین"],
                  ["percent", "٪ نسبت به نقطه شروع"],
                ] as [Mode, string][]).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setMode(val)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                      mode === val ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
            >
              {collapsed ? (
                <>
                  ضربه بزنید برای نمایش
                  <ChevronDown className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  ضربه بزنید برای پنهان کردن
                  <ChevronUp className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {!collapsed && (
          <>
            <div className="mt-4 h-72 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 16, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#E4E8F0" />
                  <XAxis
                    dataKey="period"
                    tickFormatter={shortTick}
                    tick={{ fontSize: 10, fill: "#8A94A6" }}
                    axisLine={{ stroke: "#E4E8F0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => (mode === "yen" ? toPersianDigits(v) : `${toPersianDigits(v)}٪`)}
                    tick={{ fontSize: 11, fill: "#8A94A6" }}
                    axisLine={false}
                    tickLine={false}
                    width={44}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const period = data.periods.find((p) => p.key === label);
                      return (
                        <div className="rounded-lg bg-ink text-white text-xs px-3 py-2 shadow-lg max-w-xs">
                          <p className="font-bold mb-1">{period?.label ?? label}</p>
                          {payload.map((p) => (
                            <p key={p.dataKey as string} className="flex items-center gap-1.5 leading-5">
                              <span
                                className="inline-block h-2 w-2 rounded-sm shrink-0"
                                style={{ background: p.color }}
                              />
                              <span className="truncate">{p.dataKey}</span>:{" "}
                              <span className="font-bold tabular shrink-0">
                                {toPersianDigits(p.value as number)}
                                {mode === "yen" ? " ین" : "٪"}
                              </span>
                            </p>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {data.series.map((s) => (
                    <Line
                      key={s.name}
                      type="monotone"
                      dataKey={s.name}
                      stroke={s.color}
                      strokeWidth={2}
                      strokeDasharray={s.dashed ? "5 4" : undefined}
                      dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {data.series.map((s) => {
                const lastValue = [...s.values].reverse().find((v) => v !== null);
                return (
                  <span key={s.name} className="flex items-center gap-1.5 text-xs text-ink-soft">
                    <span
                      className={cn("inline-block h-2.5 w-2.5 shrink-0", s.dashed ? "rounded-full" : "rounded-sm")}
                      style={{ background: s.color }}
                    />
                    {s.name}
                    {lastValue !== undefined && lastValue !== null && (
                      <span className="font-medium tabular">
                        : {lastValue.toLocaleString("fa-IR")} ین
                      </span>
                    )}
                  </span>
                );
              })}
            </div>

            <p className="text-xs text-ink-faint mt-3 pt-3 border-t border-line">{data.note}</p>
          </>
        )}
      </div>
    </section>
  );
}
