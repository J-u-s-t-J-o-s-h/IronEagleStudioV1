'use client';

import { Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';

export default function Testimonials() {
    return (
        <SectionWrapper id="testimonials">
            <div className="text-center mb-16">
                <Reveal>
                    <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                        Testimonials
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-4">
                        What Clients Say
                    </h2>
                </Reveal>
            </div>

            <Reveal delay={0.2}>
                <div className="relative bg-deep-navy border border-gunmetal p-16 md:p-20 rounded-lg text-center">
                    {/* Quote icon */}
                    <Quote
                        size={48}
                        className="text-brass/30 mb-6 mx-auto"
                        fill="currentColor"
                    />

                    <h3 className="text-2xl md:text-3xl font-bold text-off-white mb-4">
                        Coming Soon
                    </h3>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        Client testimonials will be featured here soon. Check back to see what our clients have to say about working with IronEagle Studio.
                    </p>

                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                        <svg viewBox="0 0 64 64" className="w-full h-full">
                            <path
                                d="M64 64 L64 48 L48 48 L48 32"
                                fill="none"
                                stroke="rgba(201, 162, 39, 0.2)"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
