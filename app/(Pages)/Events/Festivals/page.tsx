import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import img1 from '../../../../assets/Cultural.jpg'
import img2 from '../../../../assets/Food.jpg'

const festivals = [
  {
    id: 1,
    title: "Cultural Festival",
    description: "Experience a vibrant celebration of different cultures!",
    date: "August 18, 2023",
    prize: "₹20,000",
    image: img1
  },
  {
    id: 2,
    title: "Food Festival",
    description: "Enjoy a variety of cuisines from across the globe!",
    date: "August 19, 2023",
    prize: "₹5,000",
    image: img2
  }
]

const FestivalsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Festivals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((festival) => (
          <Card key={festival.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={festival.image}
                  alt={festival.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{festival.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">{festival.description}</p>
              <p className="text-sm text-gray-500">Date: {festival.date}</p>
              <p className="text-sm text-gray-500">Prize: {festival.prize}</p>
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

export default FestivalsPage
