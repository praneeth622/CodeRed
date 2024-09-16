"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, ChevronDown, LogOut, Menu, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

// Mock data for events
const events = [
  { id: 1, name: "Summer Music Festival", date: "2023-07-15", location: "Central Park", attendees: 5000, image: "/placeholder.svg?height=400&width=600" },
  { id: 2, name: "Tech Conference 2023", date: "2023-08-22", location: "Convention Center", attendees: 2000, image: "/placeholder.svg?height=400&width=600" },
  { id: 3, name: "Food & Wine Expo", date: "2023-09-10", location: "City Hall", attendees: 3000, image: "/placeholder.svg?height=400&width=600" },
  { id: 4, name: "Art Gallery Opening", date: "2023-10-05", location: "Downtown Museum", attendees: 500, image: "/placeholder.svg?height=400&width=600" },
  { id: 5, name: "Marathon 2023", date: "2023-11-12", location: "City Streets", attendees: 10000, image: "/placeholder.svg?height=400&width=600" },
  { id: 6, name: "Winter Wonderland", date: "2023-12-20", location: "City Square", attendees: 7500, image: "/placeholder.svg?height=400&width=600" },
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
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-primary">Event Organizer</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink href="/" active={false}>Home</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 border-primary text-gray-900">
                    Events <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/events/festivals" className="w-full">Festivals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/events/workshops" className="w-full">Workshops</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/events/performances" className="w-full">Performances</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/events/competitions" className="w-full">Competitions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/events" className="w-full">All Events</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <NavLink href="/contact" active={false}>Contact</NavLink>
                <NavLink href="/merchandise" active={false}>Merchandise</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/about" className="w-full">About Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/faq" className="w-full">FAQ</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/blog" className="w-full">Blog</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="hidden sm:flex items-center">
              <div className="flex-shrink-0">
                <span className="text-sm font-medium text-gray-500 mr-2">Hello, {user.name}</span>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
            <div className="flex items-center sm:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <MobileNavLink href="/" active={false}>Home</MobileNavLink>
              <MobileNavLink href="/events" active={true}>All Events</MobileNavLink>
              <MobileNavLink href="/events/festivals" active={false}>Festivals</MobileNavLink>
              <MobileNavLink href="/events/workshops" active={false}>Workshops</MobileNavLink>
              <MobileNavLink href="/events/performances" active={false}>Performances</MobileNavLink>
              <MobileNavLink href="/events/competitions" active={false}>Competitions</MobileNavLink>
              <MobileNavLink href="/contact" active={false}>Contact</MobileNavLink>
              <MobileNavLink href="/merchandise" active={false}>Merchandise</MobileNavLink>
              <MobileNavLink href="/about" active={false}>About Us</MobileNavLink>
              <MobileNavLink href="/faq" active={false}>FAQ</MobileNavLink>
              <MobileNavLink href="/blog" active={false}>Blog</MobileNavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="bg-cover bg-center h-96 flex items-center justify-center" style={{backgroundImage: 'url("/placeholder.svg?height=800&width=1200")'}}>
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl md:text-2xl mb-8">Find and join exciting events in your area</p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
            Explore Events
          </Button>
        </div>
      </div>

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
                <Card 
                  key={event.id} 
                  className="transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-102 overflow-hidden"
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
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
              <p className="text-sm text-gray-600">Event Organizer is your go-to platform for discovering and organizing amazing events.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Home</Link></li>
                <li><Link href="/events" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">All Events</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Contact</Link></li>
                <li><Link href="/merchandise" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Merchandise</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">FAQ</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-400">&copy; 2023 Event Organizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
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
 is Home Page</div>
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