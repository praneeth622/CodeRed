import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"   

const Footer = () => {
  return (
    <div>
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

export default Footer