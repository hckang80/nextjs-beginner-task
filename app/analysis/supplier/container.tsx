'use client';

import { fetcher, Supplier } from '@/lib';
import SupplierChart from './chart';
import { useLayoutData } from './LayoutContextProvider';
import { useQuery } from '@tanstack/react-query';

export default function SupplierContainer() {
  const { data } = useLayoutData();

  const { data: supplierList } = useQuery({
    queryKey: ['supplierList'],
    queryFn: () => fetcher<Supplier[]>('/supplierList.json'),
    initialData: data
  });

  return <SupplierChart supplierList={supplierList} />;
}
