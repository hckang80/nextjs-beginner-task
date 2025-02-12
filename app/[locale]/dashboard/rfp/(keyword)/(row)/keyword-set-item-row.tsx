import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DetailedSearchForm, KeywordSetContext } from '@/lib';
import { Plus, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

export function KeywordSetItemRow({
  form,
  item
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
  item: Record<string, KeywordSetContext>;
}) {
  const DEFAULT_KEYWORD_SET_SIZE = 2;
  const [keywordSetSize, setKeywordSetSize] = useState(DEFAULT_KEYWORD_SET_SIZE);
  const toggleButtonLabel = keywordSetSize === DEFAULT_KEYWORD_SET_SIZE ? '열기' : '접기';
  const toggleKeywordSetSize = () => {
    setKeywordSetSize(
      keywordSetSize === DEFAULT_KEYWORD_SET_SIZE
        ? Object.keys(item).length
        : DEFAULT_KEYWORD_SET_SIZE
    );
  };

  const handleEnter =
    (path: `keywordSets.${string}`) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { value }
      } = event;

      if (key !== 'Enter') return;

      event.preventDefault();

      addTag(path, value);
    };

  const addTag = (path: `keywordSets.${string}`, value: string) => {
    if (!value) return;

    form.setValue(`${path}.tags`, [...new Set([...form.getValues(`${path}.tags`), value])]);
    form.resetField(`${path}.text`);
  };

  const deleteTag = (path: `keywordSets.${string}`, value: string) => {
    if (!value) return;

    form.setValue(
      `${path}.tags`,
      form.getValues(`${path}.tags`).filter((originTag) => originTag !== value)
    );
    form.resetField(`${path}.text`); // TODO: 제거하면 실시간으로 반영 안됨
  };

  return (
    <tr>
      <td colSpan={6}>
        <div className="flex flex-col gap-2">
          {Object.entries(item)
            .slice(0, keywordSetSize)
            .map(([key, context], index) => {
              return (
                <div key={key} className="flex flex-wrap items-center gap-2">
                  {'label' in context ? (
                    context.label
                  ) : (
                    <KeywordSetSelect form={form} target={key} />
                  )}
                  <FormField
                    control={form.control}
                    name={`keywordSets.${key}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-[180px]"
                            placeholder="키워드를 입력해보세요"
                            {...field}
                            onKeyDown={handleEnter(`keywordSets.${key}`)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    title="검색 키워드 추가"
                    onClick={() =>
                      addTag(`keywordSets.${key}`, form.getValues(`keywordSets.${key}.text`))
                    }
                  >
                    <Plus />
                  </Button>
                  <ul className="flex flex-wrap items-center gap-2">
                    {form.getValues(`keywordSets.${key}.tags`).map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-2 bg-violet-400 text-white h-[30px] px-[10px] rounded-[30px]"
                      >
                        {tag}
                        <button type="button" onClick={() => deleteTag(`keywordSets.${key}`, tag)}>
                          <X size={12} color="#ffffff" strokeWidth={3} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {index + 1 === DEFAULT_KEYWORD_SET_SIZE && (
                    <Button
                      type="button"
                      variant="secondary"
                      className="ml-auto"
                      onClick={toggleKeywordSetSize}
                    >
                      키워드셋 {toggleButtonLabel}
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      </td>
    </tr>
  );
}

export function KeywordSetSelect({
  form,
  target
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
  target: string;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={`keywordSets.${target}.type`}
        render={({ field }) => (
          <FormItem>
            <select title="검색 항목 선택" value={field.value} onChange={field.onChange}>
              <option value="title">제목</option>
              <option value="text">본문</option>
            </select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`keywordSets.${target}.operation`}
        render={({ field }) => (
          <FormItem>
            <select title="검색 방식 선택" value={field.value} onChange={field.onChange}>
              <option value="or">OR</option>
              <option value="and">AND</option>
            </select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
