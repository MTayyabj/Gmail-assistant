'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Send, FileText, Trash2, Star, Archive, Search, MoveHorizontal as MoreHorizontal, ChevronDown, Sparkles, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, RefreshCw } from 'lucide-react';

const emails = [
  {
    id: 1,
    from: 'Sarah Chen',
    initials: 'SC',
    avatarColor: 'bg-blue-500',
    subject: 'Q3 Budget Review - Action Required',
    preview: 'Hi, I need your sign-off on the Q3 allocations before EOD...',
    time: '9:14 AM',
    label: 'Urgent',
    labelColor: 'bg-red-500/15 text-red-500 border-red-500/20',
    aiStatus: 'Draft Ready',
    statusColor: 'text-emerald-500',
    unread: true,
  },
  {
    id: 2,
    from: 'Marcus Webb',
    initials: 'MW',
    avatarColor: 'bg-violet-500',
    subject: 'Partnership Proposal - Follow Up',
    preview: 'Following up on our discussion last week about the integration...',
    time: '8:52 AM',
    label: 'Draft Ready',
    labelColor: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20',
    aiStatus: 'Composed',
    statusColor: 'text-emerald-500',
    unread: true,
  },
  {
    id: 3,
    from: 'no-reply@promo.io',
    initials: 'NR',
    avatarColor: 'bg-gray-400',
    subject: 'Limited Time Offer - 80% off today only!!!',
    preview: 'Click here to claim your exclusive discount before it expires...',
    time: '8:30 AM',
    label: 'Spam',
    labelColor: 'bg-orange-500/15 text-orange-500 border-orange-500/20',
    aiStatus: 'Filtered',
    statusColor: 'text-orange-500',
    unread: false,
  },
  {
    id: 4,
    from: 'Dev Team',
    initials: 'DT',
    avatarColor: 'bg-teal-500',
    subject: 'Weekly Standup - Notes & Action Items',
    preview: 'Attached are the meeting notes from today. Key action items: 1)...',
    time: 'Yesterday',
    label: 'Meeting',
    labelColor: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
    aiStatus: 'Summarized',
    statusColor: 'text-blue-500',
    unread: false,
  },
  {
    id: 5,
    from: 'Lena Torres',
    initials: 'LT',
    avatarColor: 'bg-pink-500',
    subject: 'Invoice #INV-2847 for approval',
    preview: 'Please review and approve the attached invoice at your earliest...',
    time: 'Yesterday',
    label: 'Finance',
    labelColor: 'bg-amber-500/15 text-amber-600 border-amber-500/20',
    aiStatus: 'Draft Ready',
    statusColor: 'text-emerald-500',
    unread: false,
  },
];

