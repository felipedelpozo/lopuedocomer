'use client';

import Image from 'next/image';
import { useAppStore } from '@/components/context';
import { useEffect, useMemo, useRef } from 'react';
import { getStaticMaps } from '@/app/actions';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import useAbsolutePosition from '@/hooks/useAbsolutePosition';
import useDeviceDetect from '@/hooks/useDeviceDetect';

type BackgroundProps = {
  children: React.ReactNode;
};

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  const state = useAppStore();

  const divRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetect();
  const rect = useAbsolutePosition(divRef);

  const size: number = useMemo(
    () => Math.floor(rect?.width! * (isMobile ? 0.8 : 0.5) ?? 800),
    [isMobile, rect?.width]
  );

  useEffect(() => {
    if (size && state.selection && !state.background) {
      getStaticMaps(state.selection.place_id, `${size}x${size}`).then(
        (response) => {
          state.setState({ background: response });
        }
      );
    }
  }, [size, state, state.selection]);

  return (
    <div ref={divRef} className="flex flex-col">
      {state.background && (
        <motion.div
          animate="show"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                duration: 3,
                delayChildren: 0.5,
                staggerDirection: -1,
              },
            },
          }}
          className="absolute top-0 right-0 grayscale"
        >
          <Image
            src={state.background}
            alt="background"
            width={size}
            height={size}
            className="opacity-50 dark:opacity-20"
          />
          <div
            className={clsx([
              'absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent from-20% via-background via-75% to-background',
              `w-[${size}px] h-[${size}]px`,
            ])}
          />
        </motion.div>
      )}
      {children}
    </div>
  );
};
