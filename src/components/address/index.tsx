'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { getAutocomplete, getStaticMaps } from '@/app/actions';
import { Suggestion } from '@/types';
import { useAppStore } from '@/components/context';

import WrapperAddressInput from './components/input';
import Suggestions from './components/suggestions';
import { FieldError, useFormContext } from 'react-hook-form';
import { InputProps } from '@nextui-org/input';
import useDeviceDetect from '@/hooks/useDeviceDetect';
import ModalTitle from '@/components/modal-title';

export function AddressInput(props: InputProps) {
  const t = useTranslations('form.address');
  const locale = useLocale();
  const { isMobile } = useDeviceDetect();

  const state = useAppStore();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (input.length < 5) {
      return setSuggestions([]);
    }

    getAutocomplete(input, locale)
      .then((response) => {
        setSuggestions(response);
        setIsOpen(response.length > 0);
      })
      .catch(() => setSuggestions([]));
  };

  const handleSelection = useCallback(
    (suggestion: Suggestion) => {
      setValue('address', suggestion.text, { shouldValidate: true });
      state.setState({ selection: suggestion });
      setIsOpen(false);
    },
    [setValue, state]
  );

  return (
    <>
      <div className="flex w-full">
        <WrapperAddressInput
          isReadOnly={true}
          onClick={() => setIsOpen(true)}
          register={register('address')}
          {...props}
        />
      </div>
      <Modal
        isOpen={isOpen}
        size={isMobile ? 'full' : undefined}
        placement="bottom"
        onOpenChange={(open) => {
          if (!open) {
            setSuggestions([]);
            setIsOpen(open);
          }
        }}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <ModalTitle title={t('label')} onClose={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <WrapperAddressInput
              autoFocus
              error={errors.address as FieldError}
              {...register('address')}
              onChange={handleSearch}
              {...props}
            />
            <Suggestions
              data={suggestions}
              onSelect={(suggestion: Suggestion) => {
                handleSelection(suggestion);
              }}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
