'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { useCalendly } from '@/hooks/useCalendly';

export default function ContractReadinessInspection() {
    const { openPopup } = useCalendly();

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-deep-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-off-white mb-6">
                            Contract-Readiness Site Inspection
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-xl md:text-2xl text-slate mb-4 max-w-3xl mx-auto">
                            A professional evaluation of how your website and digital presence are interpreted by evaluators, partners, and external reviewers.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-slate mb-4 max-w-2xl mx-auto">
                            This service is designed for regulated service providers and contractors operating in high-trust, high-scrutiny environments.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="text-base text-slate mb-8 max-w-2xl mx-auto">
                            We work with organizations operating in regulated and high-scrutiny environments.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <Button variant="primary" size="lg" onClick={openPopup}>
                            Request an Assessment
                        </Button>
                    </Reveal>
                </div>
            </section>

            {/* What This Is */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            What This Is
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-lg text-slate leading-relaxed mb-4">
                            The Contract-Readiness Site Inspection is a fixed-scope professional assessment focused on how your public-facing website signals credibility, authority, and risk to external reviewers.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-slate leading-relaxed mb-4">
                            It is not a design critique and not a marketing audit.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="text-lg text-slate leading-relaxed">
                            The inspection evaluates how a third party interprets your organization when they look you up, including whether your digital presence accurately reflects your operational maturity and regulatory posture.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <p className="text-lg text-slate leading-relaxed">
                            The inspection clarifies whether your digital presence supports external evaluation or whether remediation is warranted.
                        </p>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* What This Is Not */}
            <SectionWrapper className="bg-deep-navy/50">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            What This Is Not
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="space-y-3 text-lg text-slate">
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>It is not a website redesign</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>It is not marketing or lead generation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>It is not SEO execution</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>It does not include development or implementation</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>It does not guarantee contracts or outcomes</span>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* Inspection Focus Areas */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-8">
                            Inspection Focus Areas
                        </h2>
                    </Reveal>

                    <div className="space-y-8">
                        <Reveal delay={0.1}>
                            <div>
                                <h3 className="text-xl font-semibold text-off-white mb-3">
                                    Evaluator First-Impression Risk
                                </h3>
                                <ul className="space-y-2 text-slate">
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Initial credibility signals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Authority and seriousness cues</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Perceived regulatory maturity</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div>
                                <h3 className="text-xl font-semibold text-off-white mb-3">
                                    Credibility and Authority Signaling
                                </h3>
                                <ul className="space-y-2 text-slate">
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>How experience and certifications are presented</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Whether authority is stated clearly or implied</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Whether the site reads as operator-led or marketing-led</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div>
                                <h3 className="text-xl font-semibold text-off-white mb-3">
                                    Contract-Readiness Clarity
                                </h3>
                                <ul className="space-y-2 text-slate">
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Signals of familiarity with formal review environments</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Ease of third-party verification</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Appropriateness for government, defense, or institutional scrutiny</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div>
                                <h3 className="text-xl font-semibold text-off-white mb-3">
                                    Structural and Technical Indicators
                                </h3>
                                <ul className="space-y-2 text-slate">
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Information hierarchy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Cognitive load and scannability</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-brass mr-3">•</span>
                                        <span>Outdated patterns that create unnecessary doubt</span>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </SectionWrapper>

            {/* What You Receive */}
            <SectionWrapper className="bg-deep-navy/50">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            What You Receive
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="space-y-3 text-lg text-slate">
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>A documented findings summary outlining risk areas and missed opportunities</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Clear explanations of why each finding matters in an evaluation context</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>A live review discussion to walk through observations and answer questions</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>A recommendation on whether remediation should be incremental or a full rebuild</span>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* Engagement Details */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            Engagement Details
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="text-lg text-slate leading-relaxed mb-6">
                            The inspection is a fixed-scope professional service delivered over approximately one week.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="space-y-2 text-lg text-slate mb-6">
                            <p><span className="font-semibold text-off-white">Fee:</span> $1,500</p>
                            <p><span className="font-semibold text-off-white">Payment:</span> Due prior to commencement</p>
                            <p><span className="font-semibold text-off-white">Refunds:</span> Non-refundable once assessment work begins</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="text-lg text-slate leading-relaxed">
                            If a full implementation is initiated within 60 days, the inspection fee may be credited toward that engagement.
                        </p>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* Who This Is For */}
            <SectionWrapper className="bg-deep-navy/50">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            Who This Is For
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="space-y-3 text-lg text-slate">
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Regulated service providers</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Aviation, defense, engineering, logistics, and technical contractors</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Organizations operating in environments where trust and scrutiny matter</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Teams that want their digital presence to accurately reflect how they actually operate</span>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* Who This Is Not For */}
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-off-white mb-6">
                            Who This Is Not For
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <ul className="space-y-3 text-lg text-slate">
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Small businesses seeking marketing websites</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Companies looking for free audits</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Organizations focused on consumer advertising</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-brass mr-3">•</span>
                                <span>Anyone seeking guarantees or shortcuts</span>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </SectionWrapper>

            {/* Closing CTA */}
            <SectionWrapper className="bg-deep-navy/50" divider={false}>
                <div className="max-w-3xl mx-auto text-center">
                    <Reveal>
                        <p className="text-lg text-slate leading-relaxed mb-8">
                            If you suspect your website may be underselling your credibility or introducing unnecessary doubt during external review, a Contract-Readiness Site Inspection can clarify whether remediation is warranted.
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <Button variant="primary" size="lg" onClick={openPopup}>
                            Request an Assessment
                        </Button>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-sm text-muted mt-6">
                            Initial conversations are brief and exploratory. No obligation to proceed.
                        </p>
                    </Reveal>
                </div>
            </SectionWrapper>
        </>
    );
}
