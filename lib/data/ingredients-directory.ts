// داده نمونه صفحه «جستجو بر اساس مواد مؤثره» — معادل yakkalab.jp/ingredient/
// بعداً با prisma.ingredient.findMany + groupBy روی Drug جایگزین می‌شود.

export type IngredientEntry = {
  name: string; // نام ماده مؤثره به فارسی
  slug: string;
  letter: string; // حرف الفبای فارسی برای گروه‌بندی (آ به‌جای ا برای الف‌های همزه‌دار)
  drugCount: number; // تعداد اقلام فهرست‌شده حاوی این ماده مؤثره
};

// ترتیب استاندارد الفبای فارسی برای نوار حروف
export const persianAlphabet = [
  "آ", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ذ", "ر", "ز", "ژ",
  "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", "م",
  "ن", "و", "ه", "ی",
];

export const ingredientDirectory: IngredientEntry[] = [
  { name: "آملودیپین بزیلات", slug: "amlodipine-besylate", letter: "آ", drugCount: 10 },
  { name: "آکالابروتینیب", slug: "acalabrutinib", letter: "آ", drugCount: 2 },
  { name: "آملودیپین", slug: "amlodipine", letter: "آ", drugCount: 2 },
  { name: "آتورواستاتین", slug: "atorvastatin", letter: "آ", drugCount: 23 },
  { name: "آسپرین", slug: "aspirin", letter: "آ", drugCount: 6 },
  { name: "آسیکلوویر", slug: "acyclovir", letter: "آ", drugCount: 24 },
  { name: "آزیترومایسین", slug: "azithromycin", letter: "آ", drugCount: 14 },
  { name: "آلوپورینول", slug: "allopurinol", letter: "آ", drugCount: 3 },
  { name: "آلبندازول", slug: "albendazole", letter: "آ", drugCount: 2 },

  { name: "استامینوفن", slug: "acetaminophen", letter: "ا", drugCount: 34 },
  { name: "اسکوربیک اسید (ویتامین C)", slug: "ascorbic-acid", letter: "ا", drugCount: 12 },
  { name: "اسپیرونولاکتون", slug: "spironolactone", letter: "ا", drugCount: 5 },
  { name: "الندرونات سدیم", slug: "alendronate-sodium", letter: "ا", drugCount: 2 },
  { name: "انسولین گلارژین", slug: "insulin-glargine", letter: "ا", drugCount: 4 },
  { name: "انسولین اسپارت", slug: "insulin-aspart", letter: "ا", drugCount: 2 },
  { name: "ایبوپروفن", slug: "ibuprofen", letter: "ا", drugCount: 8 },

  { name: "بوپروپیون", slug: "bupropion", letter: "ب", drugCount: 3 },
  { name: "بیزوپرولول", slug: "bisoprolol", letter: "ب", drugCount: 6 },
  { name: "بودزوناید", slug: "budesonide", letter: "ب", drugCount: 4 },

  { name: "پردنیزولون", slug: "prednisolone", letter: "پ", drugCount: 7 },
  { name: "پنتوپرازول", slug: "pantoprazole", letter: "پ", drugCount: 9 },
  { name: "پاراستامول کدئین", slug: "paracetamol-codeine", letter: "پ", drugCount: 1 },

  { name: "تامسولوسین هیدروکلراید", slug: "tamsulosin", letter: "ت", drugCount: 4 },
  { name: "تری‌آمترن", slug: "triamterene", letter: "ت", drugCount: 1 },
  { name: "ترامادول", slug: "tramadol", letter: "ت", drugCount: 5 },
  { name: "تیرزپاتید", slug: "tirzepatide", letter: "ت", drugCount: 6 },

  { name: "ریواروکسابان", slug: "rivaroxaban", letter: "ر", drugCount: 3 },
  { name: "روزوواستاتین", slug: "rosuvastatin", letter: "ر", drugCount: 11 },
  { name: "رامیپریل", slug: "ramipril", letter: "ر", drugCount: 6 },

  { name: "زولپیدم تارتارات", slug: "zolpidem-tartrate", letter: "ز", drugCount: 2 },

  { name: "سفالکسین", slug: "cephalexin", letter: "س", drugCount: 5 },
  { name: "سیتالوپرام", slug: "citalopram", letter: "س", drugCount: 3 },
  { name: "سیپروفلوکساسین", slug: "ciprofloxacin", letter: "س", drugCount: 7 },

  { name: "شربت آهن (پلی مالتوز)", slug: "iron-polymaltose", letter: "ش", drugCount: 1 },

  { name: "فاموتیدین", slug: "famotidine", letter: "ف", drugCount: 2 },
  { name: "فروس سولفات", slug: "ferrous-sulfate", letter: "ف", drugCount: 3 },

  { name: "قرص آهن فولیک", slug: "iron-folic-acid", letter: "ق", drugCount: 1 },

  { name: "کلوپیدوگرل", slug: "clopidogrel", letter: "ک", drugCount: 9 },
  { name: "کاربامازپین", slug: "carbamazepine", letter: "ک", drugCount: 4 },
  { name: "کتوکونازول", slug: "ketoconazole", letter: "ک", drugCount: 2 },

  { name: "گلی‌بن‌کلامید", slug: "glibenclamide", letter: "گ", drugCount: 3 },
  { name: "گاباپنتین", slug: "gabapentin", letter: "گ", drugCount: 6 },

  { name: "لوزارتان پتاسیم", slug: "losartan-potassium", letter: "ل", drugCount: 13 },
  { name: "لوراتادین", slug: "loratadine", letter: "ل", drugCount: 5 },
  { name: "لوکسوپروفن", slug: "loxoprofen", letter: "ل", drugCount: 2 },
  { name: "لینزولید", slug: "linezolid", letter: "ل", drugCount: 2 },

  { name: "متفورمین هیدروکلراید", slug: "metformin", letter: "م", drugCount: 46 },
  { name: "مونته‌لوکاست", slug: "montelukast", letter: "م", drugCount: 3 },
  { name: "متوپرولول تارتارات", slug: "metoprolol-tartrate", letter: "م", drugCount: 5 },

  { name: "ناپروکسن", slug: "naproxen", letter: "ن", drugCount: 2 },
  { name: "نیفدیپین", slug: "nifedipine", letter: "ن", drugCount: 4 },

  { name: "والزارتان", slug: "valsartan", letter: "و", drugCount: 8 },

  { name: "هیدروکلروتیازید", slug: "hydrochlorothiazide", letter: "ه", drugCount: 7 },

  { name: "یدید پتاسیم", slug: "potassium-iodide", letter: "ی", drugCount: 1 },
];

export function ingredientsForLetter(letter: string): IngredientEntry[] {
  return ingredientDirectory
    .filter((i) => i.letter === letter)
    .sort((a, b) => a.name.localeCompare(b.name, "fa"));
}

export function letterCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const i of ingredientDirectory) {
    counts[i.letter] = (counts[i.letter] ?? 0) + 1;
  }
  return counts;
}

export const totalIngredientsCount = 2641; // طبق آمار کل پایگاه داده (نه صرفاً نمونه‌های فعلی)
