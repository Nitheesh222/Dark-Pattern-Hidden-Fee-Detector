import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Copy,
  FileCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';

export const SubscriptionLeakCalculator: React.FC = () => {
  const [forgottenTrials, setForgottenTrials] = useState<number>(2); // count
  const [trialAvgMonthly, setTrialAvgMonthly] = useState<number>(14.99); // $
  const [precheckAddonsPerYear, setPrecheckAddonsPerYear] = useState<number>(4); // count
  const [addonAvgFee, setAddonAvgFee] = useState<number>(29.50); // $
  const [dripFeeCount, setDripFeeCount] = useState<number>(5); // count
  const [dripAvgFee, setDripAvgFee] = useState<number>(22.00); // $
  const [roachMotelDelayMonths, setRoachMotelDelayMonths] = useState<number>(3); // months of delayed cancel
  const [roachSubMonthly, setRoachSubMonthly] = useState<number>(19.99); // $

  const [copiedLetter, setCopiedLetter] = useState(false);

  // Calculations
  const trialsAnnualLoss = forgottenTrials * trialAvgMonthly * 6; // active for ~6 months before noticed
  const precheckAnnualLoss = precheckAddonsPerYear * addonAvgFee;
  const dripAnnualLoss = dripFeeCount * dripAvgFee;
  const roachMotelAnnualLoss = roachMotelDelayMonths * roachSubMonthly;

  const totalAnnualDrain = trialsAnnualLoss + precheckAnnualLoss + dripAnnualLoss + roachMotelAnnualLoss;
  const fiveYearProjection = totalAnnualDrain * 5;

  const disputeLetter = `TO: Credit Card Billing Dispute Department / Issuing Bank
RE: Formal Notice of Dispute for Deceptive Negative Option Charges & Unauthorized Recurring Billing

Account Holder: [Your Name]
Account Number: [Card Last 4 Digits]
Merchant Name: [Vendor Name]
Date of Unauthorized Charges: [Dates]
Amount Disputed: $[Amount]

Dear Dispute Resolution Specialist,

I am writing under the Fair Credit Billing Act (FCBA), 15 U.S.C. § 1666, and Consumer Financial Protection Bureau (CFPB) Regulation E to formally dispute unauthorized recurring transactions debited by the merchant noted above.

The transaction resulted from unlawful "Dark Pattern" architecture and negative option billing without affirmative prior consent, in violation of:
1. Restore Online Shoppers' Confidence Act (ROSCA), 15 U.S.C. § 8403.
2. FTC Click-to-Cancel Mandate prohibiting obstructionist cancellation barriers.

The merchant failed to disclose recurring terms in a clear and conspicuous manner, obfuscated pricing disclaimers in low-contrast microprint, and blocked electronic cancellation. I request an immediate reversal and provisional credit for these unauthorized transactions, as well as a revocation of merchant recurring pre-authorization.

Sincerely,
[Your Name]
[Date]`;

  const copyDisputeLetter = () => {
    navigator.clipboard.writeText(disputeLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-950 p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <Calculator className="h-3.5 w-3.5 text-amber-400" />
            <span>Hidden Fee & Subscription Leak Audit</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Consumer Deception Toll Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            E-commerce sites and apps count on passive churn and cognitive fatigue. Calculate how much sneaky pre-checked boxes, negative option renewals, and drip surcharges silently cost you each year.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Inputs */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-5 backdrop-blur-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Personal Exposure Estimates
            </h2>

            {/* Forgotten Trials */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  1. Hidden Subscriptions & Forgotten $1/Free Trials
                </span>
                <span className="font-mono font-bold text-amber-400">
                  ${trialsAnnualLoss.toFixed(2)} / yr
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Services entered on a trial that secretly renewed into recurring monthly billing.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] text-slate-400">Trials per year:</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={forgottenTrials}
                    onChange={(e) => setForgottenTrials(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Avg Monthly Charge ($):</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={trialAvgMonthly}
                    onChange={(e) => setTrialAvgMonthly(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Sneak into basket */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  2. Sneak-in-Basket Add-Ons (Insurance, Protection, Warranties)
                </span>
                <span className="font-mono font-bold text-amber-400">
                  ${precheckAnnualLoss.toFixed(2)} / yr
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Airlines, electronics, or delivery pre-ticked add-ons you didn't notice before clicking pay.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] text-slate-400">Orders per year with pre-checks:</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={precheckAddonsPerYear}
                    onChange={(e) => setPrecheckAddonsPerYear(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Avg Add-On Price ($):</label>
                  <input
                    type="number"
                    min="0"
                    value={addonAvgFee}
                    onChange={(e) => setAddonAvgFee(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Drip pricing */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  3. Drip Pricing Surcharges (Concert, Hotel & Food Delivery Fees)
                </span>
                <span className="font-mono font-bold text-amber-400">
                  ${dripAnnualLoss.toFixed(2)} / yr
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Surprise convenience, service, or resort fees revealed only after selecting seats or entering cards.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] text-slate-400">Bookings / Orders per year:</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={dripFeeCount}
                    onChange={(e) => setDripFeeCount(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Avg Surprise Surcharge ($):</label>
                  <input
                    type="number"
                    min="0"
                    value={dripAvgFee}
                    onChange={(e) => setDripAvgFee(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Roach motel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">
                  4. Roach Motel Cancellation Friction (Gyms, Cable, Software)
                </span>
                <span className="font-mono font-bold text-amber-400">
                  ${roachMotelAnnualLoss.toFixed(2)} / yr
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Unwanted months paid simply because cancelling required calling a retention phone number or navigating a labyrinth.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] text-slate-400">Extra months billed due to friction:</label>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    value={roachMotelDelayMonths}
                    onChange={(e) => setRoachMotelDelayMonths(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Monthly Membership Cost ($):</label>
                  <input
                    type="number"
                    min="0"
                    value={roachSubMonthly}
                    onChange={(e) => setRoachSubMonthly(Number(e.target.value) || 0)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Dispute Letter */}
        <div className="space-y-4 lg:col-span-5 flex flex-col justify-between">
          {/* Toll Card */}
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 p-6 space-y-4 shadow-xl">
            <span className="text-[11px] font-mono uppercase text-red-400 font-bold block">
              Estimated Silent Annual Toll
            </span>
            <div className="font-display text-4xl sm:text-5xl font-black text-white">
              ${totalAnnualDrain.toFixed(2)}
              <span className="text-sm font-mono text-slate-400 font-normal"> / year</span>
            </div>

            <div className="rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>5-Year Cumulative Drain:</span>
                <span className="font-bold text-red-400">${fiveYearProjection.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>National Consumer Average:</span>
                <span>$324.00 / yr</span>
              </div>
            </div>
          </div>

          {/* Chargeback & Dispute Letter */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Bank Dispute / Chargeback Template</span>
              </div>
              <button
                onClick={copyDisputeLetter}
                className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 transition-colors"
              >
                <Copy className="h-3 w-3" />
                <span>{copiedLetter ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Send this citation of ROSCA and the FTC Click-to-Cancel rule to your credit card company or PayPal to reverse unfair recurring charges.
            </p>
            <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] text-slate-400 leading-relaxed">
              {disputeLetter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
