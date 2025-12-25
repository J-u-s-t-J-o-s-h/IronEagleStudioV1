import { useEffect } from 'react';

declare global {
    interface Window {
        Calendly: {
            initPopupWidget: (options: { url: string }) => void;
        };
    }
}

export const useCalendly = () => {
    useEffect(() => {
        // Load the Calendly script only if it's not already loaded
        if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.body.appendChild(script);

            const link = document.createElement('link');
            link.href = 'https://assets.calendly.com/assets/external/widget.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, []);

    const openPopup = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/ironeaglestudio/discovery-consulation',
            });
        } else {
            console.warn('Calendly widget script not yet loaded');
        }
    };

    return { openPopup };
};
