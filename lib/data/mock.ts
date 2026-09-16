// داده‌های نمونه صفحه خانه — بعداً با کوئری‌های Prisma/PostgreSQL جایگزین می‌شود.

export const siteStats = {
  totalItems: 12315,
  lastUpdated: "۱۵ آوریل ۲۰۲۶",
};

export const highlights = [
  {
    icon: "calendar",
    tone: "brand" as const,
    value: "۲۰۲۶.۰۴",
    label: "آخرین بازنگری قیمت دارو",
    sub: "در حال اعمال",
    href: "/calendar",
  },
  {
    icon: "sparkles",
    tone: "emerald" as const,
    value: "۷۲۶ قلم",
    label: "واجد شرایط افزودن ایجاد داروی جدید",
    sub: "اقلام نگهداری / غیرنگهداری",
    href: "/screener?flag=new-drug-addition",
  },
  {
    icon: "file-clock",
    tone: "gold" as const,
    value: "۴۰۴ قلم",
    label: "اقدامات انتقالی لازم",
    sub: "تا پایان مارس ۲۰۲۷",
    href: "/screener?flag=transitional",
  },
];

export const topDrugs = [
  {
    rank: 1,
    name: "آمپول زیرجلدی مانجارو ۲.۵ میلی‌گرم",
    sub: "تیرزپاتید / محصول اصلی",
    price: 1443,
    href: "/drug/manjaro-2-5",
  },
  {
    rank: 2,
    name: "پودر استنشاقی ایناویر ۲۰ میلی‌گرم",
    sub: "لانینامیویر اکتانوات هیدرات / محصول اصلی",
    price: 1484.9,
    href: "/drug/inavir-20",
  },
  {
    rank: 3,
    name: "قرص جاردیانس ۱۰ میلی‌گرم",
    sub: "امپاگلیفلوزین / محصول اصلی",
    price: 166,
    href: "/drug/jardiance-10",
  },
  {
    rank: 4,
    name: "آمپول اِن‌هارتس ۱۰۰ میلی‌گرم",
    sub: "تراستوزوماب دروکستکان (اصلاح‌شده ژنتیکی) / محصول اصلی",
    price: 192652,
    href: "/drug/enhertu-100",
  },
];

export const topManufacturers = [
  { rank: 1, name: "ایلای‌لیلی ژاپن", href: "/company/eli-lilly-japan" },
  { rank: 2, name: "دایی‌چی‌ساینکو", href: "/company/daiichi-sankyo" },
  { rank: 3, name: "فایزر", href: "/company/pfizer" },
  { rank: 4, name: "نوارتیس فارما", href: "/company/novartis-pharma" },
];

export const searchEntries = [
  {
    icon: "flask-conical",
    tone: "brand" as const,
    title: "جستجو بر اساس مواد مؤثره",
    desc: "مقایسه متقاطع پیشگامان و رقبای دیرآمده با ماده مؤثره یکسان",
    cta: "مشاهده فهرست",
    href: "/search/ingredients",
  },
  {
    icon: "layout-grid",
    tone: "plum" as const,
    title: "جستجو بر اساس طبقه‌بندی اثر دارویی",
    desc: "جستجو بر اساس دسته، مانند داروهای دیابت و ضدسرطان",
    cta: "مشاهده دسته‌بندی",
    href: "/search/category",
  },
  {
    icon: "building-2",
    tone: "brand" as const,
    title: "جستجو بر اساس سازنده",
    desc: "مشاهده اقلام فهرست‌شده و قیمت دارو بر اساس شرکت دارویی",
    cta: "مشاهده فهرست",
    href: "/search/manufacturer",
  },
];

export const toolEntries = [
  {
    icon: "clipboard-list",
    tone: "emerald" as const,
    title: "شبیه‌سازی قیمت دارو",
    desc: "پیش‌بینی روند قیمت دارو تا ۱۰ سال آینده بر اساس استانداردهای محاسباتی",
    cta: "برآورد کن",
    href: "/simulation",
  },
  {
    icon: "calendar-days",
    tone: "brand" as const,
    title: "تقویم بازنگری قیمت دارو",
    desc: "برنامه سالانه و تاریخچه بازنگری شامل تأیید، فهرست‌بندی و اصلاح",
    cta: "مشاهده تقویم",
    href: "/calendar",
  },
  {
    icon: "archive",
    tone: "emerald" as const,
    title: "آرشیو بازنگری قیمت دارو",
    desc: "فهرست کاهش قیمت، داروهای تازه‌فهرست‌شده و متوقف‌شده در بازنگری‌های پیشین",
    cta: "مشاهده آرشیو",
    href: "/archive",
  },
];

export const categoryCards = [
  { title: "داروهای دیابت", href: "/category/diabetes" },
  { title: "داروهای ضد فشار خون (ARB و غیره)", href: "/category/antihypertensive" },
  { title: "داروهای عصبی-روانی", href: "/category/neuropsychiatric" },
  { title: "داروهای آسم و COPD", href: "/category/asthma-copd" },
  { title: "آنتی‌بیوتیک سفالوسپورین", href: "/category/cephalosporin" },
  { title: "داروهای ضدسرطان", href: "/category/anticancer" },
  { title: "داروهای ضد روماتیسم و سرکوب‌کننده ایمنی", href: "/category/antirheumatic" },
  { title: "PPI و داروهای زخم معده", href: "/category/ppi-ulcer" },
];

export const keyIngredients = [
  { name: "آملودیپین بزیلات", href: "/ingredient/amlodipine-besylate" },
  { name: "لوکسوپروفن", href: "/ingredient/loxoprofen" },
  { name: "متفورمین هیدروکلراید", href: "/ingredient/metformin" },
  { name: "آتورواستاتین", href: "/ingredient/atorvastatin" },
  { name: "اس‌امپرازول", href: "/ingredient/esomeprazole" },
  { name: "لانسوپرازول", href: "/ingredient/lansoprazole" },
  { name: "کاربزیلول", href: "/ingredient/carvedilol" },
  { name: "کلوپیدوگرل", href: "/ingredient/clopidogrel" },
  { name: "کاناگلیفلوزین", href: "/ingredient/canagliflozin" },
  { name: "دولاگلوتید", href: "/ingredient/dulaglutide" },
  { name: "لنالیدوماید", href: "/ingredient/lenalidomide" },
  { name: "دونپزیل هیدروکلراید", href: "/ingredient/donepezil" },
];

export const searchExamples = [
  { label: "آملودیپین", hint: "نام ماده مؤثره" },
  { label: "نورواسک", hint: "نام محصول" },
  { label: "1140010F1024", hint: "کد YJ" },
];
