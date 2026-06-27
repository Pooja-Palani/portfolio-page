import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pooja Palani — AI & Enterprise Platform Engineer",
  description:
    "AI Engineer and Enterprise Platform Engineer building intelligent systems for regulated enterprises. Specialising in AI reasoning models, data governance, and enterprise-scale architecture.",
  keywords: ["AI Engineer", "Enterprise Platform Engineer", "Data Quality", "Machine Learning", "Next.js"],
  authors: [{ name: "Pooja Palani" }],
  openGraph: {
    title: "Pooja Palani — AI & Enterprise Platform Engineer",
    description: "Building intelligent systems for regulated enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
