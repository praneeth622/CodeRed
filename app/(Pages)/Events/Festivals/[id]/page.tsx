import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"

export default function EventDetails() {
  // In a real application, you would fetch this data from an API or database
  const event = {
    name: "Tech Conference 2023",
    description: "Join us for a day of cutting-edge technology talks and networking opportunities.",
    price: "$99.99",
    schedule: "September 15, 2023",
    timings: "9:00 AM - 5:00 PM",
    coordinators: [
      "Jane Doe (jane@example.com)",
      "John Smith (john@example.com)"
    ]
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{event.description}</p>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-semibold">Schedule:</span>
            <span>{event.schedule}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-semibold">Timings:</span>
            <span>{event.timings}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">Coordinators:</span>
          </div>
          <ul className="list-disc list-inside pl-5">
            {event.coordinators.map((coordinator, index) => (
              <li key={index}>{coordinator}</li>
            ))}
          </ul>
          
          <div className="mt-4">
            <span className="font-semibold text-lg">Price:</span>
            <span className="text-lg ml-2">{event.price}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Register Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}