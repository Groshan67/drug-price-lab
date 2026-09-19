// داده نمونه صفحه جزئیات ماده مؤثره — معادل ingr1.jpg (نمونه: آکالابروتینیب)
// بعداً با کوئری Prisma (drug.findMany where ingredientId=...) جایگزین می‌شود.

export type IngredientProductRow = {
  name: string;
  slug: string; // برای لینک به /drug/[slug]
  brand: string; // نام برند برای فیلتر ریز («کپسول کالکنس»، «قرص کالکنس»)
  spec: string;
  manufacturer: string;
  classification: "original" | "generic";
  price: number;
  prevPrice: number | null;
  changePercent: number | null;
  changeAmount: number | null;
};

export type PriceTrendSeries = {
  name: string;
  color: string;
  dashed?: boolean;
  values: (number | null)[];
};

export type IngredientPriceTrendComparison = {
  periods: { key: string; label: string }[]; // مثل "بازنگری آوریل ۲۰۱۶"
  series: PriceTrendSeries[];
  note: string;
};

export type IngredientPageData = {
  name: string;
  slug: string;
  totalItems: number;
  revisionLabel: string;
  backLink?: { label: string };
  stats: {
    startingPitchers: number;
    reliefPitchers: number;
    comparedToOriginal: string;
    comparedToOriginalNote: string;
    firstRecallYear: string;
    firstRecallNote: string;
    priceRangeLabel: string;
    priceRangeNote: string;
  };
  priceTrendComparison?: IngredientPriceTrendComparison;
  products: IngredientProductRow[];
  relatedPages: { label: string; href: string }[];
};

export const acalabrutinibPage: IngredientPageData = {
  name: "آکالابروتینیب",
  slug: "acalabrutinib",
  totalItems: 2,
  revisionLabel: "وزارت بهداشت، کار و رفاه · بازنگری آوریل ۲۰۲۶",
  stats: {
    startingPitchers: 2,
    reliefPitchers: 0,
    comparedToOriginal: "—",
    comparedToOriginalNote: "محصول اصلی یا ژنریک دیگری با همین مشخصات وجود ندارد.",
    firstRecallYear: "۲۰۲۱",
    firstRecallNote: "۶ سال در فهرست حضور داشته (محصول اصلی)",
    priceRangeLabel: "۱۱٬۷۰۵.۷۰ ین",
    priceRangeNote: "تمام مشخصات و تمام اقلام",
  },
  products: [
    {
      name: "کپسول کالکنس ۱۰۰ میلی‌گرم",
      slug: "calkens-capsules-100mg",
      brand: "کپسول کالکنس",
      spec: "۱۰۰ میلی‌گرم کپسول",
      manufacturer: "آسترازنکا",
      classification: "original",
      price: 11705.7,
      prevPrice: 12921.9,
      changePercent: -9.4,
      changeAmount: -1216.2,
    },
    {
      name: "قرص کالکنس ۱۰۰ میلی‌گرم",
      slug: "calkens-tablets-100mg",
      brand: "قرص کالکنس",
      spec: "۱۰۰ میلی‌گرم قرص",
      manufacturer: "آسترازنکا",
      classification: "original",
      price: 11705.7,
      prevPrice: null,
      changePercent: null,
      changeAmount: null,
    },
  ],
  relatedPages: [
    { label: "داروهای مشابه: داروهای ضدسرطان و هدف مولکولی", href: "/category/anticancer-molecular-targeted" },
    { label: "تقویم بازنگری قیمت دارو", href: "/calendar" },
    { label: "بینش‌های قیمت دارو", href: "/insights" },
  ],
};

const periods = [
  { key: "2016-04", label: "بازنگری آوریل ۲۰۱۶" },
  { key: "2017-04", label: "بازنگری آوریل ۲۰۱۷" },
  { key: "2018-04", label: "بازنگری آوریل ۲۰۱۸" },
  { key: "2019-10", label: "بازنگری اکتبر ۲۰۱۹" },
  { key: "2020-04", label: "بازنگری آوریل ۲۰۲۰" },
  { key: "2021-04", label: "بازنگری آوریل ۲۰۲۱" },
  { key: "2022-04", label: "بازنگری آوریل ۲۰۲۲" },
  { key: "2023-04", label: "بازنگری آوریل ۲۰۲۳" },
  { key: "2024-04", label: "بازنگری آوریل ۲۰۲۴" },
  { key: "2025-04", label: "بازنگری آوریل ۲۰۲۵" },
  { key: "2026-04", label: "بازنگری آوریل ۲۰۲۶" },
];

