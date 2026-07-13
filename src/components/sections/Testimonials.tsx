'use client';

import { Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import testimonialsData from '@/data/testimonials.json';

interface Testimonial {
    id: string | number;
    quote: string;
    name: string;
    role: string;
    company: string;
}

/**
 * Verified client testimonials render from src/data/testimonials.json.
 * Add a verified entry there when available, for example:
 * {
 *   "id": "hjh-outdoor-operations",
 *   "quote": "...",
 *   "name": "...",
 *   "role": "...",
 *   "company": "HJH Outdoor Operations"
 * }
 * Unused seed entries were cleared because the live UI previously showed
 * "Coming Soon" and did not display that data. Only add verified quotes.
 */
export default function Testimonials() {
    const testimonials = testimonialsData.testimonials as Testimonial[];

    if (testimonials.length === 0) {
        return null;
    }

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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                staggerDelay={0.1}
            >
                {testimonials.map((testimonial) => (
                    <StaggerItem key={testimonial.id}>
                        <div className="relative h-full bg-deep-navy border border-gunmetal p-8 rounded-lg">
                            <Quote
                                size={32}
                                className="text-brass/30 mb-4"
                                fill="currentColor"
                            />
                            <blockquote className="text-slate text-sm leading-relaxed mb-6">
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>
                            <div>
                                <p className="text-off-white font-semibold">{testimonial.name}</p>
                                <p className="text-muted text-sm">
                                    {testimonial.role}
                                    {testimonial.company ? `, ${testimonial.company}` : ''}
                                </p>
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
