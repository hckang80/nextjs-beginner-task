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

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(event.currentTarget.href, { scroll: false });
  };

  const getHref = (pageOffset: number) => `${path}?offset=${pageOffset}`;

  return (
    <Pagination className="mt-[15px]">
      <PaginationContent>
        <PaginationItem className={offset ? '' : 'invisible'}>
          <PaginationPrevious
            href={getHref((~~(offset / productsPerPage) - 1) * productsPerPage)}
            onClick={navigate}
          />
        </PaginationItem>
        {Array.from({ length: pageSize }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={getHref(i * productsPerPage)}
              onClick={navigate}
              isActive={i === ~~(offset / productsPerPage)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className={totalProducts > offset + productsPerPage ? '' : 'invisible'}>
          <PaginationNext
            href={getHref((~~(offset / productsPerPage) + 1) * productsPerPage)}
            onClick={navigate}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
