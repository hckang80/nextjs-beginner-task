import { Suspense } from 'react';
import Container from './container';

export default async function RfpPage({
  searchParams
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { offset = '0' } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container offset={Number(offset)} />
    </Suspense>
  );
}
