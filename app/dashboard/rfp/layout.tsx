import { BidAnnouncementProvider } from './context/BidAnnouncementContext';

export default function RfpLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BidAnnouncementProvider>{children}</BidAnnouncementProvider>;
}
