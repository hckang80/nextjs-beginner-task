"use client";

import { FormEvent, useState } from "react";

export function DetailedSearch() {
  const [formModal, setFormModel] = useState({
    priceFrom: 0,
    priceTo: 0,
    businessType: "",
  });

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLSelectElement> // TODO: 동적 타입(Generic?)으로 적용되게 개선 필요
  ) => {
    const { name, value } = event.currentTarget;

    setFormModel({
      ...formModal,
      [name]: value,
    });
  };

  const [isPriceLimit, togglePriceLimit] = useState(true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    alert(JSON.stringify(formModal));
  };

  return (
    <form onSubmit={handleSubmit}>
      {`formModal: ${JSON.stringify(formModal)}`}
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
              <input
                type="number"
                inputMode="numeric"
                name="priceFrom"
                value={formModal.priceFrom}
                onChange={handleChange}
              />
              ~
              <input
                type="number"
                inputMode="numeric"
                name="priceTo"
                value={formModal.priceTo}
                onChange={handleChange}
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
              <select
                name="businessType"
                value={formModal.businessType}
                onChange={handleChange}
              >
                <option value="">전체</option>
                <option value="용역">용역</option>
                <option value="물품">물품</option>
                <option value="공사">공사</option>
                <option value="외자">외자</option>
                <option value="기타">기타</option>
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
