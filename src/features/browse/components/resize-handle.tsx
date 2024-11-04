import { cn } from '@/lib/utils';
import React from 'react';

type ResizeHandleProps = React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical',
    position?: 'left' | 'right' | 'top' | 'bottom',
}

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
    className, position = 'right', orientation = 'vertical', ...props
}: ResizeHandleProps) {
    return (
        <div className={cn('cursor-col-resize absolute data-[resizing=true]:bg-secondary hover:bg-secondary/60 select-none touch-none pointer-events-auto',
            computePosition(position),
            orientation === 'vertical' ? 'w-1 h-full' : 'h-1 w-full',
            className
        )} {...props} />
    )
}
