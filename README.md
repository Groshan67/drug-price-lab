# Drug-Price-Lab (roshan-lab)

نسخه فارسی و راست‌چین پلتفرم قیمت دارو — Next.js 14 + TypeScript + Tailwind + PostgreSQL (Prisma) + Meilisearch.

این نسخه شامل **پیاده‌سازی کامل صفحه خانه** (section1 تا section8) و **صفحه جزئیات دارو** (`/drug/[slug]`، معادل تصاویر D1–D5) با داده نمونه است. اسکیمای Prisma، اسکریپت seed و ایندکسِ Meilisearch هم آماده‌اند تا هر وقت خواستید این صفحات را از دیتابیس واقعی بخوانید (فعلاً `app/page.tsx` و `app/drug/[slug]/page.tsx` از `lib/data/mock.ts` و `lib/data/drug-detail.ts` می‌خوانند تا بدون نیاز به دیتابیس هم قابل اجرا باشند).

برای دیدن صفحه جزئیات دارو (نمودار روند قیمت تعاملی، فهرست ژنریک‌ها، تاریخچه بازنگری، ...) بعد از `npm run dev` به این آدرس بروید:
```
http://localhost:3000/drug/alpiny-suppositories-100
```

---

## ۱. پیش‌نیازها روی WSL2 Ubuntu

این دستورات را داخل ترمینال Ubuntu (WSL2) اجرا کنید، نه PowerShell ویندوز.

### الف) Node.js (از طریق nvm — توصیه‌شده)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v   # باید v20.x باشد
```

### ب) PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start

# ساخت یوزر و دیتابیس پروژه
sudo -u postgres psql -c "CREATE USER yakka_user WITH PASSWORD 'yakka_pass';"
sudo -u postgres psql -c "CREATE DATABASE yakka_fa OWNER yakka_user;"
```

> نکته WSL2: سرویس postgresql با ری‌استارت ویندوز خاموش می‌شود. هر بار قبل از کار:
> `sudo service postgresql start`
> اگر می‌خواهید خودکار بالا بیاید، این خط را به `~/.bashrc` اضافه کنید:
> `sudo service postgresql status > /dev/null || sudo service postgresql start`

### ج) Meilisearch

```bash
curl -L https://install.meilisearch.com | sh
# باینری meilisearch در همین پوشه ساخته می‌شود؛ آن را قابل اجرا از هرجا کنید:
sudo mv ./meilisearch /usr/local/bin/

# اجرا (در یک ترمینال جدا، یا با systemd/pm2 به‌صورت دائمی)
meilisearch --master-key="masterKeyChangeMe"
```

Meilisearch روی `http://127.0.0.1:7700` بالا می‌آید.

---

## ۲. نصب پروژه

```bash
cd yakka-fa
npm install

cp .env.example .env
# در صورت نیاز مقادیر DATABASE_URL / MEILISEARCH_* را داخل .env اصلاح کنید
```

## ۳. راه‌اندازی دیتابیس

```bash
npm run prisma:migrate      # ساخت جدول‌ها روی PostgreSQL (اولین بار --name init می‌پرسد)
npm run seed                # پر کردن چند رکورد نمونه (شیاف آلپینی و ژنریک‌های آن)
npm run search:index        # انتقال داده‌ها به Meilisearch برای جستجوی سریع
```

## ۴. اجرا در حالت توسعه

```bash
npm run dev
```

سپس در مرورگر ویندوز به آدرس زیر بروید (WSL2 فوروارد `localhost` را خودکار انجام می‌دهد):

```
http://localhost:3000
```

---

## ساختار پروژه

```
app/
  layout.tsx        → فونت Vazirmatn + dir="rtl"
  page.tsx           → صفحه خانه (اسمبل تمام section ها)
  globals.css
app/
  drug/[slug]/page.tsx → صفحه جزئیات دارو (معادل D1–D5)
components/
  layout/            → Sidebar، MobileHeader، Footer (section8)
  home/               → SearchHero(1)، Highlights(2)، Rankings(3)،
                         EntryGrid(4و5)، CategoryGrid(6)، IngredientTags(7)
  drug/               → کارت‌های صفحه دارو:
                         DrugHeaderCard، PriceOverviewCard، FutureOutlookCard،
                         OutOfPocketCard، LowestGenericBanner، IngredientOverviewCard،
                         PriceTrendChart (نمودار تعاملی Recharts)، GenericProductsTable،
                         RevisionHistoryTable، IndicationsCard، GenericSwitchCard،
                         AskAICard، ShareBar (کپی/اشتراک‌گذاری با کلیپ‌بورد واقعی)
  ui/                 → IconBadge و اجزای کوچک مشترک
lib/
  data/mock.ts         → داده نمونه صفحه خانه (جایگزین با کوئری Prisma)
  data/drug-detail.ts → داده نمونه صفحه دارو + تابع getDrugBySlug (جایگزین با prisma.drug.findUnique)
  db/prisma.ts         → Prisma client singleton
  search/               → کلاینت Meilisearch + اسکریپت ایندکس‌گذاری
prisma/
  schema.prisma      → مدل Drug / Ingredient / Manufacturer / Category / PriceRevision
  seed.ts
```

