"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LogOut, Menu, Bell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = { name: 'John Doe', avatar: '/path/to/avatar.jpg' }; // Replace with actual user data or context

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-2xl font-bold text-primary cursor-pointer">Event Organizer</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 border-primary text-gray-900">
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-primary text-gray-900">
                    Events <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 p-2 bg-white border rounded shadow-lg">
                    <DropdownMenuItem>
                      <Link href="/Events/Festivals" className="block w-full px-4 py-2 text-sm">Festivals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Workshops" className="block w-full px-4 py-2 text-sm">Workshops</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Performances" className="block w-full px-4 py-2 text-sm">Performances</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events/Competitions" className="block w-full px-4 py-2 text-sm">Competitions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/Events" className="block w-full px-4 py-2 text-sm">All Events</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/Contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                  Contact
                </Link>
                <Link href="/Merchandise" className="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                  Merchandise
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 p-2 bg-white border rounded shadow-lg">
                    <DropdownMenuItem>
                      <Link href="/More/About" className="block w-full px-4 py-2 text-sm">About Us</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/More/Faq" className="block w-full px-4 py-2 text-sm">FAQ</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              {/* Notifications Icon */}
              <Link href="/Notifications" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </Link>
              {/* Create Event Icon */}
              <Link href="/CreateEvent" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <PlusCircle className="h-5 w-5" />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-sm font-medium text-gray-500 mr-2">Hello, {user.name}</span>
                  </div>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 p-2 bg-white border rounded shadow-lg">
                  <DropdownMenuItem>
                    <Link href="/Profile" className="block w-full px-4 py-2 text-sm">Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-900 bg-gray-100">
                Home
              </Link>
              <Link href="/Events" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                All Events
              </Link>
              <Link href="/Events/Festivals" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Festivals
              </Link>
              <Link href="/Events/Workshops" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Workshops
              </Link>
              <Link href="/Events/Performances" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Performances
              </Link>
              <Link href="/Events/Competitions" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Competitions
              </Link>
              <Link href="/Contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Contact
              </Link>
              <Link href="/Merchandise" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Merchandise
              </Link>
              <Link href="/About" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                About Us
              </Link>
              <Link href="/Faq" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                FAQ
              </Link>
              <Link href="/Blog" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
                Blog
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
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
                <Button variant="ghost" size="sm" className="ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
