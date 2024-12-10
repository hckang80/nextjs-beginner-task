'use client';

import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DetailedSearchForm, extractNumbers, toReadableNumber } from '@/lib';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function BusinessPriceRow({
  form
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
}) {
  const [isPriceLimit, togglePriceLimit] = useState(false);

  return (
    <tr>
      <th>사업 금액</th>
      <td colSpan={5}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="priceFrom"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[140px]"
                      inputMode="numeric"
                      {...field}
                      onChange={(event) =>
                        field.onChange(toReadableNumber(+extractNumbers(event.target.value)))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            ~
            <FormField
              control={form.control}
              name="priceTo"
              render={({ field }) => (
                <FormItem className={isPriceLimit ? 'invisible' : ''}>
                  <FormControl>
                    <Input
                      className="w-[140px]"
                      inputMode="numeric"
                      {...field}
                      onChange={(event) =>
                        field.onChange(toReadableNumber(+extractNumbers(event.target.value)))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <label className="flex items-center gap-2 text-[14px]">
            <input
              type="checkbox"
              checked={isPriceLimit}
              onChange={({ target: { checked } }) => {
                togglePriceLimit(checked);
              }}
            />
            금액 제한 없음
          </label>
        </div>
      </td>
    </tr>
  );
}
