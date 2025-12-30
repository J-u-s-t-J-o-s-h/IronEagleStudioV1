'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
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
    const pathname = usePathname();
    const router = useRouter();
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

    // Control header backdrop-blur when menu is open
    const headerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        if (isOpen && hasScrolled) {
            // Remove backdrop-blur when menu is open - disable transition for instant effect
            header.style.transition = 'background-color 300ms, border-color 300ms';
            header.style.backdropFilter = 'none';
        } else if (hasScrolled && !isOpen) {
            // Restore backdrop-blur when menu is closed and scrolled
            header.style.transition = '';
            header.style.backdropFilter = '';
        }
    }, [isOpen, hasScrolled]);

    return (
        <header
            ref={(el) => {
                headerRef.current = el;
                // Apply backdrop-filter change immediately when menu opens (synchronous)
                if (el && isOpen && hasScrolled) {
                    el.style.transition = 'background-color 300ms, border-color 300ms';
                    el.style.backdropFilter = 'none';
                } else if (el && !isOpen && hasScrolled) {
                    el.style.transition = '';
                    el.style.backdropFilter = '';
                }
            }}
            className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${hasScrolled
                    ? isOpen 
                        ? 'bg-matte-black/90 border-b border-gunmetal'
                        : 'bg-matte-black/90 backdrop-blur-md border-b border-gunmetal'
                    : 'bg-transparent'
                }
      `}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
                <div className="relative flex items-center justify-between h-20">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className={`
                                flex items-center transition-all duration-300
                                ${hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
                            `}
                        >
                            <Image
                                src="/logos/logo.svg"
                                alt="IronEagle Studio"
                                width={240}
                                height={96}
                                className="h-16 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation (Center) */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((link) => {
                            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                                if (pathname !== '/') {
                                    e.preventDefault();
                                    router.push(`/${link.href}`);
                                }
                            };
                            return (
                                <a
                                    key={link.href}
                                    href={pathname === '/' ? link.href : `/${link.href}`}
                                    onClick={handleClick}
                                    className="text-slate hover:text-off-white transition-colors duration-200 text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA & Mobile Menu (Right) */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
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
                            className="fixed inset-0 bg-matte-black/80 backdrop-blur-sm z-[60] md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-deep-navy backdrop-blur-xl border-l border-gunmetal z-[70] md:hidden shadow-2xl"
                            style={{ backgroundColor: 'rgba(13, 17, 23, 0.98)' }}
                        >
                            <div className="flex flex-col h-full pt-20 px-6">
                                {/* Close Button */}
                                <button
                                    className="absolute top-6 right-6 p-2 text-off-white hover:text-brass transition-colors rounded-lg hover:bg-gunmetal/50"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>

                                <div className="flex flex-col gap-3 mt-4">
                                    {navLinks.map((link) => {
                                        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                                            if (pathname !== '/') {
                                                e.preventDefault();
                                                router.push(`/${link.href}`);
                                            }
                                            setIsOpen(false);
                                        };
                                        return (
                                            <a
                                                key={link.href}
                                                href={pathname === '/' ? link.href : `/${link.href}`}
                                                onClick={handleClick}
                                                className="text-off-white text-xl font-semibold hover:text-brass transition-all py-4 px-5 rounded-lg bg-gunmetal/30 border border-gunmetal/50 hover:bg-gunmetal/60 hover:border-brass/50 shadow-lg"
                                            >
                                                {link.label}
                                            </a>
                                        );
                                    })}
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
