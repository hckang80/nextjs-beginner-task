import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DetailedSearchForm } from '@/lib';
import { UseFormReturn } from 'react-hook-form';

export default function SelectFilterRow({
  form
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
}) {
  return (
    <tr>
      <th>사업 구분</th>
      <td>
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                <option value="">전체</option>
                <option value="용역">용역</option>
                <option value="물품">물품</option>
                <option value="공사">공사</option>
                <option value="외자">외자</option>
                <option value="기타">기타</option>
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
      </td>
      <th>기업 제한</th>
      <td>
        <FormField
          control={form.control}
          name="ignoreType"
          render={({ field }) => (
            <FormItem>
              <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                <option value="">전체 보기</option>
                <option value="문서 참조 필요">문서 참조 필요</option>
                <option value="대기업 참여 불가">대기업 참여 불가</option>
                <option value="대기업 참여 가능">대기업 참여 가능</option>
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
      </td>
      <th>정렬 기준</th>
      <td>
        <FormField
          control={form.control}
          name="sortType"
          render={({ field }) => (
            <FormItem>
              <select className="w-[140px]" value={field.value} onChange={field.onChange}>
                <option value="">정확도</option>
                <option value="게시일 내림차순">게시일 내림차순</option>
                <option value="게시일 오름차순">게시일 오름차순</option>
                <option value="마감일 내림차순">마감일 내림차순</option>
                <option value="마감일 오름차순">마감일 오름차순</option>
                <option value="금액 내림차순">금액 내림차순</option>
                <option value="금액 오름차순">금액 오름차순</option>
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
      </td>
    </tr>
  );
}
