import { useAppStore } from '@/components/context';
import TitleDropdown from '@/components/title-dropdown';
import { Language } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';

const locateToLanguage: Record<string, Language> = {
  cs: 'czech',
  en: 'english',
  fr: 'french',
  it: 'italian',
  ja: 'japanese',
  ko: 'korean',
  'zh-CN': 'simp',
  es: 'spanish',
  'zh-TW': 'trad',
};

const LanguageDropdown: React.FC = () => {
  const t = useTranslations('languages');
  const locale = useLocale();

  const state = useAppStore();

  const languageDefault = useMemo(() => {
    return locateToLanguage[locale];
  }, [locale]);

  const languagesKeys: { key: Language; text: string }[] = useMemo(
    () =>
      [
        'czech',
        'english',
        'french',
        'italian',
        'japanese',
        'korean',
        'simp',
        'spanish',
        'trad',
      ].map((key) => ({
        key: key as Language,
        text: t(key as Language),
      })),
    [t]
  );

  return (
    <TitleDropdown
      key="language"
      label={t('label')}
      defaultValueKey={state.language || languageDefault}
      values={languagesKeys}
      onChange={(key) => state.setState({ language: key as Language })}
    />
  );
};

export default LanguageDropdown;
