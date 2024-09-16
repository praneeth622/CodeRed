import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import img1 from '../../../../assets/painting.jpg'
import img2 from '../../../../assets/Photography.jpg'

const workshops = [
  {
    id: 1,
    title: "Photography Workshop",
    description: "Learn the art of photography from professionals.",
    date: "August 22, 2023",
    prize: "₹7,000",
    image: img2
  },
  {
    id: 2,
    title: "Painting Workshop",
    description: "Improve your painting skills with hands-on sessions.",
    date: "August 23, 2023",
    prize: "₹6,000",
    image: img1
  }
]

const WorkshopsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Workshops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{workshop.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">{workshop.description}</p>
              <p className="text-sm text-gray-500">Date: {workshop.date}</p>
              <p className="text-sm text-gray-500">Prize: {workshop.prize}</p>
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

export default WorkshopsPage
