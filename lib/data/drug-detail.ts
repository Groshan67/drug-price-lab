// داده نمونه صفحه جزئیات دارو — معادل تصاویر D1-D5 و ingr2-ingr6.
// بعداً با کوئری Prisma بر اساس slug جایگزین می‌شود.

export type PriceRevisionRow = {
  date: string;
  price: number;
  changePercent: number | null; // مثبت=افزایش (سبز)، منفی=کاهش (قرمز)، صفر/null=بدون تغییر
  reason: "lowest" | "not-eligible" | "regular" | "market-expansion" | "none";
};

export type GenericProductRow = {
  name: string;
  manufacturer: string | null;
  price: number;
  startingRatio: string;
  isCurrent: boolean;
  tag: "starting-pitcher" | "none";
};

export type PriceTrendPoint = {
  year: number;
  price: number;
  changeLabel: string | null;
  hollow: boolean;
};

export type DrugDetail = {
  slug: string;
  yjCode: string;
  name: string;
  ingredientName: string;
  ingredientSlug: string;
  categoryName: string;
  categorySlug: string;
  breadcrumb: { label: string; href: string }[];
  specification: string;
  isOriginal: boolean;
  newDrugAddition: { eligible: boolean; asOf: string };
  supplyStatus?: { level: "A" | "B" | "C"; label: string };
  cumulativeChangeNote: string;
  dosageForms: { label: string; slug: string; active: boolean }[];
  mgUnitPrice?: { value: string; comparisonNote: string };
  currentPrice: number;
  recentRevision: { date: string; changePercent: number; from: number; to: number };

  supplyIssue?: {
    title: string;
    message: string;
    sourceLabel: string;
  };

  futureOutlook: {
    nextRevisionDate: string;
    nextRevisionNote: string;
    applicableRegulationsNote: string;
    maintenanceNote: string;
    marketEntryNote: string;
    reexamExpiry: string;
  };
  outOfPocket: {
    rates: { label: string; amount: number; capLabel?: string }[];
    note: string;
  };

  genericsListed: boolean;
  lowestGenericBanner?: { price: number; diffPercent: number; diffAmount: number };
  otherDosageForms?: { label: string; href: string }[];

  ingredientInfo: {
    category: string;
    spec: string;
    manufacturer: string;
    inclusionDate: string;
    finalRevision: string;
    genericStatus: string;
    supplyStatus: string;
    supplyStatusAlert?: boolean;
    reexamPeriod: string;
  };
  priceTrend: PriceTrendPoint[];

  sameClassComparison: {
    categoryLabel: string;
    ingredientCount: number;
    priceLow: number;
    priceHigh: number;
  };

  genericSwitch?: {
    availabilityNote: string;
    standardMatchNote: string;
    lowestName: string;
  };

  calculationInfo: {
    method: string;
    comparatorDrug: { name: string; href: string } | null;
    priceAtListing: number;
    foreignAdjustment: string;
    listingDate: string;
    approvalClassification: string;
    sourceLabel: string;
  };

  askAI: {
    intro: string;
    chips: string[];
  };
  revisionHistory: PriceRevisionRow[];
  revisionHistoryMoreCount: number;
  indications: string;
  genericProducts: GenericProductRow[];
  genericProductsSummary: { current: number; discontinued: number };
};

