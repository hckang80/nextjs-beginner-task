import { BidAnnouncementProvider } from './context/BidAnnouncementContext';

export default function BidFavoriteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BidAnnouncementProvider>{children}</BidAnnouncementProvider>;
}
