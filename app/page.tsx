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
  ChevronDown,
  Hammer,
  MessageSquare,
  Mountain,
  Timer,
  BadgeCheck,
} from 'lucide-react'
import ElectricBorder from '@/components/ElectricBorder'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PremiumSectionBackdrop } from '@/components/premium-section-backdrop'
import { ElfsightWidget } from '@/components/elfsight-widget'
import { homeProjectCards, siteMedia } from '@/lib/site-media'

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
    title: 'Culvert Installation',
    desc: 'Culvert installs and replacements to improve drainage, driveway access, and long-term property protection.',
    href: '/services#additional',
  },
  {
    icon: Hammer,
    title: 'Demolition',
    desc: 'Targeted residential demolition and haul-off for barns, concrete pads, and other site obstacles.',
    href: '/services#additional',
  },
  {
    icon: Layers,
    title: 'Driveways',
    desc: 'Driveway prep, regrading, and base shaping for smoother access and better water runoff.',
    href: '/services#additional',
  },
]

const trustPillars = [
  {
    title: 'Quality Workmanship',
    desc: 'We do the job the right way. Every project gets the same level of care regardless of size.',
    icon: Hammer,
  },
  {
    title: 'Straight Talk',
    desc: 'No surprises. We give you honest estimates, clear timelines, and direct communication.',
    icon: MessageSquare,
  },
  {
    title: 'Oklahoma Experience',
    desc: 'We know the soil, the weather, and the demands of working land in this state.',
    icon: Mountain,
  },
  {
    title: 'Shows Up, Gets It Done',
    desc: 'We show up on time and work until the job is finished. No disappearing acts.',
    icon: Timer,
  },
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured for your protection and peace of mind.',
    icon: BadgeCheck,
  },
]

