import { list } from '@vercel/blob'
import { PHOTO_SLOTS } from './photo-slots'


export type PhotoManifest = Record<string, string>
const MANIFEST_PREFIX = 'site-photo-manifest.json'

export async function getPhotoManifest(): Promise<PhotoManifest> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PREFIX })
    const manifestBlob = blobs.find((blob) => blob.pathname === MANIFEST_PREFIX)
    if (!manifestBlob) return {}
    const response = await fetch(manifestBlob.url, { cache: 'no-store' })
    if (!response.ok) return {}
    return (await response.json()) as PhotoManifest
  } catch {
    return {}
  }
}

export function resolvePhotos(manifest: PhotoManifest) {
  return Object.fromEntries(PHOTO_SLOTS.map((slot) => [slot.id, manifest[slot.id] || slot.fallback])) as PhotoManifest
}

export function photoSlot(id: string) {
  return PHOTO_SLOTS.find((slot) => slot.id === id)
}

export { MANIFEST_PREFIX }
