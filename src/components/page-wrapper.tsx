'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

type PageWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={clsx('mix-h-screenHeightWithoutHeight', className)}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
