import { Suspense } from 'react';
import Container from './container';
import { headers } from 'next/headers';

async function fetchInitialData() {
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const origin = `${protocol}://${host}`;

  const urls = [`${origin}/bidAnnouncementContext.json`, `${origin}/keywordSets.json`];
  const [bidAnnouncementContextData, keywordSetsData] = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
      }
      return res.json();
    })
  );
  return { bidAnnouncementContextData, keywordSetsData };
}

export default async function RfpPage({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const initialData = await fetchInitialData();
  const { offset = '0' } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container initialData={initialData} offset={Number(offset)} />
    </Suspense>
  );
}
