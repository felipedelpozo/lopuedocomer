'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { sha256 } from 'crypto-sha';
import * as z from 'zod';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nextui-org/button';
import { CreateFormFormInput } from '@/types';
import { useAppStore } from '@/components/context';
import { PasswordInput } from '@/components/password';
import { AddressInput } from '@/components/address';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/lib/session/client';

const formSchema = z.object({
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  password: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
});

interface CreateFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CreateForm(props: CreateFormProps) {
  const router = useRouter();

  const t = useTranslations('form');
  const state = useAppStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CreateFormFormInput> = async (data) => {
    setIsLoading(true);
    const result = await sha256(data.password);
    setCookie('mnemonic', {
      totalWords: state.totalWords,
      language: state.language,
      place_id: state.selection?.place_id!,
      password: result,
    });
    methods.reset();
    setIsLoading(false);

    router.push(`/mnemonic`);
  };

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      password: '',
    },
  });

  useEffect(() => {
    if (
      methods.formState.isDirty &&
      state.isValid !== methods.formState.isValid
    ) {
      state.setState({ isValid: methods.formState.isValid });
    }
  }, [state, methods.formState.isDirty, methods.formState.isValid]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-full flex-col lg:flex-row pb-6 md:mb-0 gap-3">
          <AddressInput />
          <PasswordInput />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap">
          <div className="flex-1">
            <Button
              isDisabled={
                !methods.formState.isDirty ||
                !methods.formState.isValid ||
                isLoading
              }
              type="submit"
              variant="shadow"
              color="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full h-14"
            >
              {t('generate')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
