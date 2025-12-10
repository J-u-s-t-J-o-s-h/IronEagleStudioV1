'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, href, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-matte-black disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary: 'bg-brass text-matte-black hover:bg-brass-light hover:shadow-brass',
            secondary: 'bg-transparent border-2 border-brass text-brass hover:bg-brass/10',
            ghost: 'bg-transparent text-slate hover:text-off-white hover:bg-gunmetal/50',
        };

        const sizes = {
            sm: 'text-sm px-4 py-2',
            md: 'text-base px-6 py-3',
            lg: 'text-lg px-8 py-4',
        };

        const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        const content = (
            <motion.span
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {children}
            </motion.span>
        );

        if (href) {
            return (
                <a href={href} className={combinedStyles}>
                    {content}
                </a>
            );
        }

        return (
            <button ref={ref} className={combinedStyles} {...props}>
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
