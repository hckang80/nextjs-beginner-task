import { FavoriteListProvider } from './context/UseFavoriteListContext';

export default function BidFavoriteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FavoriteListProvider>{children}</FavoriteListProvider>;
}
