import Image from "next/image";
import {
  Award,
  Layers,
  Users,
  ShieldCheck,
  Clock,
  PencilRuler,
  FileCheck,
  Home,
  Hammer,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { Homepage } from "@/types/sanity";

// Map icon strings to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Award,
  Layers,
  Users,
  ShieldCheck,
  Clock,
  PencilRuler,
  FileCheck,
  Home,
  Hammer,
  Wrench,
};

// Fallback image
const FALLBACK_ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop";

interface AboutProps {
  homepage: Homepage;
}

export function About({ homepage }: AboutProps) {
  // Get image URL from Sanity or use fallback
  const imageUrl = homepage.aboutImage?.asset
    ? urlFor(homepage.aboutImage).width(800).height(1000).quality(80).url()
    : FALLBACK_ABOUT_IMAGE;

  const imageAlt =
    homepage.aboutImage?.alt ||
    "Skilled craftsman at work on a construction project";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-32 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={1000}
                className="w-full h-auto shadow-2xl border-b-8 border-gold"
              />
            </div>
            {/* Decorative box */}
            <div className="absolute top-[-20px] left-[-20px] w-full h-full border-2 border-border -z-0 hidden md:block" />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <h2
              id="about-heading"
              className="font-serif text-3xl md:text-4xl font-bold mb-6 text-black"
            >
              {homepage.aboutHeadline}
              {homepage.aboutHeadlineHighlight && (
                <>
                  <br />
                  <span className="text-gold">
                    {homepage.aboutHeadlineHighlight}
                  </span>
                </>
              )}
            </h2>

            {homepage.aboutDescription && (
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {homepage.aboutDescription}
              </p>
            )}

            {homepage.features && homepage.features.length > 0 && (
              <div className="space-y-8">
                {homepage.features.map((feature) => {
                  const Icon = iconMap[feature.icon] || Award;
                  return (
                    <div key={feature.title} className="flex items-start">
                      <div className="flex-shrink-0 p-3 bg-black text-gold">
                        <Icon size={24} />
                      </div>
                      <div className="ml-6">
                        <h3 className="font-serif text-xl font-bold mb-2 text-black">
                          {feature.title}
                        </h3>
                        <p className="text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
