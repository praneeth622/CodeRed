'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    eventType: '', // Handle selection with a custom onChange handler
    price: '',
    schedule: '',
    startTime: '',
    endTime: '',
    coordinators: ['', '', ''],
    eventImage: '', // Image URL
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleCoordinatorChange = (index: number, value: string) => {
    const updatedCoordinators = [...formData.coordinators]
    updatedCoordinators[index] = value
    setFormData(prev => ({ ...prev, coordinators: updatedCoordinators }))
  }

  // New handler for the radio button selection for eventType
  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, eventType: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Ensure all required fields are present before submitting
    const { eventName, description, eventType, price, schedule, startTime, endTime, eventImage } = formData;
    if (!eventName || !description || !eventType || !price || !schedule || !startTime || !endTime || !eventImage) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success('Event created successfully!')
        console.log('Event created successfully!')
      } else {
        const errorData = await res.json()
        toast.error(`Error: ${errorData.error}`)
        console.error('Error:', errorData)
      }
    } catch (error) {
      toast.error('An error occurred while creating the event.')
      console.error('An error occurred while creating the event:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input id="eventName" placeholder="Enter event name" onChange={handleInputChange} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter event description" onChange={handleInputChange} required />
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Type of Event</Label>
            <div className="grid grid-cols-2 gap-4">
              {['Festivals', 'Competitions', 'Performance', 'Workshop'].map((eventType) => (
                <div key={eventType} className="relative">
                  <input
                    type="radio"
                    id={eventType.toLowerCase()}
                    name="eventType"
                    value={eventType}
                    onChange={handleEventTypeChange} // Handle radio button selection
                    className="peer sr-only"
                    required
                  />
                  <label
                    htmlFor={eventType.toLowerCase()}
                    className="flex items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary"
                  >
                    {eventType}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="Enter price" onChange={handleInputChange} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input id="schedule" type="date" onChange={handleInputChange} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" onChange={handleInputChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Coordinators</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <Input
                  key={index}
                  placeholder={`Coordinator ${index}`}
                  onChange={(e) => handleCoordinatorChange(index - 1, e.target.value)}
                  required={index === 1} // Make Coordinator 1 required
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eventImage">Event Image URL</Label>
            <Input id="eventImage" type="text" placeholder="Enter image URL" onChange={handleInputChange} required />
          </div>
          
          <Button type="submit" className="w-full">Create Event</Button>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  )
}
