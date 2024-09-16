import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const competitions = [
  {
    id: 1,
    title: "Dance Competition",
    description: "Show off your best moves in this exciting dance competition!",
    date: "August 15, 2023",
    prize: "₹10,000",
    image: "/images/dance-competition.jpg"
  },
  {
    id: 2,
    title: "Singing Contest",
    description: "Let your voice shine in our annual singing contest!",
    date: "August 16, 2023",
    prize: "₹15,000",
    image: "/images/singing-contest.jpg"
  },
  {
    id: 3,
    title: "Art Exhibition",
    description: "Display your artistic talents and compete for the top prize!",
    date: "August 17, 2023",
    prize: "₹12,000",
    image: "/images/art-exhibition.jpg"
  }
]

const CompetitionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Competitions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((competition) => (
          <Card key={competition.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={competition.image}
                  alt={competition.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{competition.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">{competition.description}</p>
              <p className="text-sm text-gray-500">Date: {competition.date}</p>
              <p className="text-sm text-gray-500">Prize: {competition.prize}</p>
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

export default CompetitionsPage