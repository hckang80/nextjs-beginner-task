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
  const url = headersList.get('referer') || '';
  const { origin } = new URL(url);
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
      <LayoutDataProvider data={{ data, url }}>{children}</LayoutDataProvider>
      {/* TODO: url - 클라이언트 사이드에서 접근 가능하기 위해 전달함 */}
    </BidAnnouncementProvider>
  );
}
