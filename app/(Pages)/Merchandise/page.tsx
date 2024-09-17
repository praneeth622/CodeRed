"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

const initialCart: any[] = [];

export default function StorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [cart, setCart] = useState(initialCart);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const res = await fetch("/api/merchandise", { signal: controller.signal });
        clearTimeout(timeoutId);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok) {
            setProducts(data);
          } else {
            throw new Error(data.error || "Failed to fetch products");
          }
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          toast.error('Request timed out');
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleNavigation = (id: number) => {
    router.push(`/Merchandise/${id}`);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (loading) {
    return <div className="text-center py-8 text-indigo-600 animate-pulse">Loading...</div>;
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl bg-gray-100">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
        Festival Merchandise
      </h1>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-2/3 p-3 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex justify-between flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black"
        >
          <option value="All">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Homeware">Homeware</option>
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Price"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center text-center transition-transform transform hover:scale-105 bg-white shadow-lg rounded-lg"
          >
            <CardHeader className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
              <Image
                src={product.image}
                alt={`Image of ${product.name}`}
                layout="fill"
                objectFit="contain"
                className="hover:scale-110 transition-all duration-300"
              />
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <CardTitle className="text-xl font-semibold text-gray-800">
                {product.name}
              </CardTitle>
              <p className="mt-2 text-lg font-bold text-indigo-600">
                ₹{product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-2 p-4">
              <Button
                onClick={() => addToCart(product)}
                className="bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition-all"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => handleNavigation(product.id)}
                className="bg-gray-800 text-black rounded-lg hover:bg-gray-900 transition-all"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-lg text-black-600">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div>
                  <h2 className="text-xl font-semibold text-black-800">
                    {item.name}
                  </h2>
                  <p className="text-lg text-black-600">
                    ₹{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition-all"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <Button
                onClick={clearCart}
                className="bg-red-600 text-black rounded-lg hover:bg-red-700 transition-all"
              >
                Clear Cart
              </Button>
              <Button
                onClick={handleCheckout}
                className="bg-green-600 text-black rounded-lg hover:bg-green-700 transition-all"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
