import FestivalSite from '@/components/festival-site'
import { getPhotoManifest, resolvePhotos } from '@/lib/photo-manifest'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const managedPhotos = resolvePhotos(await getPhotoManifest())
  return <FestivalSite managedPhotos={managedPhotos} />
}
