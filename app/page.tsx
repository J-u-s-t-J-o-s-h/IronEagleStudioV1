'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Shield,
  Shovel,
  Trees,
  Layers,
  Droplets,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  Star,
  ChevronDown,
} from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Logo } from '@/components/logo'

const services = [
  {
    icon: Shield,
    title: 'Storm Shelter Installation',
    desc: 'Underground shelters designed and installed for Oklahoma tornado country. Built right, anchored deep.',
    href: '/storm-shelter',
  },
  {
    icon: Shovel,
    title: 'Excavation & Dirt Work',
    desc: 'From ponds to foundations — we move earth with precision and leave the site ready for what comes next.',
    href: '/services#excavation',
  },
  {
    icon: Trees,
    title: 'Land Clearing',
    desc: 'Brush, trees, stumps — we clear property so you can build, farm, or simply reclaim your land.',
    href: '/services#land-clearing',
  },
  {
    icon: Layers,
    title: 'Site Grading',
    desc: 'Proper drainage and level pads for driveways, pads, homes, and commercial builds.',
    href: '/services#site-grading',
  },
  {
    icon: Droplets,
    title: 'Septic Installation',
    desc: 'Full septic system installation for rural and residential properties, done to code.',
    href: '/services#septic',
  },
  {
    icon: Wrench,
    title: 'Additional Site Services',
    desc: 'Demolition, haul-off, culvert work, driveway prep, and more. Ask us about your project.',
    href: '/services',
  },
]

const trustPillars = [
  {
    title: 'Quality Workmanship',
    desc: 'We do the job the right way. Every project gets the same level of care regardless of size.',
  },
  {
    title: 'Straight Talk',
    desc: 'No surprises. We give you honest estimates, clear timelines, and direct communication.',
  },
  {
    title: 'Oklahoma Experience',
    desc: 'We know the soil, the weather, and the demands of working land in this state.',
  },
  {
    title: 'Shows Up, Gets It Done',
    desc: 'We show up on time and work until the job is finished. No disappearing acts.',
  },
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured for your protection and peace of mind.',
  },
]

const projects = [
  {
    src: '/images/storm-shelter-install.jpg',
    alt: 'Underground storm shelter installation in progress',
    label: 'Storm Shelter — Edmond, OK',
    tag: 'Storm Shelter',
  },
  {
    src: '/images/land-clearing.jpg',
    alt: 'Heavy equipment clearing brush and trees from rural Oklahoma land',
    label: 'Land Clearing — 12 Acres',
    tag: 'Land Clearing',
  },
  {
    src: '/images/dirt-work.jpg',
    alt: 'Precision dirt work and site grading on residential property',
    label: 'Site Grading — New Build Pad',
    tag: 'Grading',
  },
  {
    src: '/images/project-completed.jpg',
    alt: 'Completed residential site work with fresh grading',
    label: 'Residential Site Prep',
    tag: 'Completed',
  },
]

