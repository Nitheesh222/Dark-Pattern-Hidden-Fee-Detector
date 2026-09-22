import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  UploadCloud,
  FileCheck,
  CheckCircle,
  Sparkles,
  Trash2
} from 'lucide-react';
import { CommunityReport, DarkPatternCategory } from '../types';
import { DARK_PATTERN_CATEGORIES } from '../data/categories';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: Partial<CommunityReport>) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [domain, setDomain] = useState('');
  const [platformType, setPlatformType] = useState<CommunityReport['platformType']>('E-Commerce');
  const [primaryCategory, setPrimaryCategory] = useState<DarkPatternCategory>('sneak_into_basket');
  const [estimatedFee, setEstimatedFee] = useState('$29.99');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap: keep focus inside modal while open
  useEffect(() => {
    if (!isOpen) return;
    // Move focus into modal when opened
    firstFocusableRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File too large. Maximum size is 15 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setScreenshotData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !domain.trim() || !title.trim()) return;

    setIsSubmitting(true);

    // Sanitize domain: strip protocol and path
    const sanitizedDomain = domain.trim()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .slice(0, 253); // max domain length

    const reportData: Partial<CommunityReport> = {
      companyName: companyName.trim().slice(0, 100),
      domain: sanitizedDomain,
      platformType,
      primaryCategory,
      estimatedFee: estimatedFee || '$0',
      title: title.trim().slice(0, 200),
      description: description.trim().slice(0, 2000) || 'Deceptive dark pattern layout reported by consumer.',
      screenshotUrl: screenshotData || undefined,
      deceptionScore: Math.floor(Math.random() * 15) + 82 // realistic 82-97 range
    };

    onSubmit(reportData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      aria-modal="true"
      role="dialog"
      aria-labelledby="report-modal-title"
      onClick={(e) => {
        // Close when clicking backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 id="report-modal-title" className="font-display text-lg font-bold text-white">
                Report Deceptive Website or Layout
              </h2>
              <p className="text-xs text-slate-400">
                Maintain public transparency by cataloging deceptive checkout traps
              </p>
            </div>
          </div>

          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Close report modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="report-company-name" className="block font-semibold text-slate-300 mb-1">
                Company / Brand Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="report-company-name"
                type="text"
                required
                maxLength={100}
                autoComplete="off"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. AeroJet Express, MegaTix"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label htmlFor="report-domain" className="block font-semibold text-slate-300 mb-1">
                Website Domain <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="report-domain"
                type="text"
                required
                maxLength={253}
                autoComplete="off"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. aerojet-flights.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="report-platform" className="block font-semibold text-slate-300 mb-1">
                Sector / Platform
              </label>
              <select
                id="report-platform"
                value={platformType}
                onChange={(e: any) => setPlatformType(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option value="E-Commerce">E-Commerce</option>
                <option value="Subscription / SaaS">Subscription / SaaS</option>
                <option value="Travel &amp; Airlines">Travel &amp; Airlines</option>
                <option value="Ticketing &amp; Events">Ticketing &amp; Events</option>
                <option value="Gaming &amp; Apps">Gaming &amp; Apps</option>
              </select>
            </div>

            <div>
              <label htmlFor="report-category" className="block font-semibold text-slate-300 mb-1">
                Primary Dark Pattern Tactic <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <select
                id="report-category"
                value={primaryCategory}
                onChange={(e: any) => setPrimaryCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {DARK_PATTERN_CATEGORIES.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="report-title" className="block font-semibold text-slate-300 mb-1">
                Report Headline <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="report-title"
                type="text"
                required
                maxLength={200}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pre-checked $34.50 travel protection inserted in cart"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label htmlFor="report-fee" className="block font-semibold text-slate-300 mb-1">
                Estimated Hidden Fee
              </label>
              <input
                id="report-fee"
                type="text"
                maxLength={50}
                value={estimatedFee}
                onChange={(e) => setEstimatedFee(e.target.value)}
                placeholder="e.g. $34.50 / booking"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="report-description" className="block font-semibold text-slate-300 mb-1">
              Detailed Description &amp; Deceptive Layout Mechanism <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <textarea
              id="report-description"
              required
              rows={3}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe where the sneaky box was located, what microprint text said, or what barriers occurred when attempting to cancel..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Screenshot upload */}
          <div>
            <label htmlFor="report-screenshot" className="block font-semibold text-slate-300 mb-1">
              Attach Screenshot Evidence (Optional)
            </label>
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload screenshot evidence. Press Enter or Space to browse."
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <input
                id="report-screenshot"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {screenshotData ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <FileCheck className="h-4 w-4" />
                  <span>Evidence image attached</span>
                  <button
                    type="button"
                    aria-label="Remove attached screenshot"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScreenshotData(null);
                    }}
                    className="ml-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400">
                  <UploadCloud className="h-4 w-4 text-amber-400" />
                  <span>Click to attach screenshot evidence</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Submit to Community Hall of Shame</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
