import { useEffect, useState } from 'react';

export default function useBaseFontSize() {
  const [baseFontSize, setBaseFontSize] = useState(16); // Default to 16px

  useEffect(() => {
    // Get the root font size of the browser
    const htmlElement = document.documentElement;
    const fontSize = window.getComputedStyle(htmlElement).fontSize;

    // Parse the font size value (e.g., "16px" to 16)
    const parsedFontSize = parseFloat(fontSize);

    if (!isNaN(parsedFontSize)) {
      setBaseFontSize(parsedFontSize);
    }
  }, []);

  return baseFontSize;
}
