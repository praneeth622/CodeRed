"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Define the types for the event data
interface Event {
  id: string;
  eventName: string;
  description: string;
  price: number;
  schedule?: {
    date?: string;
    startTime?: string;
    endTime?: string;
  };
  eventImage: string;
}

const AllEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // Type array of Event objects
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events'); // Fetch from the API
        const data = await res.json();

        if (res.ok) {
          setEvents(data.data); // Set fetched events
        } else {
          throw new Error(data.error || 'Failed to fetch events');
        }
      } catch (error) {
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading once request is completed
      }
    };

    fetchEvents(); // Call the fetch function when component mounts
  }, []);

  // Render loading state
  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render events
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <Card className="flex flex-col h-full cursor-pointer transition-transform hover:scale-105">
              <CardHeader>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={event.eventImage}
                    alt={event.eventName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardTitle>{event.eventName}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-2">{event.description}</p>
                {/* Use optional chaining to prevent the error */}
                <p className="text-sm text-gray-500">
                  Date: {event.schedule?.date || 'Date not available'}
                </p>
                <p className="text-sm text-gray-500">
                  Price: ₹{event.price}
                </p>
              </CardContent>
              <div className="p-4 mt-auto">
                <Button className="w-full">View Details</Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