## گام بعدی پیشنهادی

1. جایگزینی `lib/data/mock.ts` و `lib/data/drug-detail.ts` با کوئری‌های واقعی Prisma (`prisma.drug.findMany` / `findUnique`) — از جمله در `getDrugBySlug` که باید async شود و مستقیماً از دیتابیس بخواند
2. اتصال جعبه جستجوی `SearchHero` به Meilisearch از طریق یک Route Handler (`app/api/search/route.ts`)
3. صفحات `/search/*`، `/category/[slug]`، `/ingredient/[slug]`، `/company/[slug]` که در ناوبری Sidebar و لینک‌های صفحه دارو استفاده شده‌اند
4. پیاده‌سازی Watchlist سمت کلاینت (Zustand + localStorage طبق spec) و اتصال دکمه «افزودن به لیست پیگیری»

---

## اسکیمای دیتابیس بر اساس داده واقعی endpoint ها

`prisma/schema.prisma` بازنویسی شد تا دقیقاً با ساختار پاسخ‌های واقعی API مرجع (فایل
`lab-endpoint.txt` که ارسال کردید) هم‌خوان باشد. تصمیم‌های کلیدی طراحی:

- **`Drug`** حالا فیلدهای واقعی مثل `drugType` (先発品/後発品)، `route` (内用薬/外用薬/注射薬)،
  `hasGeAlt`، `narcotic`، `gracePeriod`، `fusansanDates`، `pmpSummary`, `pmpHistory`, `outlook`
  و `touitsuCurrent`/`touitsuMembers` (گروه‌بندی نام یکپارچه) را دارد.
- **`PriceRevision`** حالا `reasonMechanism`, `reasonCitation`, `midyear*`, `pmp*`, `touitsu*`
  را هم پوشش می‌دهد — دقیقاً معادل `/api/drugs/{yj_code}/price-history`.
- **`MarketRevision`** مدل جدید — عکس لحظه‌ای هر رویداد بازنگری کل بازار (`/api/revision/{date}`)
  با `karte` (مکانیزم‌های اعمال‌شده) و `topDecreases`/`topIncreases` به‌صورت Json.
- **`Insight`** برای بخش «مطالعه» (`/api/insights`).
- **`SimulationRun`** — چون `/api/simulation/existing` یک موتور قوانین ~۸۸ فیلدی و ۲۰ بخشی
  (فصل ۳ کامل مقررات قیمت‌گذاری) است، به‌جای مدل‌سازی رابطه‌ای کامل، ورودی/خروجی هر اجرا به‌صورت
  Json کامل ذخیره می‌شود. **منطق محاسبه این موتور یک تسک مجزا و بزرگ است** که باید در فاز بعدی
  به‌صورت یک ماژول جدا (`lib/simulation-engine/`) پیاده‌سازی شود — نه بخشی از مدل‌سازی دیتابیس.
- **`Manufacturer`** آمار تجمعی (`brand_count`, `generic_count`, ...) را ذخیره نمی‌کند تا هرگز
  desync نشود؛ این‌ها باید با `prisma.drug.groupBy` محاسبه شوند (کامنت‌های داخل schema را ببینید).
- فیلدهای `nameFa` روی `Drug`, `Ingredient`, `Manufacturer`, `Category` برای ترجمه فارسی نمایشی
  اضافه شده (چون نام‌های اصلی داده رسمی ژاپنی‌اند و نباید تغییر کنند).

`prisma/seed.ts` بازنویسی شد و حالا از **نمونه‌های واقعی** همان فایل استفاده می‌کند: لینزس،
منکوادفی، سِتاپریل، ۶ دوز مانجارو (چیلزپاتید) با کاهش قیمت واقعی بازنگری ۲۰۲۶/۰۸، آمووترا،
آلپینی + آنهیبا (ژنریک واقعی‌اش طبق `/api/drugs/1141700J2092/generics`)، کالکنس و آکوگو —
به‌همراه خود رکورد `MarketRevision` بازنگری ۲۰۲۶/۰۸ و یک `Insight` نمونه.

`lib/types/api.ts` هم اضافه شد: تایپ TypeScript دقیق برای هر ۲۲ پاسخ endpoint (با نام فیلدهای
snake_case اصلی) — مرجع آماده برای پیاده‌سازی Route Handler های خودمان در فاز بعدی.

> نکته: کدهای UI فعلی (`app/page.tsx`, `app/drug/[slug]/page.tsx`) هنوز از `lib/data/mock.ts` و
> `lib/data/drug-detail.ts` می‌خوانند که عمداً از تایپ‌های Prisma جدا هستند — پس این تغییر schema
> چیزی را در صفحات فعلی خراب نمی‌کند. وصل‌کردن UI به دیتابیس واقعی، تسک بعدی صریح است.
