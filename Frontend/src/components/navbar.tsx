'use client';

import { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Link } from 'react-router-dom';
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '#docs' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-main/80 backdrop-blur-xl border-b border-border-subtle shadow-sm shadow-border-subtle/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-xl bg-brand flex items-center justify-center shadow-md shadow-brand/30 group-hover:shadow-brand/50 transition-shadow">
              <Zap className="h-4 w-4 text-white" fill="white" />
            </div>
            <span className="text-lg font-semibold text-content-main tracking-tight">
              MailFlow<span className="text-brand">AI</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-content-main/60 hover:text-content-main transition-colors rounded-lg hover:bg-background-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {/* <a
              href="/profile"
              className="text-sm font-medium text-content-main/70 hover:text-content-main transition-colors px-3 py-2"
            >
              Profile
            </a>
            <a
              href="/contacts"
              className="text-sm font-medium text-content-main/70 hover:text-content-main transition-colors px-3 py-2"
            >
              Contacts
            </a> */}
            <a
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-px"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="h-9 w-9 rounded-xl border border-border-subtle bg-background-secondary flex items-center justify-center text-content-main/70"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background-main/95 backdrop-blur-xl border-b border-border-subtle">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-content-main/70 hover:text-content-main hover:bg-background-secondary rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1 flex flex-col gap-2">
              {/* <a
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-center text-sm font-medium text-content-main/70 py-2.5"
              >
                Profile
              </a>
              <a
                href="/contacts"
                onClick={() => setMobileOpen(false)}
                className="text-center text-sm font-medium text-content-main/70 py-2.5"
              >
                Contacts
              </a> */}
              <a href="#" className="text-center bg-brand hover:bg-brand-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
