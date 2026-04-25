'use client';

import { motion } from 'framer-motion';
import { Brain, Signature as FileSignature, Shield, Zap, ChartBar as BarChart3, GitMerge, Bell, Clock, Workflow } from 'lucide-react';
import { FeatureCard } from './feature-cart';

const features = [
  {
    icon: Brain,
    title: 'Smart Classification',
    description:
      'Our AI model reads every incoming email and instantly categorizes it — Urgent, Finance, Spam, Meeting, or custom labels you define.',
    badge: 'Core AI',
    badgeColor: 'bg-brand/10 text-brand',
    gradient: 'from-brand/8 to-transparent',
    details: [
      'Multi-label classification with 99.1% precision',
      'Custom label training from your patterns',
      'Confidence scores for every decision',
    ],
  },
  {
    icon: FileSignature,
    title: 'Automated Drafts',
    description:
      'MailFlow AI composes context-aware draft replies in your writing style — ready to review and send in one click, or auto-dispatch if you prefer.',
    badge: 'New',
    badgeColor: 'bg-emerald-500/10 text-emerald-500',
    gradient: 'from-emerald-500/8 to-transparent',
    details: [
      'Learns your tone and vocabulary over time',
      'References prior conversation threads',
      'Supports multi-language drafts in 28+ languages',
    ],
  },
  {
    icon: Shield,
    title: 'Security-First',
    description:
      'Enterprise-grade encryption at rest and in transit. Your email content never trains shared models — everything is isolated to your workspace.',
    badge: 'SOC 2',
    badgeColor: 'bg-amber-500/10 text-amber-600',
    gradient: 'from-amber-500/8 to-transparent',
    details: [
      'AES-256 encryption & TLS 1.3 in transit',
      'Zero-retention policy for sensitive data',
      'GDPR, HIPAA, and SOC 2 Type II compliant',
    ],
  },
  {
    icon: Bell,
    title: 'Priority Alerts',
    description:
      'Get Slack, SMS, or push notifications only for emails that truly need your attention. Never miss a critical message again.',
    gradient: 'from-red-500/8 to-transparent',
    details: [
      'VIP sender detection with override rules',
      'SLA-based urgency escalation',
      'Smart snooze with follow-up reminders',
    ],
  },
  {
    icon: BarChart3,
    title: 'Inbox Analytics',
    description:
      'Understand where your email time actually goes. Track response times, volume trends, and AI automation rates on a real-time dashboard.',
    gradient: 'from-violet-500/8 to-transparent',
    details: [
      'Weekly performance digest reports',
      'Response time benchmarks by label',
      'Automation savings in hours/dollars',
    ],
  },
  {
    icon: Workflow,
    title: 'Custom Workflows',
    description:
      'Build no-code automation pipelines. Route emails to teammates, trigger webhooks, update your CRM, or create tasks in Notion or Jira.',
    badge: 'Pro',
    badgeColor: 'bg-violet-500/10 text-violet-500',
    gradient: 'from-violet-500/8 to-transparent',
    details: [
      '100+ native integrations including Salesforce',
      'Visual drag-and-drop workflow builder',
      'Condition-based branching logic',
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <Zap className="h-3 w-3" fill="currentColor" />
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight mb-4">
            Everything your inbox needs,{' '}
            <span className="text-brand">nothing it doesn't</span>
          </h2>
          <p className="text-base text-content-main/60 max-w-xl mx-auto leading-relaxed">
            From first read to final reply, MailFlow AI handles every step of the email lifecycle with precision you can trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
