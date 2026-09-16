// اجرا: npm run search:index
// PostgreSQL منبع حقیقت است؛ این اسکریپت داده‌ها را برای جستجوی سریع فارسی به Meilisearch منتقل می‌کند.

import { prisma } from "@/lib/db/prisma";
import { searchClient, DRUGS_INDEX } from "./client";

async function main() {
  const drugs = await prisma.drug.findMany({
    include: { ingredient: true, manufacturer: true, category: true },
  });

  const documents = drugs.map((d) => ({
    id: d.id,
    slug: d.slug,
    yjCode: d.yjCode,
    name: d.name,
    spec: d.spec,
    ingredientName: d.ingredient.name,
    manufacturerName: d.manufacturer.name,
    categoryName: d.category?.name ?? null,
    drugType: d.drugType,
  }));

  const index = searchClient.index(DRUGS_INDEX);

  await index.updateSettings({
    // امکان جستجو با نام دارو، ماده مؤثره یا کد YJ (طبق placeholder صفحه خانه)
    searchableAttributes: ["name", "ingredientName", "yjCode", "manufacturerName"],
    filterableAttributes: ["categoryName", "manufacturerName", "drugType"],
    sortableAttributes: ["name"],
    // بدون stop-words سفارشی فارسی؛ در صورت نیاز به تنظیم دقیق‌تر، از dictionary سفارشی استفاده کنید
  });

  const task = await index.addDocuments(documents, { primaryKey: "id" });
  console.log(`ایندکس شد: ${documents.length} دارو`, task);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
