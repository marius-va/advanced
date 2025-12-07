import type { StructureResolver } from 'sanity/structure'

// Define singleton document IDs
const SINGLETON_TYPES = new Set(['siteSettings', 'homepage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons at the top
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.divider(),
      // Regular document types (filtered to exclude singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() as string)
      ),
    ])

// Filter out singleton types from new document creation
export const singletonTypes = SINGLETON_TYPES
