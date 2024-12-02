'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useRouter, usePathname } from 'next/navigation';

export function ProductPagination({
  productsPerPage,
  offset,
  totalProducts
}: {
  productsPerPage: number;
  offset: number;
  totalProducts: number;
}) {
  const pageSize = Math.ceil(totalProducts / productsPerPage);

  const router = useRouter();
  const path = usePathname();

  function navigate(pageOffset: number) {
    router.push(`${path}?offset=${pageOffset}`, { scroll: false });
  }

  return (
    <Pagination className="mt-[15px]">
      <PaginationContent>
        <PaginationItem className={offset ? '' : 'invisible'}>
          <PaginationPrevious
            onClick={() => navigate((~~(offset / productsPerPage) - 1) * productsPerPage)}
          />
        </PaginationItem>
        {Array.from({ length: pageSize }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => navigate(i * productsPerPage)}
              isActive={i === ~~(offset / productsPerPage)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className={totalProducts > offset + productsPerPage ? '' : 'invisible'}>
          <PaginationNext
            onClick={() => navigate((~~(offset / productsPerPage) + 1) * productsPerPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
