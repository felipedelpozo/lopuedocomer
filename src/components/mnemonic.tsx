'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { deleteCookie } from '@/lib/session/client';
import { title } from './primitives';
import clsx from 'clsx';
import { Link } from '@nextui-org/link';
import confetti from 'canvas-confetti';

type MnemonicProps = {
  words: string;
};

const Mnemonic: React.FC<MnemonicProps> = ({ words }) => {
  const t = useTranslations('mnemonic');
  const divRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (divRef.current) {
      setIsOpen(true);
      deleteCookie('mnemonic');
      confetti({
        particleCount: 100,
        spread: 160,
      });
    }
  }, [divRef]);

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variantsItem = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col  gap-12"
      animate={isOpen ? 'open' : 'closed'}
      initial={false}
      ref={divRef}
    >
      <div className="flex-1">
        <motion.ul
          variants={variants}
          className="flex flex-row flex-wrap  gap-8"
        >
          {words.split(' ').map((word) => (
            <motion.li
              className="list-none"
              key={word}
              variants={variantsItem}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={clsx([title()])}>{word}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="flex-1">
        <motion.p className="text-danger">{t('footer')}</motion.p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button
          type="submit"
          variant="shadow"
          color="primary"
          size="lg"
          className="w-full h-14"
          startContent={<ClipboardDocumentIcon className="h-5" />}
          onClick={() => navigator.clipboard.writeText(words)}
        >
          {t('copy')}
        </Button>
        <Link href="/" underline="none">
          {t('reset')}
        </Link>
      </div>
    </motion.div>
  );
};

export default Mnemonic;
