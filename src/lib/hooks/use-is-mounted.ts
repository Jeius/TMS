import { useEffect, useState } from "react";

// Custom hook to track whether the component has mounted
export function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
}
