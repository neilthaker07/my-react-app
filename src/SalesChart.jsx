import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// 1. Your raw JSON data (this could come from a fetch/API call)
const jsonData = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 2000, profit: 9800 },
  { month: "Apr", sales: 2780, profit: 3908 },
  { month: "May", sales: 1890, profit: 4800 },
  { month: "Jun", sales: 2390, profit: 3800 }
];

export default function SalesChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Monthly Revenue</h2>
      
      {/* ResponsiveContainer makes the chart shrink/grow with the screen */}
      <ResponsiveContainer width="100%" height="100%">
        
        {/* Pass your JSON array directly into the 'data' prop */}
        <BarChart data={jsonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          
          {/* Background grid lines */}
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* dataKey tells the axis which JSON property to use for the labels */}
          <XAxis dataKey="month" />
          <YAxis />
          
          {/* Built-in hover effects */}
          <Tooltip />
          <Legend />
          
          {/* dataKey tells the Bar which JSON property to use for the height */}
          <Bar dataKey="sales" fill="#8884d8" name="Total Sales" />
          <Bar dataKey="profit" fill="#82ca9d" name="Net Profit" />
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}