const sidebarItems = [
  { icon: Inbox, label: 'Inbox', count: 24, active: true },
  { icon: Send, label: 'Sent', count: null, active: false },
  { icon: FileText, label: 'Drafts', count: 3, active: false },
  { icon: Archive, label: 'Archived', count: null, active: false },
  { icon: Trash2, label: 'Trash', count: null, active: false },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-brand"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function EmailPreview() {
  const [activeEmail, setActiveEmail] = useState(0);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [showDraft, setShowDraft] = useState(false);

  const draftContent = "Hi Sarah,\n\nThank you for sending over the Q3 budget allocations. I've reviewed the figures and everything looks aligned with our projections.\n\nI'll provide my formal sign-off by 4 PM today.\n\nBest regards";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiProcessing(true);
      setTimeout(() => {
        setAiProcessing(false);
        setShowDraft(true);
        let i = 0;
        const interval = setInterval(() => {
          if (i <= draftContent.length) {
            setDraftText(draftContent.slice(0, i));
            i += 3;
          } else {
            clearInterval(interval);
          }
        }, 25);
      }, 1800);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeEmail]);

  const handleEmailClick = (idx: number) => {
    setActiveEmail(idx);
    setDraftText('');
    setShowDraft(false);
    setAiProcessing(false);

    setTimeout(() => {
      setAiProcessing(true);
      setTimeout(() => {
        setAiProcessing(false);
        setShowDraft(true);
        let i = 0;
        const interval = setInterval(() => {
          if (i <= draftContent.length) {
            setDraftText(draftContent.slice(0, i));
            i += 3;
          } else {
            clearInterval(interval);
          }
        }, 25);
      }, 1800);
    }, 400);
  };

  return (
    <div className="w-full rounded-2xl border border-border-subtle bg-background-main shadow-2xl shadow-content-main/5 overflow-hidden">
      <div className="flex h-[480px]">
        <div className="w-44 border-r border-border-subtle bg-background-secondary flex flex-col py-3 shrink-0">
          <div className="px-3 mb-3">
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-brand/10 rounded-lg">
              <Sparkles className="h-3 w-3 text-brand" />
              <span className="text-xs font-semibold text-brand">AI Active</span>
              <motion.span
                className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          <div className="space-y-0.5 px-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all ${
                  item.active
                    ? 'bg-brand/10 text-brand'
                    : 'text-content-main/50 hover:text-content-main/80 hover:bg-background-main'
                }`}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.count && (
                  <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    item.active ? 'bg-brand text-white' : 'bg-border-subtle text-content-main/50'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto px-3 pb-1">
            <div className="rounded-lg border border-border-subtle bg-background-main p-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-content-main/50">Processed</span>
                <RefreshCw className="h-2.5 w-2.5 text-brand" />
              </div>
              <div className="flex items-end gap-1">
                <span className="text-lg font-bold text-content-main">847</span>
                <span className="text-[10px] text-emerald-500 pb-0.5 font-medium">+12 today</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-background-main">
            <div className="flex-1 flex items-center gap-2 bg-background-secondary rounded-lg px-3 py-1.5 border border-border-subtle">
              <Search className="h-3.5 w-3.5 text-content-main/30" />
              <span className="text-xs text-content-main/30">Search emails...</span>
            </div>
            <button className="h-7 w-7 rounded-lg border border-border-subtle bg-background-secondary flex items-center justify-center">
              <MoreHorizontal className="h-3.5 w-3.5 text-content-main/40" />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="w-56 border-r border-border-subtle overflow-y-auto shrink-0">
              {emails.map((email, idx) => (
                <motion.button
                  key={email.id}
                  onClick={() => handleEmailClick(idx)}
                  className={`w-full text-left px-3 py-3 border-b border-border-subtle/50 transition-all ${
                    activeEmail === idx
                      ? 'bg-brand/5 border-l-2 border-l-brand'
                      : 'hover:bg-background-secondary'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex items-start gap-2">
                    <div className={`h-7 w-7 rounded-full ${email.avatarColor} flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className="text-[9px] font-bold text-white">{email.initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[11px] font-semibold truncate ${email.unread ? 'text-content-main' : 'text-content-main/60'}`}>
                          {email.from}
                        </span>
                        <span className="text-[9px] text-content-main/40 shrink-0">{email.time}</span>
                      </div>
                      <p className={`text-[10px] truncate mb-1 ${email.unread ? 'text-content-main/80' : 'text-content-main/50'}`}>
                        {email.subject}
                      </p>
                      <span className={`inline-flex items-center text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${email.labelColor}`}>
                        {email.label}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-background-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEmail}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-content-main mb-1">
                        {emails[activeEmail].subject}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`h-5 w-5 rounded-full ${emails[activeEmail].avatarColor} flex items-center justify-center`}>
                          <span className="text-[8px] font-bold text-white">{emails[activeEmail].initials}</span>
                        </div>
                        <span className="text-xs text-content-main/60">{emails[activeEmail].from}</span>
                        <span className="text-[10px] text-content-main/40">{emails[activeEmail].time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-content-main/30" />
                      <Archive className="h-3.5 w-3.5 text-content-main/30" />
                    </div>
                  </div>

                  <p className="text-xs text-content-main/70 leading-relaxed mb-4">
                    {emails[activeEmail].preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>

                  <div className="mt-4 rounded-xl border border-border-subtle bg-background-secondary overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border-subtle bg-brand/5">
                      <Sparkles className="h-3.5 w-3.5 text-brand" />
                      <span className="text-xs font-semibold text-brand">AI Draft</span>
                      {aiProcessing && <TypingIndicator />}
                      {!aiProcessing && showDraft && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="ml-auto flex items-center gap-1 text-emerald-500"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span className="text-[10px] font-medium">Ready to send</span>
                        </motion.div>
                      )}
                      {aiProcessing && (
                        <div className="ml-auto flex items-center gap-1 text-content-main/40">
                          <Clock className="h-3 w-3" />
                          <span className="text-[10px]">Composing...</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 min-h-[100px]">
                      {aiProcessing && !showDraft && (
                        <div className="flex flex-col gap-2 animate-pulse">
                          <div className="h-2 w-3/4 bg-border-subtle rounded" />
                          <div className="h-2 w-full bg-border-subtle rounded" />
                          <div className="h-2 w-5/6 bg-border-subtle rounded" />
                        </div>
                      )}
                      {showDraft && (
                        <pre className="text-[11px] text-content-main/80 leading-relaxed whitespace-pre-wrap font-sans">
                          {draftText}
                          {draftText.length < draftContent.length && (
                            <span className="inline-block w-0.5 h-3 bg-brand animate-blink ml-0.5 translate-y-0.5" />
                          )}
                        </pre>
                      )}
                    </div>
                    {showDraft && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-3 py-2.5 border-t border-border-subtle"
                      >
                        <button className="flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-all">
                          <Send className="h-2.5 w-2.5" />
                          Send Reply
                        </button>
                        <button className="text-[10px] font-medium text-content-main/50 hover:text-content-main px-2 py-1.5 rounded-lg hover:bg-background-main transition-colors">
                          Edit Draft
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
