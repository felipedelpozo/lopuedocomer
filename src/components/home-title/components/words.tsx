import { useAppStore } from '@/components/context';
import TitleDropdown from '@/components/title-dropdown';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const WordsDropdown: React.FC = () => {
  const t = useTranslations('words');

  const state = useAppStore();

  const totalWordsKeys: { key: string; text: string }[] = useMemo(
    () =>
      ['12', '15', '18', '21', '24'].map((key) => ({
        key,
        text: t('item', { value: key }),
      })),
    [t]
  );

  return (
    <TitleDropdown
      key="words"
      label={t('label')}
      defaultValueKey={String(state.totalWords)}
      values={totalWordsKeys}
      onChange={(key) => state.setState({ totalWords: Number(key) })}
    />
  );
};

export default WordsDropdown;
