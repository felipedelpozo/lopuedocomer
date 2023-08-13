import { replaceJSX } from '@/lib/utils';
import { ReactElement, useMemo } from 'react';

type TransProps = {
  label: string;
  values: Record<string, ReactElement>;
};

export function Trans(props: TransProps) {
  const response = useMemo(
    () => replaceJSX(props.label, props.values),
    [props]
  );

  return <>{response}</>;
}
