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
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";

const searchLinks = [
  { label: "جستجوی دارو", href: "/search", icon: Search },
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
}: {
  title: string;
  links: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
  pathname: string;
}) {
  return (
    <div>
      <p className="px-3 text-xs font-medium text-ink-faint mb-2">{title}</p>
      <ul className="space-y-0.5">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border-r-2 px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-emerald bg-emerald-soft text-emerald font-medium"
                    : "border-transparent text-ink-soft hover:bg-brand-soft hover:text-brand-dark"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{l.label}</span>
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

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-l border-line bg-card min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-line">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
          <Pill className="h-4 w-4" />
        </span>
        <span className="font-bold text-base">دارونما</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg border-r-2 px-3 py-2 text-sm font-medium transition-colors",
            isHome
              ? "border-emerald bg-emerald-soft text-emerald"
              : "border-transparent text-ink hover:bg-brand-soft"
          )}
        >
          <Home className="h-4 w-4" />
          <span>خانه</span>
        </Link>

        <NavGroup title="جستجو" links={searchLinks} pathname={pathname} />
        <NavGroup title="ابزارها" links={toolLinks} pathname={pathname} />
        <NavGroup
          title="مطالعه"
          links={[{ label: "توضیح سیستم و گزارش‌ها", href: "/insights", icon: BookOpen }]}
          pathname={pathname}
        />
      </nav>

      <div className="border-t border-line p-4 text-xs text-ink-faint leading-6">
        داده‌ها بر اساس اسناد رسمی است و صرفاً جنبه اطلاع‌رسانی دارد؛ جایگزین مشاوره پزشکی نیست.
      </div>
    </aside>
  );
}
