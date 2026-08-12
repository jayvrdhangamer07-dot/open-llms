import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/admin-auth'
import PhotoAdmin from './photo-admin'

export default async function AdminPhotosPage() {
  if (!(await isAdmin())) redirect('/admin/photos/login')
  return <PhotoAdmin />
}
