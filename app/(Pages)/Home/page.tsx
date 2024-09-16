"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, ChevronDown, LogOut, Menu, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Carousel ,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from '@/components/ui/carousel'

// Mock data for events
const events = [
  { id: 1, name: "Summer Music Festival", date: "2023-07-15", location: "Central Park", attendees: 5000, image: "/placeholder.svg?height=400&width=600", route: "/Events/Festivals/1" },
  { id: 2, name: "Tech Conference 2023", date: "2023-08-22", location: "Convention Center", attendees: 2000, image: "/placeholder.svg?height=400&width=600", route: "/Events/Workshops/2" },
  { id: 3, name: "Food & Wine Expo", date: "2023-09-10", location: "City Hall", attendees: 3000, image: "/placeholder.svg?height=400&width=600", route: "/Events/Festivals/3" },
  { id: 4, name: "Art Gallery Opening", date: "2023-10-05", location: "Downtown Museum", attendees: 500, image: "/placeholder.svg?height=400&width=600", route: "/Events/Performances/4" },
  { id: 5, name: "Marathon 2023", date: "2023-11-12", location: "City Streets", attendees: 10000, image: "/placeholder.svg?height=400&width=600", route: "/Events/Performances/5" },
  { id: 6, name: "Winter Wonderland", date: "2023-12-20", location: "City Square", attendees: 7500, image: "/placeholder.svg?height=400&width=600", route: "/Events/Festivals/6" },
]

// Mock user data
const user = {
  name: "John Doe",
  avatar: "/placeholder.svg?height=32&width=32"
}

export default function EventLandingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('date')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredAndSortedEvents = events
    .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortOrder === 'attendees') {
        return b.attendees - a.attendees
      }
      return 0
    })

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     

      <Carousel className="relative" opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          <CarouselItem className="w-48 h-24 relative">
            <Image
              src="/images/event-image-2.jpg"
              alt="Event 1"
              width={200}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/event-image-2.jpg"
              alt="Event 2"
              width={800}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/event-image-3.jpg"
              alt="Event 3"
              width={800}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>


      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="attendees">Sort by Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedEvents.map(event => (
                <Link href={event.route} key={event.id}>
                  <Card 
                    className="transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-102 overflow-hidden cursor-pointer"
                  >
                    <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${event.image})`}} role="img" aria-label={`${event.name} event image`}></div>
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(event.date).toLocaleDateString('en-GB')}
                      </p>
                      <p className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.location}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <Users className="mr-2 h-4 w-4" />
                        {event.attendees} attendees
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Register</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

     
    </div>
  )
}

function NavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
        active
          ? 'border-primary text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {children}
    </Link>

  )
}

function MobileNavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
        active
          ? 'bg-indigo-50 border-primary text-primary'
          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
      }`}
    >
      {children}
    </Link>
  )
}