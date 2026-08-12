import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin-auth'
import { getPhotoManifest, MANIFEST_PREFIX, photoSlot } from '@/lib/photo-manifest'

const MAX_BYTES = 8 * 1024 * 1024
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ photos: await getPhotoManifest() })
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const formData = await request.formData()
    const slotId = String(formData.get('slotId') || '')
    const file = formData.get('file')
    if (!photoSlot(slotId)) return NextResponse.json({ error: 'Invalid photo slot' }, { status: 400 })
    if (!(file instanceof File) || !TYPES.has(file.type) || file.size > MAX_BYTES) return NextResponse.json({ error: 'Use JPG, PNG or WebP under 8 MB.' }, { status: 400 })
    const blob = await put(`site-photos/${slotId}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`, file, { access: 'public' })
    const manifest = await getPhotoManifest()
    manifest[slotId] = blob.url
    await put(MANIFEST_PREFIX, JSON.stringify(manifest), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' })
    return NextResponse.json({ url: blob.url })
  } catch {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 })
  }
}
