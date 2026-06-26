"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate?: (progressPercent: number) => void;
}

export default function Navbar({ onNavigate: _onNavigate }: NavbarProps = {}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBackground = isScrolled || pathname !== "/";

  const navLinks = [
    { label: "Movement", path: "/movement" },
    { label: "Case", path: "/case" },
    { label: "Heritage", path: "/heritage" },
    { label: "Atelier", path: "/atelier" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showBackground
            ? "glass py-4"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-6 md:px-12 flex justify-between items-center gap-8">
          {/* Left: Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className="serif-display text-xl md:text-[22px] tracking-[0.18em] text-white group-hover:text-[#E0B584] transition-colors duration-500 uppercase font-medium">
              Meridian
            </span>
            <span className="hidden md:inline-block w-px h-3 bg-white/20" />
            <span className="hidden md:inline-block kicker text-white/40 group-hover:text-white/60 transition-colors duration-500">
              Genève · 1908
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex gap-10 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  className={`relative group cursor-pointer transition-colors duration-300 kicker py-1 ${
                    isActive ? "text-[#E0B584]" : "text-white/55 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9885E] to-transparent transition-all duration-500 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right: Reference + CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="hidden xl:flex flex-col items-end leading-tight">
              <span className="kicker text-white/35">Reference</span>
              <span className="numeral text-[11px] text-white/70 mt-1">M-1908.RG</span>
            </div>
            <Link
              href="/reserve"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9885E]/40 hover:border-[#C9885E] bg-[#08080B]/40 hover:bg-[#C9885E]/8 text-[#E0B584] hover:text-white transition-all duration-500 kicker overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Reserve</span>
              <span className="relative z-10 inline-block w-3 h-px bg-current transition-all duration-500 group-hover:w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-white/80 hover:text-[#E0B584] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080B]/97 backdrop-blur-xl flex flex-col justify-center items-center gap-10 lg:hidden">
          <div className="absolute top-8 left-0 right-0 flex justify-center">
            <span className="kicker text-[#C9885E]/70">Maison Meridian</span>
          </div>
          {navLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`serif-display text-3xl tracking-[0.05em] uppercase transition-colors animate-tick ${
                  isActive ? "text-[#E0B584]" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="hairline w-32 mt-2" />
          <Link
            href="/reserve"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
          >
            Reserve a Piece
          </Link>
          <span className="kicker text-white/30 absolute bottom-8">Genève · Est. 1908</span>
        </div>
      )}
    </>
  );
}
