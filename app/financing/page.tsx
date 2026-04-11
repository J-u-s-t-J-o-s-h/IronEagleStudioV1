import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleDollarSign, Phone } from 'lucide-react'
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
            <span className="brand-divider mb-4 block h-1 w-20 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
            <p className="text-equipment-gold text-sm sm:text-base font-extrabold tracking-[0.16em] uppercase mb-3">
              Financing
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bone-linen leading-tight text-balance max-w-3xl">
              Storm Shelter Financing in Oklahoma
            </h1>
            <p className="text-warm-concrete text-lg mt-5 max-w-3xl leading-relaxed">
              As a family owned and operated company, we help you break your project into manageable monthly payments. Get clear pricing, straightforward paperwork support, and a step-by-step plan from estimate to final install.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-storm-blue hover:bg-steel-blue text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-storm-blue/35 ring-1 ring-bone-linen/10"
              >
                Get Financing Quote <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+14057567304"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-bone-linen/45 hover:border-bone-linen text-bone-linen font-bold text-sm tracking-wide uppercase rounded-xl transition-colors"
              >
                <Phone size={14} />
                (405) 756-7304
              </a>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-section-light" texture="linen" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-matte-black">
            <div className="space-y-14">
              <div id="how" className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
                <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal leading-tight">
                  How to Finance a Storm Shelter in Oklahoma
                </h2>
                <div className="card-elevated-light p-6 sm:p-8">
                  <p className="text-clay-taupe leading-relaxed mb-4">
                    The process is simple: get a detailed project estimate from our team, submit your application with a qualified lender, and schedule installation once approved. We provide the documentation most lenders require so there is less back-and-forth.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      'Project estimate with clear scope and pricing',
                      'Installer details and project timeline',
                      'Support through lender document requests',
                      'Scheduling coordination after approval',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-storm-blue mt-0.5 shrink-0" />
                        <span className="text-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="apply" className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
                <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal leading-tight">
                  How to Apply for Your Storm Shelter Loan
                </h2>
                <div className="card-elevated p-6 sm:p-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-storm-blue/20 bg-storm-blue/10 px-4 py-2">
                    <CircleDollarSign size={16} className="text-storm-blue" />
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-storm-blue">Application Checklist</span>
                  </div>
                  <ol className="grid gap-3 text-sm text-clay-taupe">
                    <li><strong className="text-gunmetal">1.</strong> Request your estimate and project scope from HJH.</li>
                    <li><strong className="text-gunmetal">2.</strong> Submit your financing application with your preferred lender.</li>
                    <li><strong className="text-gunmetal">3.</strong> Review APR, term, and monthly payment options.</li>
                    <li><strong className="text-gunmetal">4.</strong> Finalize approval and schedule installation dates.</li>
                  </ol>
                </div>
              </div>

              <div id="payments" className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
                <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal leading-tight">
                  Storm Shelter Pricing
                </h2>
                <div className="card-elevated-light p-6 sm:p-8 overflow-x-auto">
                  <h3 className="text-lg font-bold text-gunmetal mb-3">Below Ground Shelters</h3>
                  <table className="min-w-full text-sm mb-6">
                    <thead>
                      <tr className="border-b border-soft-khaki/50 text-left">
                        <th className="px-3 py-3 font-bold text-gunmetal">Model</th>
                        <th className="px-3 py-3 font-bold text-gunmetal">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {belowGroundShelters.map((row) => (
                        <tr key={row.model} className="border-b border-soft-khaki/30">
                          <td className="px-3 py-3 text-foreground font-semibold">{row.model}</td>
                          <td className="px-3 py-3 text-storm-blue font-bold">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="text-lg font-bold text-gunmetal mb-3">Walk-In Safe Rooms</h3>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-soft-khaki/50 text-left">
                        <th className="px-3 py-3 font-bold text-gunmetal">Model</th>
                        <th className="px-3 py-3 font-bold text-gunmetal">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {walkInSafeRooms.map((row) => (
                        <tr key={row.model} className="border-b border-soft-khaki/30">
                          <td className="px-3 py-3 text-foreground font-semibold">{row.model}</td>
                          <td className="px-3 py-3 text-storm-blue font-bold">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-4 text-xs text-weathered-stone">
                    Pricing applies within a 60-mile radius of Marlow, Oklahoma. Mileage beyond that radius may incur an additional charge. Dirt work requires a personal quote based on project scope and site conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-section-mid" texture="brand-2" />
          <div className="relative z-[1] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-matte-black">
            <div className="text-center mb-10">
              <span className="brand-divider mx-auto mb-4 block h-1 w-20 rounded-full shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gunmetal">
                Storm Shelter Financing FAQs
              </h2>
            </div>
            <div className="card-shell-light px-6 sm:px-8">
              {faqs.map((faq) => (
                <details key={faq.q} className="border-b-2 border-soft-khaki/40 py-5 last:border-0">
                  <summary className="cursor-pointer list-none pr-6 font-semibold text-gunmetal">
                    {faq.q}
                  </summary>
                  <p className="pt-3 text-sm leading-relaxed text-clay-taupe">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden">
          <PremiumSectionBackdrop fillClassName="bg-deep-slate" texture="concrete" />
          <div className="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-bone-linen mb-4 text-balance">
              Get Approved and Installed Faster
            </h2>
            <p className="text-warm-concrete text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Call us for a fast estimate and financing-ready project details. We make it simple to move from quote to completed install.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-equipment-gold hover:bg-burnished-amber text-matte-black font-bold text-sm tracking-wide uppercase rounded-xl transition-colors shadow-lg shadow-matte-black/15 ring-1 ring-matte-black/10"
              >
                Start Financing Process
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
