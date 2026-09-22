import React, { useState, useRef } from 'react';
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

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setScreenshotData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !domain.trim() || !title.trim()) return;

    setIsSubmitting(true);

    const reportData: Partial<CommunityReport> = {
      companyName: companyName.trim(),
      domain: domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
      platformType,
      primaryCategory,
      estimatedFee: estimatedFee || '$0',
      title: title.trim(),
      description: description.trim() || 'Deceptive dark pattern layout reported by consumer.',
      screenshotUrl: screenshotData || undefined,
      deceptionScore: Math.floor(Math.random() * 15) + 82 // realistic 82-97 range
    };

    onSubmit(reportData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Report Deceptive Website or Layout
              </h2>
              <p className="text-xs text-slate-400">
                Maintain public transparency by cataloging deceptive checkout traps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company / Brand Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. AeroJet Express, MegaTix"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Website Domain *</label>
              <input
                type="text"
                required
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. aerojet-flights.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Sector / Platform</label>
              <select
                value={platformType}
                onChange={(e: any) => setPlatformType(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-amber-400 focus:outline-none"
              >
                <option value="E-Commerce">E-Commerce</option>
                <option value="Subscription / SaaS">Subscription / SaaS</option>
                <option value="Travel & Airlines">Travel & Airlines</option>
                <option value="Ticketing & Events">Ticketing & Events</option>
                <option value="Gaming & Apps">Gaming & Apps</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Dark Pattern Tactic *</label>
              <select
                value={primaryCategory}
                onChange={(e: any) => setPrimaryCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 focus:border-amber-400 focus:outline-none"
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
              <label className="block font-semibold text-slate-300 mb-1">Report Headline *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pre-checked $34.50 travel protection inserted in cart"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Estimated Hidden Fee</label>
              <input
                type="text"
                value={estimatedFee}
                onChange={(e) => setEstimatedFee(e.target.value)}
                placeholder="e.g. $34.50 / booking"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Detailed Description & Deceptive Layout Mechanism *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe where the sneaky box was located, what microprint text said, or what barriers occurred when attempting to cancel..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Screenshot upload */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Attach Screenshot Evidence (Optional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-4 hover:border-slate-500 transition-colors"
            >
              <input
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
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 hover:brightness-110 active:scale-95"
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
