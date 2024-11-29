'use client';

import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

type BasicTooltipProps = React.ComponentPropsWithRef<typeof TooltipContent> & {
  label: string;
};

export default function BasicTooltip({
  label,
  children,
  ...props
}: BasicTooltipProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTouch, setIsTouch] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  let touchTimeout: ReturnType<typeof setTimeout>;

  function handleTouchStart() {
    touchTimeout = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  }

  function handleTouchEnd() {
    clearTimeout(touchTimeout);
    setShowTooltip(false);
  }

  useEffect(() => {
    setIsTouch(isTouchDevice());

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(touchTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
      <TooltipTrigger
        asChild
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleTouchEnd}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent {...props}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
