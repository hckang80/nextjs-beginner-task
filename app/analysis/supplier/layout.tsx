import { fetcher, Supplier } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { LayoutDataProvider } from './LayoutContextProvider';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const origin = `${protocol}://${host}`;
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ['supplierList'],
    queryFn: () => fetcher<Supplier>(`${origin}/supplierList.json`)
  });

  return <LayoutDataProvider data={{ data }}>{children}</LayoutDataProvider>;
}
