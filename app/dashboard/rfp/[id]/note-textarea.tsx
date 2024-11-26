'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  note: z.string().min(1, '작성된 내용이 없습니다.')
});

export function NoteTextarea() {
  const { toast } = useToast();

  const { id } = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: ''
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre>
          <code>{JSON.stringify({ ...values, id: +id }, null, 2)}</code>
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
