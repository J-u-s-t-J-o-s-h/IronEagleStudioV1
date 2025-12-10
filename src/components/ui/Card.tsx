'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    circuitAccent?: boolean;
}

export default function Card({
    children,
    className = '',
    hover = true,
    circuitAccent = true
}: CardProps) {
    return (
        <motion.div
            className={`
        relative bg-deep-navy border border-gunmetal 
        p-6 md:p-8 overflow-hidden
        ${hover ? 'hover:border-brass/30 hover:shadow-card-hover transition-all duration-300' : ''}
        ${circuitAccent ? 'circuit-line' : ''}
        ${className}
      `}
            whileHover={hover ? { y: -4 } : undefined}
        >
            {/* Circuit trace decorative element */}
            {circuitAccent && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
                    <svg viewBox="0 0 64 64" className="w-full h-full text-brass">
                        <path
                            d="M64 0 L64 24 L48 24 L48 32 L32 32"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                        <circle cx="32" cy="32" r="2" fill="currentColor" />
                    </svg>
                </div>
            )}

            {children}
        </motion.div>
    );
}
