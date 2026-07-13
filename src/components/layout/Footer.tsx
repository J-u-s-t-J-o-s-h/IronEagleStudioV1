import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS_EMAIL } from '@/lib/business';

const footerLinks = {
    company: [
        { href: '/#services', label: 'Services' },
        { href: '/#work', label: 'Work' },
        { href: '/#pricing', label: 'Pricing' },
        { href: '/#about', label: 'About' },
        { href: '/#contact', label: 'Contact' },
    ],
    services: [
        { href: '/#services', label: 'Business Websites' },
        { href: '/#services', label: 'Custom Web Solutions' },
        { href: '/#pricing', label: 'Website Pricing' },
        { href: '/start-your-project', label: 'Start Your Project' },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-deep-navy border-t border-gunmetal">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <Image
                                src="/logos/logo.svg"
                                alt="IronEagle Studio"
                                width={280}
                                height={112}
                                className="h-20 w-auto"
                            />
                        </div>
                        <p className="text-slate text-sm max-w-sm leading-relaxed mb-6">
                            Precision-built digital systems. American-crafted websites and software
                            delivered with modern strength and disciplined execution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/start-your-project"
                                className="inline-flex items-center justify-center font-semibold px-6 py-3 bg-brass text-matte-black hover:bg-brass-light transition-colors text-sm min-h-[48px]"
                            >
                                Start Your Project
                            </Link>
                            <Link
                                href="/#work"
                                className="inline-flex items-center justify-center font-semibold px-6 py-3 border-2 border-brass text-brass hover:bg-brass/10 transition-colors text-sm min-h-[48px]"
                            >
                                View Our Work
                            </Link>
                        </div>
                        <p className="text-muted text-sm mt-4">
                            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-brass transition-colors">
                                {BUSINESS_EMAIL}
                            </a>
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-off-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate text-sm hover:text-brass transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-off-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate text-sm hover:text-brass transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-gunmetal flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate text-sm">
                        © {currentYear} IronEagle Studio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/terms-of-service" className="text-slate text-sm hover:text-brass transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy-policy" className="text-slate text-sm hover:text-brass transition-colors">
                            Privacy Policy
                        </Link>
                        <p className="text-muted text-sm">
                            Built in the USA 🇺🇸
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
