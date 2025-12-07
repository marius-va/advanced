"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS } from "@/lib/constants";
import type { SiteSettings } from "@/types/sanity";

interface FooterProps {
  siteSettings: SiteSettings;
}

export function Footer({ siteSettings }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link href="/" className="inline-block">
              <div className="font-serif text-2xl font-bold tracking-tight mb-2">
                {siteSettings.companyName ? (
                  <>
                    {siteSettings.companyName.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-gold">
                      {siteSettings.companyName.split(" ").slice(-1)}
                    </span>
                  </>
                ) : (
                  <>
                    Advanced Craft <span className="text-gold">Joiners</span>
                  </>
                )}
              </div>
            </Link>
            <p className="text-gray-400 text-sm">
              &copy; {year} {siteSettings.companyName || "Advanced Craft Joiners"}. All rights reserved.
              {siteSettings.location && (
                <>
                  <br />
                  Proudly serving {siteSettings.location}.
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <nav
              className="flex gap-6 text-sm font-medium text-gray-400"
              aria-label="Footer navigation"
            >
              {NAV_LINKS.filter(
                (link) => link.label !== "About"
              ).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {siteSettings.footerDescription && (
          <div className="text-center text-xs text-gray-500">
            <p>{siteSettings.footerDescription}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
