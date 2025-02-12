import { BoardContainer } from '..';
import { AnnouncementContext } from '@/lib';

export function BoardList({
  products,
  offset,
  listPerPage
}: {
  products: AnnouncementContext[];
  offset: number;
  listPerPage: number;
}) {
  return (
    <>
      <table className="data-table">
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
