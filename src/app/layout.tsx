import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "TaskFlow | Modern Project & Task Management",
  description: "Lightweight project management web app for teams and freelancers.",
  icons: {
    icon: [
      { url: "/icons/TaskFlowLogoIcon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icons/TaskFlowLogoIcon.svg",
    apple: "/icons/TaskFlowLogoIcon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} font-sans antialiased h-full`}>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
