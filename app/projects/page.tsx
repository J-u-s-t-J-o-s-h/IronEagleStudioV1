'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PremiumSectionBackdrop } from '@/components/premium-section-backdrop'
import { projectGallery } from '@/lib/site-media'

const categories = ['All', 'Storm Shelter', 'Excavation', 'Land Clearing', 'Grading', 'Septic']

const projects = projectGallery

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <SiteNav />
      <main id="main-content">
        {/* Header */}
        <section className="relative isolate overflow-hidden pb-16 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-[calc(11.75rem+env(safe-area-inset-top,0px))]">
          <PremiumSectionBackdrop fillClassName="bg-soft-coal" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="brand-divider mb-4 block" />
            <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
              Our Work
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight text-balance max-w-3xl">
              Projects &amp; Gallery
            </h1>
            <p className="text-warm-concrete text-lg mt-5 max-w-2xl leading-relaxed">
              Real work on real Oklahoma properties. Browse our project portfolio to see the quality we bring to every job.
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <PremiumSectionBackdrop fillClassName="bg-gunmetal" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="sr-only" id="filter-label">Filter projects by category</p>
            <div className="-mx-1 flex touch-pan-x items-center gap-2 overflow-x-auto px-1 py-4 [scrollbar-width:none] sm:-mx-0 sm:gap-3 sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-labelledby="filter-label">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`min-h-11 shrink-0 touch-manipulation px-4 py-2.5 text-sm font-bold tracking-wide uppercase rounded-xl transition-colors sm:px-6 sm:py-3 sm:text-base ${
                    activeCategory === cat
                      ? 'bg-storm-blue text-bone-linen'
                      : 'text-soft-khaki hover:text-bone-linen hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-section-light" texture="linen" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="group card-elevated overflow-hidden hover:border-storm-blue/50"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-matte-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-2 py-0.5 bg-storm-blue text-bone-linen text-xs font-bold tracking-wide uppercase rounded-lg shadow-md shadow-storm-blue/30 ring-1 ring-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gunmetal text-lg mb-3 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-clay-taupe text-base leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="card-chip px-3 py-1 text-weathered-stone text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-clay-taupe text-lg">No projects found in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="relative isolate overflow-hidden border-t border-soft-khaki/30">
          <PremiumSectionBackdrop fillClassName="bg-section-mid" texture="brand-2" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-matte-black">
            <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal mb-4 text-balance">
              Want work like this on your property?
            </h2>
            <p className="text-clay-taupe text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Get in touch for a free estimate. We&apos;ll come out, assess your site, and give you a straight quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-storm-blue/35 ring-1 ring-white/10"
              >
                Request an Estimate
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14058675309"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gunmetal hover:bg-gunmetal/10 text-gunmetal font-bold text-sm tracking-wide uppercase rounded-xl transition-colors"
              >
                <Phone size={14} />
                (405) 867-5309
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
