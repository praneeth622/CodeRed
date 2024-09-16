import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const products = [
  {
    id: 1,
    name: 'Festival T-Shirt',
    price: 299,
    image: '/images/festival-tshirt.svg',
  },
  {
    id: 2,
    name: 'Festival Cap',
    price: 149,
    image: '/images/festival-cap.svg',
  },
  {
    id: 3,
    name: 'Festival Mug',
    price: 99,
    image: '/images/festival-mug.svg',
  },
  {
    id: 4,
    name: 'Festival Hoodie',
    price: 599,
    image: '/images/festival-hoodie.svg',
  },
];

export default function StorePage() {
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Festival Merchandise</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
              <Button className="w-full">View</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
