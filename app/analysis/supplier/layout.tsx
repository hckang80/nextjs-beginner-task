import { BidAnnouncementContext, fetcher, KeywordSet } from '@/lib';
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

  const data = await Promise.all([
    queryClient.fetchQuery({
      queryKey: ['bidAnnouncementContext'],
      queryFn: () => fetcher<BidAnnouncementContext>(`${origin}/bidAnnouncementContext.json`)
    }),
    queryClient.fetchQuery({
      queryKey: ['keywordSets'],
      queryFn: () => fetcher<KeywordSet[]>(`${origin}/keywordSets.json`)
    })
  ]);

  return <LayoutDataProvider data={{ data }}>{children}</LayoutDataProvider>;
}
