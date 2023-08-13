'use client';

import cookies from 'js-cookie';
import { JSONEncode } from '@/lib/session';

export const setCookie = (name: string, value: unknown) => {
  cookies.set(name, JSONEncode(value));
};

export const deleteCookie = (name: string) => {
  cookies.remove(name, { path: '/' });
};
