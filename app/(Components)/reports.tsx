// pages/admin/reports.tsx
"use client";

import { useState } from 'react';
import { Button, TextField } from '@mui/material';

export default function GenerateReports() {
  const [reportType, setReportType] = useState('');

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} report`);
    // Add actual report generation logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Generate Reports</h1>

      <div className="my-4">
        <TextField
          label="Report Type"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="my-2"
        />
        <Button variant="contained" onClick={handleGenerateReport} className="mt-2">
          Generate Report
        </Button>
      </div>
    </div>
  );
}
