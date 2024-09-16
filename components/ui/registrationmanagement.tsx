// pages/admin/registrations.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

type Registration = {
  id: number;
  eventId: number;
  userName: string;
  userEmail: string;
};

export default function RegistrationManagement() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    // Fetch registrations
    axios.get('/api/registrations')
      .then(response => setRegistrations(response.data))
      .catch(error => console.error('Error fetching registrations:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">View Registrations</h1>
      <div className="mt-8 space-y-4">
        {registrations.map(registration => (
          <div key={registration.id} className="border-b border-gray-200 py-2">
            <h3 className="text-lg font-semibold">Event ID: {registration.eventId}</h3>
            <p>User Name: {registration.userName}</p>
            <p>User Email: {registration.userEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

