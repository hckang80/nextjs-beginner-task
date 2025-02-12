import { getOrigin, fetcher, BidAnnouncementContext, Tag, AppliedTag } from '@/lib';
import { QueryClient } from '@tanstack/react-query';
import { LayoutDataProvider } from './LayoutContextProvider';

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
      queryFn: () => fetcher<AppliedTag[]>(`${origin}/appliedTags.json`)
    })
  ]);

  return <LayoutDataProvider data={{ data }}>{children}</LayoutDataProvider>;
}
