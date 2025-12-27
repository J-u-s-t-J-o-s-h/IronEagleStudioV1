'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Card from '@/components/ui/Card';
import Reveal from '@/components/ui/Reveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import workData from '@/data/work.json';

export default function FeaturedWork() {
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
                        and the results we deliver for our clients.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                {workData.projects.map((project) => (
                    <StaggerItem key={project.id}>
                        <Card className="group overflow-hidden" circuitAccent={false}>
                            <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                                {/* Screenshot */}
                                <div className="md:col-span-5 order-2 md:order-1">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative overflow-hidden rounded-lg border border-gunmetal group/image hover:border-brass/50 transition-all duration-300"
                                    >
                                        <div className="aspect-video relative bg-gunmetal/30">
                                            {project.image ? (
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} website screenshot`}
                                                    fill
                                                    className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 40vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center p-8">
                                                        <ExternalLink className="w-12 h-12 text-brass/50 mx-auto mb-3" />
                                                        <p className="text-slate text-sm">Screenshot Preview</p>
                                                        <p className="text-muted text-xs mt-1">Click to visit site</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-brass/0 group-hover/image:bg-brass/10 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                                                <ExternalLink className="w-8 h-8 text-brass" />
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                {/* Content */}
                                <div className={`md:col-span-7 order-1 md:order-2 ${project.image ? '' : 'md:col-span-12'}`}>
                                    <div className="flex flex-col h-full">
                                        {/* Header */}
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <h3 className="text-xl md:text-2xl font-semibold text-off-white">
                                                {project.title}
                                            </h3>
                                            <span className="text-xs text-brass bg-brass/10 px-2 py-1 rounded">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Metric highlight */}
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

                                        {/* Description */}
                                        <div className="space-y-4 text-sm mb-6 flex-grow">
                                            <div>
                                                <span className="text-muted uppercase tracking-wider text-xs">Problem</span>
                                                <p className="text-slate mt-1">{project.problem}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted uppercase tracking-wider text-xs">Solution</span>
                                                <p className="text-slate mt-1">{project.solution}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted uppercase tracking-wider text-xs">Outcome</span>
                                                <p className="text-off-white mt-1">{project.outcome}</p>
                                            </div>
                                        </div>

                                        {/* Visit Site Button */}
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brass text-matte-black font-semibold rounded-lg hover:bg-brass-light hover:shadow-brass transition-all duration-300 group/button"
                                            >
                                                <span>Visit Live Site</span>
                                                <ExternalLink className="w-4 h-4 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
