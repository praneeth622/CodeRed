// pages/admin/sales.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

type Sale = {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
};

export default function SalesManagement() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    // Fetch sales
    axios.get('/api/sales')
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Monitor Merchandise Sales</h1>
      <div className="mt-8 space-y-4">
        {sales.map(sale => (
          <div key={sale.id} className="border-b border-gray-200 py-2">
            <h3 className="text-lg font-semibold">Product ID: {sale.productId}</h3>
            <p>Quantity Sold: {sale.quantity}</p>
            <p>Total Price: ₹{sale.totalPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
