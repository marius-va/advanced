import { sanityFetch } from "@/sanity/lib/live";
import { SERVICE_TITLES_QUERY } from "@/sanity/lib/queries";
import { Header, Hero, About, Services, Contact, Footer } from "@/components/sections";
import { StructuredData } from "@/components/StructuredData";
import { SkipLink } from "@/components/SkipLink";
import { Toaster } from "@/components/ui/sonner";
import { SERVICES_LIST } from "@/lib/constants";

export default async function Home() {
  // Fetch service titles for contact form dropdown
  let services: { _id: string; title: string }[] = [];

  try {
    const { data } = await sanityFetch({
      query: SERVICE_TITLES_QUERY,
    });
    services = data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  // Fallback to constants if no Sanity data
  if (services.length === 0) {
    services = SERVICES_LIST.map((title, index) => ({
      _id: `fallback-${index}`,
      title,
    }));
  }

  return (
    <>
      <StructuredData />
      <SkipLink />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Contact services={services} />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
