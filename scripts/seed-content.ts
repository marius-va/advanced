import { createClient } from 'next-sanity'
import { config } from 'dotenv'
import { COMPANY, FEATURES } from '../lib/constants'

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

async function seedContent() {
  console.log('Starting to seed site settings and homepage content...')

  // Check if token is available
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Error: SANITY_API_WRITE_TOKEN is not set')
    console.log('Please create a write token in Sanity dashboard and add it to .env.local')
    process.exit(1)
  }

  // Site Settings document
  const siteSettings = {
    _type: 'siteSettings',
    _id: 'siteSettings',
    companyName: COMPANY.name,
    tagline: COMPANY.tagline,
    email: COMPANY.email,
    phonePrimary: COMPANY.phonePrimary,
    phoneSecondary: COMPANY.phoneSecondary,
    location: COMPANY.location,
    topBarText: 'Turnkey Construction Services Scotland',
    footerDescription: 'Premium joinery and construction services across Scotland. Bespoke new builds, extensions, kitchens, and complete renovations.',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: '',
    },
  }

  // Homepage document
  const homepage = {
    _type: 'homepage',
    _id: 'homepage',
    // Hero Section
    heroBadge: 'Established Scottish Craftsmanship',
    heroHeadline: 'Master Craftsmanship.',
    heroHeadlineHighlight: 'Complete Turnkey Solutions.',
    heroSubheading: 'From bespoke timber kits to full property renovations. We are your single point of contact covering ALL trades—plumbing, electrics, and plastering included.',
    heroCta: {
      primaryText: 'Start Your Project',
      primaryTarget: 'contact',
      secondaryText: 'View Our Services',
      secondaryTarget: 'services',
    },
    // Hero image would need to be uploaded separately via Studio

    // About Section
    aboutHeadline: 'More Than Just Joiners.',
    aboutHeadlineHighlight: 'We Are Complete Construction Partners.',
    aboutDescription: 'At Advanced Craft Joiners, we simplify the complex process of construction. Usually, a renovation requires managing a joiner, a plumber, an electrician, and a plasterer separately. We eliminate that stress.',
    // About image would need to be uploaded separately via Studio
    features: FEATURES.map((feature, index) => ({
      _type: 'object',
      _key: `feature-${index}`,
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
    })),

    // Services Section
    servicesLabel: 'Our Expertise',
    servicesHeadline: 'Comprehensive Service List',
    servicesDescription: 'We deliver a true turnkey experience. From the initial architect drawings to the final brush stroke, Advanced Craft Joiners handles every aspect of your project with precision and mastery.',
    serviceHighlightStrips: [
      {
        _type: 'object',
        _key: 'strip-1',
        items: [
          {
            _type: 'object',
            _key: 'strip-1-item-1',
            headline: 'Over 25 Years Expertise',
            subtext: 'Established & Trusted',
          },
          {
            _type: 'object',
            _key: 'strip-1-item-2',
            headline: 'All Work Guaranteed',
            subtext: 'Full Peace of Mind',
          },
        ],
      },
      {
        _type: 'object',
        _key: 'strip-2',
        items: [
          {
            _type: 'object',
            _key: 'strip-2-item-1',
            headline: 'Design to Completion',
            subtext: 'Full Turnkey Service',
          },
          {
            _type: 'object',
            _key: 'strip-2-item-2',
            headline: 'Insurance Specialists',
            subtext: 'Approved Repairer',
          },
        ],
      },
      {
        _type: 'object',
        _key: 'strip-3',
        items: [
          {
            _type: 'object',
            _key: 'strip-3-item-1',
            headline: 'Built on Reputation.',
            subtext: 'Over 90% of our work comes from referrals and return customers.',
          },
        ],
      },
    ],

    // Contact Section
    contactLabel: 'Get In Touch',
    contactHeadline: "Let's Discuss Your Project",
    contactDescription: 'Whether you are planning a bespoke new build or a complex renovation, we are ready to bring your vision to life. Contact us today for a consultation.',
    contactFormTitle: 'Request a Callback',
  }

  // Create a transaction for atomic operations
  const transaction = client.transaction()

  transaction.createOrReplace(siteSettings)
  console.log('Prepared: Site Settings')

  transaction.createOrReplace(homepage)
  console.log('Prepared: Homepage')

  try {
    const result = await transaction.commit()
    console.log('\nSuccessfully seeded site settings and homepage!')
    console.log('Transaction ID:', result.transactionId)
    console.log('\nNote: Hero and About images need to be uploaded manually via Sanity Studio at /studio')
  } catch (error) {
    console.error('Failed to seed content:', error)
    process.exit(1)
  }
}

seedContent()
