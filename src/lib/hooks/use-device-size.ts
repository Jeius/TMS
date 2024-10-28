import React from 'react';

export const useDeviceSize = () => {
    const [deviceSize, setDeviceSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        const handleResize = () => {
            setDeviceSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        handleResize();

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return deviceSize;
};