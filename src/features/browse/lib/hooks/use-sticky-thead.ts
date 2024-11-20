import { useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { useEffect } from 'react';

/**
 * Custom hook to create a sticky header (`<thead>`) effect in a table.
 * As the user scrolls, this hook adjusts the vertical position of the `<thead>`
 * to stick it at the top of the viewport when it reaches a specified offset element.
 *
 * @param {string} offsetElementId - The ID of the element whose bottom edge serves
 *                                    as the "offset" reference for the sticky effect.
 * @returns {any} A `scope` ref that should be applied to the table containing the `<thead>`.
 */
export function useStickyTHead(offsetElementId: string) {
  // Initialize Framer Motion's animate scope
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Function to handle scroll and apply the sticky animation effect to `<thead>`
    const handleScrollTop = debounce(
      () => {
        const currentRect = scope.current?.getBoundingClientRect();
        const headerRect = document
          .getElementById(offsetElementId)
          ?.getBoundingClientRect();

        if (currentRect && headerRect) {
          const scrollTop = Math.max(0, headerRect.height - currentRect.top);

          // Animate the `<thead>` element to maintain its position
          animate(
            'thead',
            {
              y: scrollTop,
              boxShadow:
                scrollTop > 0
                  ? '0 0 0.375rem rgba(0, 0, 0, 0.15)'
                  : '0 0 0.375rem rgba(0, 0, 0, 0)',
            },
            { type: 'tween', duration: 0 }
          );
        }
      },
      0,
      { leading: true, maxWait: 0 }
    );

    // Initial call to set position on mount
    handleScrollTop();

    // Set up the scroll event listener
    window.addEventListener('scroll', handleScrollTop);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [scope, animate, offsetElementId]);

  return scope;
}
