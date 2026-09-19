"use client";

import Link from "next/link";
import { ArrowLeft, Star, X } from "lucide-react";
import { useSiteChrome } from "@/lib/context/site-chrome";

export default function WatchlistPopover({ onNavigate }: { onNavigate?: () => void }) {
  const { watchlist, removeFromWatchlist } = useSiteChrome();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold">
          لیست پیگیری{watchlist.length > 0 && ` (${watchlist.length.toLocaleString("fa-IR")})`}
        </p>
        <Link href="#" className="inline-flex items-center gap-1 text-xs text-brand hover:underline">
          مشاهده همه
          <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
      </div>

      {watchlist.length === 0 ? (
        <>
          <div className="rounded-lg bg-brand-soft/60 px-3 py-2.5 text-xs text-ink-soft leading-6">
            می‌توانید داروها را با زدن دکمه «افزودن به لیست پیگیری» در صفحه دارو ثبت کنید. داروهای ثبت‌شده از
            همین‌جا به‌سرعت در دسترس خواهند بود.
          </div>
          <p className="text-xs text-ink-faint text-center py-6">
            می‌توانید این دارو را با کلیک روی «افزودن به لیست پیگیری» در صفحه دارو ثبت کنید.
          </p>
        </>
      ) : (
        <ul className="divide-y divide-line">
          {watchlist.map((item) => (
            <li key={item.slug} className="flex items-center gap-2 py-2.5">
              <Link
                href={`/drug/${item.slug}`}
                onClick={onNavigate}
                className="flex items-center gap-2 flex-1 min-w-0 hover:text-brand transition-colors"
              >
                <Star className="h-3.5 w-3.5 text-gold fill-gold shrink-0" />
                <span className="text-sm text-ink-soft truncate">{item.name}</span>
              </Link>
              <span className="text-xs text-ink-faint tabular shrink-0">
                {item.price.toLocaleString("fa-IR")} ین
              </span>
              <button
                type="button"
                onClick={() => removeFromWatchlist(item.slug)}
                aria-label="حذف از لیست پیگیری"
                className="text-ink-faint hover:text-rose transition-colors shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
