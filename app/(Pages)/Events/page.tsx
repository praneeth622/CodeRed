import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import img1 from '../../../assets/Dance.jpg'
import img2 from '../../../assets/song.jpg'
import img3 from '../../../assets/Art.jpg'
import img4 from '../../../assets/Cultural.jpg'
import img5 from '../../../assets/Food.jpg'
import img6 from '../../../assets/Stage.jpg'
import img7 from '../../../assets/painting.jpg'
import img8 from '../../../assets/Photography.jpg'
import img9 from '../../../assets/Singing.jpg'

const competitions = [
  {
    id: 1,
    title: "Dance Competition",
    description: "Show off your best moves in this exciting dance competition!",
    date: "August 15, 2023",
    prize: "₹10,000",
    image: img1
  },
  {
    id: 2,
    title: "Singing Contest",
    description: "Let your voice shine in our annual singing contest!",
    date: "August 16, 2023",
    prize: "₹15,000",
    image: img2
  },
  {
    id: 3,
    title: "Art Exhibition",
    description: "Display your artistic talents and compete for the top prize!",
    date: "August 17, 2023",
    prize: "₹12,000",
    image: img3
  }
]

const festivals = [
  {
    id: 1,
    title: "Cultural Festival",
    description: "Experience a vibrant celebration of different cultures!",
    date: "August 18, 2023",
    prize: "₹20,000",
    image: img4
  },
  {
    id: 2,
    title: "Food Festival",
    description: "Enjoy a variety of cuisines from across the globe!",
    date: "August 19, 2023",
    prize: "₹5,000",
    image: img5
  }
]

const performances = [
  {
    id: 1,
    title: "Stage Drama",
    description: "Watch a captivating stage performance by talented artists.",
    date: "August 20, 2023",
    prize: "₹8,000",
    image: img6
  },
  {
    id: 2,
    title: "Music Performance",
    description: "Enjoy live performances by various music bands.",
    date: "August 21, 2023",
    prize: "₹12,000",
    image: img9
  }
]

const workshops = [
  {
    id: 1,
    title: "Photography Workshop",
    description: "Learn the art of photography from professionals.",
    date: "August 22, 2023",
    prize: "₹7,000",
    image: img8
  },
  {
    id: 2,
    title: "Painting Workshop",
    description: "Improve your painting skills with hands-on sessions.",
    date: "August 23, 2023",
    prize: "₹6,000",
    image: img7
  }
]

const allEvents = [...competitions, ...festivals, ...performances, ...workshops];

const AllEventsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEvents.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={event.image}
                  alt={event.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">Date: {event.date}</p>
              <p className="text-sm text-gray-500">Prize: {event.prize}</p>
            </CardContent>
            <div className="p-4 mt-auto">
              <Button className="w-full">Register</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AllEventsPage
