'use client';

import { usePathname } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';
import { locales, type Locales } from '@/lib';

export default function Locales() {
  const { locale } = useParams<{ locale: Locales }>();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (locale: Locales) => {
    const fullPath = `/${locale}${pathname}`;
    console.log({ fullPath });
    router.push(fullPath);
  };

  return (
    <Select defaultValue={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem value={locale} key={locale}>
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
