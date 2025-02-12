'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  note: z.string().min(1, '작성된 내용이 없습니다.')
});

type FormSchema = z.infer<typeof formSchema>;

export function NoteTextarea({ id }: { id: number }) {
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: ''
    }
  });

  const onSubmit = (values: FormSchema) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>{JSON.stringify({ ...values, id }, null, 2)}</code>
        </pre>
      )
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="필요한 메모를 하세요.." rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-[10px]">저장</Button>
      </form>
    </Form>
  );
}
