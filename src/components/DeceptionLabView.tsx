import React, { useState } from 'react';
import {
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Sparkles,
  Info
} from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  deceptiveExplanation: string[];
  ethicalExplanation: string[];
  deceptiveState: {
    badge: string;
    headline: string;
    sub: string;
    priceBox: { label: string; amount: string; sub?: string }[];
    interactiveElement: {
      type: 'checkbox' | 'buttons' | 'cancel' | 'urgency';
      label: string;
      prechecked?: boolean;
      subtext?: string;
    };
    confirmshameText?: string;
    ctaButton: string;
  };
  ethicalState: {
    badge: string;
    headline: string;
    sub: string;
    priceBox: { label: string; amount: string; sub?: string }[];
    interactiveElement: {
      type: 'checkbox' | 'buttons' | 'cancel' | 'urgency';
      label: string;
      prechecked?: boolean;
      subtext?: string;
    };
    confirmshameText?: string;
    ctaButton: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'airline',
    title: 'Airline Passenger Checkout',
    subtitle: 'Sneak into Basket vs. Affirmative Opt-In',
    category: 'Sneak into Basket',
    deceptiveExplanation: [
      'Pre-checked $34.50 travel insurance slipped into the total without asking.',
      'Unchecking triggers an alarming confirmshaming modal.',
      'Contrasting buttons: Vibrant red for "Protect Me" vs faint grey for "I accept total loss".'
    ],
    ethicalExplanation: [
      'Unchecked by default: Consumer must deliberately choose to add insurance.',
      'Clear, neutral options: "Add Insurance" vs "Proceed Without Insurance".',
      'No guilt-tripping or manipulative warnings designed to instill fear.'
    ],
    deceptiveState: {
      badge: 'Predatory Design (FTC Violation Risk)',
      headline: 'Review Your Flight: San Francisco to New York',
      sub: 'Flight 842 • Economy Class',
      priceBox: [
        { label: 'Airfare', amount: '$189.00' },
        { label: 'Taxes & Airport Surcharges', amount: '$24.50' },
        { label: 'SkyShield Travel Insurance (Pre-selected)', amount: '+$34.50' }
      ],
      interactiveElement: {
        type: 'checkbox',
        label: '☑ Add SkyShield 100% Comprehensive Flight Protection ($34.50)',
        prechecked: true,
        subtext: 'Pre-selected for your convenience. Disabling puts your entire ticket at risk.'
      },
      confirmshameText: '"I acknowledge I am declining protection and willing to lose all ticket funds if delayed"',
      ctaButton: 'Complete Purchase ($248.00)'
    },
    ethicalState: {
      badge: 'Ethical Standard (FTC & DOT Compliant)',
      headline: 'Review Your Flight: San Francisco to New York',
      sub: 'Flight 842 • Economy Class',
      priceBox: [
        { label: 'Airfare', amount: '$189.00' },
        { label: 'Taxes & Mandatory Airport Surcharges', amount: '$24.50' }
      ],
      interactiveElement: {
        type: 'checkbox',
        label: '☐ Add optional SkyShield Flight Insurance for $34.50',
        prechecked: false,
        subtext: 'Optional policy. Your credit card may already provide travel insurance.'
      },
      ctaButton: 'Complete Purchase ($213.50)'
    }
  },
  {
    id: 'trial',
    title: 'Subscription Free Trial',
    subtitle: 'Concealed Auto-Renewal vs. Transparent Terms',
    category: 'Negative Option / Hidden Subscription',
    deceptiveExplanation: [
      'Promotes "$1 Trial" in huge bold display font.',
      'Hides $79.99 quarterly recurring charge in 8px light grey microprint.',
      'Billing kicks in 48 hours before the 7-day period actually ends.'
    ],
    ethicalExplanation: [
      'Clearly states both the trial cost and the recurring renewal rate side-by-side.',
      'Requires separate affirmative checkbox agreeing to auto-renew.',
      'Sends email notification 3 days prior to first charge.'
    ],
    deceptiveState: {
      badge: 'Predatory Negative Option (ROSCA Violation)',
      headline: 'Unlock Premium Features for Just $1.00',
      sub: 'Instant access to all modules and priority support',
      priceBox: [
        { label: 'Special Introductory Price Today', amount: '$1.00' }
      ],
      interactiveElement: {
        type: 'buttons',
        label: 'Continuous VIP Access Included',
        subtext: 'By clicking below, you agree your subscription automatically renews at $79.99 billed quarterly 48 hours before trial expires without prior notice.'
      },
      confirmshameText: '"No thanks, I choose not to invest in my growth and prefer staying behind"',
      ctaButton: 'Claim My $1.00 Access Now'
    },
    ethicalState: {
      badge: 'Ethical Transparent Billing (ROSCA Compliant)',
      headline: 'Start Your 7-Day Trial for $1.00',
      sub: 'Renews at $79.99/quarter after 7 days • Cancel anytime online in 1 click',
      priceBox: [
        { label: '7-Day Trial Price', amount: '$1.00' },
        { label: 'Subsequent Billing', amount: '$79.99 / quarter starting Day 7' }
      ],
      interactiveElement: {
        type: 'checkbox',
        label: '☑ I authorize recurring quarterly billing of $79.99 until cancelled',
        prechecked: false,
        subtext: 'We will email you a reminder 3 days before any charge occurs.'
      },
      ctaButton: 'Start Trial & Authorize Renewal'
    }
  },
  {
    id: 'cancel',
    title: 'Subscription Cancellation',
    subtitle: 'Roach Motel Gauntlet vs. 1-Click Click-to-Cancel',
    category: 'Roach Motel',
    deceptiveExplanation: [
      '1-click electronic sign-up with Apple Pay.',
      'Cancellation forces user through 4 survey screens and requires a phone call during business hours.',
      'Designed to induce fatigue and trigger accidental subscription renewal.'
    ],
    ethicalExplanation: [
      'Click-to-Cancel: Cancellation is as simple as signing up.',
      'Single confirmation step with immediate timestamped receipt.',
      'No mandatory phone calls or retention interrogation.'
    ],
    deceptiveState: {
      badge: 'Predatory Obstruction (FTC Click-to-Cancel Breach)',
      headline: 'Cancel Your Digital Stream Membership',
      sub: 'Step 1 of 5: Retention Survey',
      priceBox: [
        { label: 'Current Active Billing Rate', amount: '$19.99 / month' }
      ],
      interactiveElement: {
        type: 'cancel',
        label: 'To finalize cancellation, you must call 1-800-555-0199 between 9:00 AM - 11:00 AM EST (Mon-Fri).',
        subtext: 'Electronic cancellation is not permitted per section 14.2 of terms of service.'
      },
      confirmshameText: '"Surrendering your membership will permanently delete your stored playlists and history"',
      ctaButton: 'Keep My Membership & Save 10%'
    },
    ethicalState: {
      badge: 'Ethical Standard (FTC Click-to-Cancel Compliant)',
      headline: 'Manage Your Digital Stream Membership',
      sub: 'Instant digital cancellation',
      priceBox: [
        { label: 'Current Plan', amount: '$19.99 / month' },
        { label: 'Status If Cancelled', amount: 'Access continues until Oct 14, 2026' }
      ],
      interactiveElement: {
        type: 'cancel',
        label: 'You can cancel immediately online without talking to an agent.',
        subtext: 'Your account will simply not renew on your next billing cycle.'
      },
      ctaButton: 'Confirm Immediate Cancellation'
    }
  }
];

