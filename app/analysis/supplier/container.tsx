'use client';

import ReactWidget from '@meursyphus/flitter-react';
import { BarChart } from '@meursyphus/headless-chart';

export default function SupplierContainer() {
  const chart = BarChart({
    data: {
      labels: ['January', 'February', 'March'],
      datasets: [{ legend: 'Sales', values: [150, 200, 170] }]
    },
    title: 'Monthly Sales'
  });

  return <ReactWidget width="600px" height="400px" widget={chart} renderer="svg" />;
}
