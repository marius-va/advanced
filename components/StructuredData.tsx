import { SERVICES_LIST } from "@/lib/constants";
import type { SiteSettings } from "@/types/sanity";

interface StructuredDataProps {
  siteSettings: SiteSettings;
}

export function StructuredData({ siteSettings }: StructuredDataProps) {
  // Build social links array
  const sameAs: string[] = [];
  if (siteSettings.socialLinks?.facebook)
    sameAs.push(siteSettings.socialLinks.facebook);
  if (siteSettings.socialLinks?.instagram)
    sameAs.push(siteSettings.socialLinks.instagram);
  if (siteSettings.socialLinks?.linkedin)
    sameAs.push(siteSettings.socialLinks.linkedin);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://advancedcraftjoiners.co.uk",
    name: siteSettings.companyName || "Advanced Craft Joiners",
    description:
      siteSettings.footerDescription ||
      "Premium joinery and construction services in Scotland. Master craftsmen delivering bespoke new builds, extensions, kitchens, and complete renovations.",
    url: "https://advancedcraftjoiners.co.uk",
    telephone: siteSettings.phonePrimary
      ? `+44${siteSettings.phonePrimary.replace(/^0/, "")}`
      : undefined,
    email: siteSettings.email,
    areaServed: {
      "@type": "Country",
      name: "Scotland",
    },
    priceRange: "££",
    image: "https://advancedcraftjoiners.co.uk/og-image.jpg",
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Joinery & Construction Services",
      itemListElement: SERVICES_LIST.slice(0, 10).map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
