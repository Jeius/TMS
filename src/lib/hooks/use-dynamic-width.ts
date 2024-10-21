import { useEffect, useRef, useState } from 'react';

export function useDynamicWidth() {
    const [width, setWidth] = useState<number | undefined>();
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const current = elementRef.current
        const updateWidth = () => {
            if (elementRef.current) {
                setWidth(elementRef.current.offsetWidth);
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
            if (current) {
                resizeObserver.unobserve(current);
            }
        };
    }, []);

    return [width, elementRef] as const;
}
