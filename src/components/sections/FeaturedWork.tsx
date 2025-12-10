'use client';

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
                        Real results from real projects. A selection of outcomes
                        that demonstrate our approach.
                    </p>
                </Reveal>
            </div>

            <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                {workData.projects.map((project) => (
                    <StaggerItem key={project.id}>
                        <Card className="group" circuitAccent={false}>
                            <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                                {/* Metric highlight */}
                                <div className="md:col-span-3 flex flex-col justify-center">
                                    <div className="text-center md:text-left">
                                        <span className="block text-4xl md:text-5xl font-bold text-brass mb-1">
                                            {project.metrics.primary}
                                        </span>
                                        <span className="text-sm text-slate uppercase tracking-wider">
                                            {project.metrics.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-9 md:border-l md:border-gunmetal md:pl-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <h3 className="text-xl font-semibold text-off-white">
                                            {project.title}
                                        </h3>
                                        <span className="text-xs text-brass bg-brass/10 px-2 py-1">
                                            {project.category}
                                        </span>
                                    </div>

                                    <div className="space-y-4 text-sm">
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
                                </div>
                            </div>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </SectionWrapper>
    );
}
