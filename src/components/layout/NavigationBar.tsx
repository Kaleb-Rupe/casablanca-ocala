"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white fixed z-[1000]"
    >
      <div className="flex flex-col items-center mx-7 py-4">
        <div className="flex justify-between w-full items-center">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-coral">Casablanca Ocala</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="link-hover">
              Home
            </Link>
            <Link href="#properties" className="link-hover">
              Properties
            </Link>
            <Link href="/gallery" className="link-hover">
              Gallery
            </Link>
            <Link href="#contact" className="link-hover">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="link-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#properties"
                className="link-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/gallery"
                className="link-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="#contact"
                className="link-hover"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
