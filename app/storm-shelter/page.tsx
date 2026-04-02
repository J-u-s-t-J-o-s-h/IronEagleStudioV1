'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone, ChevronDown, ChevronUp, Shield, AlertTriangle, Wrench, Home } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

const faqs = [
  {
    q: 'How long does storm shelter installation take?',
    a: 'Most residential underground storm shelter installations are completed in a single day. We handle site prep, excavation, shelter placement, waterproofing, and backfill. If there are site access complications or permit requirements, we\'ll communicate that upfront.',
  },
  {
    q: 'Do I need a permit to install a storm shelter in Oklahoma?',
    a: 'In many Oklahoma municipalities and counties, a permit is required for storm shelter installation. We help coordinate the permitting process as part of our installation service, so you don\'t have to navigate that alone.',
  },
  {
    q: 'What\'s the difference between an underground and a garage shelter?',
    a: 'Underground shelters are buried in the yard, typically accessed via a hatch in the ground. Garage shelters (also called safe rooms) are installed in the garage floor and accessed via a steel door that opens downward. Both provide excellent protection — the right choice depends on your property layout and personal preference.',
  },
  {
    q: 'Will the shelter flood?',
    a: 'All of our shelter installations include proper waterproofing measures and drainage design to minimize the risk of water intrusion. We assess the site before installation to understand drainage conditions and adjust our approach accordingly.',
  },
  {
    q: 'What size shelter do I need?',
    a: 'We recommend sizing based on your household, plus some room for neighbors or guests in an emergency. A 4-person family can typically fit in a 4x6 or 6x6 unit. We can walk you through the sizing options during your estimate.',
  },
  {
    q: 'How much does storm shelter installation cost?',
    a: 'Costs vary depending on shelter size, type, site conditions, and permitting requirements. We provide free, no-pressure estimates so you know exactly what you\'re looking at before committing. Call or contact us to schedule an assessment.',
  },
  {
    q: 'Can you install a shelter in an existing yard?',
    a: 'Yes. We install shelters in existing yards, under garage slabs, and on rural properties regularly. Our equipment can access most residential properties. We\'ll discuss any site constraints during the estimate.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Site Assessment',
    desc: 'We come to your property, evaluate the soil conditions, access points, drainage, and determine the best shelter location and type for your situation.',
  },
  {
    number: '02',
    title: 'Permit Coordination',
    desc: 'Where required, we help coordinate the necessary permits so you don\'t have to navigate the process alone.',
  },
  {
    number: '03',
    title: 'Excavation',
    desc: 'We excavate to the required depth using precision equipment, minimizing disruption to your yard and surrounding landscape.',
  },
  {
    number: '04',
    title: 'Shelter Placement',
    desc: 'The shelter unit is placed, leveled, and set in position using our lifting equipment. Anchoring is done to manufacturer specification.',
  },
  {
    number: '05',
    title: 'Waterproofing & Finishing',
    desc: 'We apply waterproofing, install ventilation, and complete all connections. The access hatch or door is verified for smooth, reliable operation.',
  },
  {
    number: '06',
    title: 'Backfill & Site Cleanup',
    desc: 'We backfill around the shelter, grade the surface, and leave your property clean. We do a final walkthrough with you to make sure everything is right.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b-2 border-soft-khaki/40">
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
        <p className="text-clay-taupe text-base leading-relaxed pb-6">
          {a}
        </p>
      )}
    </div>
  )
}

