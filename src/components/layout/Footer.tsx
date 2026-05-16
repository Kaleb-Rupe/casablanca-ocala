"use client";

import Link from "next/link";
import { MapPin, Instagram } from "lucide-react";
import { mockProperty } from "@/lib/services/mockData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-darkGray text-white py-12"
      style={{ scrollMarginTop: "calc(var(--header-offset, 0px) + 24px)" }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Casablanca Ocala</h3>
            <p className="text-gray-300 text-sm">
              A modern 4-bedroom retreat in Ocala&apos;s Fort King District —
              sleeps 8, near the springs, downtown, and the World Equestrian
              Center.
            </p>
            <p className="text-gray-300 text-sm mt-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-coral" aria-hidden="true" />
              Fort King District, Ocala, FL
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Book your stay</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={mockProperty.vrboUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  Nightly stays on VRBO →
                </a>
              </li>
              <li>
                <a
                  href={mockProperty.furnishedFinderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  Monthly rentals on Furnished Finder →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  Photo gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/#nearby"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  What&apos;s nearby
                </Link>
              </li>
              <li>
                <Link
                  href="/#rules"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  House rules
                </Link>
              </li>
              <li>
                <Link
                  href="/#book"
                  className="text-gray-300 hover:text-coral transition-colors"
                >
                  Plan your stay
                </Link>
              </li>
            </ul>
            <a
              href="https://instagram.com/casablanca_ocala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm text-gray-300 hover:text-coral transition-colors"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              @casablanca_ocala
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {currentYear} Casablanca Ocala.</p>
        </div>
      </div>
    </footer>
  );
}
