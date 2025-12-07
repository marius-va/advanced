import { createClient } from 'next-sanity'
import { config } from 'dotenv'

// Load environment variables from .env.local (override existing)
config({ path: '.env.local', override: true })

// Create a write-enabled client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// Generate slug from title
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Service data matching SERVICES_LIST from lib/constants.ts
const services = [
  {
    title: 'Bespoke new build houses and timber kits',
    description: 'Custom-designed homes and timber frame construction tailored to your specifications',
  },
  {
    title: 'Extensions and conversions',
    description: 'Transform your space with expertly crafted home extensions and loft or garage conversions',
  },
  {
    title: 'Joinery contractor for house builders',
    description: 'Professional joinery services for residential construction projects and developers',
  },
  {
    title: 'Kitchens and bathrooms',
    description: 'Complete kitchen and bathroom installations with quality fixtures and finishes',
  },
  {
    title: 'Architects drawings and structural engineers SER certificate',
    description: 'Full architectural design services and structural engineering certification',
  },
  {
    title: 'Planning permissions and building warrant applications',
    description: 'Expert assistance navigating planning applications and building warrant processes',
  },
  {
    title: 'Stairs and balustrades',
    description: 'Bespoke staircase design and installation with custom balustrade options',
  },
  {
    title: 'External windows and doors',
    description: 'High-quality window and door fitting for improved security and energy efficiency',
  },
  {
    title: 'Insurance repair specialists',
    description: 'Certified repairs for insurance claims with full documentation and quality assurance',
  },
  {
    title: 'Property maintenance and renovations',
    description: 'Comprehensive property upkeep and renovation services for homes of all sizes',
  },
  {
    title: 'Internal door kits, facings, and skirtings',
    description: 'Complete interior joinery including doors, architraves, and skirting boards',
  },
  {
    title: 'All types of flooring',
    description: 'Expert installation of hardwood, laminate, vinyl, and tile flooring solutions',
  },
  {
    title: 'Garden rooms / summer houses',
    description: 'Quality outdoor living spaces and garden buildings for year-round enjoyment',
  },
  {
    title: 'Decking and fences',
    description: 'Durable timber decking and fencing to enhance your outdoor areas',
  },
  {
    title: 'Roofs, fascia and soffits',
    description: 'Complete roofing services including fascia and soffit installation and repair',
  },
  {
    title: 'Landscaping and gardening',
    description: 'Professional garden design and landscaping to transform your outdoor space',
  },
  {
    title: 'Full new heating system',
    description: 'Complete central heating installations for optimal comfort and efficiency',
  },
  {
    title: 'Boiler changes',
    description: 'Professional boiler replacement and upgrade services with certified engineers',
  },
  {
    title: 'Full electrical rewires',
    description: 'Comprehensive electrical rewiring to meet current safety standards',
  },
  {
    title: 'Roughcasting and rendering',
    description: 'External wall finishing with roughcast and render for protection and aesthetics',
  },
]

async function seedServices() {
  console.log('Starting to seed services...')

  // Check if token is available
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Error: SANITY_API_WRITE_TOKEN is not set')
    console.log('Please create a write token in Sanity dashboard and add it to .env.local')
    process.exit(1)
  }

  // Create a transaction for atomic operations
  const transaction = client.transaction()

  for (let i = 0; i < services.length; i++) {
    const service = services[i]
    const slug = slugify(service.title)

    const document = {
      _type: 'service',
      _id: `service-${slug}`, // Use deterministic IDs for idempotent seeding
      title: service.title,
      slug: { _type: 'slug', current: slug },
      description: service.description,
      order: i + 1,
    }

    // Use createOrReplace for idempotent seeding
    transaction.createOrReplace(document)
    console.log(`Prepared: ${service.title}`)
  }

  try {
    const result = await transaction.commit()
    console.log(`\nSuccessfully seeded ${services.length} services!`)
    console.log('Transaction ID:', result.transactionId)
  } catch (error) {
    console.error('Failed to seed services:', error)
    process.exit(1)
  }
}

seedServices()
