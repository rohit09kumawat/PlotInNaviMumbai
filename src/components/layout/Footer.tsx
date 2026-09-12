import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canopy text-white py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-16 md:gap-20">
          
          {/* Row 1: Brand & Tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm">
              <Image 
                src="/logo-light.png" 
                alt="PlotInNaviMumbai.com Logo" 
                width={280}
                height={80}
                style={{ width: 'auto', height: '5rem' }}
                className="object-contain"
              />
            </Link>
            <p className="text-xl md:text-2xl font-display font-medium text-white/90 max-w-[30ch]">
              Built on trust. Guided by honesty. Focused on your future.
            </p>
          </div>

          {/* Row 2: Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            
            {/* Col 1: Explore */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Explore</h3>
              <ul className="flex flex-col gap-3">
                <li><FooterLink href="/properties">Property Portfolio</FooterLink></li>
                <li><FooterLink href="/book-site-visit">Book Site Visit</FooterLink></li>
                <li><FooterLink href="/why-navi-mumbai">Why Navi Mumbai</FooterLink></li>
                <li><FooterLink href="/blog">Blog</FooterLink></li>
                <li><FooterLink href="/contact">How to Contact</FooterLink></li>
              </ul>
            </div>

            {/* Col 2: Properties by node */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Plots By Node</h3>
              <ul className="flex flex-col gap-3">
                <li><FooterLink href="/properties/ulwe">Plots in Ulwe</FooterLink></li>
                <li><FooterLink href="/properties/kharghar">Plots in Kharghar</FooterLink></li>
                <li><FooterLink href="/properties/panvel">Plots in Panvel</FooterLink></li>
                <li><FooterLink href="/properties/taloja">Plots in Taloja</FooterLink></li>
                <li><FooterLink href="/properties/dronagiri">Plots in Dronagiri</FooterLink></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Company</h3>
              <ul className="flex flex-col gap-3">
                <li><FooterLink href="/about">About Us</FooterLink></li>
                <li><FooterLink href="/services">Services</FooterLink></li>
                <li><FooterLink href="/stories-of-trust">Stories of Trust</FooterLink></li>
                <li><FooterLink href="/faq">FAQ</FooterLink></li>
              </ul>
            </div>

            {/* Col 4: Contact & Social Media */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Connect With Us</h3>
              <ul className="flex flex-col gap-3">
                <li><FooterLink href="/contact">How to Contact</FooterLink></li>
                <li>
                  <a 
                    href={`https://wa.me/${site.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[0.9375rem] text-white/80 hover:text-sprout transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
                  >
                    WhatsApp ({site.phone})
                  </a>
                </li>
                {site.social.youtube && (
                  <li>
                    <a 
                      href={site.social.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[0.9375rem] text-white/80 hover:text-sprout transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
                    >
                      YouTube Channel
                    </a>
                  </li>
                )}
                {site.social.instagram && (
                  <li>
                    <a 
                      href={site.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[0.9375rem] text-white/80 hover:text-sprout transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
                    >
                      Instagram Profile
                    </a>
                  </li>
                )}
                {site.social.linkedin && (
                  <li>
                    <a 
                      href={site.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[0.9375rem] text-white/80 hover:text-sprout transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
                    >
                      LinkedIn Profile
                    </a>
                  </li>
                )}
              </ul>
            </div>

          </div>

          {/* Row 3: Details */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end justify-between border-t border-white/20 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-2xl">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Address</span>
                <address className="not-italic text-[0.9375rem] text-white/80 leading-[1.6]">
                  {(site.address.street as string) && (site.address.street as string) !== 'TODO_CLIENT' ? (
                    <>
                      {site.address.street}<br/>
                      {site.address.locality}, {site.address.city}<br/>
                      {site.address.region} {site.address.postalCode}
                    </>
                  ) : (
                    <span className="opacity-50">Address pending update</span>
                  )}
                </address>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Direct</span>
                <div className="flex flex-col text-[0.9375rem] text-white/80 leading-[1.6]">
                  {(site.email as string) && (site.email as string) !== 'TODO_CLIENT' && (
                    <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">{site.email}</a>
                  )}
                  {(site.phone as string) && (site.phone as string) !== 'TODO_CLIENT' && (
                    <a href={`tel:${site.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{site.phone}</a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Legal */}
          <div className="flex flex-col gap-6 border-t border-white/20 pt-8 text-sm text-white/50">
            <p className="max-w-[80ch] leading-[1.6]">
              Property details, prices and approval status are shared in good faith and can change. Nothing on this website is an offer or a guarantee of investment returns. Please verify all documents independently before any transaction.
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p>&copy; {currentYear} {(site.legalName as string) !== 'TODO_CLIENT' ? site.legalName : 'PlotInNaviMumbai.com'}. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm">Terms of Service</Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-[0.9375rem] text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
    >
      {children}
    </Link>
  );
}
