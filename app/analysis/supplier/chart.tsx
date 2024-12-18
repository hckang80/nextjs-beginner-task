'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Supplier, toReadableDate } from '@/lib';

const BarChart = ({ supplierList }: { supplierList: Supplier[] }) => {
  const data = {
    labels: supplierList.map(({ createdAt }) =>
      toReadableDate(createdAt, {
        year: '2-digit',
        month: '2-digit'
      })
    ),
    datasets: [
      {
        label: '계약',
        data: supplierList.map(({ contract }) => contract),
        backgroundColor: '#2698f9'
      },
      {
        label: '낙찰',
        data: supplierList.map(({ successful }) => successful),
        backgroundColor: '#45e29e'
      },
      {
        label: '실주',
        data: supplierList.map(({ failure }) => failure),
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
