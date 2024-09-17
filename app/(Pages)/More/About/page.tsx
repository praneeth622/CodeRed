"use client"

import { motion } from 'framer-motion'
import { Calendar, MapPin, Music, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import image from '../../../assets/image.png' 

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen"
      >
        <Image

          src={image}

          alt="Festival Image"
          layout="fill"
          objectFit="cover"
          className="brightness-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-4"
          >
            Festiva 2023
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-black mb-8"
          >
            Experience the Magic of Our Annual Cultural Extravaganza
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-300 text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-bold text-blue-700 mb-6"
          {...fadeIn}
        >
          About Our Festival
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-700 mb-8"
          {...fadeIn}
        >
          Welcome to Festiva 2023, the annual cultural extravaganza that brings together talent, creativity, and enthusiasm from across the nation. This year, we're pushing boundaries and setting new standards in college festivals, offering an unforgettable experience for all participants and attendees.
        </motion.p>
        
        <motion.h3
          className="text-2xl font-semibold text-blue-600 mb-4"
          {...fadeIn}
        >
          Festival Highlights
        </motion.h3>
        
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {[{
              icon: <Music className="w-6 h-6 text-blue-600" />,
              text: "Live performances by top artists"
            },
            {
              icon: <Star className="w-6 h-6 text-blue-600" />,
              text: "Talent showcases and competitions"
            },
            {
              icon: <Users className="w-6 h-6 text-blue-600" />,
              text: "Interactive workshops and seminars"
            },
            {
              icon: <MapPin className="w-6 h-6 text-blue-600" />,
              text: "Food courts with diverse cuisines"
          }].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg shadow-md"
              variants={fadeIn}
            >

              <span className="text-indigo-600">{item.icon}</span>
              <span className='text-black'>{item.text}</span>

            </motion.li>
          ))}
        </motion.ul>
        
        <motion.h3
          className="text-2xl font-semibold text-blue-600 mb-4"
          {...fadeIn}
        >
          Event Timeline
        </motion.h3>
        
        <motion.div
          className="space-y-4 mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {[{
              date: "March 15",
              event: "Opening Ceremony"
            },
            {
              date: "March 16-17",
              event: "Cultural Competitions"
            },
            {
              date: "March 18",
              event: "Celebrity Performance Night"
            },
            {
              date: "March 19",
              event: "Closing Ceremony & Awards"
          }].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4"
              variants={fadeIn}
            >

              <div className="flex-shrink-0 w-32 text-right font-semibold text-indigo-600">{item.date}</div>
              <div className="w-px h-4 bg-indigo-300"></div>
              <div className='text-black'>{item.event}</div>

            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="bg-blue-50 p-8 rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">

              <Calendar className="w-6 h-6 text-indigo-600" />
              <span className="font-semibold text-black">March 15-19, 2023</span>

            </div>
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
