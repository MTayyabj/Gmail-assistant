'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small teams',
    price: 29,
    period: 'month',
    cta: 'Get Started',
    features: [
      'Up to 1,000 emails/month',
      'Basic AI classification',
      'Simple drafts',
      'Gmail & Outlook integration',
      'Email support',
      '7-day email history',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    description: 'For growing teams who need power',
    price: 99,
    period: 'month',
    cta: 'Start Free Trial',
    features: [
      'Unlimited emails',
      'Advanced AI classification',
      'Smart drafts with learning',
      'All integrations (90+)',
      'Priority support',
      'Full email history',
      'Custom workflows',
      'Team collaboration',
      'Advanced analytics',
      'API access',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: null,
    period: 'custom',
    cta: 'Contact Sales',
    features: [
      'Everything in Pro',
      'Unlimited everything',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security',
      'SLA guarantee',
      'On-premise option',
      'SSO & SAML',
      'Advanced compliance',
      '24/7 phone support',
    ],
    highlight: false,
  },
];

const billingCycles = [
  { label: 'Monthly', value: 'monthly', discount: 0 },
  { label: 'Yearly', value: 'yearly', discount: 0.2 },
];

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const isYearly = billingCycle === 'yearly';

  return (
    <section className="min-h-screen bg-background-main py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 text-brand text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <Zap className="h-3 w-3" fill="currentColor" />
            Simple, Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-content-main tracking-tight mb-4">
            Plans for every team size
          </h1>
          <p className="text-lg text-content-main/60 max-w-2xl mx-auto mb-8">
            Start free. Upgrade anytime. No contracts, no surprises. Choose the plan that fits your needs.
          </p>

          <div className="flex items-center justify-center gap-4">
            {billingCycles.map((cycle) => (
              <button
                key={cycle.value}
                onClick={() => setBillingCycle(cycle.value)}
                className={`relative px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  billingCycle === cycle.value
                    ? 'bg-brand text-white shadow-lg shadow-brand/30'
                    : 'bg-background-secondary text-content-main/60 hover:text-content-main border border-border-subtle'
                }`}
              >
                {cycle.label}
                {cycle.discount > 0 && billingCycle === cycle.value && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: plan.highlight ? 0 : -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border transition-all overflow-hidden group ${
                plan.highlight
                  ? 'border-brand bg-gradient-to-b from-brand/10 via-background-main to-background-main shadow-2xl shadow-brand/20 scale-100 md:scale-105 md:z-10'
                  : 'border-border-subtle bg-background-secondary hover:shadow-lg hover:shadow-content-main/5'
              }`}
            >
              {plan.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 pointer-events-none" />
              )}

              <div className="relative p-8">
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {/* <span className="inline-flex items-center gap-1.5 bg-brand text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-brand/30">
                      <Zap className="h-3 w-3" fill="white" />
                      Most Popular
                    </span> */}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-content-main mb-2">{plan.name}</h3>
                  <p className="text-sm text-content-main/55">{plan.description}</p>
                </div>

                <div className="mb-8">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-5xl font-extrabold text-content-main">
                        ${Math.round(plan.price * (isYearly ? 10 * 0.8 : 1))}
                      </span>
                      <span className="text-lg text-content-main/50 font-medium">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-content-main mb-2">Custom Pricing</div>
                  )}
                  {isYearly && plan.price && (
                    <p className="text-xs text-emerald-500 font-semibold">
                      Save ${Math.round(plan.price * 12 * 0.2)}/year with annual billing
                    </p>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-8 ${
                    plan.highlight
                      ? 'bg-brand hover:bg-brand-hover text-white shadow-lg shadow-brand/25 hover:shadow-brand/40'
                      : 'bg-background-main hover:bg-background-secondary text-content-main border border-border-subtle'
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-content-main/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 rounded-2xl border border-border-subtle bg-background-secondary p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-content-main mb-2">Questions about pricing?</h3>
          <p className="text-sm text-content-main/60 mb-6">
            We have flexible plans and volume discounts for larger teams. Let's talk.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-7 py-3 rounded-xl transition-all shadow-lg shadow-brand/25"
          >
            Schedule a demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
