import { COMPANY, SERVICES_LIST } from "@/lib/constants";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://advancedcraftjoiners.co.uk",
    name: COMPANY.name,
    description:
      "Premium joinery and construction services in Scotland. Master craftsmen delivering bespoke new builds, extensions, kitchens, and complete renovations.",
    url: "https://advancedcraftjoiners.co.uk",
    telephone: `+44${COMPANY.phonePrimary.replace(/^0/, "")}`,
    email: COMPANY.email,
    areaServed: {
      "@type": "Country",
      name: "Scotland",
    },
    priceRange: "££",
    image: "https://advancedcraftjoiners.co.uk/og-image.jpg",
    sameAs: [],
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
