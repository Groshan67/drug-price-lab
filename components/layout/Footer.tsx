import Link from "next/link";
import { siteStats } from "@/lib/data/mock";

const columns = [
  {
    title: "جستجو",
    links: [
      { label: "جستجوی دارو", href: "/search" },
      { label: "از روی مواد مؤثره", href: "/search/ingredients" },
      { label: "طبقه‌بندی اثرات دارویی", href: "/search/category" },
      { label: "از روی سازنده", href: "/search/manufacturer" },
    ],
  },
  {
    title: "ابزارها",
    links: [
      { label: "شبیه‌سازی قیمت دارو", href: "/simulation" },
      { label: "تقویم بازنگری", href: "/calendar" },
      { label: "جستجوی شرطی", href: "/screener" },
      { label: "پرسش از AI", href: "/ask-ai" },
    ],
  },
  {
    title: "درباره",
    links: [
      { label: "توضیح سیستم و گزارش‌ها", href: "/insights" },
      { label: "منبع داده رسمی", href: "/insights#source" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-bold mb-2">دارونما</p>
          <p className="text-sm text-ink-faint leading-6">
            پایگاه داده رایگان و فارسی قیمت دارو، بر اساس اسناد رسمی. {siteStats.totalItems.toLocaleString("fa-IR")} قلم فهرست‌شده.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-ink mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-faint hover:text-brand transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-ink-faint">
          <p>© {new Date().getFullYear()} دارونما — به‌طور مستقل توسعه یافته، بدون ارائه مشاوره پزشکی یا نسخه.</p>
          <p>آخرین به‌روزرسانی داده‌ها: {siteStats.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
