import type { Metadata } from "next";
import { roboto } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow | Next.js + Tailwind CSS + Roboto",
  description: "A clean, modern Next.js application crafted with Tailwind CSS and Google's Roboto font.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} font-sans antialiased h-full`}>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
