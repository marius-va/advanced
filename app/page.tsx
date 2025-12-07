import { sanityFetch } from "@/sanity/lib/live";
import {
  SERVICE_TITLES_QUERY,
  SITE_SETTINGS_QUERY,
  HOMEPAGE_QUERY,
} from "@/sanity/lib/queries";
import {
  Header,
  Hero,
  About,
  Services,
  Contact,
  Footer,
} from "@/components/sections";
import { StructuredData } from "@/components/StructuredData";
import { SkipLink } from "@/components/SkipLink";
import { Toaster } from "@/components/ui/sonner";
import { SERVICES_LIST, COMPANY, FEATURES } from "@/lib/constants";
import type { SiteSettings, Homepage } from "@/types/sanity";

// Default fallback values from constants
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: COMPANY.name,
  tagline: COMPANY.tagline,
  email: COMPANY.email,
  phonePrimary: COMPANY.phonePrimary,
  phoneSecondary: COMPANY.phoneSecondary,
  location: COMPANY.location,
  topBarText: "Turnkey Construction Services Scotland",
  footerDescription:
    "Premium joinery and construction services across Scotland. Bespoke new builds, extensions, kitchens, and complete renovations.",
};

const DEFAULT_HOMEPAGE: Homepage = {
  heroBadge: "Established Scottish Craftsmanship",
  heroHeadline: "Master Craftsmanship.",
  heroHeadlineHighlight: "Complete Turnkey Solutions.",
  heroSubheading:
    "From bespoke timber kits to full property renovations. We are your single point of contact covering ALL trades—plumbing, electrics, and plastering included.",
  heroCta: {
    primaryText: "Start Your Project",
    primaryTarget: "contact",
    secondaryText: "View Our Services",
    secondaryTarget: "services",
  },
  aboutHeadline: "More Than Just Joiners.",
  aboutHeadlineHighlight: "We Are Complete Construction Partners.",
  aboutDescription:
    "At Advanced Craft Joiners, we simplify the complex process of construction. Usually, a renovation requires managing a joiner, a plumber, an electrician, and a plasterer separately. We eliminate that stress.",
  features: FEATURES.map((f) => ({
    title: f.title,
    description: f.description,
    icon: f.icon,
  })),
  servicesLabel: "Our Expertise",
  servicesHeadline: "Comprehensive Service List",
  servicesDescription:
    "We deliver a true turnkey experience. From the initial architect drawings to the final brush stroke, Advanced Craft Joiners handles every aspect of your project with precision and mastery.",
  contactLabel: "Get In Touch",
  contactHeadline: "Let's Discuss Your Project",
  contactDescription:
    "Whether you are planning a bespoke new build or a complex renovation, we are ready to bring your vision to life. Contact us today for a consultation.",
  contactFormTitle: "Request a Callback",
};

export default async function Home() {
  // Fetch all data in parallel
  const [servicesResult, settingsResult, homepageResult] = await Promise.all([
    sanityFetch({ query: SERVICE_TITLES_QUERY }).catch(() => ({ data: null })),
    sanityFetch({ query: SITE_SETTINGS_QUERY }).catch(() => ({ data: null })),
    sanityFetch({ query: HOMEPAGE_QUERY }).catch(() => ({ data: null })),
  ]);

  // Services with fallback
  let services: { _id: string; title: string }[] = servicesResult.data || [];
  if (services.length === 0) {
    services = SERVICES_LIST.map((title, index) => ({
      _id: `fallback-${index}`,
      title,
    }));
  }

  // Site settings with fallback
  const siteSettings: SiteSettings = {
    ...DEFAULT_SITE_SETTINGS,
    ...(settingsResult.data || {}),
  };

  // Homepage content with fallback
  const homepage: Homepage = {
    ...DEFAULT_HOMEPAGE,
    ...(homepageResult.data || {}),
  };

  return (
    <>
      <StructuredData siteSettings={siteSettings} />
      <SkipLink />
      <Header siteSettings={siteSettings} />
      <main id="main-content">
        <Hero homepage={homepage} />
        <About homepage={homepage} />
        <Services homepage={homepage} />
        <Contact
          services={services}
          siteSettings={siteSettings}
          homepage={homepage}
        />
      </main>
      <Footer siteSettings={siteSettings} />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
