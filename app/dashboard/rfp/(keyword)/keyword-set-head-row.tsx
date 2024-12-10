'use client';

import { KeywordSet } from '@/lib';

export default function KeywordSetHeadRow({
  children,
  keywordSets,
  isPrivate
}: Readonly<{
  children: React.ReactNode;
  keywordSets: KeywordSet[];
  isPrivate: boolean;
}>) {
  return (
    <tr>
      <th>키워드세트</th>
      <td colSpan={5}>
        <div className="flex items-center gap-2">
          <select className="w-[160px]">
            <option value="">그룹을 선택하세요</option>
            {keywordSets
              ?.filter((item) => item.isPrivate === isPrivate)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>

          {children}
        </div>
      </td>
    </tr>
  );
}