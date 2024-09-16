"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock products data
const products = [
  { id: 1, name: 'Festival T-Shirt', price: 299, image: '/images/festival-tshirt.svg', category: 'Clothing' },
  { id: 2, name: 'Festival Cap', price: 149, image: '/images/festival-cap.svg', category: 'Accessories' },
  { id: 3, name: 'Festival Mug', price: 99, image: '/images/festival-mug.svg', category: 'Homeware' },
  { id: 4, name: 'Festival Hoodie', price: 599, image: '/images/festival-hoodie.svg', category: 'Clothing' },
];

// Mock cart data
const initialCart = [];

export default function StorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [cart, setCart] = useState(initialCart);

  // Filter products based on search query, category, and price range
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1])
  );

  // Add item to cart
  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Handle navigation to product details or cart page
  const handleNavigation = (id: number) => {
    router.push(`/Merchandise/${id}`);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Festival Merchandise</h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
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
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col items-center text-center transition-transform transform hover:scale-105"
          >
            <CardHeader>
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={`Image of ${product.name}`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              <p className="mt-2 text-xl font-bold">₹{product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product)} className="w-full">Add to Cart</Button>
              <Button onClick={() => handleNavigation(product.id)} className="w-full mt-2">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>₹{item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <Button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</Button>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <Button onClick={clearCart} className="bg-red-500 text-white">Clear Cart</Button>
              <Button onClick={handleCheckout} className="bg-black text-white">Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
