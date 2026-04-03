import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

const values = [
  {
    title: 'We Show Up',
    desc: 'When we say we&apos;ll be there, we show up. On time. Ready to work. Every project gets our full effort.',
  },
  {
    title: 'Honest Estimates',
    desc: 'You get a straight number upfront. No surprise charges, no inflated quotes to leave room to bargain.',
  },
  {
    title: 'Oklahoma Work Ethic',
    desc: 'We were raised here. We work here. We know the land, the weather, and what it takes to do this job right.',
  },
  {
    title: 'We Own Our Work',
    desc: 'If something isn&apos;t right, we fix it. We&apos;re not done until you&apos;re satisfied with the result.',
  },
]

const stats = [
  { value: '10+', label: 'Years in Operation' },
  { value: '500+', label: 'Projects Completed' },
  { value: '100%', label: 'Licensed & Insured' },
  { value: 'OK', label: 'Locally Based' },
]

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        {/* Page Header */}
        <section className="bg-soft-coal pb-16 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-[calc(11.75rem+env(safe-area-inset-top,0px))]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="brand-divider mb-4 block" />
            <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight text-balance max-w-3xl">
              A Contractor You Can Actually Count On
            </h1>
            <p className="text-warm-concrete text-lg mt-5 max-w-2xl leading-relaxed">
              HJH Outdoor Operations was built on a simple idea: do hard work honestly, and stand behind every job.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-storm-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-bone-linen mb-1">{value}</div>
                  <div className="text-blue-200/80 text-xs font-semibold tracking-widest uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-section-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="brand-divider mb-4 block" />
                <p className="text-equipment-gold text-xs font-bold tracking-widest uppercase mb-3">
                  Our Story
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-gunmetal leading-tight mb-6 text-balance">
                  Built From the Ground Up
                </h2>
                <div className="flex flex-col gap-4 text-clay-taupe leading-relaxed">
                  <p>
                    HJH Outdoor Operations started because we kept seeing the same problem: homeowners and landowners getting burned by contractors who overpromise, underprice to win the job, and then disappear or do shoddy work.
                  </p>
                  <p>
                    We started this company to be different. We&apos;re an Oklahoma-based operation — not a franchise, not a chain. Just a hardworking crew that takes pride in real craftsmanship and honest business.
                  </p>
                  <p>
                    We specialize in the kind of outdoor site work that takes real equipment and real experience — storm shelter installation, excavation, land clearing, grading, and septic systems. This isn&apos;t work you can fake. We&apos;ve done it for over a decade, and we know how to do it right.
                  </p>
                  <p>
                    When you hire HJH, you&apos;re hiring people who take your project personally. Your land is your investment. We treat it that way.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg"
                    alt="HJH Outdoor Operations crew with equipment on Oklahoma jobsite"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative mt-6 w-full max-w-xs sm:absolute sm:-bottom-5 sm:-left-5 sm:mt-0 bg-gunmetal border border-white/10 px-5 py-4 sm:px-6 sm:py-5 rounded-sm shadow-xl">
                  <p className="text-bone-linen font-bold text-sm mb-1">HJH Outdoor Operations LLC</p>
                  <p className="text-soft-khaki/70 text-xs">Oklahoma&apos;s trusted outdoor contractor since 2014</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-section-mid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center mb-12">
              <span className="brand-divider mx-auto mb-4 block" />
              <h2 className="text-4xl font-bold text-gunmetal">How We Work</h2>
              <p className="text-clay-taupe mt-4 text-lg max-w-xl mx-auto leading-relaxed">
                These aren&apos;t just talking points. They&apos;re the standard we hold ourselves to on every job.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-section-light border border-soft-khaki/40 rounded-sm p-7"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 size={18} className="text-storm-blue shrink-0" />
                    <h3 className="font-bold text-gunmetal text-lg">{title}</h3>
                  </div>
                  <p
                    className="text-clay-taupe text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: desc.replace(/&apos;/g, "'") }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gunmetal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="relative">
                <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg"
                    alt="HJH crew performing precision grading work"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="brand-divider mb-4 block" />
                <h2 className="text-4xl lg:text-5xl font-bold text-bone-linen leading-tight mb-5 text-balance">
                  Why Customers Choose HJH
                </h2>
                <ul className="flex flex-col gap-4">
                  {[
                    'We do what we say we&apos;re going to do — period.',
                    'Transparent pricing with no hidden fees',
                    'Equipment operated by experienced, careful crew members',
                    'We&apos;re responsive — calls and messages get answered',
                    'We leave your property clean and organized',
                    'Local business with a stake in our community reputation',
                    'Fully licensed and insured for every type of work we do',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-equipment-gold mt-0.5 shrink-0" />
                      <span
                        className="text-warm-concrete text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.replace(/&apos;/g, "'") }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-section-light border-t border-soft-khaki/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal mb-4 text-balance">
              Ready to talk about your project?
            </h2>
            <p className="text-clay-taupe text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              We&apos;re happy to come look at the site and give you a free estimate. No pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
              >
                Get a Free Estimate
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14058675309"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gunmetal hover:bg-gunmetal/10 text-gunmetal font-bold text-sm tracking-wide uppercase rounded-sm transition-colors"
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
