import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [`/(en|ko)/:path*`] // TODO: en|ko -> locales를 이용해 동적삽입 필요
};
