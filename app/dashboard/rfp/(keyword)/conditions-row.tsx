import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { DetailedSearchForm } from '@/lib';
import { UseFormReturn } from 'react-hook-form';

const conditions = [
  {
    id: 1,
    label: '업종조건 충족'
  },
  {
    id: 2,
    label: '물품조건 충족'
  },
  {
    id: 3,
    label: '공동수급 허용'
  },
  {
    id: 4,
    label: '실적제한 없음'
  },
  {
    id: 5,
    label: '인적제한 없음'
  }
];

export default function ConditionsRow({
  form
}: {
  form: UseFormReturn<DetailedSearchForm, unknown, undefined>;
}) {
  return (
    <tr>
      <th>조건</th>
      <td colSpan={5}>
        <FormField
          control={form.control}
          name="conditions"
          render={() => (
            <FormItem className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px]">
              {conditions.map(({ id, label }) => (
                <FormField
                  key={id}
                  control={form.control}
                  name="conditions"
                  render={({ field }) => {
                    return (
                      <FormItem key={id} className="flex flex-row space-x-3 space-y-0 !mt-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(label)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, label])
                                : field.onChange(field.value.filter((value) => value !== label));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </td>
    </tr>
  );
}
