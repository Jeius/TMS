import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export const useScrollState = (childRef: React.RefObject<HTMLDivElement>) => {
    const [scrollState, setScrollState] = useState({
        left: { value: 0, isScrolled: false },
        top: { value: 0, isScrolled: false },
    });

    const handleScrollLeft = debounce((e: Event) => {
        const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
        setScrollState(prevState => ({
            ...prevState,
            left: { value: scrollLeft, isScrolled: scrollLeft > 0 }
        }));
    }, 10);

    const handleScrollTop = debounce(() => {
        const currentRect = childRef.current?.getBoundingClientRect();
        const headerRect = document.getElementById("app-header")?.getBoundingClientRect();
        if (currentRect && headerRect) {
            const scrollTop = Math.max(0, headerRect.height - currentRect.top);
            setScrollState(prevState => ({
                ...prevState,
                top: { value: scrollTop, isScrolled: scrollTop > 0 }
            }));
        }
    }, 10);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollTop);
        const scrollArea = childRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScrollLeft);
        }

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScrollLeft);
            }
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, []);

    return scrollState;
};
