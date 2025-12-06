import { sanityFetch } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { ServiceCard } from "./ServiceCard";
import { SERVICES_LIST } from "@/lib/constants";
import {
  ShieldCheck,
  Clock,
  PencilRuler,
  FileCheck,
  Users,
} from "lucide-react";

type SanityService = {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: {
    asset: { _ref: string };
    alt?: string;
  };
  category?: string;
  featured?: boolean;
};

// Fallback placeholder images for when no Sanity data exists
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601058268499-e52642d18d89?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1664575198308-395f9ed66420?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517164998396-856641b9d4c7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506093488421-25501aece5bb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581858726768-758c2f017585?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449844908441-8829872d2647?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550995133-c70a2569fae4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591965561081-34b8c4d1663f?q=80&w=800&auto=format&fit=crop",
];

type DisplayService = {
  _id: string;
  title: string;
  image?: SanityService["image"];
  placeholderUrl: string;
};

export async function Services() {
  // Fetch services from Sanity
  let sanityServices: SanityService[] = [];
  try {
    sanityServices = await sanityFetch({
      query: SERVICES_QUERY,
      tags: ["service"],
    });
  } catch (error) {
    console.error("Failed to fetch services from Sanity:", error);
  }

  // Build display services array
  let displayServices: DisplayService[];

  if (sanityServices.length > 0) {
    // Use Sanity data with placeholder fallbacks
    displayServices = sanityServices.map((service, index) => ({
      _id: service._id,
      title: service.title,
      image: service.image,
      placeholderUrl: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
    }));
  } else {
    // Use fallback constants with placeholder images
    displayServices = SERVICES_LIST.map((title, index) => ({
      _id: `fallback-${index}`,
      title,
      image: undefined,
      placeholderUrl: PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
    }));
  }

  // Redistribute items into groups
  const chunk1 = displayServices.slice(0, 6);
  const chunk2 = displayServices.slice(6, 12);
  const chunk3 = displayServices.slice(12, 18);
  const chunk4 = displayServices.slice(18);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">
            Our Expertise
          </span>
          <h2
            id="services-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Comprehensive Service List
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We deliver a true turnkey experience. From the initial architect
            drawings to the final brush stroke, Advanced Craft Joiners handles
            every aspect of your project with precision and mastery.
          </p>
        </div>

        {/* Group 1: Items 1-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chunk1.map((service, i) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              image={service.image}
              placeholderUrl={service.placeholderUrl}
              index={i}
            />
          ))}
        </div>

        {/* Feature Strip 1: Experience & Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex flex-row items-center p-6 bg-card border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow">
            <Clock className="w-8 h-8 text-gold mr-5 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                Over 25 Years Expertise
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                Established & Trusted
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center p-6 bg-card border-l-4 border-gold shadow-sm hover:shadow-md transition-shadow">
            <ShieldCheck className="w-8 h-8 text-gold mr-5 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                All Work Guaranteed
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                Full Peace of Mind
              </p>
            </div>
          </div>
        </div>

        {/* Group 2: Items 7-12 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chunk2.map((service, i) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              image={service.image}
              placeholderUrl={service.placeholderUrl}
              index={i + 6}
            />
          ))}
        </div>

        {/* Feature Strip 2: Turnkey & Insurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex flex-row items-center p-6 bg-foreground text-background shadow-md transform hover:-translate-y-1 transition-transform duration-300">
            <PencilRuler className="w-8 h-8 text-gold mr-5 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold leading-tight">
                Design to Completion
              </h3>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
                Full Turnkey Service
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center p-6 bg-gold text-black shadow-md transform hover:-translate-y-1 transition-transform duration-300">
            <FileCheck className="w-8 h-8 text-black mr-5 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-lg font-bold leading-tight">
                Insurance Specialists
              </h3>
              <p className="text-black/70 text-xs uppercase tracking-wider font-bold mt-1">
                Approved Repairer
              </p>
            </div>
          </div>
        </div>

        {/* Group 3: Items 13-18 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chunk3.map((service, i) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              image={service.image}
              placeholderUrl={service.placeholderUrl}
              index={i + 12}
            />
          ))}
        </div>

        {/* Feature Strip 3: Referrals */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-row items-center justify-center p-6 bg-card shadow-md border-t-2 border-gold">
            <div className="p-2 bg-foreground rounded-full mr-5 shrink-0 hidden sm:block">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-lg font-bold text-foreground inline sm:block mr-2 sm:mr-0">
                Built on Reputation.
              </h3>
              <span className="text-muted-foreground text-sm">
                Over 90% of our work comes from{" "}
                <span className="font-bold text-foreground">referrals</span> and
                return customers.
              </span>
            </div>
          </div>
        </div>

        {/* Group 4: Items 19-20 */}
        {chunk4.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chunk4.map((service, i) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                image={service.image}
                placeholderUrl={service.placeholderUrl}
                index={i + 18}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
