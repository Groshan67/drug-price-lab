"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Star, Bell, Info, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteChrome } from "@/lib/context/site-chrome";
import RecentSearchFlyout from "./RecentSearchFlyout";
import WatchlistPopover from "./WatchlistPopover";
import NotificationPopover from "./NotificationPopover";

const hasUnreadNotification = true; // نمونه — بعداً از وضعیت واقعی لیست پیگیری می‌آید

export default function TopHeader() {
  const { openPanel, setOpenPanel, searchInputRef, watchlist } = useSiteChrome();
  const headerRef = useRef<HTMLElement>(null);

  // بستن دراپ‌داون‌ها با کلیک بیرون از هدر (مودال «درباره» جدا مدیریت می‌شود، چون بیرون از این هدر رندر می‌شود)
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        openPanel &&
        openPanel !== "about" &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [openPanel, setOpenPanel]);

  // شورت‌کات کلید «/» برای فوکوس روی سرچ سراسری
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setOpenPanel("search");
        requestAnimationFrame(() => searchInputRef.current?.focus());
      }
      if (e.key === "Escape") setOpenPanel(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpenPanel, searchInputRef]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-card/95 backdrop-blur"
    >
      <div className="h-full px-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
            <Pill className="h-4 w-4" />
          </span>
          <span className="font-bold text-base hidden sm:inline">
            <span className="text-brand">RxPrice</span> <span className="text-emerald">Lab</span>
          </span>
        </Link>

        {/* این wrapper خودش flex-1 است تا همیشه فاصله باقی‌مانده بین لوگو و آیکون‌ها را پر کند؛
            جعبه سرچ داخلش با max-w-xl محدود و وسط‌چین می‌شود، بدون اینکه آیکون‌ها را جابه‌جا کند */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl">
            <form role="search" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  onFocus={() => setOpenPanel("search")}
                  placeholder="جستجو بر اساس نام دارو، نام ماده مؤثره یا کد IRC (کلید / برای جستجو)"
                  className="w-full rounded-full border border-line bg-canvas py-2 pr-4 pl-11 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 focus:bg-card transition-all"
                />
                <button
                  type="submit"
                  aria-label="جستجو"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

            {openPanel === "search" && (
              <div className="absolute inset-x-0 top-full mt-2 rounded-xl2 border border-line bg-card shadow-cardHover z-50 max-h-[70vh] overflow-y-auto">
                <RecentSearchFlyout onNavigate={() => setOpenPanel(null)} />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="relative">
            <button
              type="button"
              aria-label="لیست پیگیری"
              onClick={() => setOpenPanel(openPanel === "watchlist" ? null : "watchlist")}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                openPanel === "watchlist"
                  ? "border-brand text-brand bg-brand-soft"
                  : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
              )}
            >
              <Star className="h-4 w-4" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white tabular">
                  {watchlist.length.toLocaleString("fa-IR")}
                </span>
              )}
            </button>
            {openPanel === "watchlist" && (
              <div className="absolute top-full mt-2 end-0 w-80 rounded-xl2 border border-line bg-card shadow-cardHover z-50">
                <WatchlistPopover onNavigate={() => setOpenPanel(null)} />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-label="اعلان‌ها"
              onClick={() => setOpenPanel(openPanel === "notification" ? null : "notification")}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                openPanel === "notification"
                  ? "border-brand text-brand bg-brand-soft"
                  : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
              )}
            >
              <Bell className="h-4 w-4" />
              {hasUnreadNotification && (
                <span className="absolute top-1 end-1.5 h-1.5 w-1.5 rounded-full bg-rose" />
              )}
            </button>
            {openPanel === "notification" && (
              <div className="absolute top-full mt-2 end-0 w-80 rounded-xl2 border border-line bg-card shadow-cardHover z-50">
                <NotificationPopover />
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="درباره این سرویس"
            onClick={() => setOpenPanel(openPanel === "about" ? null : "about")}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              openPanel === "about"
                ? "border-brand text-brand bg-brand-soft"
                : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
            )}
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
