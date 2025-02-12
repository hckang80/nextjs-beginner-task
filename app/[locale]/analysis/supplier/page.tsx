import { Suspense } from 'react';
import Container from './container';

export default async function SupplierPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container />
    </Suspense>
  );
}
