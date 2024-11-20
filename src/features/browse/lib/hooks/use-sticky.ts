import { ElementOrSelector, useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { useEffect } from 'react';

/**
 * Custom hook to create a sticky effect for any element, keeping it fixed at
 * the top of the viewport when it reaches a specified offset position as the user scrolls.
 *
 * @param {string} offsetElementId - The ID of the element whose bottom edge serves
 *                                    as the reference point for activating the sticky effect.
 *                                    When the target element reaches this offset, it will stick at the top.
 * @param {ElementOrSelector} [element] - Optional specific element or selector to animate.
 *                                         Defaults to the `scope` ref returned by the hook.
 * @returns {any} A `scope` ref that should be applied to the element intended to become sticky.
 *                This ref is necessary for Framer Motion to manage the sticky behavior.
 */

export function useSticky(
  offsetElementId: string,
  element?: ElementOrSelector
) {
  // Initialize Framer Motion's animate scope
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Function to handle scroll and apply the sticky animation effect to the target element
    const handleScrollTop = debounce(
      () => {
        // Get the bounding rectangle for the target element and the offset element
        const currentRect = scope.current?.getBoundingClientRect();
        const headerRect = document
          .getElementById(offsetElementId)
          ?.getBoundingClientRect();

        // Check if both elements are available and visible in the DOM
        if (currentRect && headerRect) {
          // Calculate the scroll position relative to the offset element's bottom
          const scrollTop = Math.max(0, headerRect.height - currentRect.top);

          // Apply animation to the target element to maintain its sticky position
          animate(
            element ?? scope.current,
            {
              y: scrollTop,
              boxShadow:
                scrollTop > 0 && element === 'thead'
                  ? '0 0 0.375rem rgba(0, 0, 0, 0.15)' // Shadow applied when sticky
                  : '0 0 0.375rem rgba(0, 0, 0, 0)', // No shadow when not sticky
            },
            { type: 'tween', duration: 0 }
          );
        }
      },
      0,
      { leading: true, maxWait: 0 }
    );

    // Initial call to set the position on mount
    handleScrollTop();

    // Add scroll event listener to update position on scroll
    window.addEventListener('scroll', handleScrollTop);

    // Clean up scroll event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [scope, animate, offsetElementId, element]);

  return scope;
}
