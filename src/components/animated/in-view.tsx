'use client';

import {
  HTMLMotionProps,
  motion,
  Transition,
  useInView,
  UseInViewOptions,
  Variant,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface InViewProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  ...props
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
