import { Suspense } from 'react';

export default async function SupplierPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <a
        href="https://github.com/meursyphus/headless-chart?tab=readme-ov-file"
        target="_black"
        rel="noopener noreferrer"
        className="underline"
      >
        headless-chart
      </a>{' '}
      삽입 예정
    </Suspense>
  );
}
