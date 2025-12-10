import Image from 'next/image';

const footerLinks = {
    company: [
        { href: '#services', label: 'Services' },
        { href: '#work', label: 'Work' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
    ],
    services: [
        { href: '#services', label: 'Web Systems' },
        { href: '#services', label: 'Product UI' },
        { href: '#services', label: 'Brand-to-Build' },
        { href: '#services', label: 'Performance' },
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
                        <p className="text-slate text-sm max-w-sm leading-relaxed">
                            Precision-built digital systems. American-crafted websites and software
                            delivered with modern strength and disciplined execution.
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
                    <p className="text-muted text-sm">
                        Built in the USA 🇺🇸
                    </p>
                </div>
            </div>
        </footer>
    );
}
