'use client';

import { TooltipContentProps } from '@radix-ui/react-tooltip';
import { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type BasicTooltipProps = TooltipContentProps & {
  label: string;
};

export default function BasicTooltip({
  label,
  children,
  ...props
}: BasicTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const touchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTouch, setTouch] = useState<boolean | undefined>(undefined);

  function handleTouchStart() {
    touchTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 300); // Show after 500ms
  }

  function handleTouchEnd() {
    // Clear the timeout to prevent showing on short taps
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
      touchTimeout.current = null;
    }
    setShowTooltip(false);
  }

  useEffect(() => {
    setTouch(window.matchMedia('(pointer: coarse)').matches);
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current); // Cleanup timeout on unmount
      }
    };
  }, []);

  return (
    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
      <TooltipTrigger
        asChild
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => isTouch && e.preventDefault()}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent aria-label={`${label} tooltip`} {...props}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
