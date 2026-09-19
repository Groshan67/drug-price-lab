// داده صفحه جزئیات طبقه‌بندی — معادل c2.jpg و c3.jpg (نمونه: مهارکننده‌های ACE)

export type CategoryIngredientRow = {
  name: string;
  slug: string; // برای لینک به /ingredient/[slug]
  itemCount: number;
  starters: number;
  relievers: number;
  priceLow: number;
  priceHigh: number;
  prevRevisionAvgPercent: number; // + سبز / - قرمز
};

export type CategoryDetailData = {
  slug: string;
  name: string;
  groupLabel: string;
  groupSlug: string;
  breadcrumb: { label: string; href: string }[];
  ingredientCount: number;
  itemCount: number;
  revisionLabel: string;
  description: string;
  stats: {
    ingredientCountLabel: string;
    ingredientCountNote: string;
    productComposition: string;
    productCompositionNote: string;
    priceRangeLabel: string;
    priceRangeNote: string;
    prevRevisionAvg: string;
    prevRevisionAvgNote: string;
  };
  ingredients: CategoryIngredientRow[];
};

export const aceInhibitorsCategory: CategoryDetailData = {
  slug: "ace-inhibitors",
  name: "مهارکننده‌های ACE",
  groupLabel: "دستگاه گردش خون",
  groupSlug: "circulatory-system",
  breadcrumb: [
    { label: "RxPrice Lab", href: "/" },
    { label: "فهرست طبقه‌بندی‌ها", href: "/search/category" },
    { label: "مهارکننده‌های ACE", href: "/category/ace-inhibitors" },
  ],
  ingredientCount: 9,
  itemCount: 51,
  revisionLabel: "وزارت بهداشت، کار و رفاه، بازنگری آوریل ۲۰۲۶",
  description:
    "مهارکننده‌های ACE (آنزیم مبدل آنژیوتانسین) گروهی از داروها هستند که سامانه رنین-آنژیوتانسین را مهار می‌کنند و اثرات ضدفشارخون و محافظت از اندام‌ها دارند. برای درمان فشار خون بالا، نارسایی مزمن قلبی و نفروپاتی دیابتی استفاده می‌شوند. داروهای شاخص شامل ایمیدآپریل (تاناتریل)، انالاپریل (رنیواز) و پریندوپریل (کوواسیل) هستند.",
  stats: {
    ingredientCountLabel: "۹ ماده مؤثره",
    ingredientCountNote: "۵۱ قلم",
    productComposition: "۲۲ محصول پیشگام، ۲۹ محصول حمایتی",
    productCompositionNote: "همه مواد مؤثره / همه مشخصات",
    priceRangeLabel: "۷.۳۰ تا ۴۸.۵۰ ین",
    priceRangeNote: "همه مشخصات و همه اقلام",
    prevRevisionAvg: "−۱۱.۰٪",
    prevRevisionAvgNote: "۴۰ قلم کاهش یافته از ۵۱ قلم متأثر",
  },
  ingredients: [
    { name: "ایمیدآپریل هیدروکلراید", slug: "imidapril-hydrochloride", itemCount: 13, starters: 3, relievers: 10, priceLow: 10.8, priceHigh: 41.2, prevRevisionAvgPercent: -13.9 },
    { name: "لیزینوپریل هیدرات", slug: "lisinopril-hydrate", itemCount: 8, starters: 3, relievers: 5, priceLow: 10.8, priceHigh: 16.1, prevRevisionAvgPercent: -10.3 },
    { name: "انالاپریل مالئات", slug: "enalapril-maleate", itemCount: 7, starters: 3, relievers: 4, priceLow: 10.8, priceHigh: 41.6, prevRevisionAvgPercent: -7.5 },
    { name: "تموکاپریل هیدروکلراید", slug: "temocapril-hydrochloride", itemCount: 6, starters: 3, relievers: 3, priceLow: 10.8, priceHigh: 48.5, prevRevisionAvgPercent: -13.2 },
    { name: "آراسپریل", slug: "aracepril", itemCount: 4, starters: 1, relievers: 3, priceLow: 10.8, priceHigh: 13.3, prevRevisionAvgPercent: 3.6 },
    { name: "کاپتوپریل", slug: "captopril", itemCount: 4, starters: 4, relievers: 0, priceLow: 7.3, priceHigh: 17.5, prevRevisionAvgPercent: -15.2 },
    { name: "تراندولاپریل", slug: "trandolapril", itemCount: 4, starters: 2, relievers: 2, priceLow: 13.7, priceHigh: 14.3, prevRevisionAvgPercent: -18.6 },
    { name: "دلاپریل هیدروکلراید", slug: "delapril-hydrochloride", itemCount: 3, starters: 3, relievers: 0, priceLow: 13.9, priceHigh: 26.1, prevRevisionAvgPercent: -8.3 },
    { name: "پریندوپریل اربومین", slug: "perindopril-erbumine", itemCount: 2, starters: 0, relievers: 2, priceLow: 14, priceHigh: 24.6, prevRevisionAvgPercent: -11.3 },
  ],
};

const categoryRegistry: Record<string, CategoryDetailData> = {
  [aceInhibitorsCategory.slug]: aceInhibitorsCategory,
};

export function getCategoryBySlug(slug: string): CategoryDetailData | undefined {
  return categoryRegistry[slug];
}
