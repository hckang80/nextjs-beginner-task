import Container from './container';

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { offset = '0' } = await searchParams;

  return <Container offset={+offset} />;
}
