import { getOrigin, fetcher, BidAnnouncementContext, Tag } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { LayoutDataProvider } from './LayoutContextProvider';
import { FavoriteListProvider } from './context/UseFavoriteListContext';

export default async function BidFavoriteLayout({
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
      queryKey: ['tags'],
      queryFn: () => fetcher<Tag[]>(`${origin}/tags.json`)
    }),
    queryClient.fetchQuery({
      queryKey: ['appliedTags'],
      queryFn: () => fetcher<Tag[]>(`${origin}/appliedTags.json`)
    })
  ]);

  return (
    <LayoutDataProvider data={{ data }}>
      <FavoriteListProvider>{children}</FavoriteListProvider>
    </LayoutDataProvider>
  );
}
