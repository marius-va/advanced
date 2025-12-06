import { createClient } from '@sanity/client'

// Configuration from environment variables
// Use SANITY_API_WRITE_TOKEN if available, otherwise try SANITY_API_READ_TOKEN
// Note: The token must have "Editor" permissions to create documents
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN!,
  useCdn: false,
})

const categories = [
  { title: 'New Builds', slug: 'new-builds', order: 1, description: 'Complete new construction projects from foundation to finish' },
  { title: 'Extensions & Conversions', slug: 'extensions', order: 2, description: 'Home extensions, loft conversions, and property modifications' },
  { title: 'Kitchens & Bathrooms', slug: 'kitchens-bathrooms', order: 3, description: 'Full kitchen and bathroom installations and renovations' },
  { title: 'Joinery', slug: 'joinery', order: 4, description: 'Custom woodwork, staircases, doors, and fitted furniture' },
  { title: 'Roofing & Exteriors', slug: 'roofing', order: 5, description: 'Roofing, guttering, fascias, and external cladding' },
  { title: 'Interiors', slug: 'interiors', order: 6, description: 'Interior finishing, plastering, decorating, and flooring' },
  { title: 'Outdoor', slug: 'outdoor', order: 7, description: 'Patios, decking, garden structures, and landscaping' },
  { title: 'Heating & Electrical', slug: 'heating-electrical', order: 8, description: 'Central heating, plumbing, and electrical installations' },
  { title: 'Planning & Design', slug: 'planning', order: 9, description: 'Architectural design, planning applications, and project management' },
  { title: 'Maintenance', slug: 'maintenance', order: 10, description: 'Property maintenance, repairs, and ongoing support' },
]

async function seedCategories() {
  console.log('🌱 Starting category seed...')

  try {
    for (const category of categories) {
      const doc = {
        _type: 'category',
        title: category.title,
        slug: {
          _type: 'slug',
          current: category.slug,
        },
        description: category.description,
        order: category.order,
      }

      const result = await client.create(doc)
      console.log(`✅ Created category: ${category.title} (${result._id})`)
    }

    console.log('\n🎉 Successfully created all categories!')
    console.log('\nNext steps:')
    console.log('1. Go to your Sanity Studio (/studio)')
    console.log('2. Edit your existing services')
    console.log('3. Assign the appropriate category to each service')
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
    process.exit(1)
  }
}

seedCategories()
