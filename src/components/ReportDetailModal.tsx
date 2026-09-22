import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Scale,
  Copy,
  CheckCircle2,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Users,
  FileText
} from 'lucide-react';
import { CommunityReport } from '../types';

interface ReportDetailModalProps {
  report: CommunityReport | null;
  onClose: () => void;
  onVote: (id: string, type: 'up' | 'down' | 'confirm') => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  onVote,
}) => {
  const [copiedDraft, setCopiedDraft] = useState(false);

  if (!report) return null;

  const copyFtcDraft = () => {
    if (report.auditDetails?.ftcComplaintDraft) {
      navigator.clipboard.writeText(report.auditDetails.ftcComplaintDraft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                {report.categoryLabel}
              </span>
              <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-300">
                {report.platformType}
              </span>
              <span className="text-xs text-slate-400">Reported {report.reportedAt}</span>
            </div>

            <h2 className="font-display text-2xl font-black text-white">
              {report.companyName}
            </h2>

            <a
              href={`https://${report.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 hover:underline"
            >
              <span>{report.domain}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-[10px] font-mono text-slate-400">DECEPTION SCORE</span>
              <span className="font-display text-2xl font-black text-red-400">
                {report.deceptionScore}
                <span className="text-xs text-slate-400 font-normal"> / 100</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-amber-200">{report.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* Sneaky Toll Metric */}
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 flex items-center justify-between font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">DOCUMENTED HIDDEN SURCHARGE</span>
            <span className="text-lg font-bold text-red-300">{report.estimatedFee}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[11px]">ESTIMATED ANNUAL DRAIN</span>
            <span className="text-lg font-bold text-amber-300">
              ${report.auditDetails?.totalEstimatedAnnualToll || 120} / yr / user
            </span>
          </div>
        </div>

        {/* Detected Violations */}
        {report.auditDetails?.violations && report.auditDetails.violations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span>Deceptive Violations Breakdown</span>
            </h4>

            <div className="space-y-3">
              {report.auditDetails.violations.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-100">{v.title}</span>
                    <span className="font-mono text-red-400">{v.estimatedHiddenCost}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{v.description}</p>
                  <div className="rounded-lg bg-slate-900/80 p-2.5 space-y-1 text-[11px] font-mono text-slate-300">
                    <div><strong className="text-amber-400">Technique:</strong> {v.manipulativeTechnique}</div>
                    <div><strong className="text-cyan-400">Location:</strong> {v.detectedLocation}</div>
                    <div><strong className="text-purple-400">Statute:</strong> {v.legalPrecedent}</div>
                  </div>
                  <div className="flex items-start gap-1.5 text-emerald-300 text-xs pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                    <span><strong>Defense Remedy:</strong> {v.consumerRemedy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FTC Complaint Draft */}
        {report.auditDetails?.ftcComplaintDraft && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-cyan-400" />
                <span>Pre-Formatted Regulatory / FTC Complaint Draft</span>
              </span>
              <button
                onClick={copyFtcDraft}
                className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 transition-colors"
              >
                <Copy className="h-3 w-3" />
                <span>{copiedDraft ? 'Copied!' : 'Copy Complaint'}</span>
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[10px] text-slate-400 leading-relaxed">
              {report.auditDetails.ftcComplaintDraft}
            </div>
          </div>
        )}

        {/* Footer Actions & Voting */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVote(report.id, 'up')}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                report.userVote === 'up'
                  ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{report.upvotes}</span>
            </button>

            <button
              onClick={() => onVote(report.id, 'down')}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${
                report.userVote === 'down'
                  ? 'border-red-500 bg-red-950/60 text-red-300'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => onVote(report.id, 'confirm')}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                report.hasUserConfirmed
                  ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Users className="h-3.5 w-3.5 text-amber-400" />
              <span>{report.hasUserConfirmed ? 'Confirmed' : 'I was tricked too'} ({report.confirmedCount})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