const projects = [...homeProjectCards]

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
        services[5], // Culvert Installation
        services[6], // Demolition
        services[7], // Driveways
      ]
    }
  }

  return (
    <section className="relative isolate overflow-hidden">
      <PremiumSectionBackdrop fillClassName="bg-sandstone" texture="brand-2" />
      <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-matte-black">
        <AnimatedSection className="text-center mb-16">
          <span className="brand-divider mx-auto mb-5 block" />
          <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight text-balance">
            Complete Outdoor Services
          </h2>
          <p className="text-matte-black text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
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
              className={`min-h-11 touch-manipulation px-5 py-3 font-bold text-sm tracking-wide uppercase rounded-xl transition-all duration-300 sm:px-6 ${activeCategory === key
                  ? 'bg-gunmetal text-bone-linen shadow-md'
                  : 'bg-section-light border-2 border-gunmetal/40 text-gunmetal hover:border-storm-blue hover:text-storm-blue'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Services Grid - Animated — overflow only when collapsed so hover lift is not clipped */}
        <div>
          {Object.entries(serviceCategories).map(([key, { services: catServices }]) => (
            <div
              key={key}
              className={`transition-all duration-500 ease-out ${activeCategory === key
                  ? 'opacity-100 max-h-[2000px] overflow-visible'
                  : 'max-h-0 overflow-hidden opacity-0 pointer-events-none'
                }`}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-1 pt-1">
                {catServices.map(({ icon: Icon, title, desc, href }, i) => (
                  <AnimatedSection key={title} delay={i * 100} className="h-full min-h-0">
                    <Link
                      href={href}
                      className="group relative flex h-full min-h-[17rem] flex-col rounded-2xl border border-soft-khaki/25 bg-gunmetal p-8 pb-9 shadow-lg shadow-black/25 ring-1 ring-white/5 transition-all duration-300 [transform:perspective(900px)_translateZ(0)] hover:-translate-y-1.5 hover:border-storm-blue/55 hover:[transform:perspective(900px)_translateZ(8px)] hover:shadow-2xl hover:shadow-black/35 sm:min-h-[18rem] sm:p-9"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 rounded-2xl ring-1 ring-white/8" />
                        <span className="absolute inset-[1px] rounded-[0.85rem] border border-black/25" />
                        <span className="absolute inset-0 bg-gradient-to-b from-storm-blue/22 via-gunmetal/95 to-matte-black/96" />
                        <span className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_12%_8%,rgba(181,138,58,0.2),transparent_35%),radial-gradient(circle_at_88%_92%,rgba(58,98,138,0.22),transparent_40%)]" />
                        <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-equipment-gold/75 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-storm-blue/25 blur-2xl transition-opacity duration-300 group-hover:bg-storm-blue/35" />
                        <span className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-equipment-gold/12 blur-3xl transition-opacity duration-300 group-hover:bg-equipment-gold/18" />
                        <span className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent" />
                      </span>

                      <div className="relative z-10 mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-soft-khaki/30 bg-soft-coal/85 shadow-md shadow-black/35 ring-1 ring-white/5 transition-colors duration-300 group-hover:border-storm-blue/40 group-hover:bg-storm-blue">
                        <Icon size={26} className="text-bone-linen" />
                      </div>

                      <h3 className="relative z-10 mb-3 text-balance text-xl font-bold leading-snug text-bone-linen transition-colors group-hover:text-blue-200">
                        {title}
                      </h3>
                      <p className="relative z-10 mb-6 grow leading-relaxed text-pretty text-soft-khaki/90">
                        {desc}
                      </p>

                      <span className="relative z-10 mt-auto inline-flex items-center gap-2 pb-0.5 text-sm font-bold tracking-widest text-equipment-gold uppercase transition-all group-hover:gap-3 group-hover:text-burnished-amber">
                        Explore {title} <ArrowRight size={14} className="translate-y-[0.5px]" />
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
            className="inline-flex items-center gap-2 px-10 py-5 bg-gunmetal hover:bg-soft-coal text-bone-linen font-bold text-base tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-black/25 ring-1 ring-white/10 hover:shadow-xl"
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

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
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
  const trustItems = [
    'Licensed & Insured',
    'Free Estimates',
    'Serving All of Oklahoma',
    'Over 10 Years Experience',
    'Quality You Can See',
  ]
  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Share your project goals, location, and timeline so we can scope the work correctly.',
      outcome: 'Clear scope and next steps.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Installation',
      description: 'Our crew schedules the work, handles site prep, and completes the job with the right equipment.',
      outcome: 'Work completed safely and on plan.',
      icon: Wrench,
    },
    {
      step: '03',
      title: 'Final Inspection',
      description: 'We walk the site with you, confirm quality, and make sure everything is finished the right way.',
      outcome: 'You sign off with confidence.',
      icon: Shield,
    },
  ]
  const heroLoaded = true
  const testimonialsRef = useRef<HTMLElement>(null)
  const reviewsEnabled = process.env.NEXT_PUBLIC_ENABLE_REVIEWS_WIDGET !== 'false'
  const [shouldLoadReviewsScript, setShouldLoadReviewsScript] = useState(false)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [])

  useEffect(() => {
    if (!reviewsEnabled) return
    const sectionEl = testimonialsRef.current
    if (!sectionEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadReviewsScript(true)
          observer.disconnect()
        }
      },
      { rootMargin: '350px 0px' }
    )

    observer.observe(sectionEl)
    return () => observer.disconnect()
  }, [reviewsEnabled])

  useEffect(() => {
    if (!reviewsEnabled || !shouldLoadReviewsScript) return
    if (document.querySelector('script[data-elfsight-platform="true"]')) return

    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    script.defer = true
    script.dataset.elfsightPlatform = 'true'
    document.body.appendChild(script)
  }, [reviewsEnabled, shouldLoadReviewsScript])

  return (
    <>
      <SiteNav />
      {/* Fixed Hero Background - spans entire page */}
      <div className="fixed inset-0 z-0">
        <Image
          src={siteMedia.hero}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ease-out ${heroLoaded ? 'opacity-100' : 'opacity-70'
            }`}
          aria-hidden="true"
        />
        {/* Dark cinematic overlays for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black/55 via-matte-black/72 to-matte-black/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black/62 via-matte-black/35 to-matte-black/18" />
      </div>

      <main id="main-content" className="relative z-10">
        {/* ====== HERO SECTION ====== */}
        <section id="home-hero" className="flex min-h-[100dvh] flex-col justify-end pb-6 pt-[calc(4.2rem+env(safe-area-inset-top,0px))] sm:pb-6 sm:pt-[calc(4.5rem+env(safe-area-inset-top,0px))] md:pb-12 md:pt-[calc(7rem+env(safe-area-inset-top,0px))] lg:pb-16 lg:pt-[calc(7.65rem+env(safe-area-inset-top,0px))]">
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection immediate>
              <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(290px,0.88fr)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.96fr)] lg:gap-14">
                <div
                  className={`hero-reveal transition-all duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-16 translate-y-4'
                    }`}
                >
                  <div
                    className={`hero-reveal mb-5 flex w-full max-w-xl flex-col gap-3 transition-all duration-[760ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:mb-7 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 lg:mb-9 ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : 'opacity-0 -translate-x-14 translate-y-8 scale-[0.95]'
                      }`}
                    style={{ transitionDelay: '40ms' }}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-xl bg-storm-blue px-7 py-3.5 text-[0.95rem] font-bold tracking-wide text-bone-linen shadow-lg shadow-storm-blue/40 ring-1 ring-white/15 uppercase transition-colors hover:bg-steel-blue hover:shadow-storm-blue/55 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                    >
                      Get a Free Quote
                      <ArrowRight size={20} />
                    </Link>
                    <a
                      href="tel:+14058675309"
                      className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-xl border-2 border-bone-linen/40 px-7 py-3.5 text-[0.95rem] font-bold tracking-wide text-bone-linen uppercase transition-colors hover:border-bone-linen/80 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                      aria-label="Call us at (405) 867-5309"
                    >
                      <Phone size={20} aria-hidden="true" />
                      (405) 867-5309
                    </a>
                  </div>

                  <p
                    className={`hero-reveal mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-equipment-gold transition-all duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:mb-4 sm:text-xs ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-12 translate-y-2'
                      }`}
                    style={{ transitionDelay: '120ms' }}
                  >
                    HJH Outdoor Operations
                  </p>

                  <div
                    className={`hero-reveal mb-4 flex flex-wrap items-center gap-2 transition-all duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-16 translate-y-3'
                      }`}
                    style={{ transitionDelay: '150ms' }}
                  >
                    <Link
                      href="/#testimonials"
                      className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/20 bg-storm-blue/85 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-bone-linen uppercase shadow-md shadow-black/30 ring-1 ring-white/20 transition-colors hover:bg-steel-blue"
                    >
                      <span aria-hidden="true">★★★★★</span>
                      Google 5.0 Star
                    </Link>
                    <span className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-bone-linen uppercase shadow-md shadow-black/20 ring-1 ring-white/10">
                      <BadgeCheck size={14} aria-hidden="true" className="text-equipment-gold" />
                      Licensed &amp; Insured
                    </span>
                  </div>

                  <h1
                    className={`hero-reveal text-shadow-strong mb-4 max-w-3xl text-balance text-[1.9rem] font-bold leading-[1.08] text-bone-linen transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:mb-5 sm:text-[2.6rem] md:text-5xl lg:mb-7 lg:text-7xl ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0 rotate-0' : 'opacity-0 -translate-x-24 translate-y-3 -rotate-2'
                      }`}
                    style={{ transitionDelay: '190ms' }}
                  >
                    Storm Shelters &amp; Site Work Done Right.
                  </h1>

                  <p
                    className={`hero-reveal text-shadow-strong max-w-2xl text-[1rem] leading-relaxed text-warm-concrete transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-[1.06rem] md:text-lg lg:text-xl ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-12 translate-y-6'
                      }`}
                    style={{ transitionDelay: '280ms' }}
                  >
                    HJH Outdoor Operations provides storm shelter installation, excavation, land clearing, grading, and septic services for Oklahoma homeowners and landowners.
                  </p>
                </div>

                <div
                  className={`hero-reveal order-first relative mx-auto mb-3 w-full min-w-0 max-sm:max-w-[min(98vw,22rem)] transition-all duration-[760ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:mb-5 sm:max-w-[14rem] md:order-none md:mb-0 md:mt-0 md:max-w-[18rem] lg:-mt-12 lg:max-w-[36rem] ${heroLoaded ? 'opacity-100 translate-y-0 scale-100 rotate-0 hero-logo-drop' : 'opacity-0 -translate-y-28 scale-[0.86] rotate-[8deg]'
                    }`}
                  style={{ transitionDelay: '130ms' }}
                >
                  <div className="sm:hidden">
                    <ElectricBorder
                      color="#3c648c"
                      speed={0.5}
                      chaos={0.08}
                      thickness={1.25}
                      borderRadius={360}
                      displacement={19}
                      className="rounded-full"
                    >
                      <div className="p-2.25">
                        <ElectricBorder
                          color="#b48c3c"
                          speed={0.75}
                          chaos={0.06}
                          thickness={0.9}
                          borderRadius={360}
                          displacement={14}
                          className="rounded-full"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-full border border-white/15 bg-matte-black/72 p-2.25 shadow-[0_26px_58px_rgba(0,0,0,0.56)]">
                            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-equipment-gold/38 to-transparent" aria-hidden="true" />
                            <div className="relative flex h-full items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] p-0.75">
                              <div className="relative w-full aspect-square rounded-full">
                                <img
                                  src="/brand/logo-transparent.webp"
                                  alt="HJH Outdoor Operations LLC — storm shelter installation, dirt work, land clearing, Oklahoma"
                                  loading="eager"
                                  fetchPriority="high"
                                  decoding="async"
                                  className="absolute inset-0 h-full w-full object-contain object-center scale-[1.05]"
                                />
                              </div>
                            </div>
                          </div>
                        </ElectricBorder>
                      </div>
                    </ElectricBorder>
                  </div>

                  <div className="hidden sm:block">
                    <ElectricBorder
                      color="#3c648c"
                      speed={0.55}
                      chaos={0.08}
                      thickness={1.8}
                      borderRadius={360}
                      displacement={34}
                      className="rounded-full"
                    >
                      <div className="p-1.5 sm:p-2 md:p-2.5">
                        <ElectricBorder
                          color="#b48c3c"
                          speed={0.8}
                          chaos={0.06}
                          thickness={1.2}
                          borderRadius={360}
                          displacement={25}
                          className="rounded-full"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-full border border-white/12 bg-matte-black/72 p-0.5 shadow-[0_26px_58px_rgba(0,0,0,0.56)] backdrop-blur-[4px] sm:p-0.75 md:p-1.25 lg:p-1.75">
                            <div
                              className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-equipment-gold/38 to-transparent sm:inset-x-6"
                              aria-hidden="true"
                            />
                            <div className="flex h-full items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] p-0.25 sm:p-0.75 md:p-1.25">
                              <div className="relative w-full sm:max-w-[84vw] aspect-square overflow-hidden rounded-full">
                                <img
                                  src="/brand/logo-transparent.webp"
                                  alt="HJH Outdoor Operations LLC — storm shelter installation, dirt work, land clearing, Oklahoma"
                                  loading="eager"
                                  decoding="async"
                                  className="absolute inset-0 h-full w-full object-contain object-center sm:scale-[.86]"
                                />
                              </div>
                            </div>
                          </div>
                        </ElectricBorder>
                      </div>
                    </ElectricBorder>
                  </div>

                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 md:mt-7 md:flex-wrap">
                {serviceChips.map((tag, index) => (
                  <span
                    key={tag}
                    className={`hero-reveal shrink-0 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-soft-khaki uppercase shadow-md shadow-black/20 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${heroLoaded ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-8 translate-y-4'
                      } ${index >= 3 ? 'hidden md:inline-flex' : 'inline-flex'
                      }`}
                    style={{ transitionDelay: `${360 + index * 70}ms` }}
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
        <div className="h-10 sm:h-20 lg:h-56" aria-hidden="true" />

        {/* ====== FLOATING CONTENT CONTAINER ====== */}
        <div className="relative">

          {/* ====== TRUST BAR ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-gunmetal" texture="brand-1" />
            <div className="relative z-[1] py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="trust-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="trust-marquee-track flex w-max items-center gap-3">
                    {[...trustItems, ...trustItems].map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-soft-coal/35 px-4 py-3 text-center shadow-md shadow-black/25 ring-1 ring-white/5"
                      >
                        <CheckCircle2 size={16} className="text-equipment-gold shrink-0" aria-hidden="true" />
                        <span className="text-soft-khaki text-sm font-semibold tracking-wide whitespace-nowrap">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== STORM SHELTER CALLOUT ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-section-light" texture="brand-2" />
            {/* Decorative diagonal line */}
            <div className="absolute top-0 right-0 z-[2] w-1/2 h-1 bg-gradient-to-r from-transparent via-equipment-gold/40 to-equipment-gold" />

            <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-matte-black">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <AnimatedSection>
                  <div className="relative">
                    <div className="card-media aspect-[4/3]">
                      <Image
                        src={siteMedia.stormCallout}
                        alt="Storm shelter being installed in Oklahoma residential yard"
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                      />
                    </div>
                    {/* Badge */}
                    <div className="relative mt-4 w-fit max-w-full ms-auto sm:mt-0 sm:absolute sm:-bottom-5 sm:-right-5 sm:ms-0">
                      <div className="card-accent-storm text-bone-linen px-5 py-4 sm:px-6 sm:py-5">
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
                  <p className="text-matte-black text-lg leading-relaxed mb-6">
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
                      className="inline-flex items-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-base tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-storm-blue/35 ring-1 ring-white/10 hover:shadow-storm-blue/50"
                    >
                      Explore Storm Shelter Options
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gunmetal hover:bg-gunmetal hover:text-bone-linen text-gunmetal font-bold text-base tracking-wide uppercase rounded-xl transition-colors"
                    >
                      Get Shelter Quote
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== SERVICES ====== */}
          <ServicesSectionComponent />

          {/* ====== HOW WE WORK ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-gunmetal" texture="concrete" />
            <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
              <AnimatedSection className="text-center mb-8">
                <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-2">
                  How We Work
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-bone-linen text-balance">
                  Clear 3-Step Process From First Call to Final Sign-Off
                </h3>
                <p className="mt-3 text-soft-khaki/85 max-w-3xl mx-auto leading-relaxed">
                  You always know what happens next. No vague timelines, no guessing, and no surprise handoffs.
                </p>
              </AnimatedSection>
              <div className="grid gap-4 md:grid-cols-3">
                {processSteps.map(({ step, title, description, outcome, icon: Icon }, idx) => (
                  <AnimatedSection key={title} delay={idx * 90}>
                    <div className="card-elevated-glass h-full p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/15 bg-storm-blue/25 px-2 text-xs font-bold tracking-wider text-bone-linen">
                          {step}
                        </span>
                        <Icon size={18} className="text-equipment-gold shrink-0" aria-hidden="true" />
                      </div>
                      <h3 className="text-bone-linen text-lg font-bold mb-2">{title}</h3>
                      <p className="text-soft-khaki/85 text-sm leading-relaxed mb-3">{description}</p>
                      <p className="text-[0.78rem] uppercase tracking-wider text-equipment-gold/90 font-semibold">
                        {outcome}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== WHY CHOOSE US ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-soft-coal" texture="concrete" />
            <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
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
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-storm-blue hover:bg-storm-blue text-bone-linen font-bold text-base tracking-wide uppercase rounded-xl transition-colors"
                  >
                    About Our Company
                    <ArrowRight size={16} />
                  </Link>
                </AnimatedSection>

                <div className="grid gap-4">
                  {trustPillars.map(({ title, desc, icon: Icon }, i) => (
                    <AnimatedSection key={title} delay={i * 100}>
                      <div className="card-elevated-glass flex items-start gap-4 p-6">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-gunmetal/70 ring-1 ring-white/10">
                          <Icon size={18} className="text-equipment-gold" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-bone-linen mb-1">{title}</h3>
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
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== PROJECTS PREVIEW ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-section-light" texture="brand-2" />
            <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
              <AnimatedSection>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="brand-divider mb-5 block" />
                    <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
                      Recent Work
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-matte-black leading-tight text-balance">
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
                    <div className="group relative aspect-[4/3] card-media bg-section-mid">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="banner-overlay-contrast absolute inset-0" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="inline-block px-2 py-1 bg-storm-blue text-bone-linen text-xs font-bold tracking-wide uppercase rounded-lg shadow-md shadow-storm-blue/30 ring-1 ring-white/10 mb-2">
                          {tag}
                        </span>
                        <p className="text-shadow-strong text-bone-linen font-semibold leading-tight">{label}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== SERVICE AREA ====== */}
          <section className="relative isolate overflow-hidden">
            <PremiumSectionBackdrop fillClassName="bg-sandstone" texture="brand-2" />
            <AnimatedSection className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-matte-black">
              <div className="relative overflow-hidden rounded-3xl border border-soft-khaki/45 bg-section-light/70 p-6 shadow-xl shadow-black/10 ring-1 ring-white/35 backdrop-blur-[2px] sm:p-8 lg:p-10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-storm-blue/18 blur-2xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-12 -bottom-16 h-40 w-40 rounded-full bg-equipment-gold/12 blur-3xl" aria-hidden="true" />

                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-3 rounded-xl border border-storm-blue/20 bg-storm-blue/10 px-4 py-2">
                      <MapPin size={18} className="text-storm-blue shrink-0" aria-hidden="true" />
                      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-storm-blue">Service Area</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-matte-black sm:text-3xl">Serving Oklahoma &amp; Surrounding Areas</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-matte-black/90">
                      Based in Oklahoma, we work across the state and take on projects wherever you need us. Storm shelter installation, excavation, land clearing, and site prep - wherever the work is, we go.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="rounded-2xl border border-soft-khaki/55 bg-section-mid/85 p-4 text-center shadow-sm">
                      <p className="text-2xl font-bold text-matte-black">Statewide</p>
                      <p className="mt-1 text-[11px] font-bold tracking-[0.16em] uppercase text-matte-black/75">Coverage</p>
                    </div>
                    <div className="rounded-2xl border border-soft-khaki/55 bg-section-mid/85 p-4 text-center shadow-sm">
                      <p className="text-2xl font-bold text-matte-black">Fast</p>
                      <p className="mt-1 text-[11px] font-bold tracking-[0.16em] uppercase text-matte-black/75">Response</p>
                    </div>
                    <div className="col-span-2 flex flex-wrap justify-center gap-2 pt-1">
                      {['Oklahoma City', 'Tulsa', 'Edmond', 'Norman', 'Stillwater', 'Lawton', 'Enid', 'Yukon', 'And More'].map((city) => (
                        <span
                          key={city}
                          className="inline-flex items-center gap-2 rounded-xl border border-soft-khaki/55 bg-section-mid/90 px-4 py-2 text-xs font-bold tracking-wide uppercase text-matte-black shadow-sm"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-storm-blue/85" aria-hidden="true" />
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Spacer — backdrop reveal */}
          <div className="h-10 sm:h-20 lg:h-44 bg-transparent" aria-hidden="true" />

          {/* ====== TESTIMONIALS ====== */}
          <section
            id="testimonials"
            ref={testimonialsRef}
            className="relative isolate overflow-hidden scroll-mt-24 md:scroll-mt-32"
          >
            <PremiumSectionBackdrop fillClassName="bg-section-light" texture="brand-2" />
            <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-matte-black">
              <AnimatedSection className="text-center mb-14">
                <span className="brand-divider mx-auto mb-5 block" />
                <h2 className="text-3xl lg:text-4xl font-bold text-matte-black">What Customers Say</h2>
              </AnimatedSection>
              <div className="card-elevated-warm p-4 sm:p-6 lg:p-8">
                {reviewsEnabled ? (
                  shouldLoadReviewsScript ? (
                    <ElfsightWidget appId="5d358237-668a-4bb2-be66-6b8addb8696a" />
                  ) : (
                    <p className="text-center text-matte-black/75">Loading reviews...</p>
                  )
                ) : (
                  <p className="text-center text-matte-black/75">
                    Reviews are temporarily disabled while we optimize page performance.
                  </p>
                )}
              </div>
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

        @keyframes hero-logo-drop {
          0% {
            transform: translateY(-180px) scale(0.78) rotate(9deg);
          }
          62% {
            transform: translateY(16px) scale(1.05) rotate(-3deg);
          }
          82% {
            transform: translateY(-6px) scale(0.99) rotate(1deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        .hero-logo-drop {
          animation: hero-logo-drop 980ms cubic-bezier(0.12, 1, 0.22, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .hero-logo-drop {
            transition-duration: 1ms !important;
            animation: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  )
}