// Services section with organized tabs
function ServicesSectionComponent() {
  const [activeCategory, setActiveCategory] = useState('primary')
  
  const serviceCategories = {
    primary: {
      label: 'Core Services',
      services: [
        services[0], // Storm Shelter Installation
        services[1], // Excavation & Dirt Work
        services[4], // Septic Installation
      ]
    },
    specialized: {
      label: 'Specialized Work',
      services: [
        services[2], // Land Clearing
        services[3], // Site Grading
      ]
    },
    additional: {
      label: 'Additional Services',
      services: [
        services[5], // Additional Site Services
      ]
    }
  }

  return (
    <section className="bg-sandstone relative texture-diagonal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <AnimatedSection className="text-center mb-16">
          <span className="brand-divider mx-auto mb-5 block" />
          <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight text-balance">
            Complete Outdoor Services
          </h2>
          <p className="text-clay-taupe text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            From storm shelters to septic systems, we handle the hard jobs that take real equipment and real experience.
          </p>
        </AnimatedSection>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.entries(serviceCategories).map(([key, { label }]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`min-h-11 touch-manipulation px-5 py-3 font-bold text-sm tracking-wide uppercase rounded-sm transition-all duration-300 sm:px-6 ${
                activeCategory === key
                  ? 'bg-gunmetal text-bone-linen shadow-md'
                  : 'bg-section-light border-2 border-gunmetal/40 text-gunmetal hover:border-storm-blue hover:text-storm-blue'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Services Grid - Animated */}
        <div className="overflow-hidden">
          {Object.entries(serviceCategories).map(([key, { services: catServices }]) => (
            <div
              key={key}
              className={`transition-all duration-500 ease-out ${
                activeCategory === key 
                  ? 'opacity-100 max-h-[2000px]' 
                  : 'opacity-0 max-h-0 pointer-events-none'
              }`}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catServices.map(({ icon: Icon, title, desc, href }, i) => (
                  <AnimatedSection key={title} delay={i * 100}>
                    <Link
                      href={href}
                      className="group bg-section-light border border-soft-khaki/40 hover:border-storm-blue/60 rounded-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block h-full"
                    >
                      <div className="flex items-center justify-center w-14 h-14 bg-gunmetal rounded-sm mb-6 group-hover:bg-storm-blue transition-colors duration-300">
                        <Icon size={26} className="text-bone-linen" />
                      </div>
                      <h3 className="font-bold text-gunmetal text-xl mb-3 group-hover:text-storm-blue transition-colors">
                        {title}
                      </h3>
                      <p className="text-clay-taupe leading-relaxed mb-5">{desc}</p>
                      <span className="inline-flex items-center gap-2 text-storm-blue font-bold tracking-wide uppercase group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AnimatedSection delay={600} className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gunmetal hover:bg-soft-coal text-bone-linen font-bold text-base tracking-wide uppercase rounded-sm transition-colors shadow-md"
          >
            View All Services
            <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Animated section component with fade-in on scroll
function AnimatedSection({
  children,
  className = '',
  delay = 0,
  /** Hero / above-the-fold: skip observer so content is never stuck at opacity-0 (common on short mobile viewports). */
  immediate = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (immediate) return
    const el = ref.current
    if (!el) return

    const reveal = () => {
      setTimeout(() => {
        el.classList.add('animate-in')
      }, delay)
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }

    // Positive bottom rootMargin helps bottom-aligned hero blocks intersect on mobile; negative margin was hiding them.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal()
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 120px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, immediate])

  if (immediate) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const serviceChips = ['Storm Shelters', 'Excavation', 'Land Clearing', 'Dirt Work', 'Septic Systems']

  return (
    <>
      <SiteNav />
      
      {/* Fixed Hero Background - spans entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/hero-excavation.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        {/* Dark cinematic overlays for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black/55 via-matte-black/72 to-matte-black/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black/62 via-matte-black/35 to-matte-black/18" />
      </div>

      <main id="main-content" className="relative z-10">
        {/* ====== HERO SECTION ====== */}
        <section className="flex flex-col justify-start pb-4 pt-[calc(5.6rem+env(safe-area-inset-top,0px))] sm:pb-6 sm:pt-[calc(6rem+env(safe-area-inset-top,0px))] md:min-h-[100dvh] md:justify-end md:pb-12 md:pt-[calc(7.2rem+env(safe-area-inset-top,0px))] lg:pb-16 lg:pt-[calc(7.75rem+env(safe-area-inset-top,0px))]">
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection immediate>
              <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(290px,0.88fr)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.96fr)] lg:gap-14">
                <div>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-equipment-gold sm:mb-4 sm:text-xs">
                    HJH Outdoor Operations
                  </p>

                  <h1 className="mb-4 max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.08] text-bone-linen sm:mb-5 sm:text-[2.6rem] md:text-5xl lg:mb-7 lg:text-7xl">
                    Storm Shelters &amp; Site Work Done Right.
                  </h1>

                  <p className="mb-6 max-w-2xl text-[1rem] leading-relaxed text-warm-concrete sm:mb-7 sm:text-[1.06rem] md:text-lg lg:mb-10 lg:text-xl">
                    HJH Outdoor Operations provides storm shelter installation, excavation, land clearing, grading, and septic services for Oklahoma homeowners and landowners.
                  </p>

                  <div className="mb-5 flex w-full max-w-xl flex-col gap-3 sm:mb-7 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 lg:mb-9">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-sm bg-storm-blue px-7 py-3.5 text-[0.95rem] font-bold tracking-wide text-bone-linen shadow-lg uppercase transition-colors hover:bg-steel-blue sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                    >
                      Get a Free Quote
                      <ArrowRight size={20} />
                    </Link>
                    <a
                      href="tel:+14058675309"
                      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-sm border-2 border-bone-linen/40 px-7 py-3.5 text-[0.95rem] font-bold tracking-wide text-bone-linen uppercase transition-colors hover:border-bone-linen/80 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                      aria-label="Call us at (405) 867-5309"
                    >
                      <Phone size={20} aria-hidden="true" />
                      (405) 867-5309
                    </a>
                  </div>
                </div>

                <div className="order-first mx-auto mb-5 w-full max-w-[25rem] md:order-none md:mb-0 md:mt-0 md:max-w-[28rem] lg:-mt-6 lg:max-w-[38rem]">
                  <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-matte-black/72 p-2 shadow-[0_26px_58px_rgba(0,0,0,0.56)] backdrop-blur-[4px] sm:p-3 md:p-5 lg:p-8">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl border border-equipment-gold/16"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-equipment-gold/38 to-transparent sm:inset-x-6"
                      aria-hidden="true"
                    />
                    <div className="flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] px-1.5 py-1.5 sm:px-2.5 sm:py-2.5 md:p-3 lg:p-5">
                      <Logo size="xl" showText priority className="w-[86%] justify-center sm:w-[82%] md:w-[86%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 md:mt-7 md:flex-wrap">
                {serviceChips.map((tag, index) => (
                  <span
                    key={tag}
                    className={`shrink-0 rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-soft-khaki uppercase backdrop-blur-sm ${index >= 3 ? 'hidden md:inline-flex' : 'inline-flex'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 hidden justify-center animate-bounce md:flex">
            <ChevronDown size={32} className="text-bone-linen/60" />
          </div>
        </section>

        {/* Spacer to reveal hero background */}
        <div className="h-32 lg:h-56" aria-hidden="true" />

        {/* ====== FLOATING CONTENT CONTAINER ====== */}
        <div className="relative">

          {/* ====== TRUST BAR ====== */}
          <section className="bg-gunmetal relative texture-concrete">
            <div className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
                  {[
                    'Licensed & Insured',
                    'Free Estimates',
                    'Serving All of Oklahoma',
                    'Over 10 Years Experience',
                    'Quality You Can See',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-equipment-gold shrink-0" aria-hidden="true" />
                      <span className="text-soft-khaki text-sm font-semibold tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== STORM SHELTER CALLOUT ====== */}
          <section className="bg-section-light relative overflow-hidden texture-linen">
            {/* Decorative diagonal line */}
            <div className="absolute top-0 right-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-equipment-gold/40 to-equipment-gold" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <AnimatedSection>
                  <div className="relative">
                    <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-2xl">
                      <Image
                        src="/images/storm-shelter-install.jpg"
                        alt="Storm shelter being installed in Oklahoma residential yard"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Badge */}
                    <div className="relative mt-4 w-fit max-w-full ms-auto sm:mt-0 sm:absolute sm:-bottom-5 sm:-right-5 sm:ms-0">
                      <div className="bg-storm-blue text-bone-linen px-5 py-4 sm:px-6 sm:py-5 rounded-sm shadow-xl">
                        <div className="text-2xl font-bold">Tornado</div>
                        <div className="text-xs tracking-widest uppercase text-blue-200/80">Season Ready</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <span className="brand-divider mb-5 block" />
                  <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
                    Featured Service
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight mb-6 text-balance">
                    Oklahoma&apos;s Storm Shelter Experts
                  </h2>
                  <p className="text-clay-taupe text-lg leading-relaxed mb-6">
                    Living in tornado country isn&apos;t optional — but being unprepared is. We install underground storm shelters that are anchored properly, waterproofed, and built to give your family a real safe room when it matters most.
                  </p>
                  <ul className="flex flex-col gap-3 mb-8">
                    {[
                      'Underground and in-garage shelter options',
                      'Professional installation from certified crew',
                      'Waterproofing and ventilation included',
                      'We handle permits and site prep',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-storm-blue mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/storm-shelter"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-base tracking-wide uppercase rounded-sm transition-colors shadow-md"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gunmetal hover:bg-gunmetal hover:text-bone-linen text-gunmetal font-bold text-base tracking-wide uppercase rounded-sm transition-colors"
                    >
                      Get Shelter Quote
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== SERVICES ====== */}
          <ServicesSectionComponent />

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== WHY CHOOSE US ====== */}
          <section className="bg-soft-coal relative texture-concrete">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <AnimatedSection>
                  <span className="brand-divider mb-5 block" />
                  <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
                    Why HJH
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-bone-linen leading-tight mb-6 text-balance">
                    Built on Hard Work and Straight Dealing
                  </h2>
                  <p className="text-warm-concrete text-lg leading-relaxed mb-8">
                    We started HJH Outdoor Operations because we saw how many contractors overpromise and underdeliver. We keep it simple: show up, do the work right, and charge a fair price. That&apos;s it.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-storm-blue hover:bg-storm-blue text-bone-linen font-bold text-base tracking-wide uppercase rounded-sm transition-colors"
                  >
                    About Our Company
                    <ArrowRight size={16} />
                  </Link>
                </AnimatedSection>

                <div className="grid gap-4">
                  {trustPillars.map(({ title, desc }, i) => (
                    <AnimatedSection key={title} delay={i * 100}>
                      <div className="flex items-start gap-4 bg-gunmetal/60 backdrop-blur-sm border border-white/10 rounded-sm p-6 hover:border-equipment-gold/40 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-equipment-gold shrink-0 mt-1.5" />
                        <div>
                          <h4 className="font-bold text-bone-linen mb-1">{title}</h4>
                          <p className="text-soft-khaki/80 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== PROJECTS PREVIEW ====== */}
          <section className="bg-section-light relative texture-linen">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <AnimatedSection>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="brand-divider mb-5 block" />
                    <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
                      Recent Work
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight text-balance">
                      Project Gallery
                    </h2>
                  </div>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-storm-blue font-bold tracking-wide uppercase hover:gap-3 transition-all"
                  >
                    View All Projects <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {projects.map(({ src, alt, label, tag }, i) => (
                  <AnimatedSection key={label} delay={i * 100}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-section-mid shadow-lg">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-matte-black/90 via-matte-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-block px-2 py-1 bg-storm-blue text-bone-linen text-xs font-bold tracking-wide uppercase rounded-sm mb-2">
                          {tag}
                        </span>
                        <p className="text-bone-linen font-semibold leading-tight">{label}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== SERVICE AREA ====== */}
          <section className="bg-sandstone border-t border-soft-khaki/30">
            <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-start gap-4 flex-1">
                  <MapPin size={32} className="text-storm-blue shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-gunmetal text-xl mb-2">Serving Oklahoma &amp; Surrounding Areas</h3>
                    <p className="text-clay-taupe leading-relaxed">
                      Based in Oklahoma, we work across the state and take on projects wherever you need us. Storm shelter installation, excavation, land clearing, and site prep — wherever the work is, we go.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 flex-1 justify-center md:justify-end">
                  {['Oklahoma City', 'Tulsa', 'Edmond', 'Norman', 'Stillwater', 'Lawton', 'Enid', 'Yukon', 'And More'].map((city) => (
                    <span
                      key={city}
                      className="px-4 py-2 bg-section-light border border-soft-khaki/50 text-clay-taupe text-sm font-semibold tracking-wide uppercase rounded-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== TESTIMONIALS ====== */}
          <section className="bg-section-light texture-linen relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <AnimatedSection className="text-center mb-14">
                <span className="brand-divider mx-auto mb-5 block" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal">What Customers Say</h2>
              </AnimatedSection>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    quote: "HJH installed our storm shelter in one day. The crew was professional, the site was clean when they left, and the quality is excellent.",
                    name: 'David M.',
                    location: 'Edmond, OK',
                  },
                  {
                    quote: "We needed a pond dug and a driveway graded. HJH came in, assessed the property, gave us a fair estimate, and knocked it out ahead of schedule.",
                    name: 'Randy T.',
                    location: 'Stillwater, OK',
                  },
                  {
                    quote: "From septic to land clearing to final grading — HJH handled everything for our new build site. One company, start to finish.",
                    name: 'Lisa P.',
                    location: 'Norman, OK',
                  },
                ].map(({ quote, name, location }, i) => (
                  <AnimatedSection key={name} delay={i * 150}>
                    <div className="bg-sandstone border border-soft-khaki/40 rounded-sm p-8 h-full hover:shadow-lg transition-shadow">
                      <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={20} className="text-equipment-gold fill-equipment-gold" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-clay-taupe leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
                      <div>
                        <p className="font-bold text-gunmetal">{name}</p>
                        <p className="text-weathered-stone text-sm">{location}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-28 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== FINAL CTA ====== */}
          <section className="bg-deep-slate relative texture-concrete">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
              <AnimatedSection>
                <span className="brand-divider mx-auto mb-6 block" />
                <h2 className="text-4xl lg:text-5xl font-bold text-bone-linen leading-tight mb-6 text-balance">
                  Talk About Your Project
                </h2>
                <p className="text-warm-concrete text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                  Whether you need a storm shelter before tornado season, or you&apos;ve got a piece of land that needs work — call us or request an estimate. We&apos;ll give you a straight answer.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-12 py-5 bg-equipment-gold hover:bg-burnished-amber text-matte-black font-bold text-lg tracking-wide uppercase rounded-sm transition-colors shadow-xl"
                  >
                    Request a Free Estimate
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href="tel:+14058675309"
                    className="inline-flex items-center gap-3 px-12 py-5 border-2 border-bone-linen/40 hover:border-bone-linen text-bone-linen font-bold text-lg tracking-wide uppercase rounded-sm transition-colors"
                    aria-label="Call us at (405) 867-5309"
                  >
                    <Phone size={20} aria-hidden="true" />
                    Call (405) 867-5309
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />

      {/* Add animation keyframes via style tag */}
      <style jsx global>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  )
}
