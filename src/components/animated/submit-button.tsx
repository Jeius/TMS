'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CircleDashed, XCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';

export type Status = 'loading' | 'success' | 'failed';

type SubmitButtonProps = React.ComponentPropsWithRef<typeof Button> & {
  status?: Status;
};

export default function SubmitButton({
  status,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  function getVariant() {
    if (status === 'failed') return 'destructive';
    return 'default';
  }

  return (
    <Button
      size="lg"
      type="submit"
      variant={getVariant()}
      disabled={status !== undefined}
      className={cn(
        'group relative w-full overflow-hidden disabled:opacity-85',
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.1 }}
          className="flex items-center justify-center gap-1.5 capitalize"
        >
          {status === 'success' && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
            >
              <CheckCircle2 size={16} />
            </motion.span>
          )}

          {status === 'failed' && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
            >
              <XCircleIcon size={16} />
            </motion.span>
          )}

          {status == 'loading' ? (
            <CircleDashed className="animate-spin text-foreground" />
          ) : (
            (status ?? children)
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
