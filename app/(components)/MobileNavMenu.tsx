import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'

export function MobileNavMenu({ mobileMenuOpen, user }) {
  if (!mobileMenuOpen) return null

  return (
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
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">{user.name}</div>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MobileNavLink({ href, active, children }) {
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
