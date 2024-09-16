import React from 'react'
import Link from 'next/link';
import { Button } from '@mui/material';
export default function page() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-8 space-y-4">
        <Link href="/admin/events">
          <Button variant="contained">Manage Events</Button>
        </Link>
        <Link href="/admin/registrations">
          <Button variant="contained">View Registrations</Button>
        </Link>
        <Link href="/admin/sales">
          <Button variant="contained">Monitor Merchandise Sales</Button>
        </Link>
        <Link href="/admin/reports">
          <Button variant="contained">Generate Reports</Button>
        </Link>
        <Link href="/admin/queries">
          <Button variant="contained">Handle User Queries</Button>
        </Link>
      </div>
    </div>
  )
}
