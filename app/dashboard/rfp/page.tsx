import { ProductsTable } from "./products-table";
import { getProducts } from "../../lib/db";

export default async function Rfp(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>입찰 공고</li>
            <li>사전 규격</li>
            <li>발주 계획</li>
            <li>유찰 공고</li>
          </ul>
        </nav>
        <a
          href="https://www.youtube.com/watch?v=S1XSQbnWTFU"
          rel="noopener noreferrer"
          target="_blank"
        >
          입찰 공고 사용 Tip
        </a>
      </div>

      <div>
        <form action="">
          <table>
            <tbody>
              <tr>
                <th>키워드세트</th>
                <td colSpan={5}>
                  <select name="" id="">
                    <option value="">그룹을 선택하세요</option>
                  </select>
                  <button type="button">현재 세트 저장</button>
                  <button>세팅 버튼</button>
                </td>
              </tr>

              <tr>
                <th>사업 금액</th>
                <td colSpan={5}>
                  <input type="number" />
                  ~
                  <input type="number" />
                  <label htmlFor="">
                    <input type="checkbox" />
                    금액 제한 없음
                  </label>
                </td>
              </tr>

              <tr>
                <th>공고일</th>
                <td colSpan={5}>TODO: 달력 범위 선택</td>
              </tr>

              <tr>
                <th>사업 구분</th>
                <td>
                  <select name="" id="">
                    <option value="">용역</option>
                  </select>
                </td>
                <th>기업 제한</th>
                <td>
                  <select name="" id="">
                    <option value="">전체 보기</option>
                  </select>
                </td>
                <th>정렬 기준</th>
                <td>
                  <select name="" id="">
                    <option value="">마감일 오름차순</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>조건</th>
                <td colSpan={5}>
                  <label htmlFor="">
                    <input type="checkbox" />
                    업종조건 충족
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    물품조건 충족
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    공동수급 허용
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    실적제한 없음
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    인적제한 없음
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
          <button>검색하기</button>
        </form>
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <th>채널</th>
              <td>TODO: 채널 검색</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
}
