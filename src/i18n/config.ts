import MiddlewareConfig from 'next-intl/dist/middleware/NextIntlMiddlewareConfig';

export const i18n: MiddlewareConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  localePrefix: 'always',
};

export type Locale = 'es' | 'en';
