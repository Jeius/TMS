import { useEffect, useState } from 'react';

/**
 * A hook that takes a size in pixels and returns a scaled size based on the browser's base font size.
 * @param {number} px - The original size in pixels.
 * @returns {number} - The scaled size in pixels.
 */
function useResponsivePx(px: number) {
    const [scaledPx, setScaledPx] = useState(px);

    useEffect(() => {
        // Get the root font size (1rem in pixels)
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        // Calculate the scaled value in pixels
        setScaledPx(px * (rootFontSize / 16)); // Assuming 16px as the default base font size
    }, [px]);

    return scaledPx;
}

export default useResponsivePx;
