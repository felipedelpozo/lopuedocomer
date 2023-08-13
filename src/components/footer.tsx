'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Trans } from '@/components/trans';
import Logo from '@/components/logo';
import { Locale, i18n } from '@/i18n/config';
import { Link } from '@nextui-org/link';
import { usePathname } from 'next/navigation';
import { Route } from 'next';
import { Divider } from '@nextui-org/divider';

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const path = usePathname();

  return (
    <footer className="mt-auto py-6">
      <div className="mx-auto max-w-7xl px-6">
        <Divider className="my-3 md:mt-6" />
        <div className="flex mt-6">
          <div className="flex-1 text-content4 text-sm">
            <p>
              <Trans
                label={t.raw('copyright')}
                values={{
                  year: <span>{new Date().getFullYear()}</span>,
                  name: <Logo />,
                  link: (
                    <>
                      <span className="border-l border-default ml-1 mr-2 h-4"></span>
                      <Link
                        className="text-content4"
                        href="/privacy-policy"
                        size="sm"
                      >
                        {t('privacyPolicy')}
                      </Link>
                    </>
                  ),
                }}
              />
            </p>
          </div>
          <div className="flex-1">
            <ul className="flex flex-row gap-2 justify-end text-sm text-content4 dark:text-content4">
              {i18n.locales.map((lang, index) => (
                <li key={lang}>
                  <Link
                    href={path.replace(`/${locale}`, `/${lang}`) as Route}
                    size="sm"
                    underline={lang === locale ? 'always' : 'none'}
                  >
                    {t(lang as Locale)}
                  </Link>
                  {index < i18n.locales.length - 1 && (
                    <span className="border-l border-primary ml-2 h-4"></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
