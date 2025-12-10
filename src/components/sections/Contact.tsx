'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

interface FormData {
    name: string;
    email: string;
    projectType: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const projectTypes = [
    'Web Application',
    'Marketing Website',
    'Brand & Identity',
    'Product Redesign',
    'Performance Optimization',
    'Other',
];

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        projectType: '',
        message: '',
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

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
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
                            Thank you for reaching out. We&apos;ll review your project details
                            and get back to you within one business day.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({ name: '', email: '', projectType: '', message: '' });
                            }}
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
                {/* Content */}
                <div>
                    <Reveal>
                        <span className="text-brass text-sm font-semibold uppercase tracking-widest mb-4 block">
                            Get Started
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-off-white mb-6">
                            Let&apos;s Build<br />
                            <span className="text-brass">Something Great</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-slate text-lg mb-8 leading-relaxed">
                            Ready to discuss your project? Fill out the form and we&apos;ll
                            schedule a discovery call to understand your goals and explore
                            how we can help.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <span>Response within 24 hours</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <span>No-obligation discovery call</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate">
                                <div className="w-2 h-2 rounded-full bg-brass" />
                                <span>Custom solutions, not templates</span>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Form */}
                <Reveal direction="right" delay={0.2}>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-deep-navy border border-gunmetal p-8"
                    >
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-off-white mb-2"
                                >
                                    Name <span className="text-brass">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`
                    w-full px-4 py-3 bg-matte-black border 
                    ${errors.name ? 'border-red-500' : 'border-gunmetal'} 
                    text-off-white placeholder-muted
                    focus:outline-none focus:border-brass transition-colors
                  `}
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-off-white mb-2"
                                >
                                    Email <span className="text-brass">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`
                    w-full px-4 py-3 bg-matte-black border 
                    ${errors.email ? 'border-red-500' : 'border-gunmetal'} 
                    text-off-white placeholder-muted
                    focus:outline-none focus:border-brass transition-colors
                  `}
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Project Type */}
                            <div>
                                <label
                                    htmlFor="projectType"
                                    className="block text-sm font-medium text-off-white mb-2"
                                >
                                    Project Type
                                </label>
                                <select
                                    id="projectType"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="
                    w-full px-4 py-3 bg-matte-black border border-gunmetal 
                    text-off-white
                    focus:outline-none focus:border-brass transition-colors
                    appearance-none cursor-pointer
                  "
                                >
                                    <option value="" className="text-muted">Select a project type</option>
                                    {projectTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-off-white mb-2"
                                >
                                    Message <span className="text-brass">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`
                    w-full px-4 py-3 bg-matte-black border 
                    ${errors.message ? 'border-red-500' : 'border-gunmetal'} 
                    text-off-white placeholder-muted resize-none
                    focus:outline-none focus:border-brass transition-colors
                  `}
                                    placeholder="Tell us about your project..."
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit */}
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
