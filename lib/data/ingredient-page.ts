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

export type IngredientPageData = {
  name: string;
  slug: string;
  totalItems: number;
  revisionLabel: string;
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

const ingredientPageRegistry: Record<string, IngredientPageData> = {
  [acalabrutinibPage.slug]: acalabrutinibPage,
};

export function getIngredientPageBySlug(slug: string): IngredientPageData | undefined {
  return ingredientPageRegistry[slug];
}