export const alpinySuppositories100: DrugDetail = {
  slug: "alpiny-suppositories-100",
  yjCode: "1141700J2092",
  name: "شیاف آلپینی ۱۰۰",
  ingredientName: "استامینوفن",
  ingredientSlug: "acetaminophen",
  categoryName: "ضدتب و ضددرد (نوع استامینوفن)",
  categorySlug: "antipyretic-acetaminophen",
  breadcrumb: [
    { label: "خانه", href: "/" },
    { label: "ضدتب و ضددرد (نوع استامینوفن)", href: "/category/antipyretic-acetaminophen" },
    { label: "استامینوفن", href: "/ingredient/acetaminophen" },
  ],
  specification: "۱۰۰ میلی‌گرم، یک عدد",
  isOriginal: true,
  newDrugAddition: { eligible: false, asOf: "آوریل ۲۰۲۶" },
  supplyStatus: { level: "A", label: "تضمین عرضه A (مهم)" },
  cumulativeChangeNote:
    "افزایش تجمعی از آوریل ۲۰۱۶ تاکنون ۱۱.۹٪+ بوده است. نمونه ژنریک در این استاندارد فهرست نشده است.",
  dosageForms: [
    { label: "۵۰ میلی‌گرم", slug: "alpiny-suppositories-50", active: false },
    { label: "۱۰۰ میلی‌گرم", slug: "alpiny-suppositories-100", active: true },
    { label: "۲۰۰ میلی‌گرم", slug: "alpiny-suppositories-200", active: false },
  ],
  mgUnitPrice: {
    value: "۰.۲۲ ین/میلی‌گرم",
    comparisonNote: "۱۰۰٪ گران‌تر از استاندارد ۲۰۰ میلی‌گرمی",
  },
  currentPrice: 21.6,
  recentRevision: { date: "آوریل ۲۰۲۶", changePercent: 3.3, from: 20.9, to: 21.6 },
  futureOutlook: {
    nextRevisionDate: "آوریل ۲۰۲۷ (بازنگری سال میانی)",
    nextRevisionNote:
      "دامنه اقلام مشمول بازنگری پیش از اعلام رسمی مشخص می‌شود. از آنجا که محصول ژنریک فهرست نشده، مشمول قواعد فهرست بلندمدت (G1/G2) نیست.",
    applicableRegulationsNote:
      "بازنگری‌های معمول (بر اساس نرخ انحراف واقعی) — در حال حاضر مقررات خاصی تأیید نشده است. در بازنگری سال میانی، طبق سوابق گذشته، فقط اقلامی با اختلاف زیاد مشمول کاهش قرار گرفته‌اند (فصل ۳، بخش ۱).",
    maintenanceNote:
      "واجد شرایط افزودن نیست (تا آوریل ۲۰۲۶). بار بعد، قوانین بازنگری‌شده استاندارد بر اساس فاصله (نرخ انحراف) از ارزش بازار واقعی کاهش خواهد یافت.",
    marketEntryNote:
      "دوره بازبینی مجدد از پیش به پایان رسیده و محصول ژنریک هم‌اکنون در بازار موجود است.",
    reexamExpiry: "منقضی‌شده",
  },
  outOfPocket: {
    rates: [
      { label: "۳۰٪ سهم بیمار", amount: 194 },
      { label: "۲۰٪ سهم بیمار", amount: 130 },
      { label: "۱۰٪ سهم بیمار", amount: 65 },
    ],
    note: "یک بار در روز، یک عدد در هر نوبت، مصرف ۳۰ روزه. تنها هزینه دارو محاسبه شده و هزینه خدمات فنی لحاظ نشده است.",
  },
  genericsListed: true,
  lowestGenericBanner: { price: 21.6, diffPercent: 0, diffAmount: 0 },
  ingredientInfo: {
    category: "ضدتب و ضددرد (نوع استامینوفن)",
    spec: "۱۰۰ میلی‌گرم، یک عدد",
    manufacturer: "هیساموتسو فارماسیوتیکال",
    inclusionDate: "پیش از آوریل ۲۰۱۶",
    finalRevision: "۲۰۲۶/۰۴",
    genericStatus: "قلم ۱ (۱۰۰٪ محصول پیشگام)",
    supplyStatus: "—",
    reexamPeriod: "منقضی‌شده",
  },
  priceTrend: [
    { year: 2016, price: 19.3, changeLabel: null, hollow: false },
    { year: 2017, price: 19.3, changeLabel: null, hollow: true },
    { year: 2018, price: 19.3, changeLabel: null, hollow: false },
    { year: 2019, price: 19.7, changeLabel: "+۲.۱٪", hollow: false },
    { year: 2020, price: 19.7, changeLabel: null, hollow: false },
    { year: 2021, price: 19.7, changeLabel: null, hollow: false },
    { year: 2022, price: 19.7, changeLabel: null, hollow: false },
    { year: 2023, price: 19.7, changeLabel: null, hollow: false },
    { year: 2024, price: 19.7, changeLabel: null, hollow: false },
    { year: 2025, price: 20.9, changeLabel: "+۶.۱٪", hollow: false },
    { year: 2026, price: 21.6, changeLabel: "+۳.۳٪", hollow: false },
  ],
  sameClassComparison: {
    categoryLabel: "ضدتب و ضددرد (پایه استامینوفن)",
    ingredientCount: 1,
    priceLow: 21.6,
    priceHigh: 21.6,
  },
  genericSwitch: {
    availabilityNote: "محصول جایگزین در بازار موجود است (در حال حاضر تنها محصول)",
    standardMatchNote: "مدل‌های ژنریک منطبق با استاندارد وجود دارد",
    lowestName: "شیاف استامینوفن ۱۰۰ میلی‌گرم",
  },
  calculationInfo: {
    method: "قیمت‌گذاری بر مبنای هزینه تولید (فاقد داروی مشابه در زمان فهرست‌شدن اولیه)",
    comparatorDrug: null,
    priceAtListing: 19.3,
    foreignAdjustment: "ندارد",
    listingDate: "پیش از آوریل ۲۰۱۶",
    approvalClassification: "داروی ژنریک نیمه‌سوئیچ‌شده به OTC",
    sourceLabel: "فهرست وزارت بهداشت، کار و رفاه از اقلام فهرست‌شده در استاندارد قیمت دارو",
  },
  askAI: {
    intro:
      'می‌توانید درباره روند قیمت دارو، محصولات ژنریک و مبنای محاسبه «شیاف آلپینی ۱۰۰» سؤال بپرسید. بر اساس پایگاه داده قیمت دارو (+۱۲٬۰۰۰ قلم)، استانداردهای محاسباتی R8 و مصوبات شورای چوئیکیو.',
    chips: [
      "چرا قیمت دارو تا این حد افزایش یافت؟",
      "از آخرین بازنگری چند درصد کاهش داشته است؟",
      "داروهای مشابه و مبنای مقایسه در زمان محاسبه چه بوده‌اند؟",
    ],
  },
  revisionHistory: [
    { date: "۲۰۲۶/۰۴", price: 21.6, changePercent: 3.3, reason: "lowest" },
    { date: "۲۰۲۵/۰۴", price: 20.9, changePercent: 6.1, reason: "lowest" },
    { date: "۲۰۲۴/۰۴", price: 19.7, changePercent: 0, reason: "none" },
    { date: "۲۰۲۳/۰۴", price: 19.7, changePercent: 0, reason: "not-eligible" },
    { date: "۲۰۲۲/۰۴", price: 19.7, changePercent: 0, reason: "none" },
  ],
  revisionHistoryMoreCount: 6,
  indications: "تسکین تب و کاهش درد در کودکان",
  genericProducts: [
    {
      name: "شیاف آلپینی ۱۰۰",
      manufacturer: "هیساموتسو فارماسیوتیکال",
      price: 21.6,
      startingRatio: "—",
      isCurrent: true,
      tag: "none",
    },
    {
      name: "شیاف کودکان آنهیبا ۱۰۰ میلی‌گرم",
      manufacturer: "ویاتریس فارماسیوتیکالز",
      price: 21.6,
      startingRatio: "—",
      isCurrent: false,
      tag: "starting-pitcher",
    },
    {
      name: "شیاف کالونال ۱۰۰",
      manufacturer: "آیومی فارماسیوتیکال",
      price: 26.5,
      startingRatio: "—",
      isCurrent: false,
      tag: "starting-pitcher",
    },
    {
      name: "شیاف استامینوفن ۱۰۰ میلی‌گرم",
      manufacturer: null,
      price: 21.6,
      startingRatio: "مقدار یکسان",
      isCurrent: false,
      tag: "none",
    },
  ],
  genericProductsSummary: { current: 3, discontinued: 4 },
};

