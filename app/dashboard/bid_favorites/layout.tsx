import { MyTagProvider } from "./context/MyTagContext";

export default function BidFavoriteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MyTagProvider>{children}</MyTagProvider>;
}
