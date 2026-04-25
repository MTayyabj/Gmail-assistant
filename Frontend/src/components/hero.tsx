'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, CircleCheck as CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import { EmailPreview } from './email-preview';

const stats = [
  { icon: Clock, value: '4.2hrs', label: 'saved daily', color: 'text-brand' },
  { icon: TrendingUp, value: '98.7%', label: 'accuracy rate', color: 'text-emerald-500' },
  { icon: CheckCircle2, value: '10k+', label: 'emails/day', color: 'text-violet-500' },
];

const pills = [
  'Auto-Classification',
  'Smart Drafting',
  'Priority Detection',
  'Calendar Integration',
];

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background-main overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--content-main)) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand text-xs font-semibold px-4 py-2 rounded-full w-fit mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              Now in Public Beta — Join 12,000+ teams
            </motion.div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-content-main leading-[1.08] tracking-tight mb-6">
              Automate your{' '}
              <span className="relative">
                <span className="relative z-10 text-brand">Inbox</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 6 Q100 0 200 6" stroke="hsl(var(--brand))" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>{' '}
              with Intelligence
            </h1>

            <p className="text-base sm:text-lg text-content-main/60 leading-relaxed mb-8 max-w-lg">
              MailFlow AI reads, classifies, and drafts replies to your emails — so you can focus on work that actually matters. Connect in minutes, no code required.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {pills.map((pill, i) => (
                <motion.span
                  key={pill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-content-main/70 bg-background-secondary border border-border-subtle px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {pill}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/40 text-sm"
              >
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-background-secondary hover:bg-background-secondary/80 text-content-main font-semibold px-6 py-3.5 rounded-xl border border-border-subtle transition-all text-sm"
              >
                <Play className="h-3.5 w-3.5 text-brand fill-brand" />
                Watch Demo
              </motion.a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-content-main/50">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative lg:pt-4"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand/10 via-transparent to-emerald-500/10 rounded-3xl blur-2xl" />
            <div className="relative">
              <EmailPreview />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16, x: -16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -left-6 bottom-16 hidden xl:block"
            >
              <div className="bg-background-main border border-border-subtle rounded-2xl shadow-xl shadow-content-main/5 px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-content-main">Draft sent</p>
                  <p className="text-[10px] text-content-main/50">Replied to Sarah · just now</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -16, x: 16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -right-4 top-8 hidden xl:block"
            >
              <div className="bg-background-main border border-border-subtle rounded-2xl shadow-xl shadow-content-main/5 px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-[10px] font-semibold text-content-main/60 uppercase tracking-wide">AI Processing</span>
                </div>
                <div className="space-y-1.5">
                  {['Classifying...', 'Analyzing intent...', 'Drafting reply...'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-2"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                      <span className="text-[10px] text-content-main/70">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
