// GROQ queries for Sanity CMS

// ============================================
// Page Queries
// ============================================

// Get all pages
export const PAGES_QUERY = `*[_type == "page"] | order(title asc) {
  _id,
  _createdAt,
  title,
  slug
}`

// Get a single page by slug
export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  content
}`

// Get all page slugs (useful for generateStaticParams)
export const PAGE_SLUGS_QUERY = `*[_type == "page"] {
  "slug": slug.current
}`

// ============================================
// Service Queries
// ============================================

// Get all services ordered by display order
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  image {
    ...,
    asset->
  }
}`

// Get service titles for contact form dropdown
export const SERVICE_TITLES_QUERY = `*[_type == "service"] | order(title asc) {
  _id,
  title
}`

// Get single service by slug
export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  image {
    ...,
    asset->
  }
}`

// ============================================
// Site Settings Query (Singleton)
// ============================================

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  companyName,
  tagline,
  email,
  phonePrimary,
  phoneSecondary,
  location,
  topBarText,
  footerDescription,
  socialLinks {
    facebook,
    instagram,
    linkedin
  }
}`

// ============================================
// Homepage Query (Singleton)
// ============================================

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  // Hero Section
  heroBadge,
  heroHeadline,
  heroHeadlineHighlight,
  heroSubheading,
  heroCta {
    primaryText,
    primaryTarget,
    secondaryText,
    secondaryTarget
  },
  heroImage {
    ...,
    asset->
  },
  // About Section
  aboutHeadline,
  aboutHeadlineHighlight,
  aboutDescription,
  aboutImage {
    ...,
    asset->
  },
  features[] {
    title,
    description,
    icon
  },
  // Services Section
  servicesLabel,
  servicesHeadline,
  servicesDescription,
  serviceHighlightStrips[] {
    items[] {
      headline,
      subtext
    }
  },
  // Contact Section
  contactLabel,
  contactHeadline,
  contactDescription,
  contactFormTitle
}`
