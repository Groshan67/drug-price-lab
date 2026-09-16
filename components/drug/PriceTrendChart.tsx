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
import { Download } from "lucide-react";
import { cn, toPersianDigits } from "@/lib/utils";
import type { PriceTrendPoint } from "@/lib/data/drug-detail";

type Period = "5" | "10" | "all";
type Mode = "percent" | "yen";

function CustomDot(props: any) {
  const { cx, cy, payload } = props;
  if (payload?.hollow) {
    return (
      <circle cx={cx} cy={cy} r={4} fill="white" stroke="#3552D6" strokeWidth={2} />
    );
  }
  return <circle cx={cx} cy={cy} r={4} fill="#3552D6" />;
}

export default function PriceTrendChart({
  drugName,
  points,
}: {
  drugName: string;
  points: PriceTrendPoint[];
}) {
  const [period, setPeriod] = useState<Period>("10");
  const [mode, setMode] = useState<Mode>("percent");

  const filtered = useMemo(() => {
    if (period === "all") return points;
    const n = period === "5" ? 5 : 10;
    return points.slice(Math.max(0, points.length - n));
  }, [period, points]);

  const basePrice = filtered[0]?.price ?? points[0].price;

  const chartData = filtered.map((p) => ({
    ...p,
    display:
      mode === "yen" ? p.price : Math.round(((p.price - basePrice) / basePrice) * 1000) / 10,
  }));

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm font-bold">روند قیمت دارو</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-line p-0.5">
              {([
                ["5", "۵ سال"],
                ["10", "۱۰ سال"],
                ["all", "کل دوره"],
              ] as [Period, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setPeriod(val)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    period === val ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-full border border-line p-0.5">
              {([
                ["percent", "٪ تغییر"],
                ["yen", "نمایش ین"],
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
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              ذخیره تصویر
            </button>
          </div>
        </div>

        <p className="text-xs text-ink-faint mt-2">
          روند قیمت {drugName} (داده‌های این استاندارد: {toPersianDigits(filtered[0]?.year ?? "")} تا{" "}
          {toPersianDigits(filtered[filtered.length - 1]?.year ?? "")})
        </p>

        <div className="mt-4 h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 24, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E4E8F0" />
              <XAxis
                dataKey="year"
                tickFormatter={(v) => toPersianDigits(v)}
                tick={{ fontSize: 11, fill: "#8A94A6" }}
                axisLine={{ stroke: "#E4E8F0" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => (mode === "yen" ? toPersianDigits(v) : `${toPersianDigits(v)}٪`)}
                tick={{ fontSize: 11, fill: "#8A94A6" }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                formatter={(value: number) => [
                  mode === "yen" ? `${toPersianDigits(value)} ین` : `${toPersianDigits(value)}٪`,
                  mode === "yen" ? "قیمت" : "تغییر تجمعی",
                ]}
                labelFormatter={(label) => `سال ${toPersianDigits(label)}`}
                contentStyle={{
                  fontFamily: "var(--font-vazir)",
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #E4E8F0",
                }}
              />
              <Line
                type="monotone"
                dataKey="display"
                stroke="#3552D6"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-ink-faint mt-3">
          منبع: فهرست وزارت بهداشت، کار و رفاه از اقلام فهرست‌شده در استاندارد قیمت دارو
        </p>
      </div>
    </section>
  );
}
