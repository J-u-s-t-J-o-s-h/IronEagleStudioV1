'use client';

import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
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
                <Reveal>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-off-white mb-6">
                        Precision-Built
                        <span className="block text-brass">Digital Systems</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed">
                        American-crafted websites and software. Delivered with speed,
                        built to perform. Modern strength meets disciplined execution.
                    </p>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="primary" size="lg" href="#contact">
                            Book a Discovery Call
                        </Button>
                        <Button variant="secondary" size="lg" href="#services">
                            View Capabilities
                        </Button>
                    </div>
                </Reveal>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <Reveal delay={0.4}>
                    <div className="flex flex-col items-center gap-2 text-muted">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <div className="w-px h-8 bg-gradient-to-b from-brass to-transparent" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
