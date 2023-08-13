import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link, LinkProps } from '@nextui-org/link';
import { useTranslations } from 'next-intl';

const ReadMore: React.FC<LinkProps> = (props) => {
  const t = useTranslations();

  return (
    <Link {...props}>
      {t('readMore')}
      <ArrowRightIcon className="pl-2 h-5" />
    </Link>
  );
};

export default ReadMore;
