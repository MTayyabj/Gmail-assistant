'use client';

import { motion } from 'framer-motion';
import { Mail, Server, ArrowRight, Plug } from 'lucide-react';

const integrations = [
  {
    name: 'Gmail',
    description: 'Full Google Workspace support with real-time sync',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="#fef3f2" />
        <path d="M22 6L12 13 2 6" stroke="#EA4335" strokeWidth="1.5" />
        <path d="M2 6l10 7 10-7" fill="none" stroke="#EA4335" strokeWidth="0" />
        <path d="M2 6v12h20V6L12 13 2 6z" fill="none" />
      </svg>
    ),
    color: 'border-red-200 dark:border-red-900/40',
    iconBg: 'bg-red-50 dark:bg-red-500/10',
    badge: 'Official Partner',
    badgeColor: 'bg-red-50 dark:bg-red-500/10 text-red-500',
  },
  {
    name: 'Outlook',
    description: 'Microsoft 365 & Exchange integration with OAuth 2.0',
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-8 w-8">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4" />
        <path d="M6 8h8M6 12h8M6 16h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="14" y="9" width="7" height="7" rx="1" fill="white" opacity="0.3" />
      </svg>
    ),
    color: 'border-blue-200 dark:border-blue-900/40',
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    badge: 'Certified',
    badgeColor: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',
  },
  {
    name: 'IMAP / SMTP',
    description: 'Works with any email provider — Yahoo, Fastmail, ProtonMail',
    icon: Server,
    color: 'border-slate-200 dark:border-slate-700',
    iconBg: 'bg-slate-50 dark:bg-slate-800',
    badge: 'Universal',
    badgeColor: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
  },
];

const additionalApps = [
  { name: 'Slack', color: 'bg-[#4A154B]/10 border-[#4A154B]/20' },
  { name: 'Notion', color: 'bg-content-main/5 border-border-subtle' },
  { name: 'Salesforce', color: 'bg-[#00A1E0]/10 border-[#00A1E0]/20' },
  { name: 'HubSpot', color: 'bg-[#FF7A59]/10 border-[#FF7A59]/20' },
  { name: 'Jira', color: 'bg-[#0052CC]/10 border-[#0052CC]/20' },
  { name: 'Zapier', color: 'bg-[#FF4A00]/10 border-[#FF4A00]/20' },
  { name: 'Linear', color: 'bg-[#5E6AD2]/10 border-[#5E6AD2]/20' },
  { name: '+ 90 more', color: 'bg-brand/10 border-brand/20 text-brand' },
];

export function Integrations() {
  return (
    <section className="py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <Plug className="h-3 w-3" />
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-content-main tracking-tight mb-4">
            Works with the tools you already use
          </h2>
          <p className="text-base text-content-main/60 max-w-lg mx-auto">
            Connect your existing email accounts in under two minutes. No migration, no data export, no friction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`relative bg-background-main rounded-2xl border p-6 flex flex-col gap-4 ${integration.color} hover:shadow-lg hover:shadow-content-main/5 transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div className={`h-14 w-14 rounded-xl ${integration.iconBg} border ${integration.color} flex items-center justify-center`}>
                  {typeof integration.icon === 'function' && !(integration.icon as any).displayName ? (
                    <integration.icon />
                  ) : (
                    <Mail className="h-7 w-7 text-content-main/60" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${integration.badgeColor} ${integration.color}`}>
                  {integration.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-content-main mb-1.5">
                  {integration.name}
                </h3>
                <p className="text-sm text-content-main/55 leading-relaxed">
                  {integration.description}
                </p>
              </div>

              <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:gap-2.5 transition-all">
                Connect now
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <p className="text-sm font-medium text-content-main/50 mb-4">
            Also connects with your favorite tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {additionalApps.map((app) => (
              <span
                key={app.name}
                className={`text-xs font-medium text-content-main/70 px-4 py-2 rounded-full border ${app.color}`}
              >
                {app.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
