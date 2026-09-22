import React from 'react';
import { ShieldAlert, Sparkles, PlusCircle, AlertTriangle, Scale, Flame, Calculator, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'hall-of-shame' | 'deception-lab' | 'calculator';
  setActiveTab: (tab: 'scanner' | 'hall-of-shame' | 'deception-lab' | 'calculator') => void;
  onOpenReportModal: () => void;
  reportsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  reportsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      {/* Top Cyber-Safety Ticker */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-950/40 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            <span className="font-semibold text-red-400">CYBER-SAFETY CONSUMER WATCHDOG:</span>
            <span className="text-slate-400">Monitoring E-Commerce Deception, Sneaky Pre-Checks & Hidden Subscriptions</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-bold text-slate-200">{reportsCount}</span> Deceptive Layouts Indexed
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-cyan-400" />
              <span>FTC & ROSCA Compliant Audit Engine</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
              <Sparkles className="h-3 w-3" />
              <span>Gemini 3.8 Flash Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-red-600 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/30">
            <ShieldAlert className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Decepti<span className="text-amber-400">Watch</span>
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                v2.6 Live
              </span>
            </div>
            <p className="hidden text-xs text-slate-400 sm:block">
              Dark Pattern & Hidden Fee Forensic Portal
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1" aria-label="Main navigation">
          <button
            id="nav-scanner-btn"
            aria-current={activeTab === 'scanner' ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Detector</span>
          </button>

          <button
            id="nav-hall-of-shame-btn"
            aria-current={activeTab === 'hall-of-shame' ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'hall-of-shame'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
            <span>Hall of Shame</span>
            <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
              {reportsCount}
            </span>
          </button>

          <button
            id="nav-deception-lab-btn"
            aria-current={activeTab === 'deception-lab' ? 'page' : undefined}
            className={`hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'deception-lab'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Before & After Lab</span>
          </button>

          <button
            id="nav-calculator-btn"
            aria-current={activeTab === 'calculator' ? 'page' : undefined}
            className={`hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Fee Calculator</span>
          </button>
        </nav>

        {/* Action Button: Report Deceptive Layout */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Report a deceptive website"
            id="report-deceptive-site-btn"
            onClick={onOpenReportModal}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:brightness-110 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Report Deceptive Site</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
