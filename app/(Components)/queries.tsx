// pages/admin/queries.tsx
"use client";

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const initialQueries = [
  { id: 1, user: 'user1@example.com', query: 'How can I update my registration?', status: 'Pending' },
  { id: 2, user: 'user2@example.com', query: 'What is the refund policy?', status: 'Resolved' }
];

export default function HandleQueries() {
  const [queries] = useState(initialQueries);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Handle User Queries</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Query</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.map(query => (
              <TableRow key={query.id}>
                <TableCell>{query.id}</TableCell>
                <TableCell>{query.user}</TableCell>
                <TableCell>{query.query}</TableCell>
                <TableCell>{query.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
