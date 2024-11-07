import { debounce } from 'lodash';
import { RefObject, useEffect, useState } from 'react';
import { ScrollState } from '../types';

/**
 * Custom hook that tracks the scroll position of a specified scroll area element.
 * Provides the current scroll position on both the x (left) and y (top) axes, 
 * along with flags indicating if the content has been scrolled in either direction.
 *
 * @param {string} scrollAreaId - The ID or unique attribute to locate the scrollable element within the given scope.
 * @param {RefObject<HTMLElement>} scope - A ref to the parent element containing the scroll area.
 * @returns {ScrollState} An object containing:
 *   - `left`: { value, isScrolled } for the horizontal scroll position.
 *   - `top`: { value, isScrolled } for the vertical scroll position.
 */
export function useScrollEvents(scrollAreaId: string, scope: RefObject<HTMLElement>) {
    const [scrollState, setScrollState] = useState<ScrollState>({});

    useEffect(() => {
        // Handle scroll with debounced updates for efficiency
        const handleScroll = debounce((e) => {
            const scrollLeft = e.target.scrollLeft;
            const scrollTop = e.target.scrollTop;

            setScrollState({
                left: { value: scrollLeft, isScrolled: scrollLeft > 0 },
                top: { value: scrollTop, isScrolled: scrollTop > 0 }
            });
        }, 200, { leading: true });

        // Locate the scrollable element within the scope and add event listener
        const scrollArea = scope.current?.querySelector(`[${scrollAreaId}]`);
        scrollArea?.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount or parameter change
        return () => {
            scrollArea?.removeEventListener('scroll', handleScroll);
        };
    }, [scrollAreaId, setScrollState]);

    return scrollState;
}
