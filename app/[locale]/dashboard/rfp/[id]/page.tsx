import React, { Suspense } from 'react';
import Container from './container';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container id={+id} />
    </Suspense>
  );
}
