'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

const faqs = [
  {
    q: 'How do I get a quote?',
    a: 'Fill out the form on this page, call us directly at (405) 867-5309, or send us an email. For most jobs, we like to do a quick site visit before giving a firm number — it helps us give you an accurate estimate and catch any site-specific considerations upfront.',
  },
  {
    q: 'How quickly can you start a project?',
    a: 'It depends on our current schedule and the scope of your project. We try to schedule estimates within a few business days and can typically start work within 1-3 weeks for most jobs. Storm shelter installs are often completed the day of, once scheduled.',
  },
  {
    q: 'Do you do free estimates?',
    a: 'Yes. All estimates are free and there is no pressure or obligation. We come out, look at the site, and give you a clear number.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. HJH Outdoor Operations is fully licensed and insured for all types of work we perform, including storm shelter installation, excavation, grading, and septic installation.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We are based in Oklahoma and serve customers throughout the state, including Oklahoma City, Tulsa, Edmond, Norman, Stillwater, Lawton, Enid, Yukon, and surrounding areas. For larger projects, we will travel further — give us a call and we can discuss.',
  },
  {
    q: 'How do I prepare my site for excavation or land clearing?',
    a: 'We will talk through this during the estimate visit. Generally, we ask that you mark any underground utilities (call 811 before we dig), clear any personal property or equipment from the work area, and ensure equipment access to the site. We handle the rest.',
  },
  {
    q: 'Can you handle multiple services on the same project?',
    a: 'Yes, and that is often the most efficient approach. Many of our customers hire us for site clearing, grading, and then storm shelter installation all in one project. We coordinate the sequencing and give you a combined estimate.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b-2 border-soft-khaki/40 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gunmetal text-base leading-snug">{q}</span>
        {open ? (
          <ChevronUp size={24} className="text-storm-blue shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown size={24} className="text-weathered-stone shrink-0" aria-hidden="true" />
        )}
      </button>
      {open && (
        <p className="text-clay-taupe text-base leading-relaxed pb-6">{a}</p>
      )}
    </div>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="w-14 h-14 bg-storm-blue/20 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 size={28} className="text-storm-blue" />
        </div>
        <h3 className="text-xl font-bold text-gunmetal mb-3">Message Received</h3>
        <p className="text-clay-taupe text-sm leading-relaxed max-w-sm">
          We&apos;ll be in touch shortly to discuss your project and schedule an estimate. If you need a faster response, call us directly at{' '}
          <a href="tel:+14058675309" className="text-storm-blue font-semibold">(405) 867-5309</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-bold tracking-wide text-gunmetal">
            Your Name <span className="text-storm-blue">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="px-5 py-4 bg-section-light border-2 border-soft-khaki/60 focus:border-storm-blue text-foreground text-base rounded-sm outline-none transition-colors placeholder:text-weathered-stone/60"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-bold tracking-wide text-gunmetal">
            Phone Number <span className="text-storm-blue">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(405) 000-0000"
            className="px-5 py-4 bg-section-light border-2 border-soft-khaki/60 focus:border-storm-blue text-foreground text-base rounded-sm outline-none transition-colors placeholder:text-weathered-stone/60"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-bold tracking-wide text-gunmetal">
          Email Address <span className="text-weathered-stone">(optional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="px-5 py-4 bg-section-light border-2 border-soft-khaki/60 focus:border-storm-blue text-foreground text-base rounded-sm outline-none transition-colors placeholder:text-weathered-stone/60"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="service" className="text-sm font-bold tracking-wide text-gunmetal">
          What Do You Need Help With?
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="px-5 py-4 bg-section-light border-2 border-soft-khaki/60 focus:border-storm-blue text-foreground text-base rounded-sm outline-none transition-colors"
        >
          <option value="">Pick a service...</option>
          <option>Storm Shelter Installation</option>
          <option>Excavation</option>
          <option>Dirt Work</option>
          <option>Land Clearing</option>
          <option>Site Grading</option>
          <option>Septic System Installation</option>
          <option>Multiple Services</option>
          <option>Other / Not Sure</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-bold tracking-wide text-gunmetal">
          Tell Us About Your Project <span className="text-storm-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Where is your property? What work do you need done? Any timeline?"
          className="px-5 py-4 bg-section-light border-2 border-soft-khaki/60 focus:border-storm-blue text-foreground text-base rounded-sm outline-none transition-colors resize-none placeholder:text-weathered-stone/60"
        />
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-lg tracking-wide uppercase rounded-sm transition-colors"
      >
        Send Message
      </button>

      <p className="text-weathered-stone text-sm text-center">
        No spam. No pressure. We&apos;ll contact you to discuss your project.
      </p>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        {/* Header */}
        <section className="bg-soft-coal pb-16 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-[calc(11.75rem+env(safe-area-inset-top,0px))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="brand-divider mb-4 block" />
            <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight text-balance max-w-3xl">
              Let&apos;s Talk About Your Project
            </h1>
            <p className="text-warm-concrete text-lg mt-5 max-w-2xl leading-relaxed">
              Fill out the form, give us a call, or send us an email. We respond fast and give free, honest estimates.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="bg-section-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2 bg-section-mid border border-soft-khaki/40 rounded-sm p-7 lg:p-10">
                <h2 className="text-2xl font-bold text-gunmetal mb-2">Request a Free Estimate</h2>
                <p className="text-clay-taupe text-sm mb-7">
                  Tell us about your project and we&apos;ll be in touch to set up a site visit and estimate.
                </p>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-5">
                {/* Phone */}
                <div className="bg-storm-blue rounded-sm p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone size={18} className="text-bone-linen" />
                    <span className="text-bone-linen font-bold text-sm uppercase tracking-wide">Call Us</span>
                  </div>
                  <a
                    href="tel:+14058675309"
                    className="text-xl font-bold text-bone-linen hover:text-blue-200 transition-colors block mb-1 break-words sm:text-2xl"
                  >
                    (405) 867-5309
                  </a>
                  <p className="text-blue-200/70 text-xs">
                    Fastest way to reach us. We answer during business hours and often evenings.
                  </p>
                </div>

                {/* Email */}
                <div className="bg-section-mid border border-soft-khaki/40 rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={16} className="text-storm-blue" />
                    <span className="text-gunmetal font-bold text-sm uppercase tracking-wide">Email</span>
                  </div>
                  <a
                    href="mailto:info@hjhoutdoor.com"
                    className="text-storm-blue text-sm font-semibold hover:text-steel-blue transition-colors"
                  >
                    info@hjhoutdoor.com
                  </a>
                </div>

                {/* Service Area */}
                <div className="bg-section-mid border border-soft-khaki/40 rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={16} className="text-storm-blue" />
                    <span className="text-gunmetal font-bold text-sm uppercase tracking-wide">Service Area</span>
                  </div>
                  <p className="text-clay-taupe text-sm leading-relaxed">
                    Serving all of Oklahoma including Oklahoma City, Tulsa, Edmond, Norman, Stillwater, Lawton, Enid, Yukon, and surrounding communities.
                  </p>
                </div>

                {/* Hours */}
                <div className="bg-section-mid border border-soft-khaki/40 rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={16} className="text-storm-blue" />
                    <span className="text-gunmetal font-bold text-sm uppercase tracking-wide">Hours</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {[
                      { day: 'Monday – Friday', hours: '7:00 AM – 6:00 PM' },
                      { day: 'Saturday', hours: '8:00 AM – 4:00 PM' },
                      { day: 'Sunday', hours: 'By Appointment' },
                    ].map(({ day, hours }) => (
                      <li key={day} className="flex justify-between text-xs">
                        <span className="text-clay-taupe font-semibold">{day}</span>
                        <span className="text-weathered-stone">{hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to expect */}
                <div className="bg-gunmetal border border-white/10 rounded-sm p-6">
                  <p className="text-bone-linen font-bold text-sm mb-3">What to Expect</p>
                  <ul className="flex flex-col gap-2">
                    {[
                      'We respond to all inquiries within 1 business day',
                      'Free, no-obligation site visit and estimate',
                      'Clear pricing before any work begins',
                      'No hidden fees or surprise charges',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-equipment-gold mt-0.5 shrink-0" />
                        <span className="text-soft-khaki/80 text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-section-mid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center mb-12">
              <span className="brand-divider mx-auto mb-4 block" />
              <h2 className="text-4xl font-bold text-gunmetal">Frequently Asked Questions</h2>
              <p className="text-clay-taupe text-lg mt-3 leading-relaxed">
                Common questions we hear from customers before they get started.
              </p>
            </div>
            <div className="bg-section-light border border-soft-khaki/40 rounded-sm px-7">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </div>
            <p className="text-center text-clay-taupe text-sm mt-6">
              Have a question not answered here?{' '}
              <a href="tel:+14058675309" className="text-storm-blue font-semibold hover:underline">
                Give us a call
              </a>{' '}
              and we&apos;ll answer it directly.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
