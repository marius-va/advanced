// Company Information
export const COMPANY = {
  name: "Advanced Craft Joiners",
  tagline: "Master Craftsmanship. Complete Turnkey Solutions.",
  email: "info@advancedcraftjoiners.co.uk",
  phonePrimary: "07542389947",
  phoneSecondary: "07402818808",
  location: "All of Scotland",
} as const;

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

// Services List (for fallback/seeding Sanity)
export const SERVICES_LIST = [
  "Bespoke new build houses and timber kits",
  "Extensions and conversions",
  "Joinery contractor for house builders",
  "Kitchens and bathrooms",
  "Architects drawings and structural engineers SER certificate",
  "Planning permissions and building warrant applications",
  "Stairs and balustrades",
  "External windows and doors",
  "Insurance repair specialists",
  "Property maintenance and renovations",
  "Internal door kits, facings, and skirtings",
  "All types of flooring",
  "Garden rooms / summer houses",
  "Decking and fences",
  "Roofs, fascia and soffits",
  "Landscaping and gardening",
  "Full new heating system",
  "Boiler changes",
  "Full electrical rewires",
  "Roughcasting and rendering",
] as const;

// Feature highlights for About section
export const FEATURES = [
  {
    title: "Design to Completion",
    description:
      "From initial concept to final handover, we manage every aspect of your project with precision and care.",
    icon: "Award",
  },
  {
    title: "All Trades Covered",
    description:
      "One team, all skills. Joinery, plumbing, electrical, roofing - we handle it all under one roof.",
    icon: "Layers",
  },
  {
    title: "Single Point of Contact",
    description:
      "No juggling multiple contractors. One dedicated project manager for seamless communication.",
    icon: "Users",
  },
] as const;

// Social links (add when available)
export const SOCIAL_LINKS = {
  facebook: "",
  instagram: "",
  linkedin: "",
} as const;
