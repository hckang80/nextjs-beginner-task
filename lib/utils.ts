import { clsx, type ClassValue } from 'clsx';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { twMerge } from 'tailwind-merge';

export const MY_FAVORITES = 'myFavorites';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMaxNumber(array: number[]) {
  return !array.length ? 0 : Math.max(...array);
}

export function generatedId(array: { id: number }[]) {
  return getMaxNumber(array.map(({ id }) => id)) + 1;
}

export function toReadableDate(
  date: Date | string | undefined = new Date(),
  options?: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat('en-CA', options).format(new Date(date));
}

export function toReadableNumber(value: number) {
  return value.toLocaleString('ko-KR');
}

export function extractNumbers(value: string) {
  return value.replace(/[^0-9]/g, '');
}

export function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json());
}

// TODO: layout.tsx -> layout.tsx SSR에서 props 전달이 안되어 유틸 함수로 처리함
export function getOrigin(headersList: ReadonlyHeaders) {
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host');
  const origin = `${protocol}://${host}`;

  return origin;
}
