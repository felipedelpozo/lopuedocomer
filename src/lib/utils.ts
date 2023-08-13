import { type ClassValue, clsx } from 'clsx';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceJSX = (
  str: string,
  replacement: Record<string, ReactElement>
) => {
  const result: (string | ReactElement)[] = [];
  const keys = Object.keys(replacement);
  const getRegExp = () => {
    const regexp: string[] = [];
    keys.forEach((key) => regexp.push(`{${key}}`));
    return new RegExp(regexp.join('|'));
  };
  str.split(getRegExp()).forEach((item, i) => {
    return result.push(item, replacement[keys[i]]);
  });
  return result;
};
