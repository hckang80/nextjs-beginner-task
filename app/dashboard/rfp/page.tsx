import { Suspense } from 'react';
import Rfp from './_rfp';
import { headers } from 'next/headers';

async function fetchInitialData() {
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const origin = `${protocol}://${host}`;

  const urls = [`${origin}/bidAnnouncementContext.json`, `${origin}/keywordSets.json`];
  const [data1, data2] = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${url}`);
      }
      return res.json();
    })
  );
  return { data1, data2 };
}

export default async function RfpPage({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const initialData = await fetchInitialData();
  const { offset } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Rfp initialData={initialData} offset={Number(offset)} />
    </Suspense>
  );
}
