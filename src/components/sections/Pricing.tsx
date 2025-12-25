'use client';

import { Check } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import Reveal, { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { useCalendly } from '@/hooks/useCalendly';
import pricingData from '@/data/pricing.json';

// Define the interface for the pricing package
interface PricingPackage {
    id: string;
    name: string;
    price: string;
    tagline: string;
    features: string[];
    cta: string;
    popular: boolean;
    disclaimer?: string;
}

export default function Pricing() {
    const { openPopup } = useCalendly();
    const packages: PricingPackage[] = pricingData.packages;

    return (
        <SectionWrapper id="pricing">
            <div className="text-center mb-16">
                <Reveal>
                    <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                        Packages
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-4">
                        Straightforward Pricing
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        Premium digital systems with clear, upfront investment.
                        Choose the tier that fits your growth stage.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                staggerDelay={0.1}
            >
                {packages.map((pkg) => (
                    <StaggerItem key={pkg.id} className="h-full">
                        <Card
                            className={`h-full flex flex-col ${pkg.popular ? 'border-brass/50 brass-glow scale-105 z-10 !overflow-visible' : ''}`}
                            circuitAccent={!pkg.popular}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brass text-matte-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-off-white mb-2">{pkg.name}</h3>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl font-bold text-brass">{pkg.price}</span>
                                    {pkg.price !== 'Custom' && (
                                        <span className="text-slate text-sm">starting at</span>
                                    )}
                                </div>
                                <p className="text-slate text-sm mt-3">{pkg.tagline}</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-10">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-brass/20 flex items-center justify-center">
                                                <Check size={10} className="text-brass" />
                                            </div>
                                            <span className="text-slate text-sm leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                variant={pkg.popular ? 'primary' : 'secondary'}
                                className="w-full"
                                href={pkg.id === 'foundation' ? undefined : '#contact'}
                                onClick={pkg.id === 'foundation' ? openPopup : undefined}
                            >
                                {pkg.cta}
                            </Button>

                            {pkg.disclaimer && (
                                <p className="text-slate/60 text-xs mt-4 text-center">
                                    {pkg.disclaimer}
                                </p>
                            )}
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
