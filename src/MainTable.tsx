// src/components/MainTable.tsx
// src/components/MainTable.tsx
// src/components/MainTable.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { loadCSVData, SalaryData } from './dataLoader';


const MainTable: React.FC<{ onRowClick: (year: number) => void }> = ({ onRowClick }) => {
  const [data, setData] = useState<SalaryData[]>([]);

  useEffect(() => {
    loadCSVData('/salaries.csv').then((data) => {
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

  console.log(aggregatedData);
  const columns = [
    {
      title: 'Year',
      dataIndex: 'work_year',
      key: 'work_year',
      sorter: (a: any, b: any) => a.work_year - b.work_year,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a: any, b: any) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'avgSalary',
      key: 'avgSalary',
      sorter: (a: any, b: any) => a.avgSalary - b.avgSalary,
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={aggregatedData}
      rowKey="work_year"
      onRow={(record) => {
        return {
          onClick: () => {
            onRowClick(record.work_year);
          }
        };
      }}
    />
  );
};

export default MainTable;
