import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const dmSans = Noto_Kufi_Arabic({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "د. ناصر فرحات - إستشاري أول نساء وتوليد والحقن المجهري والمناظير",
  description: "د. ناصر فرحات، إستشاري أول أمراض النساء والتوليد والحقن المجهري والمناظير، يقدم حلولًا متقدمة في الرعاية الطبية باستخدام تقنيات الذكاء الاصطناعي لتحسين نتائج صحة الأم والجنين.",
  keywords: "د. ناصر فرحات, إستشاري نساء وتوليد, الحقن المجهري, المناظير, صحة الأم, الحمل, التوليد, الذكاء الاصطناعي, AI solutions in healthcare",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  author: "د. ناصر فرحات",
  openGraph: {
    title: "د. ناصر فرحات - إستشاري أول نساء وتوليد والحقن المجهري والمناظير",
    description: "تعرف على الرعاية الطبية المتطورة مع د. ناصر فرحات، إستشاري أمراض النساء والتوليد.",
    url: "https://www.drnasserfarahat.com",
    type: "website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={clsx(dmSans.className, "antialiased bg-[#ffffff]")}>
        {children}
      </body>
    </html>
  );
}
