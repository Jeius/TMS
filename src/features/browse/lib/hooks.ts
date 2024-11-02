
import { animate } from 'framer-motion';
import { debounce } from 'lodash';
import { RefObject, useEffect } from 'react';

type UseResizeObserverParams = {
    scopeRef: RefObject<HTMLElement>;
    updateWidth: () => void;
};

export function useResizeObserver({ scopeRef, updateWidth }: UseResizeObserverParams) {
    useEffect(() => {
        const element = scopeRef.current;
        const resizeObserver = new ResizeObserver(() => updateWidth());

        if (element) {
            resizeObserver.observe(element);
        }

        return () => {
            if (element) resizeObserver.unobserve(element);
        };
    }, [scopeRef, updateWidth]);
}

export type ScrollState = {
    left: { value: number; isScrolled: boolean };
};

type UseScrollEventsParams = {
    scopeRef: RefObject<HTMLElement>;
    setScrollState: React.Dispatch<React.SetStateAction<ScrollState>>;
    animate: typeof animate;
};

export function useScrollEvents({ scopeRef, setScrollState, animate }: UseScrollEventsParams) {
    useEffect(() => {
        const handleScrollLeft = debounce((e) => {
            const scrollLeft = e.target.scrollLeft;
            setScrollState(prevState => ({
                ...prevState,
                left: { value: scrollLeft, isScrolled: scrollLeft > 0 }
            }));
        }, 200, { leading: true });

        const handleScrollTop = debounce(() => {
            const currentRect = scopeRef.current?.getBoundingClientRect();
            const headerRect = document.getElementById('app-header')?.getBoundingClientRect();
            if (currentRect && headerRect) {
                const scrollTop = Math.max(0, headerRect.height - currentRect.top);
                animate('thead', {
                    y: scrollTop,
                    boxShadow: scrollTop > 0 ? '0 0 0.375rem rgba(0, 0, 0, 0.15)' : undefined,
                }, { type: 'tween', duration: 0 });
            }
        }, 0, { leading: true, maxWait: 0 });

        // Initial call to set scroll position
        handleScrollTop();

        // Set up event listeners
        window.addEventListener('scroll', handleScrollTop);
        const scrollArea = scopeRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        scrollArea?.addEventListener('scroll', handleScrollLeft);

        // Clean up
        return () => {
            scrollArea?.removeEventListener('scroll', handleScrollLeft);
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, [scopeRef, setScrollState, animate]);
}

