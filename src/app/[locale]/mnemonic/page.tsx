import { cookies } from 'next/headers';
import { PageLocale } from '@/types';
import { getTranslator, redirect } from 'next-intl/server';
import { JSONDecode } from '@/lib/session';
import { getSeedAddress } from '@/lib/mnemonic';
import confetti from 'canvas-confetti';
import Mnemonic from '@/components/mnemonic';
import PageWrapper from '@/components/page-wrapper';

export default async function RedirectPage({ params: { locale } }: PageLocale) {
  const t = await getTranslator(locale, 'mnemonic');

  const cookieStore = cookies();

  if (!cookieStore.has('mnemonic')) {
    return redirect('/');
  }

  const mnemonic = await getSeedAddress(
    JSONDecode(cookieStore.get('mnemonic')?.value!)
  );

  return (
    <PageWrapper className="flex relative z-20 flex-col gap-6 w-full xl:mt-10">
      <div className="flex flex-col pb-12 gap-3">
        <p className="text-primary font-bold pb-4">{t('title')}</p>
        <Mnemonic words={mnemonic} />
      </div>
    </PageWrapper>
  );
}