// ---------------------------------------------------------------------------
// کپسول کالکنس ۱۰۰ میلی‌گرم — معادل تصاویر ingr2 تا ingr6
// ---------------------------------------------------------------------------
export const calkensCapsules100mg: DrugDetail = {
  slug: "calkens-capsules-100mg",
  yjCode: "4291070M1024",
  name: "کپسول کالکنس ۱۰۰ میلی‌گرم",
  ingredientName: "آکالابروتینیب",
  ingredientSlug: "acalabrutinib",
  categoryName: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)",
  categorySlug: "anticancer-molecular-targeted",
  breadcrumb: [
    { label: "خانه", href: "/" },
    {
      label: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)",
      href: "/category/anticancer-molecular-targeted",
    },
    { label: "آکالابروتینیب", href: "/ingredient/acalabrutinib" },
  ],
  specification: "۱۰۰ میلی‌گرم، یک کپسول",
  isOriginal: true,
  newDrugAddition: { eligible: false, asOf: "آوریل ۲۰۲۶" },
  cumulativeChangeNote:
    "کاهش تجمعی از آوریل ۲۰۲۱ تاکنون ۲۳.۰٪- بوده است. بیشترین افت، ۱۵.۰٪- در بازنگری آوریل ۲۰۲۴ (بازمحاسبه گسترش بازار) رخ داد. محصول ژنریک فهرست نشده است.",
  dosageForms: [
    { label: "کپسول ۱۰۰ میلی‌گرم", slug: "calkens-capsules-100mg", active: true },
    { label: "قرص ۱۰۰ میلی‌گرم", slug: "calkens-tablets-100mg", active: false },
  ],
  currentPrice: 11705.7,
  recentRevision: { date: "آوریل ۲۰۲۶", changePercent: -9.4, from: 12921.9, to: 11705.7 },

  supplyIssue: {
    title: "عرضه متوقف شده — قیمت دارو در آستانه حذف از فهرست",
    message:
      "شرکت سازنده (آسترازنکا) توقف عرضه را گزارش کرده است (دلیل: حذف از فهرست قیمت دارو). تاریخ رفع مشکل مشخص نیست. جایگزین‌های احتمالی را در بخش داروهای مشابه ببینید.",
    sourceLabel:
      "منبع: وزارت بهداشت، کار و رفاه، سامانه مدیریت پایداری عرضه دارو · تاریخ به‌روزرسانی گزارش سازنده: ۱۲ آگوست ۲۰۲۶ · تاریخ دریافت داده: ۱ سپتامبر ۲۰۲۶",
  },

  futureOutlook: {
    nextRevisionDate: "آوریل ۲۰۲۷ (بازنگری سال میانی)",
    nextRevisionNote:
      "دامنه اقلام مشمول بازنگری برنامه‌ریزی‌شده آوریل ۲۰۲۷ هنوز اعلام نشده. از آنجا که محصول ژنریک فهرست نشده، قواعد فهرست بلندمدت (G1/G2) اعمال نمی‌شود.",
    applicableRegulationsNote:
      "بازنگری معمول (بر اساس نرخ انحراف واقعی) — در حال حاضر اعمال مقررات خاصی تأیید نشده است. در صورت اجرای بازنگری سال میانی، طبق نمونه‌های گذشته فقط اقلام با انحراف زیاد مشمول کاهش بوده‌اند (فصل ۳، بخش ۱).",
    maintenanceNote:
      "واجد شرایط پرداخت اضافی نیست (تا آوریل ۲۰۲۶). بازنگری بعدی طبق روال معمول و بر اساس فاصله (نرخ انحراف) از ارزش بازار واقعی کاهش خواهد یافت.",
    marketEntryNote:
      "دوره بازبینی مجدد از ۲۱ ژانویه ۲۰۲۹ به بعد منقضی می‌شود. از آنجا که فرایند بررسی تأیید و فهرست قیمت دارو (دو بار در سال) طی می‌شود، ورود واقعی به بازار معمولاً بیش از یک سال پس از تاریخ انقضا رخ می‌دهد.",
    reexamExpiry: "۲۰۲۹/۰۱/۲۱",
  },
  outOfPocket: {
    rates: [
      { label: "۳۰٪ سهم بیمار", amount: 105351, capLabel: "سقف حداکثری" },
      { label: "۲۰٪ سهم بیمار", amount: 70234, capLabel: "سقف حداکثری" },
      { label: "۱۰٪ سهم بیمار", amount: 35117, capLabel: "سقف حداکثری" },
    ],
    note: "یک بار در روز، یک کپسول در هر نوبت، مصرف ۳۰ روزه. تنها هزینه دارو محاسبه شده و هزینه خدمات فنی لحاظ نشده است.",
  },

  genericsListed: false,
  otherDosageForms: [
    { label: "قرص کالکنس ۱۰۰ میلی‌گرم", href: "/drug/calkens-tablets-100mg" },
  ],

  ingredientInfo: {
    category: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)",
    spec: "۱۰۰ میلی‌گرم، کپسول",
    manufacturer: "آسترازنکا",
    inclusionDate: "۲۰۲۱/۰۴ (۵ سال)",
    finalRevision: "۲۰۲۶/۰۴",
    genericStatus: "فهرست نشده",
    supplyStatus: "عرضه متوقف‌شده (از ۱ آگوست)",
    supplyStatusAlert: true,
    reexamPeriod: "۲۰۲۹/۰۱/۲۱",
  },
  priceTrend: [
    { year: 2021, price: 15202.2, changeLabel: null, hollow: false },
    { year: 2022, price: 15202.2, changeLabel: null, hollow: false },
    { year: 2023, price: 15202.2, changeLabel: null, hollow: false },
    { year: 2024, price: 12921.9, changeLabel: "−۱۵٪", hollow: false },
    { year: 2025, price: 12921.9, changeLabel: null, hollow: false },
    { year: 2026, price: 11705.7, changeLabel: "−۹.۴٪", hollow: false },
  ],
  sameClassComparison: {
    categoryLabel: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)",
    ingredientCount: 20,
    priceLow: 107.5,
    priceHigh: 1072335,
  },

  calculationInfo: {
    method: "روش مقایسه اثربخشی داروی مشابه (نوع I)",
    comparatorDrug: { name: "ایبروتینیب", href: "/ingredient/ibrutinib" },
    priceAtListing: 15202.2,
    foreignAdjustment: "ندارد",
    listingDate: "۲۱ آوریل ۲۰۲۱",
    approvalClassification: "داروی حاوی ماده مؤثره جدید",
    sourceLabel:
      "مستندات چهارصد و هفتاد و هشتمین نشست عمومی شورای بیمه پزشکی اجتماعی مرکزی، «فهرست داروهای جدید» (وزارت بهداشت، کار و رفاه)",
  },

  askAI: {
    intro:
      'می‌توانید درباره روند قیمت دارو، نسخه‌های ژنریک و مبنای محاسبه «کپسول کالکنس ۱۰۰ میلی‌گرم» سؤال بپرسید. بر اساس پایگاه داده قیمت دارو (+۱۲٬۰۰۰ قلم)، استانداردهای محاسباتی R8 و مصوبات شورای چوئیکیو.',
    chips: [
      "چرا قیمت دارو به این شکل درآمد؟",
      "از آخرین بازنگری چند درصد کاهش داشته است؟",
      "داروهای مقایسه‌ای و مشابه در زمان محاسبه کدام‌ها بوده‌اند؟",
    ],
  },
  revisionHistory: [
    { date: "۲۰۲۶/۰۴", price: 11705.7, changePercent: -9.4, reason: "regular" },
    { date: "۲۰۲۵/۰۴", price: 12921.9, changePercent: 0, reason: "not-eligible" },
    { date: "۲۰۲۴/۰۴", price: 12921.9, changePercent: -15, reason: "market-expansion" },
    { date: "۲۰۲۳/۰۴", price: 15202.2, changePercent: 0, reason: "not-eligible" },
    { date: "۲۰۲۲/۰۴", price: 15202.2, changePercent: 0, reason: "none" },
  ],
  revisionHistoryMoreCount: 1,
  indications: "کپسول شماره ۱: لوسمی لنفوسیتی مزمن (شامل لنفوم لنفوسیتی کوچک)",
  genericProducts: [],
  genericProductsSummary: { current: 0, discontinued: 0 },
};

const drugRegistry: Record<string, DrugDetail> = {
  [alpinySuppositories100.slug]: alpinySuppositories100,
  [calkensCapsules100mg.slug]: calkensCapsules100mg,
};

export function getDrugBySlug(slug: string): DrugDetail | undefined {
  return drugRegistry[slug];
}
