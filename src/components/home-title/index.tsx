'use client';

import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';
import { Trans } from '@/components/trans';
import clsx from 'clsx';
import LanguageDropdown from './components/languages';
import WordsDropdown from './components/words';

export default function HomeTitle() {
  const t = useTranslations();

  return (
    <h1 className={clsx([title()])}>
      <Trans
        label={t.raw('title')}
        values={{
          words: <WordsDropdown />,
          language: <LanguageDropdown />,
        }}
      />
    </h1>
  );
}
