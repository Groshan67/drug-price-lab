"use client";

import { X, Mail, Github, Info } from "lucide-react";

function SectionTitle({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <p className={`text-xs font-bold ${tone} mb-2 pb-1.5 border-b border-line`}>{children}</p>
  );
}

export default function AboutServiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center bg-ink/35 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl2 bg-card shadow-cardHover my-8 sm:my-0 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0">
          <h2 className="text-sm font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
              <Info className="h-3.5 w-3.5" />
            </span>
            درباره این سرویس
          </h2>
          <button onClick={onClose} className="text-ink-faint hover:text-ink transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pb-4 space-y-5 text-sm overflow-y-auto">
          <section>
            <SectionTitle tone="text-brand">معرفی سرویس</SectionTitle>
            <p className="text-ink-soft leading-6">
              <span className="font-bold text-ink">RxPrice Lab</span> یک پایگاه داده رایگان قیمت دارو است که به
              داروسازان، متخصصان سلامت و شرکت‌های دارویی امکان می‌دهد اطلاعات قیمت دارو را به‌سرعت و به‌راحتی پیدا
              کنند.
            </p>
            <ul className="mt-2 space-y-1 text-ink-soft list-disc pr-4 leading-6">
              <li>جستجوی قیمت دارو بر اساس نام دارو، نام ماده مؤثره و کد IRC</li>
              <li>فهرست محصولات ژنریک و مقایسه قیمت</li>
              <li>نمودار روند قیمت دارو از ۱۳۹۵ تا ۱۴۰۵</li>
              <li>مقایسه داروهای مشابه با اثرات یکسان</li>
              <li>برآورد هزینه ماهانه دارو</li>
            </ul>
          </section>

          <section>
            <SectionTitle tone="text-emerald">منبع داده</SectionTitle>
            <p className="text-ink-soft leading-6">
              داده‌های قیمت دارو منتشرشده در این سرویس بر اساس منابع رسمی زیر است.
            </p>
            <ul className="mt-2 space-y-1 text-ink-soft leading-6">
              <li>
                <a href="#" className="text-brand hover:underline">
                  فهرست کدهای دارویی فهرست‌شده در استاندارد قیمت دارو (وزارت بهداشت، کار و رفاه)
                </a>
              </li>
              <li>
                دوره به‌روزرسانی: فروردین ۱۳۹۵ تا اردیبهشت ۱۴۰۵ (نسخه اردیبهشت ۱۴۰۵ شامل جدیدترین نسخه به‌همراه
                افزودن بیوسیمیلارها خواهد بود)
              </li>
            </ul>
            <p className="mt-2 text-ink-soft">
              آخرین به‌روزرسانی: <span className="font-bold text-ink">۱۵ شهریور ۱۴۰۵</span>
            </p>
          </section>

          <section>
            <SectionTitle tone="text-brand">تیم توسعه</SectionTitle>
            <p className="text-ink-soft leading-6">
              این سرویس به‌طور مستقل توسط تیم توسعه Roshan و Fahami و Farnia، که در یک شرکت حوزه سلامت فعالیت
              می‌کنند، توسعه و اداره می‌شود. این سرویس از آذر ۱۴۰۶ در دسترس است تا متخصصان سلامت و پژوهشگران
              بیشتری بتوانند از اطلاعات قیمت دارو استفاده کنند.
            </p>
            <a href="#" className="inline-block mt-1 text-brand hover:underline">
              مشاهده صفحه اطلاعات تیم توسعه ←
            </a>
          </section>

          <section>
            <SectionTitle tone="text-gold">سلب مسئولیت</SectionTitle>
            <p className="text-ink-soft leading-6">این سرویس صرفاً جنبه اطلاع‌رسانی دارد. لطفاً به موارد زیر توجه کنید:</p>
            <ul className="mt-2 space-y-1 text-ink-soft list-disc pr-4 leading-6">
              <li>ما کامل‌بودن، دقت یا به‌روز بودن اطلاعات ارائه‌شده را تضمین نمی‌کنیم.</li>
              <li>
                برای تصمیمات واقعی نسخه‌نویسی، توزیع یا خرید دارو، همیشه از استانداردهای رسمی قیمت دارو و
                دستورالعمل‌های متخصص سلامت پیروی کنید.
              </li>
              <li>ارائه‌دهنده سرویس مسئولیتی در قبال خسارات ناشی از استفاده از این سرویس نمی‌پذیرد.</li>
              <li>بسته به زمان بازنگری، داده‌ها ممکن است با آخرین قیمت دارو متفاوت باشد.</li>
            </ul>
          </section>

          <section>
            <SectionTitle tone="text-ink-soft">تماس با ما</SectionTitle>
            <p className="text-ink-soft leading-6">
              لطفاً بازخورد، اصلاح خطاهای داده و درخواست ویژگی‌های خود را از طریق ایمیل یا GitHub Issues ارسال کنید.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand text-white px-3 py-2 text-xs font-medium hover:bg-brand-dark transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                تماس از طریق ایمیل
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink text-white px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <Github className="h-3.5 w-3.5" />
                باز کردن GitHub Issues
              </a>
            </div>
          </section>
        </div>

        <div className="flex justify-end px-5 py-4 border-t border-line shrink-0">
          <button
            onClick={onClose}
            className="rounded-lg bg-brand text-white px-4 py-2 text-xs font-medium hover:bg-brand-dark transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
