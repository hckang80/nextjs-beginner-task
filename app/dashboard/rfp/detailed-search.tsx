"use client";

import { useState } from "react";

export function DetailedSearch() {
  const [isPriceLimit, togglePriceLimit] = useState(true);

  return (
    <form action="">
      {`isPriceLimit: ${isPriceLimit}`}
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
              <input type="number" inputMode="numeric" value={0} />
              ~
              <input
                type="number"
                inputMode="numeric"
                className={isPriceLimit ? "invisible" : ""}
              />
              <label htmlFor="">
                <input
                  type="checkbox"
                  checked={isPriceLimit}
                  onChange={({ target: { checked } }) => {
                    togglePriceLimit(checked);
                  }}
                />
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
  );
}
