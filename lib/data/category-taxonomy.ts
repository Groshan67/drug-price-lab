// طبقه‌بندی کامل دسته‌های اثر دارویی، گروه‌بندی‌شده بر اساس سیستم بدن — معادل c1.jpg

export type CategoryTaxonomyItem = { name: string; slug: string };
export type CategorySystemGroup = { system: string; categories: CategoryTaxonomyItem[] };

export const categoryTaxonomy: CategorySystemGroup[] = [
  {
    system: "سیستم گردش خون",
    categories: [
      { name: "مهارکننده‌های ACE", slug: "ace-inhibitors" },
      { name: "گشادکننده‌های عروق کرونر (مسدودکننده‌های کانال کلسیم، نیترات‌ها)", slug: "coronary-vasodilators" },
      {
        name: "داروهای ضد فشار خون (شامل ARB، بتابلوکر و داروهای ترکیبی)",
        slug: "antihypertensive-drugs",
      },
      { name: "داروهای درمان چربی خون بالا", slug: "hyperlipidemia-treatment" },
      { name: "داروهای ضد آریتمی", slug: "antiarrhythmic-drugs" },
      { name: "دیورتیک‌ها (ادرارآورها)", slug: "diuretics" },
      { name: "داروهای تقویت‌کننده قلب", slug: "cardiotonic-drugs" },
      { name: "داروهای فشار خون ریوی و بهبود گردش خون محیطی", slug: "pulmonary-hypertension" },
      { name: "ضدانعقادها", slug: "anticoagulants" },
    ],
  },
  {
    system: "متابولیسم / غدد درون‌ریز",
    categories: [
      { name: "داروهای دیابت (SGLT2، DPP-4، α-GI و غیره)", slug: "diabetes-medications" },
      { name: "فرآورده‌های انسولین", slug: "insulin-preparations" },
      { name: "داروهای کاهنده قند خون نوع سولفونیل‌اوره (SU)", slug: "su-blood-glucose-drugs" },
      { name: "داروهای تیروئید", slug: "thyroid-medication" },
      { name: "هورمون‌های قشر آدرنال (استروئیدها)", slug: "adrenocortical-hormones" },
      {
        name: "داروهای بیماری‌های متابولیک و ایمونولوژیک (پوکی استخوان، آرتریت روماتوئید و غیره)",
        slug: "metabolic-immunological-drugs",
      },
      { name: "داروهای اسید اوریک بالا", slug: "hyperuricemia-medication" },
    ],
  },
  {
    system: "دستگاه گوارش",
    categories: [
      { name: "PPI و محافظ‌های مخاط معده", slug: "ppi-gastric-protectants" },
      { name: "مسدودکننده H2", slug: "h2-blocker" },
      { name: "ضدتهوع‌ها (آنتاگونیست‌های 5-HT3 و غیره)", slug: "antiemetics" },
      { name: "ملین‌ها", slug: "laxatives" },
      { name: "داروهای درمان یبوست مزمن", slug: "chronic-constipation-treatment" },
      { name: "داروهای گوارشی (بهبود حرکت، درمان IBD و غیره)", slug: "gastrointestinal-drugs" },
    ],
  },
  {
    system: "دستگاه تنفس",
    categories: [
      { name: "داروهای آسم و COPD", slug: "asthma-copd-medications" },
      { name: "ضدسرفه و خلط‌آور", slug: "antitussives-expectorants" },
      { name: "آنتی‌هیستامین‌ها", slug: "antihistamines" },
    ],
  },
  {
    system: "عصبی-روانی",
    categories: [
      { name: "داروهای ضدافسردگی", slug: "antidepressants" },
      { name: "داروهای ضداضطراب و خواب‌آور", slug: "anxiolytics-hypnotics" },
      { name: "داروهای ضدروان‌پریشی", slug: "antipsychotics" },
      { name: "داروهای پارکینسون و آلزایمر", slug: "parkinsons-alzheimers-drugs" },
    ],
  },
  {
    system: "عفونت / آنتی‌بیوتیک",
    categories: [
      { name: "آنتی‌بیوتیک سفالوسپورین", slug: "cephalosporin-antibiotics" },
      { name: "پنی‌سیلین‌ها", slug: "penicillins" },
      { name: "ماکرولیدها و کینولون‌ها", slug: "macrolides-quinolones" },
    ],
  },
  {
    system: "انکولوژی",
    categories: [
      { name: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)", slug: "anticancer-molecular-targeted" },
      { name: "داروهای ایمونوتراپی سرطان", slug: "cancer-immunotherapy" },
    ],
  },
];
