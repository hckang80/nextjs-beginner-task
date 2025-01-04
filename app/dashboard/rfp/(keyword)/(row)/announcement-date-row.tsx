import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DetailedSearchForm, toReadableDate } from '@/lib';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function AnnouncementDateRow({
  form,
  dateRange,
  announcementDayType
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
  dateRange: {
    label: string;
    value: string;
    calculatedDate(): string;
  }[];
  announcementDayType: string;
}) {
  const isFreeInputChecked = (value: string) => value === 'etc';
  const [announcementDate, setAnnouncementDate] = useState(announcementDayType);

  const setDateRange = (value: string) => {
    const item = dateRange.find((item) => item.value === value);
    if (!item) return;

    form.setValue('announcementDateFrom', item.calculatedDate());
    form.setValue('announcementDateTo', isFreeInputChecked(value) ? '' : toReadableDate());
    setAnnouncementDate(value);
  };

  return (
    <tr>
      <th className="align-top">공고일</th>
      <td colSpan={5}>
        <div className="flex items-center gap-2 mb-[10px]">
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="announcementDateFrom"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      readOnly={!isFreeInputChecked(announcementDate)}
                      className="w-[140px]"
                      title="시작 공고일"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            ~
            <FormField
              control={form.control}
              name="announcementDateTo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      readOnly={!isFreeInputChecked(announcementDate)}
                      className="w-[140px]"
                      title="마감 공고일"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" />
            마감일 지난 공고 포함
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[5px]">
          {dateRange.map(({ label, value }) => (
            <label key={label} className="flex items-center gap-2">
              <input
                name="announcementDate"
                checked={value === announcementDate}
                value={value}
                type="radio"
                onChange={() => {
                  setDateRange(value);
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </td>
    </tr>
  );
}
