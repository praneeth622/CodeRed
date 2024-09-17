// pages/admin/events.tsx
"use client";

import { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const initialEvents = [
  { id: 1, name: 'Music Festival', date: '2024-10-01', location: 'Central Park' },
  { id: 2, name: 'Art Exhibition', date: '2024-11-15', location: 'City Gallery' }
];

export default function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '' });

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ name: '', date: '', location: '' });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Manage Events</h1>

      <div className="my-4">
        <h2 className="text-xl font-semibold">Add New Event</h2>
        <TextField
          label="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          className="my-2"
        />
        <TextField
          label="Event Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="my-2"
        />
        <TextField
          label="Event Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          className="my-2"
        />
        <Button variant="contained" onClick={handleAddEvent} className="mt-2">Add Event</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
