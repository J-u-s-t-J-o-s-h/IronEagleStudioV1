'use client';

import { Globe, Layers, Rocket, Zap, Shield } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import servicesData from '@/data/services.json';

const iconMap: Record<string, typeof Globe> = {
    Globe,
    Layers,
    Rocket,
    Zap,
    Shield,
};

export default function Services() {
    return (
        <SectionWrapper id="services">
            <div className="text-center mb-16">
                <Reveal>
                    <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                        Capabilities
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-4">
                        What We Build
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        End-to-end digital solutions with premium execution.
                        Every project engineered for performance and scale.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                staggerDelay={0.1}
            >
                {servicesData.services.map((service) => {
                    const Icon = iconMap[service.icon] || Globe;

                    return (
                        <StaggerItem key={service.id}>
                            <Card className="h-full">
                                <div className="flex flex-col h-full">
                                    <div className="w-12 h-12 rounded bg-brass/10 flex items-center justify-center mb-6">
                                        <Icon size={24} className="text-brass" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-off-white mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </Card>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>

            <Reveal delay={0.4}>
                <div className="mt-12">
                    <Card className="border-brass/30 hover:border-brass/50">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8">
                                <h3 className="text-xl md:text-2xl font-semibold text-off-white mb-3">
                                    Contract-Readiness Site Inspection
                                </h3>
                                <p className="text-slate leading-relaxed mb-4">
                                    A professional evaluation of how your website and digital presence are interpreted by evaluators, partners, and external reviewers. Designed for regulated service providers and contractors.
                                </p>
                                <a 
                                    href="/contract-readiness-inspection" 
                                    className="inline-flex items-center text-brass hover:text-brass-light transition-colors font-medium group/link"
                                >
                                    Learn more
                                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                            <div className="md:col-span-4 text-right">
                                <a 
                                    href="/contract-readiness-inspection"
                                    className="inline-block"
                                >
                                    <Button variant="secondary" size="md">
                                        View Service
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Card>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
