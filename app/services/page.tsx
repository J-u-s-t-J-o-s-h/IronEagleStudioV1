import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone, Shield, Shovel, Trees, Layers, Droplets, Wrench } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PremiumSectionBackdrop } from '@/components/premium-section-backdrop'
import { siteMedia } from '@/lib/site-media'

const services = [
  {
    id: 'storm-shelter',
    icon: Shield,
    title: 'Storm Shelter Installation',
    tagline: 'Safe rooms built for Oklahoma tornado country.',
    image: siteMedia.services.storm,
    imageAlt: 'Underground storm shelter being installed',
    forWho: 'Homeowners, rural property owners, and anyone in tornado-prone areas of Oklahoma.',
    description:
      'We install underground storm shelters and safe rooms designed to withstand direct tornado impact. Every installation includes proper site prep, concrete work, waterproofing, and a final inspection. We handle the entire process — from permits to final grade.',
    benefits: [
      'Tornado-rated underground and outdoor walk-in saferoom options',
      'Professionally installed and anchored',
      'Waterproofed and ventilated',
      'We handle site prep and permits',
      'Available for new builds and existing properties',
    ],
    href: '/storm-shelter',
    cta: 'Learn About Storm Shelters',
  },
  {
    id: 'excavation',
    icon: Shovel,
    title: 'Excavation',
    tagline: 'Precision earthmoving for foundations, ponds, and more.',
    image: siteMedia.services.excavation,
    imageAlt: 'Large excavator working on Oklahoma jobsite',
    forWho: 'Homeowners, builders, and landowners needing earth moved for foundations, ponds, utilities, or drainage.',
    description:
      'We operate full-size excavation equipment for jobs of all sizes. From residential foundation prep to large-scale pond digging, we get the dirt moved efficiently and leave the site ready for the next phase. We work clean and on schedule.',
    benefits: [
      'Foundation and basement excavation',
      'Pond and water feature digging',
      'Utility trench excavation',
      'Drainage channel work',
      'Commercial and residential scopes',
    ],
    href: '/contact',
    cta: 'Request Excavation Quote',
  },
  {
    id: 'dirt-work',
    icon: Shovel,
    title: 'Dirt Work',
    tagline: 'Ground prep done right — for driveways, pads, and properties.',
    image: siteMedia.services.dirtWork,
    imageAlt: 'Skid steer performing precision dirt work and grading',
    forWho: 'Property owners needing site prep, driveway work, lot leveling, or general earth shaping.',
    description:
      'Dirt work covers the wide range of ground shaping and site prep tasks that make everything else possible. Whether it\'s a driveway pad, a level building site, or moving material from one part of the property to another — we have the equipment and experience to handle it right.',
    benefits: [
      'Driveway construction and base prep',
      'Building pad preparation',
      'Lot leveling and reshaping',
      'Fill dirt work',
      'Haul-off and material relocation',
    ],
    href: '/contact',
    cta: 'Get a Dirt Work Estimate',
  },
  {
    id: 'land-clearing',
    icon: Trees,
    title: 'Land Clearing',
    tagline: 'Clear brush, trees, and overgrowth to reclaim your property.',
    image: siteMedia.services.landClearing,
    imageAlt: 'Heavy equipment clearing brush and trees from Oklahoma land',
    forWho: 'Landowners, developers, and homeowners with overgrown or timbered land that needs to be cleared for building, farming, or personal use.',
    description:
      'We clear land of all sizes using the right equipment for the job — from brush hogs and skid steers to full-size bulldozers. Whether you have a few acres of scrubby growth or a timbered property that needs a clean start, we get it cleared efficiently.',
    benefits: [
      'Brush and scrub clearing',
      'Tree removal and stump grinding',
      'Timber clearing for new builds',
      'Fence line clearing',
      'Burn pile or haul-off options available',
    ],
    href: '/contact',
    cta: 'Request Land Clearing Quote',
  },
  {
    id: 'site-grading',
    icon: Layers,
    title: 'Site Grading',
    tagline: 'Level pads, proper drainage, and finished ground surfaces.',
    image: siteMedia.services.grading,
    imageAlt: 'Completed site grading work on residential property',
    forWho: 'Anyone building a new home, shop, outbuilding, or commercial facility who needs proper grade, drainage, and surface prep.',
    description:
      'Proper grading is critical to preventing drainage problems, foundation issues, and standing water. We grade to spec, creating level building pads, directing drainage away from structures, and preparing finished surfaces for seeding, paving, or construction.',
    benefits: [
      'Building pad grading for homes and structures',
      'Drainage slope work',
      'Finished grading before landscaping or seed',
      'Road and driveway crown grading',
      'Post-construction cleanup grading',
    ],
    href: '/contact',
    cta: 'Get a Grading Estimate',
  },
  {
    id: 'septic',
    icon: Droplets,
    title: 'Septic System Installation',
    tagline: 'Full septic systems installed to code on residential and rural properties.',
    image: siteMedia.services.septic,
    imageAlt: 'Septic system installation in progress on rural property',
    forWho: 'Rural homeowners, new construction projects, and properties requiring on-site wastewater systems.',
    description:
      'We install complete septic systems for new construction and replacement projects. This includes site evaluation, system design, tank placement, field line installation, and final inspection coordination. We work with the appropriate permitting offices to make the process straightforward.',
    benefits: [
      'Complete system installation from tank to field lines',
      'Site evaluation and system sizing',
      'Permit coordination',
      'Conventional and alternative system options',
      'Excavation and backfill included',
    ],
    href: '/contact',
    cta: 'Request Septic Quote',
  },
  {
    id: 'additional',
    icon: Wrench,
    title: 'Additional Site Services',
    tagline: 'Demolition, culverts, haul-off, and more.',
    image: siteMedia.services.additional,
    imageAlt: 'HJH equipment on jobsite performing additional services',
    forWho: 'Customers with project-specific needs that fall outside the standard service categories above.',
    description:
      'We take on a wide range of outdoor and site-related services beyond our core offerings. If you\'ve got a job that requires heavy equipment or experienced site work, chances are we can help. Give us a call and describe what you need.',
    benefits: [
      'Demolition and debris removal',
      'Culvert installation and maintenance',
      'Haul-off services',
      'Ditch work and drainage solutions',
      'One-off heavy equipment work',
    ],
    href: '/contact',
    cta: 'Ask About Your Project',
  },
]

