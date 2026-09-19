"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  FlaskConical,
  LayoutGrid,
  Building2,
  RefreshCcw,
  ClipboardList,
  CalendarDays,
  SlidersHorizontal,
  Bot,
  BookOpen,
  ChevronsRight,
  ChevronsLeft,
  Info,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteChrome } from "@/lib/context/site-chrome";

const searchLinks = [
  { label: "از روی مواد مؤثره", href: "/search/ingredients", icon: FlaskConical },
  { label: "طبقه‌بندی اثرات دارویی", href: "/search/category", icon: LayoutGrid },
  { label: "از روی سازنده", href: "/search/manufacturer", icon: Building2 },
  { label: "بازنگری قیمت دارو", href: "/archive", icon: RefreshCcw },
];

const toolLinks = [
  { label: "شبیه‌سازی قیمت دارو", href: "/simulation", icon: ClipboardList },
  { label: "تقویم بازنگری", href: "/calendar", icon: CalendarDays },
  { label: "جستجوی شرطی", href: "/screener", icon: SlidersHorizontal },
  { label: "پرسش از AI", href: "/ask-ai", icon: Bot },
];

function NavGroup({
  title,
  links,
  pathname,
  leading,
  collapsed,
}: {
  title: string;
  links: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
  pathname: string;
  leading?: React.ReactNode;
  collapsed: boolean;
}) {
  return (
    <div>
      {!collapsed && <p className="px-3 text-xs font-medium text-ink-faint mb-2">{title}</p>}
      <ul className="space-y-0.5">
        {leading && <li>{leading}</li>}
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                title={collapsed ? l.label : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border-r-2 px-3 py-2 text-sm transition-colors",
                  collapsed && "justify-center px-0",
                  active
                    ? "border-emerald bg-emerald-soft text-emerald font-medium"
                    : "border-transparent text-ink-soft hover:bg-brand-soft hover:text-brand-dark"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{l.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { focusSearch, setOpenPanel, sidebarCollapsed, setSidebarCollapsed } = useSiteChrome();

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:shrink-0 border-l border-line bg-card sticky top-16 h-[calc(100vh-4rem)] transition-[width] duration-200",
        sidebarCollapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5 space-y-6">
        <Link
          href="/"
          title={sidebarCollapsed ? "خانه" : undefined}
          aria-current={isHome ? "page" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border-r-2 px-3 py-2 text-sm font-medium transition-colors",
            sidebarCollapsed && "justify-center px-0",
            isHome
              ? "border-emerald bg-emerald-soft text-emerald"
              : "border-transparent text-ink hover:bg-brand-soft"
          )}
        >
          <Home className="h-4 w-4" />
          {!sidebarCollapsed && <span>خانه</span>}
        </Link>

        <NavGroup
          title="جستجو"
          links={searchLinks}
          pathname={pathname}
          collapsed={sidebarCollapsed}
          leading={
            // این آیتم صفحه‌ای باز نمی‌کند؛ فقط دراپ‌داون سرچ بالای صفحه را با هاور باز می‌کند
            <button
              type="button"
              title={sidebarCollapsed ? "جستجوی دارو" : undefined}
              onMouseEnter={focusSearch}
              className={cn(
                "w-full flex items-center gap-2.5 rounded-lg border-r-2 border-transparent px-3 py-2 text-sm text-ink-soft hover:bg-brand-soft hover:text-brand-dark transition-colors text-right",
                sidebarCollapsed && "justify-center px-0"
              )}
            >
              <Search className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && <span>جستجوی دارو</span>}
            </button>
          }
        />
        <NavGroup title="ابزارها" links={toolLinks} pathname={pathname} collapsed={sidebarCollapsed} />
        <NavGroup
          title="مطالعه"
          links={[{ label: "توضیح سیستم و گزارش‌ها", href: "/insights", icon: BookOpen }]}
          pathname={pathname}
          collapsed={sidebarCollapsed}
        />

        {!sidebarCollapsed && (
          <div className="rounded-xl border border-brand/15 bg-brand-soft/50 p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-bold text-brand-dark mb-1.5">
              <Megaphone className="h-3.5 w-3.5" />
              رویداد بعدی سیستم
            </p>
            <p className="text-sm font-medium text-ink leading-6">
              نظرسنجی قیمت دارو در سپتامبر ۲۰۲۶ برگزار می‌شود.
            </p>
            <p className="text-xs text-ink-faint mt-1 leading-5">
              نقطه شروع بازنگری قیمت دارو در سال بعد (بررسی قیمت‌های واقعی بازار)
            </p>
          </div>
        )}
      </nav>

      <div className="border-t border-line">
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "باز کردن سایدبار" : undefined}
          className={cn(
            "flex items-center gap-2 w-full px-4 py-3 text-xs font-medium text-ink-faint hover:text-brand hover:bg-brand-soft/50 transition-colors",
            sidebarCollapsed && "justify-center px-0"
          )}
        >
          {sidebarCollapsed ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
          {!sidebarCollapsed && <span>جمع کردن</span>}
        </button>
        <button
          type="button"
          onClick={() => setOpenPanel("about")}
          title={sidebarCollapsed ? "درباره این سایت" : undefined}
          className={cn(
            "flex items-center gap-2 w-full px-4 py-3 text-xs text-ink-faint hover:text-brand hover:bg-brand-soft/50 transition-colors border-t border-line",
            sidebarCollapsed && "justify-center px-0"
          )}
        >
          <Info className="h-3.5 w-3.5" />
          {!sidebarCollapsed && <span>درباره این سایت</span>}
        </button>
      </div>
    </aside>
  );
}
