import { PageLocale } from '@/types';
import PageWrapper from '@/components/page-wrapper';
import { Background } from '@/components/background';
import Posts from '@/components/posts';
import { Divider } from '@nextui-org/divider';
import HomeTitle from '@/components/home-title';
import { subtitle } from '@/components/primitives';
import { CreateForm } from '@/components/form';
import ImageHome from '@/components/image-home';
import { getTranslator } from 'next-intl/server';

export default async function HomePage({ params: { locale } }: PageLocale) {
  const t = await getTranslator(locale);

  return (
    <Background>
      <PageWrapper className="flex relative z-20 flex-col gap-6 w-full xl:mt-10">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <HomeTitle />
            <h2 className={subtitle({ class: 'mt-4' })}>{t('subtitle')}</h2>
            <CreateForm />
          </div>
          <div>
            <ImageHome className="hidden md:flex justify-center" />
          </div>
        </div>
        <Divider className="my-3 md:my-12" />
        <div className="flex flex-col md:flex-row gap-12">
          <Posts locale={locale} itemsPerPage={2} className="md:w-1/2" />
        </div>
      </PageWrapper>
    </Background>
  );
}
