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
  },
  category,
  featured
}`

// Get service titles for contact form dropdown
export const SERVICE_TITLES_QUERY = `*[_type == "service"] | order(title asc) {
  _id,
  title
}`

// Get featured services only
export const FEATURED_SERVICES_QUERY = `*[_type == "service" && featured == true] | order(order asc) {
  _id,
  title,
  slug,
  description,
  image {
    ...,
    asset->
  },
  category
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
  },
  category,
  featured
}`
