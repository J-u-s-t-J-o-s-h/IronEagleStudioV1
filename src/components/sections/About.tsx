'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';

export default function About() {
    return (
        <SectionWrapper id="about" className="bg-deep-navy/50">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Content */}
                <div>
                    <Reveal>
                        <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                            About
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-6">
                            Engineering Excellence,<br />
                            <span className="text-brass">American-Built</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="space-y-4 text-slate leading-relaxed">
                            <p>
                                IronEagle Studio was founded on a simple premise: digital products
                                should be built with the same precision and care as fine machinery.
                                Every line of code, every design decision, every deployment—executed
                                with discipline.
                            </p>
                            <p>
                                We work with businesses who value substance over flash. Companies
                                building real products that solve real problems. Our clients come to
                                us when they need more than a vendor—they need a partner who
                                understands that reliability isn&apos;t negotiable.
                            </p>
                            <p>
                                Based in the United States, we bring modern engineering practices
                                to every engagement. Clean architecture. Rigorous testing.
                                Documentation that doesn&apos;t disappear. The fundamentals,
                                done exceptionally well.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Visual element */}
                <Reveal direction="right" delay={0.3}>
                    <div className="relative">
                        {/* Abstract geometric representation */}
                        <div className="aspect-square max-w-md mx-auto">
                            <svg viewBox="0 0 400 400" className="w-full h-full">
                                {/* Outer ring */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="180"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.2)"
                                    strokeWidth="1"
                                />

                                {/* Middle ring - dashed */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="140"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.15)"
                                    strokeWidth="1"
                                    strokeDasharray="8 6"
                                />

                                {/* Inner ring */}
                                <circle
                                    cx="200"
                                    cy="200"
                                    r="100"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.1)"
                                    strokeWidth="1"
                                />

                                {/* Angular lines creating eagle silhouette reference */}
                                <path
                                    d="M 200 80 L 280 160 L 320 200 L 280 240 L 200 320 L 120 240 L 80 200 L 120 160 Z"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.3)"
                                    strokeWidth="1"
                                />

                                {/* Inner angular shape */}
                                <path
                                    d="M 200 120 L 250 170 L 280 200 L 250 230 L 200 280 L 150 230 L 120 200 L 150 170 Z"
                                    fill="rgba(201, 162, 39, 0.05)"
                                    stroke="rgba(201, 162, 39, 0.4)"
                                    strokeWidth="1"
                                />

                                {/* Center point */}
                                <circle cx="200" cy="200" r="4" fill="rgba(201, 162, 39, 0.6)" />

                                {/* Circuit traces */}
                                <path
                                    d="M 200 200 L 200 160 L 240 160"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.3)"
                                    strokeWidth="1"
                                />
                                <path
                                    d="M 200 200 L 240 200 L 240 240"
                                    fill="none"
                                    stroke="rgba(201, 162, 39, 0.3)"
                                    strokeWidth="1"
                                />

                                {/* Small accent circles */}
                                <circle cx="240" cy="160" r="3" fill="rgba(201, 162, 39, 0.5)" />
                                <circle cx="240" cy="240" r="3" fill="rgba(201, 162, 39, 0.5)" />
                            </svg>
                        </div>
                    </div>
                </Reveal>
            </div>
        </SectionWrapper>
    );
}
