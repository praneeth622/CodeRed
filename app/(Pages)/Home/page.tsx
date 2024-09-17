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

import { Carousel ,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from '@/components/ui/carousel'
import image from '../../../assets/image.png'
import image1 from '../../../assets/Summer.jpg'
import image2 from '../../../assets/Stage.jpg'
import image3 from '../../../assets/Music1.jpg'
// Mock data for events
const events = [
  { id: 1, name: "Summer Music Festival", date: "2023-07-15", location: "Central Park", attendees: 5000, image: "https://picsum.photos/200/300", route: "/Events/Festivals/1" },
  { id: 2, name: "Tech Conference 2023", date: "2023-08-22", location: "Convention Center", attendees: 2000, image: "https://picsum.photos/200", route: "/Events/Workshops/2" },
  { id: 3, name: "Food & Wine Expo", date: "2023-09-10", location: "City Hall", attendees: 3000, image: "https://picsum.photos/200/300", route: "/Events/Festivals/3" },
  { id: 4, name: "Art Gallery Opening", date: "2023-10-05", location: "Downtown Museum", attendees: 500, image: "https://picsum.photos/200", route: "/Events/Performances/4" },
  { id: 5, name: "Marathon 2023", date: "2023-11-12", location: "City Streets", attendees: 10000, image: "https://picsum.photos/200/300", route: "/Events/Performances/5" },
  { id: 6, name: "Winter Wonderland", date: "2023-12-20", location: "City Square", attendees: 7500, image: "https://picsum.photos/200", route: "/Events/Festivals/6" },

]

// Mock user data
const user = {
  name: "John Doe",
  avatar: "/assets/avatar.jpg"
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
                <NavLink href="/" active={true}>Home</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1  text-sm font-medium transition-colors duration-200 border-primary text-gray-900">
                    Events <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/Events/Festivals" className="w-full">Festivals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Workshops" className="w-full">Workshops</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Performances" className="w-full">Performances</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Competitions" className="w-full">Competitions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events" className="w-full">All Events</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <NavLink href="/Contact" active={false}>Contact</NavLink>

                <NavLink href="/Merchandise" active={false}>Merchandise</NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/More/About" className="w-full">About Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/More/Faq" className="w-full">FAQ</Link>
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
              <MobileNavLink href="/" active={true}>
                <span className="underline">Home</span>
              </MobileNavLink>
              <MobileNavLink href="/Events" active={false}>All Events</MobileNavLink>
              <MobileNavLink href="/Events/Festivals" active={false}>Festivals</MobileNavLink>
              <MobileNavLink href="/Events/Workshops" active={false}>Workshops</MobileNavLink>
              <MobileNavLink href="/Events/Performances" active={false}>Performances</MobileNavLink>
              <MobileNavLink href="/Events/Competitions" active={false}>Competitions</MobileNavLink>
              <MobileNavLink href="/Contact" active={false}>Contact</MobileNavLink>
              <MobileNavLink href="/Merchandise" active={false}>Merchandise</MobileNavLink>
              <MobileNavLink href="/About" active={false}>About Us</MobileNavLink>
              <MobileNavLink href="/Faq" active={false}>FAQ</MobileNavLink>
              <MobileNavLink href="/Blog" active={false}>Blog</MobileNavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <a href="/Profile">
                <Link href="/Profile" className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                  </div>
                </Link>
                </a>
                <Button variant="ghost" size="sm" className="ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Carousel className="relative" opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          <CarouselItem className="w-48 h-24 relative">
            <Image

              src={image}

              alt="Event 1"
              width={200}
              height={100}
              layout="responsive"
              objectFit="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image

              src={image1}

              alt="Event 2"
              width={800}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image

              src={image2}

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
              className="w-full sm:w-64 text-black"
            />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px] text-black">
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
                <li><Link href="/Events" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">All Events</Link></li>
                <li><Link href="/Contact" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Contact</Link></li>
                <li><Link href="/Merchandise" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">Merchandise</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/More/Faq" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200">FAQ</Link></li>
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
    </Link>)

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