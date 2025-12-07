import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'about', title: 'About Section' },
    { name: 'services', title: 'Services Section' },
    { name: 'contact', title: 'Contact Section' },
  ],
  fields: [
    // ============================================
    // HERO SECTION
    // ============================================
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
      group: 'hero',
      description: 'Small badge text above headline (e.g., "Established Scottish Craftsmanship")',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
      description: 'Main headline (line 1)',
    }),
    defineField({
      name: 'heroHeadlineHighlight',
      title: 'Hero Headline Highlight',
      type: 'string',
      group: 'hero',
      description: 'Highlighted text (line 2, shown in gold)',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Paragraph text below the headline',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero Call-to-Action Buttons',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'primaryText',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Start Your Project',
        }),
        defineField({
          name: 'primaryTarget',
          title: 'Primary Button Target',
          type: 'string',
          description: 'Section ID to scroll to (e.g., "contact")',
          initialValue: 'contact',
        }),
        defineField({
          name: 'secondaryText',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'View Our Services',
        }),
        defineField({
          name: 'secondaryTarget',
          title: 'Secondary Button Target',
          type: 'string',
          description: 'Section ID to scroll to (e.g., "services")',
          initialValue: 'services',
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ============================================
    // ABOUT SECTION
    // ============================================
    defineField({
      name: 'aboutHeadline',
      title: 'About Headline',
      type: 'string',
      group: 'about',
      description: 'Main heading (line 1)',
    }),
    defineField({
      name: 'aboutHeadlineHighlight',
      title: 'About Headline Highlight',
      type: 'string',
      group: 'about',
      description: 'Highlighted text (line 2, shown in gold)',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      rows: 4,
      group: 'about',
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Feature Highlights',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Award', value: 'Award' },
                  { title: 'Layers', value: 'Layers' },
                  { title: 'Users', value: 'Users' },
                  { title: 'Shield Check', value: 'ShieldCheck' },
                  { title: 'Clock', value: 'Clock' },
                  { title: 'Pencil Ruler', value: 'PencilRuler' },
                  { title: 'File Check', value: 'FileCheck' },
                  { title: 'Home', value: 'Home' },
                  { title: 'Hammer', value: 'Hammer' },
                  { title: 'Wrench', value: 'Wrench' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
      description: 'Maximum 5 features (3 recommended)',
    }),

    // ============================================
    // SERVICES SECTION
    // ============================================
    defineField({
      name: 'servicesLabel',
      title: 'Services Section Label',
      type: 'string',
      group: 'services',
      description: 'Small label above heading (e.g., "Our Expertise")',
    }),
    defineField({
      name: 'servicesHeadline',
      title: 'Services Headline',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Description',
      type: 'text',
      rows: 3,
      group: 'services',
    }),
    defineField({
      name: 'serviceHighlightStrips',
      title: 'Service Highlight Strips',
      type: 'array',
      group: 'services',
      description: 'Gold highlight strips shown between service groups',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'items',
              title: 'Strip Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'headline',
                      title: 'Headline',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'subtext',
                      title: 'Subtext',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: { title: 'headline', subtitle: 'subtext' },
                  },
                },
              ],
              validation: (Rule) => Rule.max(2),
            }),
          ],
          preview: {
            select: { items: 'items' },
            prepare({ items }) {
              const titles = items?.map((item: { headline: string }) => item.headline).join(' | ') || 'Empty strip'
              return { title: titles }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // ============================================
    // CONTACT SECTION
    // ============================================
    defineField({
      name: 'contactLabel',
      title: 'Contact Section Label',
      type: 'string',
      group: 'contact',
      description: 'Small label above heading (e.g., "Get In Touch")',
    }),
    defineField({
      name: 'contactHeadline',
      title: 'Contact Headline',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Contact Form Title',
      type: 'string',
      group: 'contact',
      description: 'Title above the form (e.g., "Request a Callback")',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Homepage content configuration',
      }
    },
  },
})
