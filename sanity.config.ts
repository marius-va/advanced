import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure, singletonTypes } from './sanity/lib/structure'

export default defineConfig({
  name: 'default',
  title: 'Advanced Craft Joiners',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent creating new instances of singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) =>
            action && ['publish', 'discardChanges', 'restore'].includes(action)
          )
        : input,
  },
})
