'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';

export function ProductPagination({
  productsPerPage,
  offset,
  totalProducts,
  pathname
}: {
  productsPerPage: number;
  offset: number;
  totalProducts: number;
  pathname?: string;
}) {
  const pageSize = Math.ceil(totalProducts / productsPerPage);
  const path = pathname || location.pathname;

  const router = useRouter();

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
