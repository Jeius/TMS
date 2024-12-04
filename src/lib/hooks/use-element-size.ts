import { RefObject, useEffect, useState } from 'react';
import { Size } from '../types';

/**
 * A custom hook that returns the size (width and height) of a given DOM element.
 *
 * This hook uses the `ResizeObserver` API to listen for size changes
 * and updates the state accordingly. It also measures the element's size
 * when the component mounts to provide an initial size.
 *
 * @param elementRef - A React ref object pointing to the DOM element to measure.
 * @returns The size of the element as an object containing `width` and `height`, or `undefined` if the element is not yet rendered.
 *
 * @example
 * const elementRef = useRef<HTMLDivElement>(null);
 * const size = useElementSize(elementRef);
 *
 * return <div ref={elementRef}>Width: {size?.width}, Height: {size?.height}</div>;
 */
export function useElementSize(elementRef: RefObject<HTMLElement>) {
  const [size, setSize] = useState<Size | undefined>();
  const element = elementRef?.current;

  useEffect(() => {
    /**
     * Updates the size state with the current dimensions of the element.
     */
    const updateSize = () => {
      if (element) {
        const newSize = {
          width: element.offsetWidth,
          height: element.offsetHeight,
        };
        setSize(newSize);
      }
    };

    // Measure the element's size on mount
    updateSize();

    // Create a ResizeObserver to listen for size changes
    const resizeObserver = new ResizeObserver(updateSize);

    if (element) {
      resizeObserver.observe(element);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [element]);

  return size;
}
