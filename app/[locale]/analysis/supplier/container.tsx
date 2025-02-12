'use client';

import { fetcher, Supplier } from '@/lib';
import SupplierChart from './chart';
import { useLayoutData } from './LayoutContextProvider';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';

export default function SupplierContainer() {
  const { data } = useLayoutData();

  const { data: supplierList } = useQuery({
    queryKey: ['supplierList'],
    queryFn: () => fetcher<Supplier[]>('/supplierList.json'),
    initialData: data
  });

  return (
    <>
      <header className="flex items-center justify-between mb-[15px]">
        <h2 className="text-[18px] font-bold text-indigo-600">공급 기업</h2>
      </header>

      <Card className="p-[20px] grid gap-[10px]">
        <div className="flex gap-[10px]">
          <Card className="p-[10px] grow">
            <SupplierChart supplierList={supplierList} />
          </Card>
          <Card className="shrink-0 basis-[300px]">insert table</Card>
        </div>
        <Card>insert table</Card>
        <Card>insert table</Card>
      </Card>
    </>
  );
}
