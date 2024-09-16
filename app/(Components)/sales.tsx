// pages/admin/sales.tsx
"use client";

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const initialSales = [
  { id: 1, item: 'Festival T-Shirt', quantity: 10, totalAmount: 2990 },
  { id: 2, item: 'Festival Cap', quantity: 5, totalAmount: 745 }
];

export default function MonitorSales() {
  const [sales] = useState(initialSales);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Monitor Merchandise Sales</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.item}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>₹{sale.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
