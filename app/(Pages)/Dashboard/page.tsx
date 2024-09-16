"use client"
import { useState } from 'react'
import { BarChart, Calendar, DollarSign, ShoppingCart, Users, Flag, CheckSquare, Wifi, PieChart, LineChart, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

const OverviewChart = () => (
  <ResponsiveBar
    data={[
      { month: 'Jan', revenue: 1000, attendees: 500 },
      { month: 'Feb', revenue: 1500, attendees: 700 },
      { month: 'Mar', revenue: 2000, attendees: 1000 },
      { month: 'Apr', revenue: 2500, attendees: 1200 },
      { month: 'May', revenue: 3000, attendees: 1500 },
      { month: 'Jun', revenue: 3500, attendees: 1800 },
    ]}
    keys={['revenue', 'attendees']}
    indexBy="month"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    colors={{ scheme: 'nivo' }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Month',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Value',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
      }
    ]}
  />
)

const EventTypesPieChart = () => (
  <ResponsivePie
    data={[
      { id: 'Conferences', value: 35 },
      { id: 'Workshops', value: 25 },
      { id: 'Webinars', value: 20 },
      { id: 'Networking', value: 15 },
      { id: 'Other', value: 5 },
    ]}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: 'nivo' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
  />
)

const AttendanceLineChart = () => (
  <ResponsiveLine
    data={[
      {
        id: "attendance",
        color: "hsl(240, 70%, 50%)",
        data: [
          { x: 'Jan', y: 500 },
          { x: 'Feb', y: 700 },
          { x: 'Mar', y: 1000 },
          { x: 'Apr', y: 1200 },
          { x: 'May', y: 1500 },
          { x: 'Jun', y: 1800 },
        ]
      }
    ]}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Month',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Attendance',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
  />
)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex flex-col h-screen">
      {/* <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">Event Manager</h1>
        </div>
        <nav className="flex space-x-4">
          <Button variant="ghost">Overview</Button>
          <Button variant="ghost">Attendees</Button>
          <Button variant="ghost">Events</Button>
          <Button variant="ghost">Settings</Button>
        </nav>
        <Input className="w-64" placeholder="Search..." type="search" />
      </header> */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Input type="date" className="w-auto" />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Merchandise Sales</CardTitle>
                  <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Flag className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12 new events this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
                  <CheckSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+7 completed this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Online Running Events</CardTitle>
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">5 starting in the next hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">44</div>
                  <p className="text-xs text-muted-foreground">Next event in 2 days</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full">
                    <OverviewChart />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
                  </CardContent>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00" },
                      { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
                      { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00" },
                      { name: "William Kim", email: "will@email.com", amount: "$99.00" },
                      { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" }
                    ].map((sale, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{sale.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{sale.name}</p>
                          <p className="text-sm text-muted-foreground">{sale.email}</p>
                        </div>
                        <div className="ml-auto font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <EventTypesPieChart />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <AttendanceLineChart />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Events</span>
                    <span>156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Attendees</span>
                    <span>12,543</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Revenue</span>
                    <span>$345,678</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Avg. Satisfaction Rate</span>
                    <span>4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "New event registration", time: "2 minutes ago" },
                    { title: "Upcoming event reminder", time: "1 hour ago" },
                    { title: "Payment received", time: "3 hours ago" },
                    { title: "New review posted", time: "1 day ago" },
                    { title: "Event capacity reached", time: "2 days ago" }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center">
                      <Bell className="w-4 h-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}