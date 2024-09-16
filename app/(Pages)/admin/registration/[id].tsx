// pages/admin/registrations/[id].tsx
import { useRouter } from 'next/router';
import AdminLayout from '../layout';

export default function RegistrationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayout>
      <h1>Registration Detail for ID: {id}</h1>
      {/* Registration details content */}
    </AdminLayout>
  );
}
