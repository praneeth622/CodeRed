// app/(Pages)/Merchandise/[id]/page.tsx
"use client"
import Image from 'next/image';
import { useState } from 'react';

const products = [
  { id: '1', name: 'Festival T-Shirt', description: 'Comfortable and stylish festival t-shirt.', price: 299, image: '/images/festival-tshirt.svg' },
  { id: '2', name: 'Festival Cap', description: 'Cool cap for festival-goers.', price: 149, image: '/images/festival-cap.svg' },
  { id: '3', name: 'Festival Mug', description: 'Mug for your festival drinks.', price: 99, image: '/images/festival-mug.svg' },
  { id: '4', name: 'Festival Hoodie', description: 'Warm hoodie for cool festival nights.', price: 599, image: '/images/festival-hoodie.svg' },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find(prod => prod.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-4 mx-auto max-w-7xl">Product not found</div>; // Simple fallback
  }

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">{product.name}</h1>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto mb-4 lg:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-md"
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
            
            {/* Quantity Selector */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border-gray-300 rounded-md shadow-sm"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            {/* Button */}
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
