"use client";

import { useState } from "react";
import { Link2, Copy, Check, AlertTriangle } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function ShareBar({ drug }: { drug: DrugDetail }) {
  const [copied, setCopied] = useState<"plain" | "sourced" | null>(null);

  async function handleCopy(withSource: boolean) {
    const text = withSource
      ? `${drug.name}: ${drug.currentPrice.toLocaleString("fa-IR")} ین (منبع: فهرست وزارت بهداشت، کار و رفاه)`
      : `${drug.name}: ${drug.currentPrice.toLocaleString("fa-IR")} ین`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(withSource ? "sourced" : "plain");
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // کلیپ‌بورد در دسترس نیست؛ بی‌صدا رد می‌شویم
    }
  }

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl">
        <div className="border-t border-line pt-5">
          <p className="text-xs text-ink-faint text-center mb-3">اشتراک‌گذاری این قیمت دارو</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCopy(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand px-3.5 py-2 text-xs font-medium text-brand hover:bg-brand-soft transition-colors"
            >
              {copied === "sourced" ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
              کپی همراه با منبع
            </button>
            <button
              onClick={() => handleCopy(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
            >
              {copied === "plain" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              کپی
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              پست در X
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald px-3.5 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              لاین
            </a>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-gold-soft px-4 py-3 text-xs text-gold">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="leading-5">
            ارقام بازنگری‌شده تا آوریل ۲۰۲۶. لطفاً اطلاعات فهرست‌شده را همراه با داده‌های رسمی استفاده کنید.
          </p>
        </div>
      </div>
    </section>
  );
}
