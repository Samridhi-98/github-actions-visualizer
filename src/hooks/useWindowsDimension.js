import { useState, useEffect } from 'react';

function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const innerWidth = hasWindow ? window.innerWidth : null;
        const innerHeight = hasWindow ? window.innerHeight : null;
        return {
            innerWidth,
            innerHeight,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasWindow]);

    return windowDimensions;
}

export default useWindowDimensions;