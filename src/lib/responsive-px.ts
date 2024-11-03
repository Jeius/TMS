/**
 * A utility function that takes a size in pixels and returns a scaled size in pixels
 * based on the browser's base font size.
 * @param {number} px - The original size in pixels.
 * @returns {number} - The scaled size in pixels.
 */
function responsivePx(px: number) {
    if (typeof window !== 'undefined') {
        // This will only execute in the browser
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return px * (rootFontSize / 16);
    } else {
        // Default to 16px if in a non-browser environment
        return px;
    }
}

export default responsivePx;
