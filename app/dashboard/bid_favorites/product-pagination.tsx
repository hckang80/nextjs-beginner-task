import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function ProductPagination({
  productsPerPage,
  offset,
  totalProducts,
}: {
  productsPerPage: number;
  offset: number;
  totalProducts: number;
}) {
  const pageSize = Math.ceil(totalProducts / productsPerPage);

  return (
    <Pagination className="mt-[15px]">
      <PaginationContent>
        <PaginationItem className={offset ? "" : "invisible"}>
          <PaginationPrevious
            href={`${location.pathname}?offset=${
              (~~(offset / productsPerPage) - 1) * productsPerPage
            }`}
          />
        </PaginationItem>
        {Array.from({ length: pageSize }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`${location.pathname}?offset=${i * productsPerPage}`} // TODO: 객체 형태로 query 전달이 안됨. Link와 다르게 동작함
              isActive={i === ~~(offset / productsPerPage)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          className={
            totalProducts > offset + productsPerPage ? "" : "invisible"
          }
        >
          <PaginationNext
            href={`${location.pathname}?offset=${
              (~~(offset / productsPerPage) + 1) * productsPerPage
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
