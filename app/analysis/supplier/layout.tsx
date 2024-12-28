import { fetcher, getOrigin, Supplier } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { LayoutDataProvider } from './LayoutContextProvider';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const origin = await getOrigin();
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['supplierList'],
    queryFn: () => fetcher<Supplier[]>(`${origin}/supplierList.json`)
  });

  return <LayoutDataProvider data={{ data }}>{children}</LayoutDataProvider>;
}
