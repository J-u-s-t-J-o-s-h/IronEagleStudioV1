'use client';

import { Globe, Layers, Rocket, Zap, Shield } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
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
        </SectionWrapper>
    );
}
