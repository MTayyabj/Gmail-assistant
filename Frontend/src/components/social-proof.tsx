'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const companies = [
  { name: 'Stripe', width: 'w-14' },
  { name: 'Linear', width: 'w-14' },
  { name: 'Vercel', width: 'w-16' },
  { name: 'Notion', width: 'w-14' },
  { name: 'Figma', width: 'w-12' },
  { name: 'Loom', width: 'w-12' },
];

const testimonials = [
  {
    quote:
      "MailFlow AI cut my inbox time from 3 hours a day to under 30 minutes. The draft quality is eerily good — it writes exactly like I would.",
    author: 'Priya Nair',
    role: 'Head of Operations',
    company: 'Ridgeline Capital',
    initials: 'PN',
    avatarColor: 'bg-violet-500',
    stars: 5,
  },
  {
    quote:
      "We onboarded our entire 200-person support team in a day. Classification accuracy was over 98% out of the box. It's a fundamentally different product.",
    author: 'James Okafor',
    role: 'VP of Customer Success',
    company: 'Meridian SaaS',
    initials: 'JO',
    avatarColor: 'bg-blue-500',
    stars: 5,
  },
  {
    quote:
      'The security posture is what sold us. Zero data retention, isolated models, full audit logs. Our legal team actually approved it on the first review.',
    author: 'Elena Marchetti',
    role: 'Chief Security Officer',
    company: 'Apex Fintech',
    initials: 'EM',
    avatarColor: 'bg-teal-500',
    stars: 5,
  },
];

function CompanyLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-6 py-3 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300">
      <span className="text-base font-bold text-content-main tracking-tight">{name}</span>
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="py-24 bg-background-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-content-main/40 uppercase tracking-widest mb-6">
            Trusted by forward-thinking teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 border-y border-border-subtle py-6">
            {companies.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <CompanyLogo name={company.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-content-main tracking-tight mb-3">
            Don't take our word for it
          </h2>
          <p className="text-sm text-content-main/55">
            Here's what our customers say after 30 days.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col bg-background-secondary rounded-2xl border border-border-subtle p-6 hover:shadow-lg hover:shadow-content-main/5 transition-shadow"
            >
              <Quote className="h-6 w-6 text-brand/30 mb-4" fill="currentColor" />

              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm text-content-main/75 leading-relaxed flex-1 mb-6">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className={`h-9 w-9 rounded-full ${testimonial.avatarColor} flex items-center justify-center shrink-0`}>
                  <span className="text-xs font-bold text-white">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-content-main">{testimonial.author}</p>
                  <p className="text-xs text-content-main/50">{testimonial.role} · {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-2xl border border-brand/20 bg-brand/5 p-10 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-content-main mb-3">
            Join 12,000+ teams automating their inbox
          </h3>
          <p className="text-sm text-content-main/60 mb-6 max-w-md mx-auto">
            Set up in 5 minutes. No credit card required. Full access for 14 days free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="/chat" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/25 text-sm">
              Start your free trial
            </a>
            <a href="/pricing" className="text-sm font-medium text-content-main/60 hover:text-content-main transition-colors">
              View pricing →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
