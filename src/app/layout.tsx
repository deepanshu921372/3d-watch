import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MERIDIAN — The Art of Horology",
  description:
    "A skeletonized rose-gold tourbillon, hand-finished in Geneva. The Meridian Caliber M-1908 — 72 hours of autonomous reserve, 38 jewels, every bridge anglaged by hand.",
  keywords: [
    "Luxury Watch",
    "Swiss Timepiece",
    "Horology",
    "Mechanical Watch",
    "Tourbillon",
    "Skeletonized",
    "Rose Gold",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#08080B] text-white/92 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
