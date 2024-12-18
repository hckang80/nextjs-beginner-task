import { BidAnnouncementContext, fetcher, getOrigin, KeywordSet } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { LayoutDataProvider } from './LayoutContextProvider';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const origin = getOrigin(await headers());
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
