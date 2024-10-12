import { useState, useEffect, useRef } from 'react';

export function useDynamicWidth() {
    const [width, setWidth] = useState<string>('auto');
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (elementRef.current) {
                setWidth(`${elementRef.current.offsetWidth}px`);
            }
        };

        // ResizeObserver to listen for changes in the element's size
        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        if (elementRef.current) {
            resizeObserver.observe(elementRef.current);
        }

        // Clean up the observer when the component unmounts
        return () => {
            if (elementRef.current) {
                resizeObserver.unobserve(elementRef.current);
            }
        };
    }, []);

    return [width, elementRef] as const;
}
