// pages/admin/reports.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export default function ReportGeneration() {
  const [report, setReport] = useState<string | null>(null);

  const generateReport = () => {
    axios.get('/api/reports')
      .then(response => setReport(response.data))
      .catch(error => console.error('Error generating report:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Generate Reports</h1>
      <div className="mt-8">
        <Button onClick={generateReport} variant="contained">Generate Report</Button>
        {report && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Report</h2>
            <pre>{report}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
