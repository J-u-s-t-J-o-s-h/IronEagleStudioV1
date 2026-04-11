import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PremiumSectionBackdrop } from '@/components/premium-section-backdrop'
import { siteMedia } from '@/lib/site-media'

const belowGroundShelters = [
  { model: '6x8 Standard Slope', price: '$4,650' },
  { model: '5x11 Easy Entry', price: '$5,100' },
  { model: '7x10 XL', price: '$5,500' },
]

const walkInSafeRooms = [
  { model: '5x7', price: '$6,200' },
  { model: '6x8', price: '$6,850' },
  { model: '7x9', price: '$7,700' },
]

const faqs = [
  {
    q: 'Do you offer in-house financing?',
    a: 'We do not provide in-house lending directly. We help customers prepare their project scope and documentation so they can apply with qualified financing partners.',
  },
  {
    q: 'Can I finance just the storm shelter installation?',
    a: 'Yes. Many customers finance storm shelter installation as a standalone project. We can also quote combined scopes if you want site prep or additional work included.',
  },
  {
    q: 'How quickly can financing be approved?',
    a: 'Timelines vary by lender, but many decisions are returned quickly once all documents are submitted. We provide clear estimates and project details to help speed up the process.',
  },
  {
    q: 'Are there prepayment penalties?',
    a: 'Terms differ by lender and product. Always confirm final loan terms, including APR, fees, and prepayment details, before signing.',
  },
]

