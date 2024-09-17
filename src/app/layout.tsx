import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const dmSans = Noto_Kufi_Arabic({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Nasser Farahat",
  
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
