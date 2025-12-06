// GROQ queries for Sanity CMS

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
