import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The full company name (e.g., "Advanced Craft Joiners")',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short company tagline for header/footer',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phonePrimary',
      title: 'Primary Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneSecondary',
      title: 'Secondary Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Service Area',
      type: 'string',
      description: 'e.g., "All of Scotland"',
    }),
    defineField({
      name: 'topBarText',
      title: 'Top Bar Text',
      type: 'string',
      description: 'Text shown in the header top bar (e.g., "Turnkey Construction Services Scotland")',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      rows: 2,
      description: 'Short description shown at the bottom of the footer',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global website configuration',
      }
    },
  },
})
