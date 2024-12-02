import { BidAnnouncementContext, fetcher, KeywordSet } from '@/lib';
import { BidAnnouncementProvider } from './context/BidAnnouncementContext';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const { origin } = new URL(headersList.get('referer') || '');
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.fetchQuery({
      queryKey: ['bidAnnouncementContext'],
      queryFn: () => fetcher<BidAnnouncementContext>(`${origin}/bidAnnouncementContext.json`)
    }),
    queryClient.fetchQuery({
      queryKey: ['keywordSets'],
      queryFn: () => fetcher<KeywordSet[]>(`${origin}/keywordSets.json`)
    })
  ]);

  return <BidAnnouncementProvider>{children}</BidAnnouncementProvider>;
}
