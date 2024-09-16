"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Load Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Mock data; replace this with actual data fetching
const products = [
  { id: '1', name: 'Festival T-Shirt', description: 'Comfortable and stylish festival t-shirt.', price: 299, image: 'https://picsum.photos/200' },
  { id: '2', name: 'Festival Cap', description: 'Cool cap for festival-goers.', price: 149, image: 'https://picsum.photos/200' },
  { id: '3', name: 'Festival Mug', description: 'Mug for your festival drinks.', price: 99, image: 'https://picsum.photos/200' },
  { id: '4', name: 'Festival Hoodie', description: 'Warm hoodie for cool festival nights.', price: 599, image: 'https://picsum.photos/200' },
];

export default function ProductDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    currency: "INR",
  });
  const [currency, setCurrency] = useState<string>("INR");
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  // Currency exchange rates
  const exchangeRates = {
    INR: 83.25,
    USD: 1,
    EUR: 0.92,
  };

  const { user } = useUser();
  const userId = user?.emailAddresses[0]?.emailAddress || "Unknown User";

  // Format currency based on the selected currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle currency selection change
  const handleCurrencyChange = (value: string) => {
    setFormData({ ...formData, currency: value });
    setCurrency(value);
  };

  // Handle form submission (integrated with Razorpay)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isRazorpayLoaded = await loadRazorpayScript();

    if (!isRazorpayLoaded) {
      // Handle error if Razorpay script fails to load
      console.error("Razorpay SDK failed to load. Please try again later.");
      return;
    }

    let amount = 0;
    // Here you need to calculate the amount based on the selected currency
    try {
      const options = {
        key: "rzp_test_7kbetSV9IQQW2J",
        amount: amount,
        currency: formData.currency,
        name: "Artly",
        description: "Purchase",
        handler: function (response: any) {
          const paymentResponse = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          // Handle payment response here
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error during payment processing:", err);
    }
  };

  if (!product) {
    return <p>Product not found</p>; // Handle product not found case
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="grid gap-2">
            <h2 className="text-xl font-semibold">Price:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.keys(exchangeRates).map((currency) => (
                <div
                  key={currency}
                  className="flex flex-col items-center p-4 bg-gray-100 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-500">
                    {currency}
                  </span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(product.price * exchangeRates[currency], currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto" size="lg">
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Complete Your Purchase</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select
                    required
                    value={formData.currency}
                    onValueChange={handleCurrencyChange}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Complete Purchase</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
