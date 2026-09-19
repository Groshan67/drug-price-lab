// داده «همه دسته‌بندی‌ها» برای مودال انتخاب طبقه‌بندی اثر دارویی — معادل c1.jpg

export type CategoryChip = { label: string; slug: string };
export type CategoryGroup = { title: string; slug: string; items: CategoryChip[] };

export const categoryGroups: CategoryGroup[] = [
  {
    title: "دستگاه گردش خون",
    slug: "circulatory-system",
    items: [
      { label: "مهارکننده‌های ACE", slug: "ace-inhibitors" },
      { label: "گشادکننده‌های عروق کرونر (مسدودکننده‌های کانال کلسیم، نیترات‌ها)", slug: "coronary-vasodilators" },
      { label: "داروهای ضد فشار خون (شامل ARB، بتابلوکر و ترکیبی)", slug: "antihypertensive-drugs" },
      { label: "داروهای درمان چربی خون بالا", slug: "hyperlipidemia-drugs" },
      { label: "داروهای ضدآریتمی", slug: "antiarrhythmic-drugs" },
      { label: "دیورتیک‌ها", slug: "diuretics" },
      { label: "داروهای تقویت‌کننده قلب", slug: "cardiotonic-drugs" },
      { label: "داروهای بهبود فشار خون ریوی و گردش خون محیطی", slug: "pulmonary-hypertension-drugs" },
      { label: "ضدانعقادها", slug: "anticoagulants" },
    ],
  },
  {
    title: "متابولیسم / غدد درون‌ریز",
    slug: "metabolism-endocrine",
    items: [
      { label: "داروهای دیابت (SGLT2، DPP-4، α-GI و غیره)", slug: "diabetes-medications" },
      { label: "فرآورده‌های انسولین", slug: "insulin-preparations" },
      { label: "داروهای کاهنده قند خون نوع SU", slug: "su-blood-glucose-drugs" },
      { label: "داروهای تیروئید", slug: "thyroid-medication" },
      { label: "هورمون‌های قشر آدرنال (استروئیدها)", slug: "adrenocortical-hormones" },
      { label: "داروهای متابولیک و ایمونولوژیک (پوکی استخوان، آرتریت روماتوئید و غیره)", slug: "metabolic-immunological-drugs" },
      { label: "داروی هیپراوریسمی", slug: "hyperuricemia-medication" },
    ],
  },
  {
    title: "دستگاه گوارش",
    slug: "digestive-system",
    items: [
      { label: "PPI و محافظ‌های مخاط معده", slug: "ppi-gastric-protectants" },
      { label: "مسدودکننده‌های H2", slug: "h2-blockers" },
      { label: "ضداستفراغ‌ها (آنتاگونیست‌های 5-HT3 و غیره)", slug: "antiemetics" },
      { label: "ملین‌ها", slug: "laxatives" },
      { label: "داروی یبوست مزمن", slug: "chronic-constipation-treatment" },
      { label: "داروهای گوارشی (بهبود حرکت، درمان IBD و غیره)", slug: "gastrointestinal-drugs" },
    ],
  },
  {
    title: "دستگاه تنفسی",
    slug: "respiratory-system",
    items: [
      { label: "داروهای آسم و COPD", slug: "asthma-copd-medications" },
      { label: "ضدسرفه و خلط‌آور", slug: "antitussives-expectorants" },
      { label: "داروی رینیت آلرژیک", slug: "allergic-rhinitis-medication" },
    ],
  },
  {
    title: "اعصاب / روان‌پزشکی",
    slug: "neuropsychiatric",
    items: [
      { label: "ضدافسردگی‌ها (SSRI، SNRI و غیره)", slug: "antidepressants" },
      { label: "ضدروان‌پریشی‌ها", slug: "antipsychotics" },
      { label: "ضداضطراب و خواب‌آورها", slug: "anxiolytics-hypnotics" },
      { label: "ضدتشنج‌ها", slug: "antiepileptic-drugs" },
      { label: "داروهای ضد زوال عقل", slug: "anti-dementia-drugs" },
    ],
  },
  {
    title: "عفونت / ضدمیکروبی",
    slug: "infection-antimicrobial",
    items: [
      { label: "آنتی‌بیوتیک‌های سفالوسپورین", slug: "cephalosporin-antibiotics" },
      { label: "آنتی‌بیوتیک‌های پنی‌سیلین", slug: "penicillin-antibiotics" },
      { label: "آنتی‌بیوتیک‌های ماکرولید", slug: "macrolide-antibiotics" },
      { label: "داروهای ضدویروس", slug: "antiviral-drugs" },
      { label: "داروهای ضدقارچ", slug: "antifungal-drugs" },
    ],
  },
  {
    title: "سرطان و روماتیسم",
    slug: "oncology-rheumatology",
    items: [
      { label: "داروهای ضدسرطان (شامل داروهای هدف مولکولی)", slug: "anticancer-molecular-targeted" },
      { label: "داروهای ضد روماتیسم و سرکوب‌کننده ایمنی", slug: "antirheumatic-immunosuppressive" },
    ],
  },
];