export const imidaprilHydrochloridePage: IngredientPageData = {
  name: "ایمیدآپریل هیدروکلراید",
  slug: "imidapril-hydrochloride",
  totalItems: 13,
  revisionLabel: "وزارت بهداشت، کار و رفاه · بازنگری آوریل ۲۰۲۶",
  backLink: { label: "بازگشت به مهارکننده‌های ACE" },
  stats: {
    startingPitchers: 3,
    reliefPitchers: 10,
    comparedToOriginal: "کمترین قیمت محصول دیرآمده: −۵۷٪",
    comparedToOriginalNote: "قرص ۱۰ میلی‌گرمی، کمترین قیمت نسبت به برند اصلی.",
    firstRecallYear: "۱۹۹۳",
    firstRecallNote: "۳۴ سال در فهرست حضور داشته (محصول اصلی)",
    priceRangeLabel: "۱۰.۸۰ تا ۴۱.۲۰ ین",
    priceRangeNote: "تمام مشخصات و تمام اقلام",
  },
  priceTrendComparison: {
    periods,
    note:
      "محصولات نماینده یک محصول اصلی و ۳ محصول ژنریک نمایش داده می‌شوند (از مجموع ۱۳ محصول).",
    series: [
      {
        name: "تاناتریل ۲.۵",
        color: "#1a6fd4",
        values: [33.0, 33.0, 31.0, 30.0, 29.0, 26.0, 23.0, 20.7, 19.0, 17.0, 15.8],
      },
      {
        name: "ایمیدآپریل هیدروکلراید ۲.۵ میلی‌گرم (ارزان‌ترین)",
        color: "#C08A1E",
        values: [null, null, null, null, null, null, 10.4, 10.4, 10.4, 10.4, 10.8],
      },
      {
        name: 'ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «DSEP» (میانه)',
        color: "#0f8a6a",
        values: [60.0, 60.4, 52.0, 45.0, 41.0, 38.0, 35.0, 32.0, 30.2, 30.2, 27.5],
      },
      {
        name: 'ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «ساوای» (بیشترین)',
        color: "#7C3AED",
        dashed: true,
        values: [null, 60.4, 55.0, 48.0, 42.0, 39.0, 35.0, 32.0, 30.2, 30.2, 27.5],
      },
    ],
  },
  products: [
    {
      name: "قرص تاناتریل ۲.۵",
      slug: "tanatril-2-5",
      brand: "تاناتریل",
      spec: "۲.۵ میلی‌گرم قرص",
      manufacturer: "تانابه فارما",
      classification: "original",
      price: 15.8,
      prevPrice: 17.9,
      changePercent: -11.7,
      changeAmount: -2.1,
    },
    {
      name: "قرص تاناتریل ۵",
      slug: "tanatril-5",
      brand: "تاناتریل",
      spec: "۵ میلی‌گرم قرص",
      manufacturer: "تانابه فارما",
      classification: "original",
      price: 20.7,
      prevPrice: 31.3,
      changePercent: -33.9,
      changeAmount: -10.6,
    },
    {
      name: "قرص تاناتریل ۱۰",
      slug: "tanatril-10",
      brand: "تاناتریل",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "تانابه فارما",
      classification: "original",
      price: 41.2,
      prevPrice: 55.8,
      changePercent: -26.2,
      changeAmount: -14.6,
    },
    {
      name: "قرص ایمیدآپریل هیدروکلراید ۲.۵ میلی‌گرم",
      slug: "imidapril-hydrochloride-2-5mg-tablets",
      brand: "بدون‌برند",
      spec: "۲.۵ میلی‌گرم قرص",
      manufacturer: "—",
      classification: "generic",
      price: 10.8,
      prevPrice: 10.4,
      changePercent: 3.8,
      changeAmount: 0.4,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۲.۵ میلی‌گرم «توا»',
      slug: "imidapril-hydrochloride-2-5mg-towa",
      brand: "توا فارماسیوتیکال",
      spec: "۲.۵ میلی‌گرم قرص",
      manufacturer: "توا فارماسیوتیکال",
      classification: "generic",
      price: 10.8,
      prevPrice: 10.4,
      changePercent: 3.8,
      changeAmount: 0.4,
    },
    {
      name: "قرص ایمیدآپریل هیدروکلراید ۵ میلی‌گرم",
      slug: "imidapril-hydrochloride-5mg-tablets",
      brand: "بدون‌برند",
      spec: "۵ میلی‌گرم قرص",
      manufacturer: "—",
      classification: "generic",
      price: 13.8,
      prevPrice: 15.1,
      changePercent: -8.6,
      changeAmount: -1.3,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۵ میلی‌گرم «توا»',
      slug: "imidapril-hydrochloride-5mg-towa",
      brand: "توا فارماسیوتیکال",
      spec: "۵ میلی‌گرم قرص",
      manufacturer: "توا فارماسیوتیکال",
      classification: "generic",
      price: 13.8,
      prevPrice: 15.1,
      changePercent: -8.6,
      changeAmount: -1.3,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۵ میلی‌گرم «JG»',
      slug: "imidapril-hydrochloride-5mg-jg",
      brand: "ژاپن جنریکس",
      spec: "۵ میلی‌گرم قرص",
      manufacturer: "ژاپن جنریکس",
      classification: "generic",
      price: 13.8,
      prevPrice: 15.1,
      changePercent: -8.6,
      changeAmount: -1.3,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «PH»',
      slug: "imidapril-hydrochloride-10mg-ph",
      brand: "کیورین رمدیو",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "کیورین رمدیو",
      classification: "generic",
      price: 17.8,
      prevPrice: 30.2,
      changePercent: -41.1,
      changeAmount: -12.4,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «توا»',
      slug: "imidapril-hydrochloride-10mg-towa",
      brand: "توا فارماسیوتیکال",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "توا فارماسیوتیکال",
      classification: "generic",
      price: 27.5,
      prevPrice: 30.2,
      changePercent: -8.9,
      changeAmount: -2.7,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «JG»',
      slug: "imidapril-hydrochloride-10mg-jg",
      brand: "ژاپن جنریکس",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "ژاپن جنریکس",
      classification: "generic",
      price: 27.5,
      prevPrice: 30.2,
      changePercent: -8.9,
      changeAmount: -2.7,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «DSEP»',
      slug: "imidapril-hydrochloride-10mg-dsep",
      brand: "دایی‌چی‌ساینکو اسپا",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "دایی‌چی‌ساینکو اسپا",
      classification: "generic",
      price: 27.5,
      prevPrice: 30.2,
      changePercent: -8.9,
      changeAmount: -2.7,
    },
    {
      name: 'قرص ایمیدآپریل هیدروکلراید ۱۰ میلی‌گرم «ساوای»',
      slug: "imidapril-hydrochloride-10mg-sawai",
      brand: "ساوای فارماسیوتیکال",
      spec: "۱۰ میلی‌گرم قرص",
      manufacturer: "ساوای فارماسیوتیکال",
      classification: "generic",
      price: 27.5,
      prevPrice: 30.2,
      changePercent: -8.9,
      changeAmount: -2.7,
    },
  ],
  relatedPages: [
    { label: "طبقه‌بندی: مهارکننده‌های ACE", href: "/category/ace-inhibitors" },
    { label: "تقویم بازنگری قیمت دارو", href: "/calendar" },
    { label: "بینش‌های قیمت دارو", href: "/insights" },
  ],
};

const ingredientPageRegistry: Record<string, IngredientPageData> = {
  [acalabrutinibPage.slug]: acalabrutinibPage,
  [imidaprilHydrochloridePage.slug]: imidaprilHydrochloridePage,
};

export function getIngredientPageBySlug(slug: string): IngredientPageData | undefined {
  return ingredientPageRegistry[slug];
}
