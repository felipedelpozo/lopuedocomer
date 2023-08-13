'use client';

import { HTMLAttributes, useMemo } from 'react';
import clsx from 'clsx';
import PexelsMotionImage from './pexels-motion-image';

const PEXELS_PHOTOS_IDS = ['5980862', '2882630'];

const getRandomValue = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const ImageHome: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const plexelsId = useMemo(() => getRandomValue(PEXELS_PHOTOS_IDS), []);

  return (
    <div
      className={clsx([
        'relative grid h-full w-full place-items-center',
        className,
      ])}
      {...props}
    >
      <PexelsMotionImage id={plexelsId} className="relative z-10" />
    </div>
  );
};

export default ImageHome;
