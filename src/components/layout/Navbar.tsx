'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useCalendly } from '@/hooks/useCalendly';

const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const { openPopup } = useCalendly();

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${hasScrolled
                    ? 'bg-matte-black/90 backdrop-blur-md border-b border-gunmetal'
                    : 'bg-transparent'
                }
      `}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
                        <Image
                            src="/logos/logo.svg"
                            alt="IronEagle Studio"
                            width={240}
                            height={96}
                            className="h-16 w-auto"
                            priority
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-slate hover:text-off-white transition-colors duration-200 text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button variant="primary" size="sm" onClick={openPopup}>
                            Book a Discovery Call
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate hover:text-off-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-matte-black/80 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-deep-navy border-l border-gunmetal md:hidden"
                        >
                            <div className="flex flex-col h-full pt-24 px-6">
                                <div className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="text-off-white text-lg font-medium hover:text-brass transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); openPopup(); }}>
                                        Book a Discovery Call
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
