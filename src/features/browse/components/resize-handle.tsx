import { cn } from '@/lib/utils';
import React from 'react';

type ResizeHandleProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
  position?: 'left' | 'right' | 'top' | 'bottom';
};

function computePosition(pos: string) {
  switch (pos) {
    case 'left':
      return 'top-0 left-0';
    case 'right':
      return 'top-0 right-0';
    case 'top':
      return 'left-0 top-0';
    case 'bottom':
      return 'left-0 bottom-0';
    default:
      break;
  }
}

export default function ResizeHandle({
  className,
  position = 'right',
  orientation = 'vertical',
  ...props
}: ResizeHandleProps) {
  return (
    <div
      className={cn(
        'pointer-events-auto absolute cursor-col-resize touch-none select-none hover:bg-secondary/60 data-[resizing=true]:bg-secondary',
        computePosition(position),
        orientation === 'vertical' ? 'h-full w-1' : 'h-1 w-full',
        className
      )}
      {...props}
    />
  );
}
