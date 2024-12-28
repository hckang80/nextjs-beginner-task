import { BidAnnouncementContext, fetcher, KeywordSet } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { LayoutDataProvider } from './LayoutContextProvider';
import { getOrigin } from '@/lib/server';

export default async function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const origin = await getOrigin();
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
