'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useCalendly } from '@/hooks/useCalendly';

export default function Hero() {
    const { openPopup } = useCalendly();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Splash screen completes at 2200ms + 100ms delay = 2300ms
        // Start animations right after splash screen is done
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with angular ring motif */}
            <div className="absolute inset-0">
                {/* Circular ring from logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]">
                    <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.03]">
                        <circle
                            cx="200"
                            cy="200"
                            r="180"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-brass"
                        />
                        <circle
                            cx="200"
                            cy="200"
                            r="160"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.25"
                            className="text-brass"
                        />
                        <circle
                            cx="200"
                            cy="200"
                            r="140"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.25"
                            className="text-iron-gray"
                        />
                    </svg>
                </div>

                {/* Angular lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="none">
                    <line x1="0" y1="30%" x2="100%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-brass" />
                    <line x1="0" y1="70%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-brass" />
                </svg>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-transparent to-deep-navy/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 lg:px-12 text-center">
                {/* Logo with eagle swoop animation */}
                <motion.div
                    initial={{ 
                        opacity: 0, 
                        scale: 0.3,
                        x: -400,
                        y: -300,
                        rotate: -25
                    }}
                    animate={isLoaded ? { 
                        opacity: 0.9, 
                        scale: 1, 
                        x: 0,
                        y: 0,
                        rotate: 0
                    } : { 
                        opacity: 0, 
                        scale: 0.3,
                        x: -400,
                        y: -300,
                        rotate: -25
                    }}
                    transition={{
                        duration: 1.2,
                        ease: [0.34, 1.56, 0.64, 1], // Custom easing for swoop effect
                        // Add a bounce/slam effect at the end
                        scale: {
                            duration: 0.4,
                            delay: 0.8,
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        },
                        rotate: {
                            duration: 1.0,
                            ease: [0.34, 1.56, 0.64, 1]
                        }
                    }}
                    className="flex justify-center mb-8"
                >
                    <motion.div
                        animate={isLoaded ? {
                            scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                            duration: 0.3,
                            delay: 1.0,
                            ease: "easeOut"
                        }}
                    >
                        <Image
                            src="/logos/logo.svg"
                            alt="Iron Eagle Studio Logo"
                            width={240}
                            height={240}
                            className="w-48 md:w-64 h-auto"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Heading with typewriter-like reveal from left */}
                <motion.h1
                    initial={{ opacity: 0, x: -100, clipPath: 'inset(0 100% 0 0)' }}
                    animate={isLoaded ? { 
                        opacity: 1, 
                        x: 0,
                        clipPath: 'inset(0 0% 0 0)'
                    } : { 
                        opacity: 0, 
                        x: -100,
                        clipPath: 'inset(0 100% 0 0)'
                    }}
                    transition={{ 
                        duration: 1.0, 
                        delay: 0.4, 
                        ease: [0.25, 0.1, 0.25, 1],
                        clipPath: { duration: 0.8, delay: 0.5 }
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-off-white mb-6"
                >
                    Precision-Built
                    <motion.span
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={isLoaded ? { 
                            opacity: 1, 
                            x: 0,
                            scale: 1
                        } : { 
                            opacity: 0, 
                            x: 100,
                            scale: 0.8
                        }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.7, 
                            ease: [0.34, 1.56, 0.64, 1],
                            scale: {
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }
                        }}
                        className="block text-brass"
                    >
                        Digital Systems
                    </motion.span>
                </motion.h1>

                {/* Description with blur fade and scale */}
                <motion.p
                    initial={{ 
                        opacity: 0, 
                        filter: 'blur(10px)',
                        scale: 0.95,
                        y: 20
                    }}
                    animate={isLoaded ? { 
                        opacity: 1, 
                        filter: 'blur(0px)',
                        scale: 1,
                        y: 0
                    } : { 
                        opacity: 0, 
                        filter: 'blur(10px)',
                        scale: 0.95,
                        y: 20
                    }}
                    transition={{ 
                        duration: 1.0, 
                        delay: 0.9, 
                        ease: [0.25, 0.1, 0.25, 1],
                        filter: { duration: 0.8 }
                    }}
                    className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    American-crafted websites and software. Delivered with speed,
                    built to perform. Modern strength meets disciplined execution.
                </motion.p>

                {/* Buttons with staggered bounce from different directions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={isLoaded ? { 
                            opacity: 1, 
                            x: 0,
                            scale: 1
                        } : { 
                            opacity: 0, 
                            x: -50,
                            scale: 0.8
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 1.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 12
                        }}
                    >
                        <Button variant="primary" size="lg" onClick={openPopup}>
                            Book a Discovery Consultation
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={isLoaded ? { 
                            opacity: 1, 
                            x: 0,
                            scale: 1
                        } : { 
                            opacity: 0, 
                            x: 50,
                            scale: 0.8
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 1.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 12
                        }}
                    >
                        <Button variant="secondary" size="lg" href="#services">
                            View Capabilities
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator with pulse animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isLoaded ? { 
                    opacity: 1, 
                    scale: 1
                } : { 
                    opacity: 0, 
                    scale: 0
                }}
                transition={{ 
                    duration: 0.6, 
                    delay: 1.5, 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                }}
                className="absolute bottom-8 left-0 right-0 flex justify-center items-center"
            >
                <motion.div 
                    className="flex flex-col items-center justify-center gap-2 text-muted"
                    animate={isLoaded ? {
                        y: [0, -5, 0]
                    } : {}}
                    transition={{
                        duration: 2,
                        delay: 2.0,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <span className="text-xs uppercase tracking-widest whitespace-nowrap text-center">Scroll</span>
                    <motion.div 
                        className="w-px h-8 bg-gradient-to-b from-brass to-transparent"
                        animate={isLoaded ? {
                            scaleY: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        } : {}}
                        transition={{
                            duration: 1.5,
                            delay: 2.0,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
