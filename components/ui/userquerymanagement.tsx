// pages/admin/queries.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

type Query = {
  id: number;
  userName: string;
  userEmail: string;
  message: string;
  responded: boolean;
};

export default function UserQueryManagement() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    // Fetch queries
    axios.get('/api/queries')
      .then(response => setQueries(response.data))
      .catch(error => console.error('Error fetching queries:', error));
  }, []);

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(e.target.value);
  };

  const respondToQuery = (id: number) => {
    axios.post(`/api/queries/${id}/respond`, { response })
      .then(() => {
        setQueries(queries.map(query =>
          query.id === id
            ? { ...query, responded: true }
            : query
        ));
        setResponse('');
      })
      .catch(error => console.error('Error responding to query:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Handle User Queries</h1>
      <div className="mt-8 space-y-4">
        {queries.map(query => (
          <div key={query.id} className="border-b border-gray-200 py-2">
            <h3 className="text-lg font-semibold">User: {query.userName}</h3>
            <p>Email: {query.userEmail}</p>
            <p>Message: {query.message}</p>
            {!query.responded && (
              <div>
                <TextField
                  label="Response"
                  value={response}
                  onChange={handleResponseChange}
                  fullWidth
                  multiline
                  rows={4}
                />
                <Button onClick={() => respondToQuery(query.id)} variant="contained" className="mt-2">
                  Respond
                </Button>
              </div>
            )}
            {query.responded && <p className="text-green-500">Responded</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
