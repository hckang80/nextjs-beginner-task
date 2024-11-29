import { useEffect, useRef } from 'react';
import { BoardContainer } from '..';
import { AnnouncementContext } from '@/lib';

export function ProductsTable({
  products,
  offset,
  listPerPage
}: {
  products: AnnouncementContext[];
  offset: number;
  listPerPage: number;
}) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const focusDataTable = () => {
    tableRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    // TODO: offset 0일때만 다르게 동작함
    const isPaginationTouch = new URLSearchParams(location.search).has('offset');
    if (!isPaginationTouch) return;
    focusDataTable();
  }, [offset]);

  return (
    <>
      <table className="data-table" ref={tableRef}>
        <colgroup>
          <col />
          <col />
          <col className="w-[260px]" />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>관심공고</th>
            <th>#</th>
            <th>공고명</th>
            <th>금액(원)</th>
            <th>구분</th>
            <th>공고기관</th>
            <th>게시일</th>
            <th>마감일</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(offset, offset + listPerPage).map((product) => (
            <BoardContainer key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}
