import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';

type ModalTitleProps = {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode | React.ReactNode[];
};

const ModalTitle: React.FC<ModalTitleProps> = ({
  title,
  onClose,
  children,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="w-full">{title}</div>
      <div className="items-end">
        {children}
        {onClose && (
          <Button
            size="sm"
            variant="ghost"
            startContent={<XMarkIcon className="h-5" />}
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalTitle;
