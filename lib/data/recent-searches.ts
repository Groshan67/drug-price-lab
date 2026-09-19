// تاریخچه «آخرین جستجوهای مشاهده‌شده» — معادل s1.jpg
// بعداً با localStorage یا Prisma (per-user) جایگزین می‌شود.

export type RecentSearchItem = {
  name: string;
  href: string;
  price: number;
};

export const recentSearches: RecentSearchItem[] = [
  { name: "کپسول کالکنس ۱۰۰ میلی‌گرم", href: "/drug/calkens-capsules-100mg", price: 11705.7 },
  { name: "قرص تاناتریل ۲.۵ میلی‌گرم", href: "/drug/tanatril-tablets-2-5mg", price: 15.8 },
  { name: "قرص ایمیداپریل هیدروکلراید ۲.۵ میلی‌گرم", href: "/drug/imidapril-hydrochloride-2-5mg-tablets", price: 10.8 },
  { name: "قرص کالکنس ۱۰۰ میلی‌گرم", href: "/drug/calkens-tablets-100mg", price: 11705.7 },
];
