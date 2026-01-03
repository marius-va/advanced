"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import type { SiteSettings } from "@/types/sanity";

interface HeaderProps {
  siteSettings: SiteSettings;
}

export function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar for desktop contact info */}
      <div className="hidden md:block bg-black text-white py-2 text-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {siteSettings.topBarText && (
            <span className="opacity-80 uppercase tracking-widest text-xs">
              {siteSettings.topBarText}
            </span>
          )}
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${siteSettings.phonePrimary}`}
              className="flex items-center hover:text-gold transition-colors"
            >
              <Phone size={14} className="mr-2 text-gold" />
              {siteSettings.phonePrimary}
            </a>
            <a
              href={`mailto:${siteSettings.email}`}
              className="flex items-center hover:text-gold transition-colors"
            >
              <Mail size={14} className="mr-2 text-gold" />
              {siteSettings.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 isolate transition-all duration-300 border-b border-gray-100",
          isScrolled
            ? "bg-white shadow-md py-4 md:py-3"
            : "bg-white py-5"
        )}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt={siteSettings.companyName || "Advanced Craft Joiners"}
              width={78}
              height={48}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium uppercase tracking-wider text-foreground hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gold text-gold-foreground hover:bg-gold-light uppercase tracking-wider font-semibold"
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 overflow-hidden">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-lg font-medium text-foreground hover:text-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="w-full bg-gold text-gold-foreground hover:bg-gold-light uppercase tracking-wider font-semibold mt-4"
            >
              Get a Quote
            </Button>
          </div>
        )}
      </header>
    </>
  );
}
