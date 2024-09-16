import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const performances = [
  {
    id: 1,
    title: "Stage Drama",
    description: "Watch a captivating stage performance by talented artists.",
    date: "August 20, 2023",
    prize: "₹8,000",
    image: "/images/stage-drama.jpg"
  },
  {
    id: 2,
    title: "Music Performance",
    description: "Enjoy live performances by various music bands.",
    date: "August 21, 2023",
    prize: "₹12,000",
    image: "/images/music-performance.jpg"
  }
]

const PerformancesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Performances</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performances.map((performance) => (
          <Card key={performance.id} className="flex flex-col">
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={performance.image}
                  alt={performance.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{performance.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2">{performance.description}</p>
              <p className="text-sm text-gray-500">Date: {performance.date}</p>
              <p className="text-sm text-gray-500">Prize: {performance.prize}</p>
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

export default PerformancesPage
