"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { recentSearches } from "@/lib/data/recent-searches";

export default function RecentSearchFlyout({ onNavigate }: { onNavigate?: () => void }) {
  const [items, setItems] = useState(recentSearches);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-ink-soft">دیده‌شده‌های اخیر</p>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setItems([])}
            className="rounded-full bg-rose-soft text-rose text-xs font-medium px-2.5 py-1 hover:opacity-80 transition-opacity"
          >
            پاک کردن تاریخچه
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-ink-faint py-4 text-center">موردی برای نمایش نیست.</p>
      ) : (
        <ul className="divide-y divide-line">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={onNavigate}
                className="flex items-center justify-between gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-canvas transition-colors"
              >
                <span className="flex items-center gap-2 text-sm text-ink-soft min-w-0">
                  <Clock className="h-3.5 w-3.5 text-ink-faint shrink-0" />
                  <span className="truncate">{it.name}</span>
                </span>
                <span className="text-xs text-ink-faint tabular shrink-0">
                  {it.price.toLocaleString("fa-IR")} ین
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
