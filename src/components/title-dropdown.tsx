'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { title } from '@/components/primitives';
import clsx from 'clsx';
import { CheckIcon } from '@heroicons/react/24/outline';
import ModalTitle from '@/components/modal-title';

type DropdownItem = { key: string; text: string };

type TitleDropdownProps = {
  label: string;
  defaultValueKey: string;
  values: DropdownItem[];
  onChange: (key: string) => void;
};

const TitleDropdown: React.FC<TitleDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className={clsx(['p-0 lg:h-12', title({ color: 'green' })])}
        onClick={() => setIsOpen(true)}
      >
        {props.values.find((item) => item.key === props.defaultValueKey)?.text}
      </Button>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        onOpenChange={(open) => {
          if (!open) {
            setIsOpen(open);
          }
        }}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-background to-background/10 backdrop-opacity-20',
        }}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <ModalTitle title={props.label} onClose={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-start gap-2">
              {props.values.map((item) => (
                <Button
                  key={item.key}
                  color={
                    item.key === props.defaultValueKey ? 'primary' : 'default'
                  }
                  variant={
                    item.key === props.defaultValueKey ? 'flat' : 'ghost'
                  }
                  className="w-full text-ellipsis"
                  onClick={() => {
                    props.onChange(item.key);
                    setIsOpen(false);
                  }}
                  endContent={
                    item.key === props.defaultValueKey ? (
                      <CheckIcon className="h-5 pointer-events-none" />
                    ) : null
                  }
                >
                  <span className="w-full text-left truncate hover:text-clip">
                    {item.text}
                  </span>
                </Button>
              ))}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TitleDropdown;