export default function StormShelterPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        {/* Hero */}
        <section className="relative flex min-h-[min(100dvh,56rem)] items-end overflow-hidden pb-16 sm:min-h-[60vh]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/storm-shelter-install.jpg"
              alt="Storm shelter installation in Oklahoma residential property"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/70 to-matte-black/40" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] sm:px-6 lg:px-8">
            <span className="brand-divider mb-4 block" />
            <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
              Featured Service
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-bone-linen leading-tight text-balance max-w-3xl mb-5">
              Storm Shelter Installation
            </h1>
            <p className="text-warm-concrete text-lg max-w-2xl leading-relaxed mb-8">
              Oklahoma gets hit hard by tornadoes every season. A properly installed underground shelter is the only guarantee your family has a safe place to go. We install them right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
              >
                Get a Shelter Quote
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14058675309"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-bone-linen/40 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
              >
                <Phone size={14} />
                (405) 867-5309
              </a>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="bg-deep-slate">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: AlertTriangle,
                  stat: '#1',
                  label: 'Oklahoma ranks among the highest tornado-risk states in the country',
                },
                {
                  icon: Shield,
                  stat: '100%',
                  label: 'Underground storm shelters provide maximum protection from direct tornado impact',
                },
                {
                  icon: Home,
                  stat: '1 Day',
                  label: 'Most residential shelter installations are completed start to finish in a single day',
                },
              ].map(({ icon: Icon, stat, label }) => (
                <div key={stat} className="flex flex-col items-center gap-3">
                  <Icon size={28} className="text-equipment-gold" />
                  <div className="text-4xl font-bold text-bone-linen">{stat}</div>
                  <p className="text-warm-concrete text-sm leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About our shelter service */}
        <section className="bg-section-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="brand-divider mb-4 block" />
                <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight mb-5 text-balance">
                  Professional Installation You Can Trust
                </h2>
                <p className="text-clay-taupe leading-relaxed mb-4">
                  We&apos;ve installed storm shelters across Oklahoma for residential and rural properties. We work with quality shelter manufacturers and install every unit to the manufacturer&apos;s specification and local code requirements.
                </p>
                <p className="text-clay-taupe leading-relaxed mb-7">
                  Our crew handles everything: site assessment, excavation, shelter placement, waterproofing, backfill, and cleanup. We take the stress out of the process and leave you with a shelter you can rely on for decades.
                </p>
                <ul className="flex flex-col gap-3 mb-7">
                  {[
                    'Underground and in-garage safe room options',
                    'Sizing for families of all sizes',
                    'Proper anchoring to prevent floating',
                    'Waterproofing membrane and drainage planning',
                    'Ventilation for extended occupancy',
                    'Permit coordination where required',
                    'Final walkthrough and access verification',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className="text-storm-blue mt-0.5 shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
                >
                  Schedule a Free Assessment
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="flex flex-col gap-5">
                <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                  <Image
                    src="/images/storm-shelter-interior.jpg"
                    alt="Interior of a completed storm shelter installation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-gunmetal border border-white/10 rounded-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench size={16} className="text-equipment-gold" />
                    <span className="text-bone-linen font-bold text-sm">Shelter Types We Install</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {[
                      'Below-ground yard shelters',
                      'Garage floor safe rooms',
                      'In-ground concrete shelters',
                      'Steel underground units',
                    ].map((type) => (
                      <li key={type} className="text-soft-khaki/80 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-equipment-gold" />
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section className="bg-section-mid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center mb-14">
              <span className="brand-divider mx-auto mb-4 block" />
              <h2 className="text-4xl font-bold text-gunmetal leading-tight">
                Our Installation Process
              </h2>
              <p className="text-clay-taupe text-lg mt-4 max-w-xl mx-auto leading-relaxed">
                We walk every customer through the process so there are no surprises. Here&apos;s how it works from start to finish.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map(({ number, title, desc }) => (
                <div key={number} className="bg-section-light border border-soft-khaki/40 rounded-sm p-7">
                  <div className="text-4xl font-bold text-storm-blue/20 mb-3 leading-none">{number}</div>
                  <h3 className="font-bold text-gunmetal text-lg mb-2">{title}</h3>
                  <p className="text-clay-taupe text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-section-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center mb-12">
              <span className="brand-divider mx-auto mb-4 block" />
              <h2 className="text-4xl font-bold text-gunmetal">
                Common Questions
              </h2>
            </div>
            <div className="bg-section-mid border border-soft-khaki/40 rounded-sm px-7">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-storm-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-4xl font-bold text-bone-linen mb-4 text-balance">
              Don&apos;t wait for tornado season to start
            </h2>
            <p className="text-blue-200/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              We schedule installations year-round. Get a free estimate now and have your shelter in place before the storms come.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-equipment-gold hover:bg-burnished-amber text-matte-black font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
              >
                Request Your Free Quote
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14058675309"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-bone-linen/50 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
              >
                <Phone size={14} />
                Call (405) 867-5309
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
