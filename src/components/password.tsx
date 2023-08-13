'use client';

import { Input, InputProps } from '@nextui-org/input';
import { useMemo, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { passwordStrength } from 'check-password-strength';
import { useTranslations } from 'next-intl';

type Color =
  | 'default'
  | 'success'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | undefined;

type Strength = 'Too weak' | 'Weak' | 'Medium' | 'Strong';

const COLORS: Record<Strength, Color> = {
  'Too weak': 'danger',
  Weak: 'warning',
  Medium: 'primary',
  Strong: 'success',
};

export function PasswordInput(props: InputProps) {
  const t = useTranslations('form.password');
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const registerOptions = useMemo(() => register('password'), [register]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStrength(value ? passwordStrength(value as string).value : '');
    registerOptions.onChange(event);
  };

  return (
    <div className="flex w-full">
      <Input
        label={<span className="text-foreground">{t('label')}</span>}
        autoComplete="off"
        variant="bordered"
        placeholder={t('placeholder')}
        validationState={errors.password ? 'invalid' : 'valid'}
        errorMessage={errors.password?.message! as string}
        description={
          strength && (
            <span
              className={clsx(`text-${COLORS[strength as Strength] as Color}`)}
            >
              {t(strength as Strength)}
            </span>
          )
        }
        color={COLORS[strength as Strength] as Color}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashIcon
                className={clsx([
                  !errors.password && 'stroke-primary',
                  errors.password && 'stroke-danger',
                  'h-5 pointer-events-none',
                ])}
              />
            ) : (
              <EyeIcon
                className={clsx([
                  !errors.password && 'stroke-primary',
                  errors.password && 'stroke-danger',
                  'h-5 pointer-events-none',
                ])}
              />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        {...props}
        {...registerOptions}
        onChange={onChange}
      />
    </div>
  );
}
