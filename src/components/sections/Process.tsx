'use client';

import { Search, Palette, Code, Rocket } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

const steps = [
    {
        number: '01',
        title: 'Discover',
        description: 'Deep-dive into your goals, users, and constraints. We map the landscape before breaking ground.',
        icon: Search,
    },
    {
        number: '02',
        title: 'Design',
        description: 'Architecture decisions and visual prototypes. Every choice intentional, every detail considered.',
        icon: Palette,
    },
    {
        number: '03',
        title: 'Build',
        description: 'Engineering excellence with continuous integration. Clean code, thorough testing, no shortcuts.',
        icon: Code,
    },
    {
        number: '04',
        title: 'Launch',
        description: 'Deployment, optimization, and handoff. We stay engaged until you\'re fully operational.',
        icon: Rocket,
    },
];

export default function Process() {
    return (
        <SectionWrapper id="process">
            <div className="text-center mb-16">
                <Reveal>
                    <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                        How We Work
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-4">
                        Our Process
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        A disciplined four-phase approach. Each stage builds on the last,
                        moving you from concept to launch with precision.
                    </p>
                </Reveal>
            </div>

            {/* Process steps with connecting arc */}
            <div className="relative">
                {/* Connecting line for desktop */}
                <div className="hidden lg:block absolute top-24 left-0 right-0 h-px">
                    <svg className="w-full h-16" preserveAspectRatio="none" viewBox="0 0 1000 60">
                        <path
                            d="M 50 30 Q 250 0 500 30 Q 750 60 950 30"
                            fill="none"
                            stroke="url(#processGradient)"
                            strokeWidth="2"
                            strokeDasharray="8 4"
                        />
                        <defs>
                            <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(201, 162, 39, 0.3)" />
                                <stop offset="50%" stopColor="rgba(201, 162, 39, 0.7)" />
                                <stop offset="100%" stopColor="rgba(201, 162, 39, 0.3)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <StaggerContainer
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    staggerDelay={0.1}
                >
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <StaggerItem key={step.number}>
                                <div className="relative text-center group">
                                    {/* Circle with icon */}
                                    <div className="relative mx-auto w-20 h-20 mb-6">
                                        {/* Outer ring */}
                                        <div className="absolute inset-0 rounded-full border-2 border-gunmetal group-hover:border-brass/50 transition-colors duration-300" />
                                        {/* Inner circle */}
                                        <div className="absolute inset-2 rounded-full bg-deep-navy flex items-center justify-center">
                                            <Icon size={28} className="text-brass" />
                                        </div>
                                        {/* Number badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-matte-black border border-brass text-brass text-xs font-bold flex items-center justify-center">
                                            {step.number}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-off-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </SectionWrapper>
    );
}
