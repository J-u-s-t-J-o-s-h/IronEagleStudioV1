'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { BUSINESS_EMAIL } from '@/lib/business';

interface FormData {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    projectType: string;
    timeline: string;
    message: string;
    website_url: string; // Honeypot field
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    submit?: string;
}

const projectTypes = [
    'Conversion landing page',
    'Business website',
    'Growth website',
    'Custom web solution',
    'Website redesign',
    'Not sure',
];

const timelineOptions = [
    'As soon as reasonably possible',
    'Within 2–4 weeks',
    'Within 1–2 months',
    'Flexible',
];

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        projectType: '',
        timeline: '',
        message: '',
        website_url: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit form');
            }

            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                businessName: '',
                projectType: '',
                timeline: '',
                message: '',
                website_url: '',
            });
        } catch (error) {
            console.error('Submission error:', error);
            setErrors((prev) => ({
                ...prev,
                submit: `Something went wrong. Please try again or email ${BUSINESS_EMAIL}.`,
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors] || errors.submit) {
            setErrors((prev) => ({ ...prev, [name]: undefined, submit: undefined }));
        }
    };

    if (isSubmitted) {
        return (
            <SectionWrapper id="contact" divider={false}>
                <div className="max-w-2xl mx-auto text-center py-16">
                    <Reveal>
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brass/10 flex items-center justify-center">
                            <CheckCircle size={40} className="text-brass" />
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-3xl font-bold text-off-white mb-4">
                            Message Received
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-slate text-lg mb-8">
                            Thank you for reaching out. We&apos;ll review your message
                            and get back to you within one business day.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Button
                            variant="secondary"
                            onClick={() => setIsSubmitted(false)}
                        >
                            Send Another Message
                        </Button>
                    </Reveal>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper id="contact" divider={false}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                <div>
                    <Reveal>
                        <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                            Contact
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-6">
                            Prefer a Direct<br />
                            <span className="text-brass">Message?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-slate text-lg mb-6 leading-relaxed">
                            For the most accurate recommendation, start with the project
                            questionnaire. You can also send a short message here or email us directly.
                        </p>
                    </Reveal>
                    <Reveal delay={0.25}>
                        <div className="mb-8">
                            <Button variant="primary" href="/start-your-project">
                                Start Your Project
                            </Button>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <span className="text-sm">Response within 24 hours</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <a
                                    href={`mailto:${BUSINESS_EMAIL}`}
                                    className="text-sm hover:text-brass transition-colors"
                                >
                                    {BUSINESS_EMAIL}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <Link href="/start-your-project" className="text-sm hover:text-brass transition-colors">
                                    Full project questionnaire
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal direction="right" delay={0.2}>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-deep-navy border border-gunmetal p-6 md:p-8"
                    >
                        {errors.submit && (
                            <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 flex items-center gap-3 text-red-200 text-sm">
                                <AlertCircle size={18} />
                                {errors.submit}
                            </div>
                        )}

                        <div className="space-y-6">
                            <input
                                type="text"
                                name="website_url"
                                value={formData.website_url}
                                onChange={handleChange}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-off-white mb-2">
                                        Name <span className="text-brass">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-matte-black border ${errors.name ? 'border-red-500' : 'border-gunmetal'} text-off-white placeholder-muted focus:outline-none focus:border-brass transition-colors min-h-[48px]`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-off-white mb-2">
                                        Email <span className="text-brass">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-matte-black border ${errors.email ? 'border-red-500' : 'border-gunmetal'} text-off-white placeholder-muted focus:outline-none focus:border-brass transition-colors min-h-[48px]`}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-off-white mb-2">
                                        Phone <span className="text-muted text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-matte-black border border-gunmetal text-off-white placeholder-muted focus:outline-none focus:border-brass transition-colors min-h-[48px]"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="businessName" className="block text-sm font-medium text-off-white mb-2">
                                        Business Name <span className="text-muted text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="businessName"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-matte-black border border-gunmetal text-off-white placeholder-muted focus:outline-none focus:border-brass transition-colors min-h-[48px]"
                                        placeholder="Company Ltd."
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="projectType" className="block text-sm font-medium text-off-white mb-2">
                                        Project Type
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-matte-black border border-gunmetal text-off-white focus:outline-none focus:border-brass transition-colors appearance-none cursor-pointer min-h-[48px]"
                                    >
                                        <option value="" className="text-muted">Select type...</option>
                                        {projectTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="timeline" className="block text-sm font-medium text-off-white mb-2">
                                        Timeline
                                    </label>
                                    <select
                                        id="timeline"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-matte-black border border-gunmetal text-off-white focus:outline-none focus:border-brass transition-colors appearance-none cursor-pointer min-h-[48px]"
                                    >
                                        <option value="" className="text-muted">Select timeline...</option>
                                        {timelineOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-off-white mb-2">
                                    Message <span className="text-brass">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 bg-matte-black border ${errors.message ? 'border-red-500' : 'border-gunmetal'} text-off-white placeholder-muted resize-none focus:outline-none focus:border-brass transition-colors`}
                                    placeholder="Tell us about your project..."
                                />
                                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Reveal>
            </div>
        </SectionWrapper>
    );
}
