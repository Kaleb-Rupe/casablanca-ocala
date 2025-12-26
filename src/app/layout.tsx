import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casablanca Ocala - Luxury Vacation Rental",
  description:
    "Experience luxury living in Ocala, Florida. Book your stay at our premium vacation rental property through VRBO or Airbnb.",
  keywords:
    "Ocala vacation rental, luxury rental, VRBO, Airbnb, Florida accommodation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <NavigationBar />
        <main className="flex-grow pt-[var(--header-offset)] transition-[padding] duration-300 ease-out">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
