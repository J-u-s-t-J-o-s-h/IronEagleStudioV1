'use client';

import { Check } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import Reveal, { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import pricingData from '@/data/pricing.json';

interface PricingPackage {
    id: string;
    name: string;
    price: string;
    pricePrefix?: string;
    tagline: string;
    features: string[];
    cta: string;
    ctaHref: string;
    popular: boolean;
}

export default function Pricing() {
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
                        Straightforward Website Pricing
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate text-lg max-w-3xl mx-auto">
                        Every project is custom-built around your business, customers, and goals.
                        These packages provide a practical starting point. Final pricing depends on
                        project scope, content requirements, functionality, and timeline.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                staggerDelay={0.1}
            >
                {packages.map((pkg) => (
                    <StaggerItem key={pkg.id} className="h-full">
                        <Card
                            className={`h-full flex flex-col ${pkg.popular ? 'border-brass/50 brass-glow scale-[1.02] z-10 !overflow-visible' : ''}`}
                            circuitAccent={!pkg.popular}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brass text-matte-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-off-white mb-2">{pkg.name}</h3>
                                <div className="flex flex-wrap items-baseline gap-2 mt-4">
                                    {pkg.pricePrefix ? (
                                        <span className="text-slate text-sm">{pkg.pricePrefix}</span>
                                    ) : null}
                                    <span className="text-4xl font-bold text-brass">{pkg.price}</span>
                                </div>
                                <p className="text-slate text-sm mt-3 leading-relaxed">{pkg.tagline}</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-10">
                                    {pkg.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
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
                                href={pkg.ctaHref}
                            >
                                {pkg.cta}
                            </Button>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>

            <Reveal delay={0.2}>
                <p className="text-slate text-sm max-w-3xl mx-auto text-center mt-10 leading-relaxed">
                    Iron Eagle Studio currently focuses on informational business websites,
                    lead-generation systems, and selected custom web solutions. Ecommerce and
                    payment-processing projects are not currently accepted.
                </p>
            </Reveal>

            <Reveal delay={0.25}>
                <p className="text-muted text-xs max-w-3xl mx-auto text-center mt-4 leading-relaxed">
                    Project timelines depend on timely delivery of content, approvals, and client
                    feedback. Expedited delivery may be available as a separately scoped service.
                </p>
            </Reveal>

            <Reveal delay={0.3}>
                <div className="mt-16 max-w-3xl mx-auto text-center border border-gunmetal bg-deep-navy/60 p-8 md:p-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-off-white mb-4">
                        Additional Services
                    </h3>
                    <p className="text-slate text-sm md:text-base leading-relaxed mb-6">
                        Brand identity, logo design, copywriting, Google Business Profile assistance,
                        ongoing SEO, website maintenance, hosting, and expedited delivery are
                        available as separately scoped services.
                    </p>
                    <p className="text-slate text-sm md:text-base leading-relaxed mb-8">
                        Not sure which option fits your business? Complete the project questionnaire,
                        and Iron Eagle Studio will recommend the most practical approach based on
                        your goals, timeline, and budget.
                    </p>
                    <Button variant="primary" href="/start-your-project">
                        Complete the Project Questionnaire
                    </Button>
                </div>
            </Reveal>

            <Reveal delay={0.35}>
                <div className="mt-12 max-w-3xl mx-auto text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-off-white mb-4">
                        A Practical Investment, Not a One-Size-Fits-All Package
                    </h3>
                    <p className="text-slate text-sm md:text-base leading-relaxed">
                        Every business has different goals, content, and technical requirements.
                        Iron Eagle Studio defines the project scope before development begins so you
                        understand what is included, what is optional, and what the final investment
                        covers. When a full build is not the right starting point, the project can
                        often be reduced or completed in phases without sacrificing quality.
                    </p>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
