import { BidAnnouncementContext, fetcher, KeywordSet } from '@/lib';
import { BidAnnouncementProvider } from './context/BidAnnouncementContext';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { LayoutDataProvider } from './LayoutContextProvider';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { origin } = new URL(headersList.get('referer') || '');
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

  return (
    <BidAnnouncementProvider>
      <LayoutDataProvider data={{ data }}>{children}</LayoutDataProvider>
    </BidAnnouncementProvider>
  );
}