export const DeceptionLabView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('airline');
  const [isEthicalMode, setIsEthicalMode] = useState<boolean>(false);

  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];
  const activeContent = isEthicalMode ? activeCase.ethicalState : activeCase.deceptiveState;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-950 p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Interactive UX Forensic Lab</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Deception Lab: Before vs. After Ethical UX
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare predatory deceptive patterns side-by-side with transparent, FTC-compliant web design. Toggle between predatory tricks and honest standards to see how corporations manipulate visual hierarchy.
          </p>
        </div>

        {/* Case selector pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CASE_STUDIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedCaseId === c.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>{c.title}</span>
              <span className="block text-[10px] opacity-75 font-normal">{c.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div>
          <span className="text-xs font-mono uppercase text-slate-400">Current Architectural Mode:</span>
          <div className="flex items-center gap-2 mt-0.5">
            {isEthicalMode ? (
              <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Ethical Transparent Standard (FTC Compliant)
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-bold text-red-400">
                <ShieldAlert className="h-4 w-4" />
                Predatory Dark Pattern (Deceptive Layout)
              </span>
            )}
          </div>
        </div>

        {/* Big Toggle Control */}
        <div className="flex items-center gap-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsEthicalMode(false)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              !isEthicalMode
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <XCircle className="h-3.5 w-3.5" />
            <span>Predatory Trick</span>
          </button>
          <button
            onClick={() => setIsEthicalMode(true)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              isEthicalMode
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Ethical Fix</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Analysis Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive Simulated Screen */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Simulated Web Interface</span>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                isEthicalMode
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-950 text-red-400 border border-red-500/30'
              }`}
            >
              {activeContent.badge}
            </span>
          </div>

          <div
            className={`rounded-2xl border p-6 space-y-4 shadow-xl transition-all ${
              isEthicalMode
                ? 'border-emerald-500/40 bg-slate-950'
                : 'border-red-500/40 bg-slate-950'
            }`}
          >
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">{activeContent.headline}</h3>
              <p className="text-xs text-slate-400">{activeContent.sub}</p>
            </div>

            {/* Price Line Items */}
            <div className="rounded-xl bg-slate-900/80 p-3.5 space-y-2 font-mono text-xs">
              {activeContent.priceBox.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-300">
                  <span className={item.amount.startsWith('+') ? 'text-red-400 font-bold' : ''}>
                    {item.label}
                  </span>
                  <span className={`font-bold ${item.amount.startsWith('+') ? 'text-red-400' : 'text-slate-100'}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Element Checkbox / Box */}
            <div
              className={`rounded-xl border p-4 space-y-2 text-xs ${
                isEthicalMode
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                  : 'border-red-500/30 bg-red-950/20 text-red-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={activeContent.interactiveElement.prechecked}
                  readOnly
                  className="mt-0.5 h-4 w-4 rounded"
                />
                <div>
                  <span className="font-bold text-slate-100 text-xs">
                    {activeContent.interactiveElement.label}
                  </span>
                  {activeContent.interactiveElement.subtext && (
                    <p
                      className={`mt-1 text-[11px] leading-relaxed ${
                        isEthicalMode ? 'text-slate-300' : 'text-slate-500 italic'
                      }`}
                    >
                      {activeContent.interactiveElement.subtext}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Confirmshaming text if in deceptive mode */}
            {activeContent.confirmshameText && (
              <div className="rounded-lg bg-slate-900/60 p-2.5 text-center">
                <p className="text-[11px] italic text-slate-500">
                  {activeContent.confirmshameText}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <button
              className={`w-full rounded-xl py-3 text-xs font-bold text-white shadow-lg transition-all ${
                isEthicalMode
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {activeContent.ctaButton}
            </button>
          </div>
        </div>

        {/* Right: Forensic Breakdown & Legal Citation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Forensic & Regulatory Analysis
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div>
              <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-amber-400" />
                <span>What makes this {isEthicalMode ? 'compliant' : 'deceptive'}?</span>
              </h4>

              <ul className="mt-3 space-y-2.5">
                {(isEthicalMode ? activeCase.ethicalExplanation : activeCase.deceptiveExplanation).map(
                  (text, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      {isEthicalMode ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                      )}
                      <span>{text}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Relevant Statute */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <Scale className="h-4 w-4" />
                <span>Applicable Regulatory Standard:</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                {activeCase.id === 'airline'
                  ? 'DOT 14 CFR § 399.84 (Full Fare Advertising) & FTC Act Section 5'
                  : activeCase.id === 'trial'
                  ? 'Restore Online Shoppers Confidence Act (ROSCA) 15 U.S.C. § 8403'
                  : 'FTC Click-to-Cancel Mandate (16 CFR Part 425) & Cal. Bus. & Prof. Code § 17602'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
