'use client';

import Image from 'next/image';
import { Check, ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import workData from '@/data/work.json';

interface WorkProject {
    id: string;
    title: string;
    category: string;
    url: string;
    image?: string | null;
    description?: string;
    features?: string[];
    problem?: string;
    solution?: string;
    outcome?: string;
    metrics?: { primary: string; label: string };
}

export default function FeaturedWork() {
    const projects = workData.projects as WorkProject[];

    return (
        <SectionWrapper id="work" className="bg-deep-navy/50">
            <div className="text-center mb-16">
                <Reveal>
                    <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                        Case Studies
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-4">
                        Featured Work
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-slate text-lg max-w-2xl mx-auto">
                        Real websites for real businesses. See examples of our work
                        and how we help local companies present their services online.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                {projects.map((project) => {
                    const hasImage = Boolean(project.image);
                    const isFeatureLayout = Boolean(project.description && project.features?.length);

                    return (
                        <StaggerItem key={project.id}>
                            <Card className="group overflow-hidden" circuitAccent={false}>
                                <div className={`grid gap-6 md:gap-8 ${hasImage ? 'md:grid-cols-12' : ''}`}>
                                    {hasImage ? (
                                        <div className="md:col-span-5 order-2 md:order-1">
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative overflow-hidden rounded-lg border border-gunmetal group/image hover:border-brass/50 transition-all duration-300"
                                            >
                                                <div className="aspect-video relative bg-gunmetal/30">
                                                    <Image
                                                        src={project.image as string}
                                                        alt={`${project.title} website screenshot`}
                                                        fill
                                                        className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 40vw"
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-brass/0 group-hover/image:bg-brass/10 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                                                        <ExternalLink className="w-8 h-8 text-brass" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ) : null}

                                    <div className={`${hasImage ? 'md:col-span-7 order-1 md:order-2' : ''}`}>
                                        <div className="flex flex-col h-full">
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <h3 className="text-xl md:text-2xl font-semibold text-off-white">
                                                    {project.title}
                                                </h3>
                                                <span className="text-xs text-brass bg-brass/10 px-2 py-1 rounded">
                                                    {project.category}
                                                </span>
                                            </div>

                                            {project.metrics && !isFeatureLayout ? (
                                                <div className="mb-4 pb-4 border-b border-gunmetal">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-3xl md:text-4xl font-bold text-brass">
                                                            {project.metrics.primary}
                                                        </span>
                                                        <span className="text-sm text-slate uppercase tracking-wider">
                                                            {project.metrics.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : null}

                                            {isFeatureLayout ? (
                                                <div className="space-y-5 mb-6 flex-grow">
                                                    <p className="text-slate text-sm md:text-base leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                    <ul className="grid sm:grid-cols-2 gap-3">
                                                        {project.features?.map((feature) => (
                                                            <li key={feature} className="flex items-start gap-3">
                                                                <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-brass/20 flex items-center justify-center">
                                                                    <Check size={10} className="text-brass" />
                                                                </div>
                                                                <span className="text-slate text-sm leading-tight">
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="space-y-4 text-sm mb-6 flex-grow">
                                                    {project.problem ? (
                                                        <div>
                                                            <span className="text-muted uppercase tracking-wider text-xs">Problem</span>
                                                            <p className="text-slate mt-1">{project.problem}</p>
                                                        </div>
                                                    ) : null}
                                                    {project.solution ? (
                                                        <div>
                                                            <span className="text-muted uppercase tracking-wider text-xs">Solution</span>
                                                            <p className="text-slate mt-1">{project.solution}</p>
                                                        </div>
                                                    ) : null}
                                                    {project.outcome ? (
                                                        <div>
                                                            <span className="text-muted uppercase tracking-wider text-xs">Outcome</span>
                                                            <p className="text-off-white mt-1">{project.outcome}</p>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}

                                            {project.url ? (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brass text-matte-black font-semibold rounded-lg hover:bg-brass-light hover:shadow-brass transition-all duration-300 group/button w-fit"
                                                >
                                                    <span>Visit Live Site</span>
                                                    <ExternalLink className="w-4 h-4 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    );
                })}
            </StaggerContainer>

            <Reveal delay={0.3}>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" href="/start-your-project">
                        Start Your Project
                    </Button>
                    <Button variant="secondary" href="#pricing">
                        View Pricing
                    </Button>
                </div>
            </Reveal>
        </SectionWrapper>
    );
}
