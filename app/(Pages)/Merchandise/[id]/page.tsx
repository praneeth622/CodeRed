"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

export default function ProductDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [product, setProduct] = useState<any>(null); // Product state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const { id } = useParams(); // Use next/navigation's useParams to get the product id from the route

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Id is :',id)
      try {
        const res = await fetch(`/api/merchandise/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Razorpay integration
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isRazorpayLoaded = await loadRazorpayScript();

    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK failed to load. Please try again later.");
      return;
    }

    // Assuming the amount is the product price; Razorpay expects the amount in paise
    const amount = product?.price ? product.price * 100 : 0;

    try {
      const options = {
        key: "rzp_test_7kbetSV9IQQW2J", // Your Razorpay test key
        amount: amount,
        currency: "INR",
        name: "Event Oragniser",
        description: `Purchase of ${product?.name}`,
        handler: function (response: any) {
          // Handle payment response
          const paymentResponse = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          console.log("Payment successful:", paymentResponse);
          toast.success("paymentResponse successful")
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error during payment processing:", err);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-xl font-bold">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg ">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col gap-4 text-black">
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>
          <h2 className="text-2xl font-semibold">Price: ₹{product.price}</h2>

          {/* Purchase Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto  text-white hover:bg-gray-800" size="lg">
                Buy Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-black">Complete Your Purchase</DialogTitle>
              </DialogHeader>

              {/* Purchase Form */}
              <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-semibold text-gray-800">Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="font-semibold text-gray-800">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className="font-semibold text-gray-800">Address</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode" className="font-semibold text-gray-800">Pincode</Label>
                  <Input
                    id="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-black"
                  />
                </div>

                <Button type="submit" className="bg-white text-black hover:bg-gray-800">
                  Complete Purchase
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}
