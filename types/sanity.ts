import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Shared image type
export interface SanityImage {
  asset?: SanityImageSource
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Social media links
export interface SocialLinks {
  facebook?: string
  instagram?: string
  linkedin?: string
}

// Site Settings (singleton)
export interface SiteSettings {
  companyName?: string
  tagline?: string
  email?: string
  phonePrimary?: string
  phoneSecondary?: string
  location?: string
  topBarText?: string
  footerDescription?: string
  socialLinks?: SocialLinks
}

// Hero CTA buttons
export interface HeroCta {
  primaryText?: string
  primaryTarget?: string
  secondaryText?: string
  secondaryTarget?: string
}

// Feature highlight
export interface Feature {
  title: string
  description: string
  icon: string
}

// Service highlight strip item
export interface ServiceHighlightItem {
  headline: string
  subtext?: string
}

// Service highlight strip
export interface ServiceHighlightStrip {
  items?: ServiceHighlightItem[]
}

// Homepage (singleton)
export interface Homepage {
  // Hero Section
  heroBadge?: string
  heroHeadline?: string
  heroHeadlineHighlight?: string
  heroSubheading?: string
  heroCta?: HeroCta
  heroImage?: SanityImage
  // About Section
  aboutHeadline?: string
  aboutHeadlineHighlight?: string
  aboutDescription?: string
  aboutImage?: SanityImage
  features?: Feature[]
  // Services Section
  servicesLabel?: string
  servicesHeadline?: string
  servicesDescription?: string
  serviceHighlightStrips?: ServiceHighlightStrip[]
  // Contact Section
  contactLabel?: string
  contactHeadline?: string
  contactDescription?: string
  contactFormTitle?: string
}
