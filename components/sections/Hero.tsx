"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/image";
import type { Homepage } from "@/types/sanity";

// Fallback image
const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop";

interface HeroProps {
  homepage: Homepage;
}

export function Hero({ homepage }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get image URL from Sanity or use fallback
  const imageUrl = homepage.heroImage?.asset
    ? urlFor(homepage.heroImage).width(1920).quality(80).url()
    : FALLBACK_HERO_IMAGE;

  const imageAlt = homepage.heroImage?.alt || "Premium joinery craftsmanship";

  return (
    <section
      id="home"
      aria-label="Welcome"
      className="relative z-0 min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl">
        {homepage.heroBadge && (
          <Badge
            variant="outline"
            className="mb-6 border-gold text-gold px-4 py-1.5 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold bg-transparent"
          >
            {homepage.heroBadge}
          </Badge>
        )}

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {homepage.heroHeadline}
          {homepage.heroHeadlineHighlight && (
            <>
              <br />
              <span className="text-gold">{homepage.heroHeadlineHighlight}</span>
            </>
          )}
        </h1>

        {homepage.heroSubheading && (
          <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {homepage.heroSubheading}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            onClick={() =>
              scrollToSection(homepage.heroCta?.primaryTarget || "contact")
            }
            size="lg"
            className="group bg-gold text-black hover:bg-white px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
          >
            {homepage.heroCta?.primaryText || "Start Your Project"}
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={16}
            />
          </Button>

          <Button
            onClick={() =>
              scrollToSection(homepage.heroCta?.secondaryTarget || "services")
            }
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
          >
            {homepage.heroCta?.secondaryText || "View Our Services"}
          </Button>
        </div>
      </div>
    </section>
  );
}
