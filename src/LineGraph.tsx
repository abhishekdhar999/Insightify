// src/components/LineGraph.tsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { loadCSVData, SalaryData } from './dataLoader';

const LineGraph: React.FC = () => {
  const [data, setData] = useState<SalaryData[]>([]);

  useEffect(() => {
    loadCSVData('salaries.csv').then((data) => {
      setData(data);
    });
  }, []);

  const aggregatedData = data.reduce((acc: any[], curr) => {
    const found = acc.find((item) => item.work_year === curr.work_year);
    if (found) {
      found.totalJobs += 1;
      found.totalSalary += curr.salary_in_usd;
    } else {
      acc.push({
        work_year: curr.work_year,
        totalJobs: 1,
        totalSalary: curr.salary_in_usd,
      });
    }
    return acc;
  }, []).map(item => ({
    work_year: item.work_year,
    totalJobs: item.totalJobs,
    avgSalary: item.totalSalary / item.totalJobs,
  }));

  return (
    <LineChart width={600} height={300} data={aggregatedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="work_year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
      <Line type="monotone" dataKey="avgSalary" stroke="#82ca9d" />
    </LineChart>
  );
};

export default LineGraph;
