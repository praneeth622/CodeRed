'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, CreditCard, Package } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

// Mock data for demonstration
const userData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  avatar: "/placeholder.svg?height=100&width=100",  
  registrations: [
    { id: 1, event: "Dance Competition", date: "2023-08-15", status: "Confirmed" },
    { id: 2, event: "Music Concert", date: "2023-08-16", status: "Pending" },
  ],
  payments: [
    { id: 101, amount: 50, date: "2023-07-30", status: "Paid" },
    { id: 102, amount: 30, date: "2023-08-01", status: "Processing" },
  ],
  orders: [
    { id: 201, item: "Festival T-Shirt", quantity: 2, status: "Shipped" },
    { id: 202, item: "VIP Pass", quantity: 1, status: "Processing" },
  ],
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("registrations")
  const user = useUser()

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl ">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.user?.imageUrl} alt="User Avatar" />
          <AvatarFallback>{user.user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
          <div>
            <CardTitle>{user.user?.fullName}</CardTitle>
            <CardDescription>{user.user?.emailAddresses[0].emailAddress}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
          >
            <TabsContent value="registrations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Registrations</CardTitle>
                  <CardDescription>Events you've signed up for</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.registrations.map((reg) => (
                    <div key={reg.id} className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{reg.event}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {reg.date}
                        </div>
                      </div>
                      <Badge variant={reg.status === "Confirmed" ? "default" : "secondary"}>
                        {reg.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Your recent payments</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.payments.map((payment) => (
                    <div key={payment.id} className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">${payment.amount}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CreditCard className="mr-2 h-4 w-4" />
                          {payment.date}
                        </div>
                      </div>
                      <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>Items you've purchased</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.orders.map((order) => (
                    <div key={order.id} className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{order.item}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Package className="mr-2 h-4 w-4" />
                          Quantity: {order.quantity}
                        </div>
                      </div>
                      <Badge variant={order.status === "Shipped" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}