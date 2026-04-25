'use client';

import { Zap, Twitter, Github, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Developers: [
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#' },
    { label: 'SDKs', href: '#' },
    { label: 'Webhooks', href: '#' },
    { label: 'Open Source', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'DPA', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-brand flex items-center justify-center shadow-md shadow-brand/30">
                <Zap className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-semibold text-content-main tracking-tight">
                MailFlow<span className="text-brand">AI</span>
              </span>
            </a>
            <p className="text-sm text-content-main/55 leading-relaxed mb-5 max-w-xs">
              The AI-powered email agent that reads, classifies, and drafts replies for you. Built for teams who value their time.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-8 w-8 rounded-lg border border-border-subtle bg-background-main flex items-center justify-center text-content-main/40 hover:text-brand hover:border-brand/30 transition-all"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-content-main uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-content-main/55 hover:text-content-main transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-subtle">
          <p className="text-xs text-content-main/40">
            © {new Date().getFullYear()} MailFlow AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-content-main/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span className="text-xs text-content-main/30">|</span>
            <span className="text-xs text-content-main/40">SOC 2 Certified · GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
