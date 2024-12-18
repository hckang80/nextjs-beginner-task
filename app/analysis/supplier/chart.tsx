'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Supplier } from '@/lib';

const BarChart = ({ supplierList }: { supplierList: Supplier[] }) => {
  console.log({ supplierList });
  const data = {
    labels: ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM'],
    datasets: [
      {
        label: '계약',
        data: [128, 70, 189, 48, 2, 77, 46],
        backgroundColor: '#2698f9'
      },
      {
        label: '낙찰',
        data: [35, 115, 188, 148, 84, 193, 177],
        backgroundColor: '#45e29e'
      },
      {
        label: '실주',
        data: [86, 156, 62, 22, 150, 59, 68],
        backgroundColor: '#fda627'
      }
    ]
  };

  const options = {
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
