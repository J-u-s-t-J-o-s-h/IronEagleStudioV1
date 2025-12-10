'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SplashScreenProps {
    onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [phase, setPhase] = useState<'logo' | 'reveal' | 'exit'>('logo');

    useEffect(() => {
        // Phase 1: Logo animation (0-1.2s)
        const logoTimer = setTimeout(() => {
            setPhase('reveal');
        }, 1200);

        // Phase 2: Reveal lines (1.2s-1.8s)
        const revealTimer = setTimeout(() => {
            setPhase('exit');
        }, 1800);

        // Phase 3: Exit (1.8s-2.2s)
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, 2200);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(revealTimer);
            clearTimeout(exitTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-matte-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Background grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                                                  linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
                                backgroundSize: '60px 60px'
                            }}
                        />
                    </div>

                    {/* Diagonal slash lines - Left */}
                    <motion.div
                        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-brass to-transparent"
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{
                            y: phase === 'reveal' || phase === 'exit' ? '100%' : '-100%',
                            opacity: phase === 'reveal' || phase === 'exit' ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        style={{ left: '15%' }}
                    />
                    <motion.div
                        className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-brass/50 to-transparent"
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{
                            y: phase === 'reveal' || phase === 'exit' ? '100%' : '-100%',
                            opacity: phase === 'reveal' || phase === 'exit' ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                        style={{ left: '18%' }}
                    />

                    {/* Diagonal slash lines - Right */}
                    <motion.div
                        className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-brass to-transparent"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{
                            y: phase === 'reveal' || phase === 'exit' ? '-100%' : '100%',
                            opacity: phase === 'reveal' || phase === 'exit' ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        style={{ right: '15%' }}
                    />
                    <motion.div
                        className="absolute right-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-brass/50 to-transparent"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{
                            y: phase === 'reveal' || phase === 'exit' ? '-100%' : '100%',
                            opacity: phase === 'reveal' || phase === 'exit' ? 1 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                        style={{ right: '18%' }}
                    />

                    {/* Center content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo with sharp entrance */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{
                                scale: phase === 'exit' ? 1.1 : 1,
                                opacity: phase === 'exit' ? 0 : 1,
                                y: 0
                            }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                                scale: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src="/logos/logo.svg"
                                alt="IronEagle Studio"
                                width={400}
                                height={160}
                                className="h-24 md:h-32 w-auto"
                                priority
                            />
                        </motion.div>

                        {/* Tagline with stagger reveal */}
                        <motion.div
                            className="mt-6 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase === 'logo' ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.p
                                className="text-slate text-sm md:text-base tracking-[0.3em] uppercase font-medium"
                                initial={{ y: 30 }}
                                animate={{ y: phase === 'reveal' || phase === 'exit' ? 0 : 30 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Precision Built Systems
                            </motion.p>
                        </motion.div>

                        {/* Sharp line accent */}
                        <motion.div
                            className="mt-8 h-px bg-gradient-to-r from-transparent via-brass to-transparent"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: phase === 'reveal' || phase === 'exit' ? 200 : 0,
                                opacity: phase === 'exit' ? 0 : 1
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1
                            }}
                        />
                    </div>

                    {/* Screen wipe effect on exit */}
                    <motion.div
                        className="absolute inset-0 bg-deep-navy origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: phase === 'exit' ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
