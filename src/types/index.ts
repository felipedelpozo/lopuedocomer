import { AppStateValues } from '@/components/context';
import { Locale } from '@/i18n/config';
import { SVGProps } from 'react';

export type PageLocale = {
  params: { locale: Locale };
};

export type Language =
  | 'czech'
  | 'english'
  | 'french'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'simp'
  | 'trad'
  | 'spanish';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CreateFormFormInput = AppStateValues & {
  address: string;
  password: string;
};

export interface SiteConfig {
  navItems?: NavItem[];
  links?: Links;
}

export interface Links {
  github: string;
  twitter: string;
  docs: string;
  discord: string;
  sponsor: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Suggestion = {
  text: string;
  place_id: string;
};