export default function FinancingPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <section className="relative isolate overflow-hidden pb-16 pt-[calc(9.75rem+env(safe-area-inset-top,0px))] lg:pb-20 lg:pt-[calc(11.75rem+env(safe-area-inset-top,0px))]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/HJH_media/More_pictures/More pictures/20260331_143115.jpg"
              alt="HJH Outdoor Operations project site in Oklahoma"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black/84 via-soft-coal/62 to-matte-black/36" />
            <div className="absolute inset-0 bg-gradient-to-r from-storm-blue/24 via-transparent to-equipment-gold/12" />
          </div>
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-block">
              <p className="text-equipment-gold text-sm sm:text-base font-extrabold tracking-[0.16em] uppercase">
                Financing
              </p>
              <span
                className="brand-divider mt-2 block h-1 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]"
                style={{ width: '100%' }}
              />
            </div>
            <h1 className="max-w-3xl text-balance text-3xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight">
              Storm Shelter Financing in Oklahoma
            </h1>
            <p className="mt-5 max-w-3xl text-base sm:text-lg text-warm-concrete leading-relaxed">
              As a family owned and operated company, we help you break your project into manageable monthly payments. Get clear pricing, straightforward paperwork support, and a step-by-step plan from estimate to final install.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-storm-blue/35 ring-1 ring-bone-linen/10"
              >
                Get Financing Quote <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14057567304"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 border-2 border-bone-linen/45 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors"
              >
                <Phone size={14} />
                (405) 756-7304
              </a>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-section-mid" texture="linen" />
          <div className="absolute inset-x-0 top-0 z-[2] h-[6px] bg-gradient-to-r from-transparent via-equipment-gold to-transparent shadow-[0_0_20px_rgba(212,175,55,0.75)]" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-matte-black">
            <div className="space-y-10 sm:space-y-12 lg:space-y-14">
              <div id="how" className="card-shell-light border-storm-blue/35 ring-1 ring-storm-blue/20 p-5 sm:p-8 lg:p-10">
                <div className="max-w-4xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gunmetal leading-tight">
                    How to Finance a Storm Shelter
                  </h2>
                  <span className="brand-divider mt-4 mb-5 block h-1 w-12 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
                  <p className="max-w-3xl text-clay-taupe leading-relaxed text-base sm:text-lg">
                    The process is simple: get a detailed project estimate from our team, submit your application with a qualified lender, and schedule installation once approved. We provide the documentation most lenders require so there is less back-and-forth.
                  </p>
                </div>

                <div className="mt-7 sm:mt-8 rounded-2xl border border-soft-khaki/50 bg-bone-linen p-4 sm:p-6">
                  <ul className="divide-y divide-soft-khaki/50">
                    {[
                      'Project estimate with clear scope and pricing',
                      'Installer details and project timeline',
                      'Support through lender document requests',
                      'Scheduling coordination after approval',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 sm:gap-4 py-3 sm:py-4 first:pt-1 last:pb-1">
                        <CheckCircle2 size={16} className="text-equipment-gold shrink-0" />
                        <span className="text-gunmetal text-base sm:text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="apply" className="card-shell-light border-equipment-gold/45 ring-1 ring-equipment-gold/20 p-5 sm:p-8 lg:p-10">
                <div className="max-w-4xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gunmetal leading-tight">
                    How to Apply for Your Loan
                  </h2>
                  <span className="brand-divider mt-4 mb-5 block h-1 w-12 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
                  <p className="text-clay-taupe text-base sm:text-lg leading-relaxed">
                    Four straightforward steps from quote to keys.
                  </p>
                </div>

                <div className="mt-7 sm:mt-8">
                  <div className="relative hidden lg:block">
                    <span className="absolute left-[3.75rem] right-[3.75rem] top-5 h-px bg-soft-khaki/70" />
                  </div>
                  <ol className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      'Request your estimate and project scope',
                      'Submit financing application with your lender',
                      'Review APR, term, and monthly payment',
                      'Finalize approval and schedule install',
                    ].map((step, idx) => (
                      <li key={step} className="flex flex-col items-center text-center rounded-xl px-2 py-1 sm:px-0 sm:py-0">
                        <span className="relative z-[1] mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2 border-equipment-gold bg-gunmetal text-lg sm:text-xl font-bold text-equipment-gold">
                          {idx + 1}
                        </span>
                        <p className="max-w-[18ch] text-clay-taupe text-base sm:text-[1.05rem] leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div id="payments" className="card-shell-light border-storm-blue/30 ring-1 ring-equipment-gold/20 p-5 sm:p-8 lg:p-10">
                <div className="max-w-4xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gunmetal leading-tight">
                    Storm Shelter Pricing
                  </h2>
                  <span className="brand-divider mt-4 mb-5 block h-1 w-12 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
                  <p className="text-clay-taupe text-base sm:text-lg leading-relaxed">
                    Transparent pricing with no surprises. Applies within a 60-mile radius of Marlow, OK.
                  </p>
                </div>

                <div className="mt-7 sm:mt-8 space-y-7 sm:space-y-8">
                  {[
                    { title: 'Below Ground Shelters', rows: belowGroundShelters },
                    { title: 'Walk-In Safe Rooms', rows: walkInSafeRooms },
                  ].map((group) => (
                    <div key={group.title}>
                      <h3 className="mb-3 text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-storm-blue">
                        {group.title}
                      </h3>
                      <div className="overflow-x-auto rounded-2xl border border-soft-khaki/55 bg-bone-linen">
                        <table className="w-full min-w-[18rem] sm:min-w-[20rem] table-fixed">
                          <colgroup>
                            <col className="w-[72%]" />
                            <col className="w-[28%]" />
                          </colgroup>
                          <thead className="bg-gunmetal text-left">
                            <tr>
                              <th className="px-3 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-bone-linen">Model</th>
                              <th className="px-3 sm:px-5 py-3 sm:py-4 text-right text-[10px] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-bone-linen">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-soft-khaki/60">
                            {group.rows.map((row, idx) => (
                              (() => {
                                const isPopular = group.title === 'Walk-In Safe Rooms' && row.model === '6x8'
                                return (
                                  <tr
                                    key={row.model}
                                    className={
                                      isPopular
                                        ? 'bg-equipment-gold/12'
                                        : idx % 2 === 0
                                          ? 'bg-transparent'
                                          : 'bg-section-light/65'
                                    }
                                  >
                                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-gunmetal text-base sm:text-[1.12rem] leading-snug">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span>{row.model}</span>
                                        {isPopular && (
                                          <span className="inline-flex items-center rounded-full border border-equipment-gold/70 bg-equipment-gold/25 px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] uppercase text-earth-brown">
                                            Most Popular
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-3 sm:px-5 py-3 sm:py-4 text-right text-storm-blue font-extrabold text-xl sm:text-[1.55rem] lg:text-[1.75rem] tabular-nums leading-none">
                                      {row.price}
                                    </td>
                                  </tr>
                                )
                              })()
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-clay-taupe leading-relaxed">
                  Pricing applies within a 60-mile radius of Marlow, Oklahoma. Mileage beyond that radius may incur an additional charge. Dirt work requires a personal quote based on project scope and site conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-section-mid" texture="brand-2" />
          <div className="relative z-[1] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-matte-black">
            <div className="text-center mb-10">
              <span className="brand-divider mx-auto mb-4 block h-1 w-20 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal">
                Storm Shelter Financing FAQs
              </h2>
            </div>
            <div className="card-shell-light px-5 sm:px-8">
              {faqs.map((faq) => (
                <details key={faq.q} className="border-b-2 border-soft-khaki/40 py-4 sm:py-5 last:border-0">
                  <summary className="cursor-pointer list-none pr-6 font-semibold text-gunmetal text-base sm:text-lg">
                    {faq.q}
                  </summary>
                  <p className="pt-3 text-sm sm:text-base leading-relaxed text-clay-taupe">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-deep-slate" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bone-linen mb-4 text-balance">
              Get Approved and Installed Faster
            </h2>
            <p className="text-warm-concrete text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Call us for a fast estimate and financing-ready project details. We make it simple to move from quote to completed install.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-equipment-gold hover:bg-burnished-amber text-matte-black font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-matte-black/15 ring-1 ring-matte-black/10"
              >
                Start Financing Process
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14057567304"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 border-2 border-bone-linen/40 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors"
              >
                <Phone size={14} />
                (405) 756-7304
              </a>
            </div>
            <p className="mt-5 text-sm text-bone-linen/80">
              Call or text: (405) 756-7304 or (580) 458-0087 &middot; Email: Hjhoutdoor@gmail.com
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
