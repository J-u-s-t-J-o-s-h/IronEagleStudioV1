'use client';

import { Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import testimonialsData from '@/data/testimonials.json';

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

            <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                staggerDelay={0.1}
            >
                {testimonialsData.testimonials.map((testimonial) => (
                    <StaggerItem key={testimonial.id}>
                        <div className="relative bg-deep-navy border border-gunmetal p-8 h-full">
                            {/* Quote icon */}
                            <Quote
                                size={32}
                                className="text-brass/20 mb-4"
                                fill="currentColor"
                            />

                            <blockquote className="text-off-white leading-relaxed mb-6">
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>

                            <div className="mt-auto">
                                <cite className="not-italic">
                                    <span className="block text-off-white font-semibold">
                                        {testimonial.name}
                                    </span>
                                    <span className="text-slate text-sm">
                                        {testimonial.role}, {testimonial.company}
                                    </span>
                                </cite>
                            </div>

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
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