export default function ServicesPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        {/* Header */}
        <section className="relative isolate overflow-hidden pb-16 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-[calc(11.75rem+env(safe-area-inset-top,0px))]">
          <PremiumSectionBackdrop fillClassName="bg-soft-coal" texture="concrete" />
          <div className="banner-overlay-contrast absolute inset-0 z-[0] opacity-70" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="brand-divider mb-4 block" />
            <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight text-balance max-w-3xl">
              Everything Your Site Needs, Done Right
            </h1>
            <p className="text-warm-concrete text-lg mt-5 max-w-2xl leading-relaxed">
              We handle the hard outdoor work — from storm shelters and septic systems to land clearing and excavation. One company, multiple capabilities, the same standard on every job.
            </p>
          </div>
        </section>

        {/* Jump Nav */}
        <section className="relative isolate overflow-hidden border-b border-bone-linen/10 sticky top-[calc(env(safe-area-inset-top,0px)+3.5rem)] z-40 md:top-[calc(env(safe-area-inset-top,0px)+5.75rem)] lg:top-[calc(env(safe-area-inset-top,0px)+6.75rem)]">
          <PremiumSectionBackdrop fillClassName="bg-gunmetal" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mx-1 flex touch-pan-x items-center gap-2 overflow-x-auto px-1 py-3 [scrollbar-width:none] sm:-mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="min-h-11 shrink-0 touch-manipulation px-4 py-2 text-xs font-bold tracking-wide uppercase text-soft-khaki hover:text-bone-linen hover:bg-bone-linen/10 rounded-xl transition-colors whitespace-nowrap"
                >
                  {s.title.split(' ')[0]}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Service Sections */}
        {services.map((service, index) => {
          const Icon = service.icon
          const isEven = index % 2 === 0
          return (
            <section
              key={service.id}
              id={service.id}
              className="relative isolate overflow-hidden"
            >
              <PremiumSectionBackdrop
                fillClassName={isEven ? 'bg-section-light' : 'bg-section-mid'}
                texture={isEven ? 'linen' : 'brand-2'}
              />
              <div className={`relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 ${isEven ? '' : 'text-matte-black'}`}>
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Image */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="card-media aspect-[4/3]">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center justify-center w-10 h-10 bg-gunmetal rounded-xl shadow-md shadow-matte-black/30 ring-1 ring-bone-linen/10">
                        <Icon size={18} className="text-bone-linen" />
                      </div>
                      <span className="text-equipment-gold text-xs font-bold tracking-widest uppercase">
                        {service.tagline}
                      </span>
                    </div>
                    <span className="brand-divider mb-4 block" />
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-4 text-balance ${isEven ? 'text-gunmetal' : 'text-matte-black'}`}>
                      {service.title}
                    </h2>
                    <p className={`leading-relaxed mb-3 ${isEven ? 'text-clay-taupe' : 'text-matte-black'}`}>
                      {service.description}
                    </p>
                    {service.id === 'storm-shelter' && (
                      <p className={`text-sm mb-3 ${isEven ? 'text-weathered-stone' : 'text-matte-black/80'}`}>
                        Standard shelter pricing applies within a 60-mile radius of Marlow, Oklahoma. Additional mileage may include an extra charge.
                      </p>
                    )}
                    {service.id === 'dirt-work' && (
                      <p className={`text-sm mb-3 ${isEven ? 'text-weathered-stone' : 'text-matte-black/80'}`}>
                        Dirt work pricing requires a personal quote based on site access, material movement, and scope.
                      </p>
                    )}
                    <p className={`text-sm mb-5 italic ${isEven ? 'text-weathered-stone' : 'text-matte-black'}`}>
                      <strong className={`not-italic ${isEven ? 'text-gunmetal' : 'text-matte-black'}`}>Who it&apos;s for:</strong>{' '}
                      {service.forWho}
                    </p>
                    <ul className="flex flex-col gap-2 mb-7">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <CheckCircle2 size={15} className="text-storm-blue mt-0.5 shrink-0" />
                          <span className={`text-sm ${isEven ? 'text-foreground' : 'text-matte-black'}`}>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-storm-blue/35 ring-1 ring-bone-linen/10"
                    >
                      {service.cta}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA */}
        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-deep-slate" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-4xl font-bold text-bone-linen mb-4 text-balance">
              Not sure which service you need?
            </h2>
            <p className="text-warm-concrete text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Call us and describe your project. We&apos;ll point you in the right direction and give you an honest estimate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-equipment-gold hover:bg-burnished-amber text-matte-black font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-matte-black/15 ring-1 ring-matte-black/10"
              >
                Get a Free Estimate
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14057567304"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-bone-linen/40 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors"
              >
                <Phone size={14} />
                (405) 756-7304
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
