'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/react';
import Gtm from '@/components/gtm';

export type ProvidersProps = {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  localeProps?: { locale: string; messages: AbstractIntlMessages };
};

export function Providers({
  children,
  themeProps,
  localeProps,
}: ProvidersProps) {
  return (
    <>
      <NextIntlClientProvider
        locale={localeProps?.locale}
        messages={localeProps?.messages}
      >
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </NextIntlClientProvider>
      <Analytics />
      <Gtm />
    </>
  );
}
