import { Input, InputProps } from '@nextui-org/input';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { MapIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

export type WrapperAddressInputProps = InputProps & {
  register?: UseFormRegisterReturn<'address'>;
  error?: FieldError | undefined;
};

const WrapperAddressInput: React.FC<WrapperAddressInputProps> = ({
  error,
  register,
  ...props
}) => {
  const t = useTranslations('form.address');

  return (
    <Input
      type="text"
      label={t('label')}
      autoComplete="off"
      variant="bordered"
      placeholder={t('placeholder')}
      validationState={error ? 'invalid' : 'valid'}
      errorMessage={error?.message}
      endContent={
        <div className="focus:outline-none">
          <MapIcon
            className={clsx([
              !error && 'stroke-primary',
              error && 'stroke-danger',
              'h-5 pointer-events-none',
            ])}
          />
        </div>
      }
      {...register}
      {...props}
    />
  );
};

export default WrapperAddressInput;
