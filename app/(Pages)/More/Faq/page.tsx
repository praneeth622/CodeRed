"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:text-blue-600 text-gray-700 bg-gray-100 hover:bg-blue-50 rounded-md [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all text-gray-600 bg-white rounded-b-md shadow-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 px-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out">
        <AccordionItem value="item-1">
          <AccordionTrigger>When and where is the college fest taking place?</AccordionTrigger>
          <AccordionContent>
            Our college fest is scheduled for [Date] at [Venue/Location]. The event will run from [Start Time] to [End Time].
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How can I register for the fest?</AccordionTrigger>
          <AccordionContent>
            You can register for the fest through our online portal at [Registration Link]. Early bird registrations are open until [Early Bird Deadline], after which standard registration fees will apply.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What events and activities are planned for the fest?</AccordionTrigger>
          <AccordionContent>
            Our fest features a wide range of events including musical performances, dance competitions, tech showcases, literary events, sports tournaments, and much more. Check our Events page for a full schedule and details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Is there a dress code for the fest?</AccordionTrigger>
          <AccordionContent>
            While there's no strict dress code, we encourage attendees to dress comfortably and appropriately. Some specific events might have dress requirements, which will be mentioned in their individual guidelines.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Can non-students attend the fest?</AccordionTrigger>
          <AccordionContent>
            Yes, our fest is open to everyone! We welcome students from other colleges, alumni, and the general public. However, some events might be restricted to student participants only.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Are there food and beverage options available?</AccordionTrigger>
          <AccordionContent>
            Yes, we'll have a variety of food stalls and beverage stations set up throughout the venue. From local delicacies to popular snacks, there will be options to suit every palate.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What's the refund policy for registration fees?</AccordionTrigger>
          <AccordionContent>
            Refunds are available for cancellations made up to [Refund Deadline] before the event. After this date, we unfortunately cannot offer refunds. Please check our Terms and Conditions page for more details.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>How can I volunteer or help organize the fest?</AccordionTrigger>
          <AccordionContent>
            We're always looking for enthusiastic volunteers! If you'd like to help organize or volunteer during the fest, please fill out the volunteer form on our website or contact our organizing committee at [Contact Email].
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>Is parking available at the venue?</AccordionTrigger>
          <AccordionContent>
            Limited parking is available at the venue on a first-come, first-served basis. We encourage attendees to use public transportation or carpooling services when possible. There are also paid parking lots near the venue.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>Who are the sponsors for this year's fest?</AccordionTrigger>
          <AccordionContent>
            We're grateful to have a number of sponsors supporting our fest this year. Please visit our Sponsors page to see the full list of our generous sponsors and partners.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
