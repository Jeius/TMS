import React from 'react';

export function useElementRect(elementId: string) {
    const [rect, setRect] = React.useState<DOMRect | null>(null);

    const updateRect = React.useCallback(() => {
        const element = document.getElementById(elementId);
        if (element) {
            setRect(element.getBoundingClientRect());
        }
    }, [elementId]);

    React.useEffect(() => {
        updateRect();

        window.addEventListener('resize', updateRect);
        return () => {
            window.removeEventListener('resize', updateRect);
        };
    }, [updateRect]);

    return rect;
}
