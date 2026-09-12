"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Container } from "./Container";

interface NavItem {
  label: string;
  href: string;
}

export function HeaderClient({ nav }: { nav: readonly NavItem[] }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !scrolled && pathname === '/';

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        isTransparent ? "bg-transparent border-b border-transparent" : "bg-paper border-b border-line shadow-xs"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-24">
          <Link 
            href="/" 
            className="flex items-center hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm"
          >
            <Image 
              src={isTransparent ? "/logo-light.png" : "/logo-dark.png"} 
              alt="PlotInNaviMumbai.com Logo" 
              width={260}
              height={72}
              priority
              style={{ width: 'auto', height: '4.5rem' }}
              className="object-contain"
            />
          </Link>
 
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {nav.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={cn(
                        "text-[0.9375rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm relative py-1",
                        isTransparent 
                          ? (isActive ? "text-sprout" : "text-white/95 hover:text-white")
                          : (isActive ? "text-canopy" : "text-ink/90 hover:text-canopy")
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sprout rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link 
              href="/book-site-visit" 
              className={cn(
                buttonVariants(), 
                "font-semibold h-10 px-6 rounded-[8px] transition-colors",
                isTransparent 
                  ? "bg-sprout hover:bg-sprout/90 text-ink" 
                  : "bg-canopy text-white hover:bg-moss"
              )}
            >
              Book Site Visit
            </Link>
          </nav>
 
          {/* Mobile Nav Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className={cn("md:hidden rounded-[8px] transition-colors", isTransparent ? "text-white hover:bg-white/10" : "text-ink hover:bg-panel")} />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md bg-paper flex flex-col p-0 border-l border-line">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-6 border-b border-line flex items-center justify-between">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <Image 
                    src="/logo-dark.png" 
                    alt="PlotInNaviMumbai.com Logo" 
                    width={220}
                    height={64}
                    style={{ width: 'auto', height: '4rem' }}
                    className="object-contain"
                  />
                </Link>
                {/* The Shadcn sheet has a built-in close button, we just rely on it */}
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-5">
                  {nav.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <li key={item.href}>
                        <Link 
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-xl font-medium block py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout rounded-sm",
                            isActive ? "text-canopy" : "text-ink"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="p-6 bg-panel border-t border-line mt-auto">
                <div className="flex flex-col gap-3">
                  <Link href="/book-site-visit" onClick={() => setIsOpen(false)} className={cn(buttonVariants(), "w-full h-12 bg-sprout hover:bg-sprout/90 text-ink rounded-[8px] justify-center gap-3 text-base font-semibold")}>
                    Book Site Visit
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "w-full h-12 border-line text-ink hover:bg-panel rounded-[8px] justify-center gap-3 text-base")}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
