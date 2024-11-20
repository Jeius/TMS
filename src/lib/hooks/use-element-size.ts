import { useEffect, useState } from 'react';
import { Size } from 'recharts/types/util/types';

export function useElementSize(element: HTMLElement | null) {
  const [size, setWidth] = useState<Size | undefined>();

  useEffect(() => {
    const updateSize = () => {
      if (element) {
        setWidth({
          width: element.offsetWidth,
          height: element.offsetHeight,
        });
      }
    };

    // ResizeObserver to listen for changes in the element's size
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (element) {
      resizeObserver.observe(element);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [element]);

  return size;
}
