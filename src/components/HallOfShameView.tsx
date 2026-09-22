import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  FileText,
  DollarSign,
  Users,
  Flame,
  Scale
} from 'lucide-react';
import { CommunityReport, DarkPatternCategory } from '../types';
import { DARK_PATTERN_CATEGORIES } from '../data/categories';

interface HallOfShameViewProps {
  reports: CommunityReport[];
  onVote: (id: string, type: 'up' | 'down' | 'confirm') => void;
  onSelectReport: (report: CommunityReport) => void;
  onOpenReportModal: () => void;
}

export const HallOfShameView: React.FC<HallOfShameViewProps> = ({
  reports,
  onVote,
  onSelectReport,
  onOpenReportModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'score' | 'newest' | 'fee'>('votes');

  // Filter logic
  const filteredReports = reports.filter((report) => {
    const matchesCategory = selectedCategory === 'all' || report.primaryCategory === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || report.platformType === selectedPlatform;
    const matchesSearch =
      searchQuery.trim() === '' ||
      report.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPlatform && matchesSearch;
  });

  // Sort logic
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'votes') {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }
    if (sortBy === 'score') {
      return b.deceptionScore - a.deceptionScore;
    }
    if (sortBy === 'fee') {
      return (b.auditDetails?.totalEstimatedAnnualToll || 0) - (a.auditDetails?.totalEstimatedAnnualToll || 0);
    }
    return b.id.localeCompare(a.id); // newest by id
  });

  return (
    <div className="space-y-6">
      {/* Index Headline & Overview Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
              <Flame className="h-3.5 w-3.5 text-red-400" />
              <span>Community-Voted Unethical Layout Registry</span>
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              The Consumer Hall of Shame & Deception Index
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-300">
              Crowdsourced registry of deceptive web layouts, covert negative option subscriptions, and drip pricing traps. Vote to prioritize enforcement targets and warn fellow consumers.
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Submit New Deceptive Site</span>
          </button>
        </div>

        {/* Global Registry Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-800/80 pt-4 font-mono text-xs">
          <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">ACTIVE SUBMISSIONS</span>
            <span className="text-lg font-bold text-white">{reports.length} Verified</span>
          </div>
          <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">AVG DECEPTION INDEX</span>
            <span className="text-lg font-bold text-red-400">89.4 / 100</span>
          </div>
          <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">COMMUNITY WITNESSES</span>
            <span className="text-lg font-bold text-amber-400">
              {reports.reduce((acc, r) => acc + r.confirmedCount, 0).toLocaleString()}
            </span>
          </div>
          <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
            <span className="text-slate-400 block text-[11px]">AVG SNEAKY TOLL</span>
            <span className="text-lg font-bold text-emerald-400">$189 / yr / user</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm space-y-4">
        {/* Search & Sort Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, website domain, or dark pattern tactic..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="votes">Most Community Upvotes</option>
              <option value="score">Highest Deception Score</option>
              <option value="fee">Highest Financial Toll</option>
              <option value="newest">Recently Reported</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Patterns ({reports.length})
          </button>
          {DARK_PATTERN_CATEGORIES.map((cat) => {
            const count = reports.filter((r) => r.primaryCategory === cat.key).length;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Reports Directory Grid */}
      <div className="space-y-4">
        {sortedReports.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
            <ShieldAlert className="mx-auto h-12 w-12 text-slate-600" />
            <h3 className="text-base font-bold text-slate-300">No matching reports found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or pattern category filters, or be the first to submit this deceptive website!
            </p>
          </div>
        ) : (
          sortedReports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-slate-700 transition-all space-y-4"
            >
              {/* Card Header: Company, Domain, Score, Tag */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold text-white hover:text-amber-400 transition-colors cursor-pointer" onClick={() => onSelectReport(report)}>
                      {report.companyName}
                    </h3>
                    <a
                      href={`https://${report.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-slate-400 hover:text-slate-200"
                    >
                      <span>{report.domain}</span>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </a>
                    <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                      {report.platformType}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-amber-200">
                    {report.title}
                  </h4>
                </div>

                {/* Deception Score Pill */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400">DECEPTION INDEX</div>
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="font-display text-xl font-black text-red-400">
                        {report.deceptionScore}
                      </span>
                      <span className="rounded bg-red-950/80 border border-red-500/30 px-1.5 py-0.5 text-[10px] font-bold text-red-300">
                        {report.deceptionScore >= 90 ? 'CRITICAL' : 'HIGH'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Manipulative Technique */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {report.description}
              </p>

              {/* Pattern Badge & Sneaky Toll */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                    {report.categoryLabel}
                  </span>

                  <span className="rounded-lg border border-rose-500/30 bg-rose-950/40 px-2.5 py-1 text-xs font-mono font-bold text-rose-300">
                    Hidden Toll: {report.estimatedFee}
                  </span>
                </div>

                {/* Community Voting & Witness Actions */}
                <div className="flex items-center gap-2">
                  {/* Upvote button */}
                  <button
                    onClick={() => onVote(report.id, 'up')}
                    aria-label={`Upvote report for ${report.companyName}, current upvotes: ${report.upvotes}`}
                    aria-pressed={report.userVote === 'up'}
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{report.upvotes}</span>
                  </button>

                  {/* Downvote button */}
                  <button
                    onClick={() => onVote(report.id, 'down')}
                    aria-label={`Downvote report for ${report.companyName}, current downvotes: ${report.downvotes}`}
                    aria-pressed={report.userVote === 'down'}
                    className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                      report.userVote === 'down'
                        ? 'border-red-500 bg-red-950/60 text-red-300 ring-1 ring-red-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>

                  {/* Confirm Deceptive Witness */}
                  <button
                    onClick={() => onVote(report.id, 'confirm')}
                    aria-label={`Confirm you were also tricked by ${report.companyName}. ${report.confirmedCount} people confirmed.`}
                    aria-pressed={report.hasUserConfirmed}
                    <Users className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">
                      {report.hasUserConfirmed ? 'Witnessed' : 'I was tricked too'}
                    </span>
                    <span className="font-bold">({report.confirmedCount})</span>
                  </button>

                  {/* Full Dossier View */}
                  <button
                    onClick={() => onSelectReport(report)}
                    aria-label={`Inspect full dossier for ${report.companyName}`}
                    className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Inspect Dossier</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
