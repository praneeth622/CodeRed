// pages/admin/events/[id].tsx
import { useRouter } from 'next/router';
import AdminLayout from '../layout';

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayout>
      <h1>Event Detail for ID: {id}</h1>
      {/* Event details content */}
    </AdminLayout>
  );
}
