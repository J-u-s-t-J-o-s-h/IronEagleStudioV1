import Link from 'next/link'
import { Phone, MapPin, Mail, Facebook, Clock, Shield, Shovel, Truck } from 'lucide-react'
import { Logo } from '@/components/logo'

const services = [
  { label: 'Storm Shelters', href: '/storm-shelter', icon: Shield },
  { label: 'Excavation', href: '/services#excavation', icon: Shovel },
  { label: 'Dirt Work', href: '/services#dirt-work', icon: Truck },
  { label: 'Land Clearing', href: '/services#land-clearing', icon: null },
  { label: 'Septic Systems', href: '/services#septic', icon: null },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Work', href: '/projects' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="relative bg-matte-black text-footer-fg texture-concrete overflow-hidden">
      {/* Decorative top edge */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-equipment-gold to-transparent opacity-60" />
      
      {/* CTA Band */}
      <div className="relative bg-gradient-to-r from-storm-blue via-storm-blue to-deep-slate">
        <div className="absolute inset-0 texture-diagonal" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <p className="text-bone-linen font-bold text-2xl lg:text-3xl tracking-tight text-balance">
              Ready to Start Your Project?
            </p>
            <p className="text-blue-200/80 text-base mt-2 max-w-md">
              Call us today or request a free estimate. We respond fast and show up when we say we will.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="tel:+14058675309"
              className="group flex items-center gap-3 px-8 py-4 bg-bone-linen text-soft-coal font-bold text-lg tracking-wide uppercase rounded-xl hover:bg-warm-concrete transition-all duration-200 shadow-lg shadow-black/15 ring-1 ring-black/10 hover:shadow-xl hover:-translate-y-0.5"
              aria-label="Call us at (405) 867-5309"
            >
              <Phone size={22} className="group-hover:animate-pulse" aria-hidden="true" />
              Call Now
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 border-2 border-bone-linen/70 text-bone-linen font-bold text-lg tracking-wide uppercase rounded-xl hover:border-bone-linen hover:bg-white/10 transition-all duration-200"
            >
              Request Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="lg" showText className="mb-6" />
            <p className="text-base leading-relaxed text-soft-khaki/80 mb-6">
              Oklahoma&apos;s trusted contractor for storm shelter installation, excavation, and site work. Family-owned. Quality-focused.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/hjhoutdoor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-storm-blue/30 text-soft-khaki hover:text-bone-linen rounded-xl shadow-md shadow-black/20 ring-1 ring-white/5 transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={22} aria-hidden="true" />
              </a>
              {/* Add more social links as needed */}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-bone-linen font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-equipment-gold" />
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-3 py-1 text-base text-soft-khaki/80 hover:text-bone-linen transition-colors"
                  >
                    {s.icon && <s.icon size={18} className="text-equipment-gold/70 group-hover:text-equipment-gold transition-colors" aria-hidden="true" />}
                    {!s.icon && <span className="w-1.5 h-1.5 rounded-full bg-equipment-gold/50 group-hover:bg-equipment-gold transition-colors" />}
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-bone-linen font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-equipment-gold" />
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-3 py-1 text-base text-soft-khaki/80 hover:text-bone-linen transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-equipment-gold/50 group-hover:bg-equipment-gold transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-bone-linen font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-equipment-gold" />
              Contact Us
            </h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  href="tel:+14058675309"
                  className="group flex items-center gap-4 py-1 text-base text-soft-khaki/80 hover:text-bone-linen transition-colors"
                  aria-label="Call us at (405) 867-5309"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-white/5 group-hover:bg-storm-blue/30 rounded-xl shadow-sm ring-1 ring-white/5 transition-colors">
                    <Phone size={20} className="text-equipment-gold" aria-hidden="true" />
                  </span>
                  <span className="font-semibold">(405) 867-5309</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hjhoutdoor.com"
                  className="group flex items-center gap-4 py-1 text-base text-soft-khaki/80 hover:text-bone-linen transition-colors"
                  aria-label="Email us at info@hjhoutdoor.com"
                >
                  <span className="flex items-center justify-center w-10 h-10 bg-white/5 group-hover:bg-storm-blue/30 rounded-xl shadow-sm ring-1 ring-white/5 transition-colors">
                    <Mail size={20} className="text-equipment-gold" aria-hidden="true" />
                  </span>
                  <span>info@hjhoutdoor.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 py-1 text-base text-soft-khaki/80">
                  <span className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-xl shadow-sm ring-1 ring-white/5">
                    <MapPin size={20} className="text-equipment-gold" aria-hidden="true" />
                  </span>
                  <span>Serving all of Oklahoma</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 py-1 text-base text-soft-khaki/80">
                  <span className="flex items-center justify-center w-10 h-10 bg-white/5 rounded-xl shadow-sm ring-1 ring-white/5">
                    <Clock size={20} className="text-equipment-gold" aria-hidden="true" />
                  </span>
                  <span>Mon-Sat: 7AM - 6PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-lg:pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          <p className="text-sm text-soft-khaki/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} HJH Outdoor Operations LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-soft-khaki/50">
            <span>Oklahoma Licensed Contractor</span>
            <span className="hidden sm:inline">|</span>
            <span>Fully Insured</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
