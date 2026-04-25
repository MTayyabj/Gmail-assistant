'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  gradient?: string;
  delay?: number;
  details?: string[];
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor = 'bg-brand/10 text-brand',
  gradient = 'from-brand/10 to-brand/5',
  delay = 0,
  details = [],
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-2xl border border-border-subtle bg-background-secondary p-6 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-content-main/5"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="h-11 w-11 rounded-xl bg-background-main border border-border-subtle flex items-center justify-center shadow-sm group-hover:border-brand/30 group-hover:shadow-brand/10 transition-all">
            <Icon className="h-5 w-5 text-brand" />
          </div>
          {badge && (
            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-content-main mb-2 group-hover:text-brand transition-colors">
          {title}
        </h3>
        <p className="text-sm text-content-main/60 leading-relaxed mb-4">
          {description}
        </p>

        {details.length > 0 && (
          <ul className="space-y-2">
            {details.map((detail) => (
              <li key={detail} className="flex items-center gap-2 text-xs text-content-main/60">
                <div className="h-1.5 w-1.5 rounded-full bg-brand/60 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
