'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

interface AppWrapperProps {
    children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    const [showContent, setShowContent] = useState(false);
    const [splashComplete, setSplashComplete] = useState(false);

    const handleSplashComplete = () => {
        setSplashComplete(true);
        // Small delay to ensure smooth transition
        setTimeout(() => setShowContent(true), 100);
    };

    return (
        <>
            {!splashComplete && <SplashScreen onComplete={handleSplashComplete} />}
            <div
                className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                style={{ visibility: splashComplete ? 'visible' : 'hidden' }}
            >
                {children}
            </div>
        </>
    );
}
