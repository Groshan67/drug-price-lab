import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RxPrice Lab | قیمت دارو، مقایسه ژنریک و روند بازنگری",
  description:
    "پایگاه داده رایگان و فارسی قیمت دارو — جستجوی سریع دارو، مقایسه محصولات ژنریک، نمودار روند قیمت و شبیه‌سازی هزینه.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body>{children}</body>
    </html>
  );
}
