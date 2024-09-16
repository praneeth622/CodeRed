import { useState } from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, ChevronDown, Menu } from 'lucide-react'

export function Navbar({ user, mobileMenuOpen, setMobileMenuOpen }) {
  return (
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
    </nav>
  )
}

function NavLink({ href, active, children }) {
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
