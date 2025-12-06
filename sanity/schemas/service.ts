import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: 'Short description for the service card (max 200 characters)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'New Builds', value: 'new-builds' },
          { title: 'Extensions & Conversions', value: 'extensions' },
          { title: 'Kitchens & Bathrooms', value: 'kitchens-bathrooms' },
          { title: 'Joinery', value: 'joinery' },
          { title: 'Roofing & Exteriors', value: 'roofing' },
          { title: 'Interiors', value: 'interiors' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Heating & Electrical', value: 'heating-electrical' },
          { title: 'Planning & Design', value: 'planning' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1-20)',
      validation: (Rule) => Rule.min(1).max(100),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show prominently on the homepage',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order',
      media: 'image',
    },
    prepare({ title, category, order, media }) {
      return {
        title: `${order ? `${order}. ` : ''}${title}`,
        subtitle: category,
        media,
      }
    },
  },
})
