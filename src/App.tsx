import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DetectorView } from './components/DetectorView';
import { HallOfShameView } from './components/HallOfShameView';
import { DeceptionLabView } from './components/DeceptionLabView';
import { SubscriptionLeakCalculator } from './components/SubscriptionLeakCalculator';
import { ReportModal } from './components/ReportModal';
import { ReportDetailModal } from './components/ReportDetailModal';
import { CommunityReport, AuditResult } from './types';
import { INITIAL_COMMUNITY_REPORTS } from './data/sampleReports';
import { ShieldCheck, Scale, AlertOctagon, HeartHandshake, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'hall-of-shame' | 'deception-lab' | 'calculator'>('scanner');
  const [reports, setReports] = useState<CommunityReport[]>(() => {
    try {
      const saved = localStorage.getItem('deceptiwatch_reports');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    return INITIAL_COMMUNITY_REPORTS;
  });

  const [selectedReport, setSelectedReport] = useState<CommunityReport | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Sync to server and localStorage
  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReports(data);
        }
      })
      .catch((err) => console.log('Using local reports baseline:', err));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('deceptiwatch_reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save reports to localStorage:', e);
    }
  }, [reports]);

  const handleVote = async (id: string, type: 'up' | 'down' | 'confirm') => {
    // Optimistic local update
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (type === 'up') {
            const isCurrentlyUp = r.userVote === 'up';
            return {
              ...r,
              upvotes: isCurrentlyUp ? r.upvotes - 1 : r.upvotes + 1,
              downvotes: r.userVote === 'down' ? r.downvotes - 1 : r.downvotes,
              userVote: isCurrentlyUp ? null : 'up'
            };
          } else if (type === 'down') {
            const isCurrentlyDown = r.userVote === 'down';
            return {
              ...r,
              downvotes: isCurrentlyDown ? r.downvotes - 1 : r.downvotes + 1,
              upvotes: r.userVote === 'up' ? r.upvotes - 1 : r.upvotes,
              userVote: isCurrentlyDown ? null : 'down'
            };
          } else if (type === 'confirm') {
            return {
              ...r,
              confirmedCount: r.hasUserConfirmed ? r.confirmedCount - 1 : r.confirmedCount + 1,
              hasUserConfirmed: !r.hasUserConfirmed
            };
          }
        }
        return r;
      })
    );

    // Call server
    try {
      await fetch(`/api/reports/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
    } catch (e) {
      console.error('Vote failed on server:', e);
    }
  };

  const handleSubmitReport = async (reportData: Partial<CommunityReport>) => {
    const tempReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      companyName: reportData.companyName || 'Flagged Site',
      domain: reportData.domain || 'unknown-domain.com',
      platformType: reportData.platformType || 'E-Commerce',
      screenshotUrl: reportData.screenshotUrl,
      title: reportData.title || 'Deceptive Web Layout Reported',
      description: reportData.description || 'Consumer-submitted dark pattern complaint.',
      primaryCategory: reportData.primaryCategory || 'sneak_into_basket',
      categoryLabel: reportData.categoryLabel || 'Deceptive Layout',
      deceptionScore: reportData.deceptionScore || 88,
      estimatedFee: reportData.estimatedFee || '$25.00 est.',
      upvotes: 1,
      downvotes: 0,
      confirmedCount: 1,
      hasUserConfirmed: true,
      status: 'community_flagged',
      reportedAt: 'Just now',
      auditDetails: reportData.auditDetails || {
        deceptionScore: reportData.deceptionScore || 88,
        riskLevel: 'high',
        summary: reportData.description || 'Reported dark pattern.',
        siteNameOrUrl: reportData.domain || 'Reported Site',
        violations: [],
        totalEstimatedAnnualToll: 120,
        ftcComplaintDraft: `CONSUMER REPORT: ${reportData.companyName} deploys deceptive dark patterns.`,
        consumerDefenseChecklist: ['Verify line-item pricing before purchase'],
        timestamp: new Date().toISOString()
      }
    };

    setReports((prev) => [tempReport, ...prev]);

    // Send to backend
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      if (res.ok) {
        const saved = await res.json();
        setReports((prev) => [saved, ...prev.filter((r) => r.id !== tempReport.id)]);
      }
    } catch (e) {
      console.error('Failed to submit report to backend:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        reportsCount={reports.length}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'scanner' && (
          <DetectorView
            onScanCompleted={(audit) => {
              console.log('Audit completed:', audit.deceptionScore);
            }}
            onSubmitToHallOfShame={(newReport) => {
              handleSubmitReport(newReport);
              setActiveTab('hall-of-shame');
            }}
          />
        )}

        {activeTab === 'hall-of-shame' && (
          <HallOfShameView
            reports={reports}
            onVote={handleVote}
            onSelectReport={(r) => setSelectedReport(r)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'deception-lab' && <DeceptionLabView />}

        {activeTab === 'calculator' && <SubscriptionLeakCalculator />}
      </main>

      {/* Modals */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleSubmitReport}
      />

      <ReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        onVote={handleVote}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-sm">
                Decepti<span className="text-amber-400">Watch</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Cyber-Safety Dark Pattern & Hidden Fee Detector</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400">
                <Scale className="h-3.5 w-3.5" />
                <span>FTC Act Sec 5 & ROSCA Compliant</span>
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>EU DSA Article 25 Standard</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <HeartHandshake className="h-3.5 w-3.5" />
                <span>100% Free Public Watchdog</span>
              </span>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
            <p>
              Designed for the Gen AI Club Hackathon. Empowering consumers to detect deceptive checkout mechanics, sneaky pre-ticked add-ons, and hidden recurring fees using Gemini 3.8 Flash.
            </p>
            <p className="font-mono text-slate-600 shrink-0">
              DeceptiWatch Community Index v2.6
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
