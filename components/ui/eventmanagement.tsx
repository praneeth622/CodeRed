// pages/admin/events.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
};

export default function EventManagement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  useEffect(() => {
    // Fetch existing events
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const addEvent = () => {
    axios.post('/api/events', newEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setNewEvent({});
      })
      .catch(error => console.error('Error adding event:', error));
  };

  const deleteEvent = (id: number) => {
    axios.delete(`/api/events/${id}`)
      .then(() => setEvents(events.filter(event => event.id !== id)))
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Manage Events</h1>
      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Add New Event</h2>
          <TextField name="name" label="Event Name" onChange={handleInputChange} className="mr-4" />
          <TextField name="date" label="Date" type="date" onChange={handleInputChange} className="mr-4" />
          <TextField name="location" label="Location" onChange={handleInputChange} className="mr-4" />
          <TextField name="description" label="Description" onChange={handleInputChange} className="mr-4" />
          <Button onClick={addEvent} variant="contained">Add Event</Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Existing Events</h2>
          {events.map(event => (
            <div key={event.id} className="border-b border-gray-200 py-2">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <Button onClick={() => deleteEvent(event.id)} variant="outlined" color="error">Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
