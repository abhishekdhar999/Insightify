// src/components/AggregatedJobTitles.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { loadCSVData, SalaryData } from './dataLoader';

interface JobTitleData {
  job_title: string;
  count: number;
}

interface AggregatedJobTitlesProps {
  year: number;
}

const AggregatedJobTitles: React.FC<AggregatedJobTitlesProps> = ({ year }) => {
  const [data, setData] = useState<JobTitleData[]>([]);

  useEffect(() => {
    loadCSVData('salaries.csv').then((data) => {
      const filteredData = data.filter((item) => item.work_year === year);
      const aggregatedData = filteredData.reduce((acc: any[], curr) => {
        const found = acc.find((item) => item.job_title === curr.job_title);
        if (found) {
          found.count += 1;
        } else {
          acc.push({
            job_title: curr.job_title,
            count: 1,
          });
        }
        return acc;
      }, []);
      setData(aggregatedData);
    });
  }, [year]);

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    }
  ];

  return <Table columns={columns} dataSource={data} rowKey="job_title" />;
};

export default AggregatedJobTitles;
