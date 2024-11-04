'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

function useGridLayout() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [layout, setLayout] = useState({ vertical: 0, horizontal: 0 });

    useEffect(() => {
        const updateLayout = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) {
                return;
            }
            setLayout({
                vertical: Math.floor(rect.height),
                horizontal: Math.floor(rect.width),
            });
        };

        updateLayout();

        // Can be debounced if needed
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    return {
        layout,
        containerRef,
    };
}

function plotSquares(width: number, height: number, size: number): { x: number; y: number }[] {
    const squares: { x: number; y: number }[] = [];

    const boundary = size * 2;
    const used = new Set<number>();

    for (let x = boundary; x < width / 2 - boundary; x += size) {
        for (let y = boundary; y < height - boundary; y += size) {
            // Custom logic to reduce the number of squares
            if (
                used.has(x + y + size) ||
                used.has(x + y - size) ||
                used.has(x + y + size * 4) ||
                used.has(x + y - size * 4)
            ) {
                continue;
            }

            used.add(x + y);
            squares.push({ x, y });
        }
    }
    return squares;
}

const size = 24; // h-6
const boxClassName =
    'absolute h-6 w-6 rounded-md bg-transparent z-0 p-px border border-gray-400/30 border-box group ';

export function Grid() {
    const {
        layout: { vertical, horizontal },
        containerRef,
    } = useGridLayout();

    const squares = useMemo(() => plotSquares(horizontal, vertical, size), [horizontal, vertical]);
    const [active, setActive] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();

    const onMouseEnter = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        const set = () => {
            const next = squares[Math.floor(Math.random() * squares.length) % squares.length];
            setActive(next.x + next.y);
        };

        set();

        const cycleCount = 5;
        let count = 0;
        timerRef.current = setInterval(() => {
            if (count === cycleCount) {
                clearInterval(timerRef.current);
                setActive(0);
                return;
            }

            set();
            count++;
        }, 1000);
    }, [squares]);

    const cells = useMemo(() => {
        return squares.map(({ x, y }, i) => {
            let xPos = x;
            if (i % 2) {
                // Mirror the grid horizontally (50% of the time)
                xPos = horizontal - x - size;
            }

            const shouldHighlight = active - x === x || active - y === y;
            return (
                <div
                    key={`${x}-${y}`}
                    style={{
                        transform: `translate(${xPos}px, ${y}px)`,
                    }}
                    onMouseEnter={onMouseEnter}
                    onClick={onMouseEnter}
                    className={boxClassName}
                >
                    <div
                        style={{
                            transitionDelay: active ? `${x + y}ms` : '0ms',
                        }}
                        className={cn(
                            'h-full w-full scale-90 rounded bg-gray-400/30 opacity-10 transition-all duration-700',
                            {
                                'scale-100 opacity-100': shouldHighlight,
                                'group-hover:scale-100 group-hover:opacity-100': !shouldHighlight,
                            },
                        )}
                    />
                </div>
            );
        });
    }, [squares, horizontal, active, onMouseEnter]);

    return (
        <div
            ref={containerRef}
            onClick={onMouseEnter}
            className={cn('absolute inset-0 h-full max-h-[400px] w-full z-0', {
                'top-1/4': vertical > 96 * 4, // 96 * 4 is the height of the grid
            })}
        >
            {cells}
        </div>
    );
}

export default function InteractiveGrid({
    children,
    className,
    contentClassName,
}: {
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}) {
    return (
        <div
            className={cn('storybook-fix relative h-full w-full overflow-hidden bg-gradient-to-b from-transparent via-card dark:via-footer', className)}
        >
            <Grid />
            <div className={cn('relative mx-auto h-full w-fit', contentClassName)}>{children}</div>
        </div>
    );
}
