import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casablanca Ocala — Modern Vacation Rental in Ocala, FL",
  description:
    "A bright, modern 4-bedroom retreat in Ocala's Fort King District. Sleeps 8, near the springs, downtown, and the World Equestrian Center. Book nightly stays on VRBO or monthly rentals on Furnished Finder.",
  keywords:
    "Ocala vacation rental, Ocala Florida rental, World Equestrian Center, VRBO Ocala, Furnished Finder Ocala, monthly rental Florida",
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
