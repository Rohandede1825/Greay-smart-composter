'use client'

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function page() {
  const generateExcel = () => {
    // Example JSON data



    
    const data = [
      { Name: 'John', Age: 28, Country: 'USA' },
      { Name: 'Anna', Age: 22, Country: 'UK' },
    ];

    // Convert JSON to sheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Create Excel buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create a Blob and download
    const blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'example.xlsx');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Download Excel File</h1>
      <button onClick={generateExcel}>Generate Excel</button>
    </main>
  );
}
