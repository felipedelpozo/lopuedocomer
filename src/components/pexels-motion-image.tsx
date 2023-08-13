'use client';

import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { Image, ImageProps } from '@nextui-org/image';

type PexelsMotionImageProps = ImageProps & {
  id: string;
};

const PexelsMotionImage: React.FC<PexelsMotionImageProps> = ({
  id,
  ...props
}) => {
  return (
    <motion.div
      animate={{ y: 15 }}
      transition={{
        repeat: Infinity,
        repeatType: 'mirror',
        repeatDelay: 0.2,
        duration: 2,
        type: 'tween',
      }}
    >
      <Image
        as={NextImage}
        isBlurred
        width={500}
        height={333}
        alt="Home image"
        {...props}
        src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
      />
    </motion.div>
  );
};

export default PexelsMotionImage;
