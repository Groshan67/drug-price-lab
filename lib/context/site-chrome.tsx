"use client";

import { createContext, useContext, useEffect, useRef, useState, type RefObject } from "react";

export type ChromePanel = "search" | "watchlist" | "notification" | "about" | null;

export type WatchlistItem = {
  slug: string;
  name: string;
  price: number;
};

const WATCHLIST_STORAGE_KEY = "rxpricelab:watchlist";

type SiteChromeContextValue = {
  openPanel: ChromePanel;
  setOpenPanel: (panel: ChromePanel) => void;
  searchInputRef: RefObject<HTMLInputElement>;
  /** باز کردن دراپ‌داون سرچ بالای صفحه و فوکوس روی ورودی — با هاور روی آیتم سایدبار هم صدا زده می‌شود */
  focusSearch: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  watchlist: WatchlistItem[];
  isWatched: (slug: string) => boolean;
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (slug: string) => void;
  toggleWatchlist: (item: WatchlistItem) => void;
};

const SiteChromeContext = createContext<SiteChromeContextValue | null>(null);

export function SiteChromeProvider({ children }: { children: React.ReactNode }) {
  const [openPanel, setOpenPanel] = useState<ChromePanel>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // بارگذاری لیست پیگیری از localStorage — فقط سمت کلاینت
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (raw) setWatchlist(JSON.parse(raw));
    } catch {
      // localStorage در دسترس نیست؛ بی‌صدا رد می‌شویم
    }
  }, []);

  function persist(next: WatchlistItem[]) {
    setWatchlist(next);
    try {
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // نادیده گرفتن خطای ذخیره‌سازی
    }
  }

  function isWatched(slug: string) {
    return watchlist.some((w) => w.slug === slug);
  }

  function addToWatchlist(item: WatchlistItem) {
    if (isWatched(item.slug)) return;
    persist([item, ...watchlist]);
  }

  function removeFromWatchlist(slug: string) {
    persist(watchlist.filter((w) => w.slug !== slug));
  }

  function toggleWatchlist(item: WatchlistItem) {
    if (isWatched(item.slug)) removeFromWatchlist(item.slug);
    else addToWatchlist(item);
  }

  function focusSearch() {
    setOpenPanel("search");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }

  return (
    <SiteChromeContext.Provider
      value={{
        openPanel,
        setOpenPanel,
        searchInputRef,
        focusSearch,
        sidebarCollapsed,
        setSidebarCollapsed,
        watchlist,
        isWatched,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </SiteChromeContext.Provider>
  );
}

export function useSiteChrome() {
  const ctx = useContext(SiteChromeContext);
  if (!ctx) throw new Error("useSiteChrome باید داخل SiteChromeProvider استفاده شود");
  return ctx;
}
