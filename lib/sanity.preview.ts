import { previewClient } from '@/sanity/lib/client'

export function getPreviewClient(token?: string) {
  return token ? previewClient : null
}

export function getToken() {
  return process.env.SANITY_API_READ_TOKEN
}
