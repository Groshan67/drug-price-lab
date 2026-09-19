"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { categoryGroups } from "@/lib/data/category-directory";

export default function AllCategoriesModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim();
    if (!q) return categoryGroups;
    return categoryGroups
      .map((g) => ({ ...g, items: g.items.filter((it) => it.label.includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  function selectCategory(slug: string) {
    onClose();
    router.push(`/category/${slug}`);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/40 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl2 bg-card shadow-cardHover mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <p className="text-base font-bold">همه دسته‌بندی‌ها</p>
          <button
            type="button"
            onClick={onClose}
            className="text-ink-faint hover:text-ink transition-colors"
            aria-label="بستن"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pt-4">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="جستجوی دسته‌بندی..."
              className="w-full rounded-full border border-line bg-canvas ps-9 pe-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-shadow"
            />
          </div>
        </div>

        <div className="px-5 py-4 max-h-[60vh] overflow-y-auto space-y-6">
          {filteredGroups.length === 0 ? (
            <p className="text-sm text-ink-faint text-center py-8">موردی پیدا نشد.</p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.slug}>
                <p className="text-xs font-bold text-ink-faint mb-2.5 tracking-wide">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => selectCategory(item.slug)}
                      className="rounded-full border border-line bg-card px-3.5 py-2 text-sm text-ink-soft hover:border-brand/40 hover:bg-brand-soft hover:text-brand-dark transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
