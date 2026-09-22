import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Sparkles,
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Copy,
  FileText,
  DollarSign,
  HelpCircle,
  Share2,
  Eye,
  Trash2,
  RefreshCw,
  Search,
  FileCheck
} from 'lucide-react';
import { AuditResult, CommunityReport } from '../types';
import { INTERACTIVE_MOCKUPS, InteractiveMockup } from '../data/interactiveMockups';

interface DetectorViewProps {
  onScanCompleted: (audit: AuditResult, sample?: InteractiveMockup) => void;
  onSubmitToHallOfShame: (reportData: Partial<CommunityReport>) => void;
}

export const DetectorView: React.FC<DetectorViewProps> = ({
  onScanCompleted,
  onSubmitToHallOfShame,
}) => {
  const [siteUrl, setSiteUrl] = useState('');
  const [contextNotes, setContextNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [activeSample, setActiveSample] = useState<InteractiveMockup | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [publishedFeedback, setPublishedFeedback] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanningSteps = [
    'Parsing optical document layout & element coordinates...',
    'Inspecting negative option contracts & auto-renewal triggers...',
    'Auditing visual hierarchy, contrast ratios & micro-typography...',
    'Evaluating compliance against FTC Act Sec 5 & ROSCA statutes...',
    'Synthesizing consumer defense protocol and deception score...'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setFileError(null);
    // Enforce 15MB file size limit
    if (file.size > 15 * 1024 * 1024) {
      setFileError('File is too large. Maximum allowed size is 15 MB.');
      return;
    }
    // Verify MIME type is a real image
    if (!file.type.startsWith('image/')) {
      setFileError('Invalid file type. Please upload a PNG, JPG, or WebP image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setSelectedFileName(file.name);
      setActiveSample(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: InteractiveMockup) => {
    setActiveSample(sample);
    setSelectedImage(null);
    setSelectedFileName(null);
    setSiteUrl(`https://${sample.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}-checkout.com`);
    setContextNotes(`Simulated test case for ${sample.name}: ${sample.highlightSummary}`);
  };

  const validateUrl = (url: string): string | null => {
    if (!url.trim()) return null;
    // Block dangerous URI schemes
    const dangerous = /^(javascript|data|vbscript|file):/i;
    if (dangerous.test(url.trim())) {
      return 'Invalid URL. Only http:// and https:// URLs are allowed.';
    }
    return null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSiteUrl(val);
    setUrlError(validateUrl(val));
  };

  const runAudit = async () => {
    // Block if URL is dangerous
    const urlValidationError = validateUrl(siteUrl);
    if (urlValidationError) {
      setUrlError(urlValidationError);
      return;
    }
    setIsScanning(true);
    setAuditResult(null);
    setAuditError(null);
    setPublishedFeedback(false);

    // Simulated progress steps
    const interval = setInterval(() => {
      setScanStepIndex((prev) => (prev < scanningSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: selectedImage ? 'image/png' : undefined,
          siteUrl: siteUrl || (activeSample ? `${activeSample.brand} Checkout` : 'Custom Uploaded Screen'),
          textContext: contextNotes || (activeSample ? activeSample.htmlSnippet : 'Checkout UI Analysis'),
          sampleId: activeSample?.id
        })
      });

      const data: AuditResult = await response.json();
      if (!response.ok) {
        throw new Error((data as any)?.error || `Server error: ${response.status}`);
      }
      setAuditResult(data);
      onScanCompleted(data, activeSample || undefined);
    } catch (err: any) {
      console.error('Audit failed:', err);
      setAuditError(err?.message || 'The audit could not be completed. Please try again.');
    } finally {
      clearInterval(interval);
      setIsScanning(false);
      setScanStepIndex(0);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
      // Graceful fallback: select text from a temporary textarea
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopyFeedback(label);
        setTimeout(() => setCopyFeedback(null), 2500);
      } catch {
        console.error('Clipboard fallback also failed.');
      }
    }
  };

  const handlePublishToHall = () => {
    if (!auditResult) return;
    const company = activeSample?.brand || siteUrl.replace(/https?:\/\//, '').split('/')[0] || 'Flagged Merchant';
    const domain = siteUrl ? siteUrl.replace(/https?:\/\//, '').split('/')[0] : 'reported-checkout.com';

    onSubmitToHallOfShame({
      companyName: company,
      domain: domain,
      platformType: 'E-Commerce',
      title: auditResult.violations[0]?.title || 'Deceptive Web Layout Detected by AI',
      description: auditResult.summary,
      primaryCategory: auditResult.violations[0]?.category || 'sneak_into_basket',
      deceptionScore: auditResult.deceptionScore,
      estimatedFee: auditResult.violations[0]?.estimatedHiddenCost || '$25.00 est.',
      auditDetails: auditResult
    });
    setPublishedFeedback(true);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 sm:p-8">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-16 h-60 w-60 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Multimodal Vision & Cognitive Architecture Auditor</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Detect Deceptive Dark Patterns & Sneaky Hidden Fees
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Upload any checkout screenshot or paste a suspicious subscription URL. Our AI forensic engine scans for pre-ticked add-on boxes, disguised subscriptions, drip pricing, confirmshaming, and calculates your true financial risk.
          </p>

          {/* Quick-Pick Real-World Deception Mockups */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Test with Real-World Deception Cases:</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {INTERACTIVE_MOCKUPS.map((sample) => {
                const isSelected = activeSample?.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    id={`sample-btn-${sample.id}`}
                    onClick={() => handleSelectSample(sample)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold">{sample.brand}</span>
                    <span className="text-[10px] text-slate-400">({sample.category.split('/')[1]?.trim() || sample.category})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Input Stage: Upload or Interactive Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Input Form & Upload Box */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              1. Provide Target Checkout Screen or Evidence
            </h2>

            {/* Drag & Drop File Zone */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload checkout screenshot. Press Enter or Space to browse files, or drag and drop an image here."
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={`mt-3 relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                selectedImage
                  ? 'border-amber-500/60 bg-amber-950/10'
                  : 'border-slate-700/80 bg-slate-950/60 hover:border-amber-500/40 hover:bg-slate-900/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {selectedImage ? (
                <div className="w-full space-y-3">
                  <div className="relative mx-auto max-h-56 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                    <img
                      src={selectedImage}
                      alt="Uploaded checkout screen"
                      className="mx-auto max-h-56 object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                        setSelectedFileName(null);
                      }}
                      aria-label="Remove uploaded image"
                      className="absolute right-2 top-2 rounded-md bg-slate-900/90 p-1.5 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-amber-300">
                    <FileCheck className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono">{selectedFileName || 'Screenshot ready for AI audit'}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-amber-400">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Drop checkout screenshot here, or <span className="text-amber-400 underline underline-offset-2">browse file</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports PNG, JPG, WebP up to 15MB • Captures invoices, cart steps, prechecked toggles
                    </p>
                  </div>
                </div>
              )}
            </div>

              {/* URL & Text Fields */}
              <div className="mt-4 space-y-3">
                {fileError && (
                  <div role="alert" className="rounded-lg border border-red-500/40 bg-red-950/30 px-3 py-2 text-xs font-semibold text-red-300">
                    ⚠️ {fileError}
                  </div>
                )}
                <div>
                  <label htmlFor="site-url-input" className="block text-xs font-semibold text-slate-300 mb-1">
                    Website URL or Merchant Name (Optional)
                  </label>
                  <div className="relative">
                    <input
                      id="site-url-input"
                      type="text"
                      autoComplete="off"
                      value={siteUrl}
                      onChange={handleUrlChange}
                      placeholder="e.g. flyaerosky.com/checkout or getfitpulse.io"
                      aria-invalid={!!urlError}
                      aria-describedby={urlError ? 'url-error-msg' : undefined}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 ${
                        urlError
                          ? 'border-red-500 bg-slate-950 focus:border-red-400 focus:ring-red-400'
                          : 'border-slate-700 bg-slate-950 focus:border-amber-400 focus:ring-amber-400'
                      }`}
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
                  </div>
                  {urlError && (
                    <p id="url-error-msg" role="alert" className="mt-1 text-xs font-semibold text-red-400">
                      {urlError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="context-notes-input" className="block text-xs font-semibold text-slate-300 mb-1">
                  What happened? (Context or suspicious charges noticed)
                </label>
                <textarea
                  id="context-notes-input"
                  rows={2}
                  value={contextNotes}
                  onChange={(e) => setContextNotes(e.target.value)}
                  placeholder="e.g., I thought I was paying $19, but my bank alert showed $59.99 for a quarterly VIP auto-renewal."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Launch AI Audit Action */}
              <div className="mt-5">
                <button
                  id="run-ai-audit-btn"
                  onClick={runAudit}
                  disabled={isScanning || (!selectedImage && !siteUrl && !activeSample) || !!urlError}
                  aria-busy={isScanning}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-lg transition-all ${
                    isScanning || (!selectedImage && !siteUrl && !activeSample) || !!urlError
                      ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                      : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-slate-950 shadow-amber-500/20 hover:brightness-110 active:scale-[0.99]'
                  }`}
                >
                {isScanning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                    <span>Auditing Layout with Gemini 3.8 Flash...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-slate-950" />
                    <span>Scan Layout for Deceptive Patterns</span>
                  </>
                )}
              </button>
              </div>
          </div>
        </div>

        {/* Right Column: Live Simulated UI Screen / Visual Evidence */}
        <div className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Visual Layout Inspector
                </h3>
              </div>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                {activeSample ? 'Sample Simulation' : selectedImage ? 'Custom Screenshot' : 'Awaiting Input'}
              </span>
            </div>

            {/* Visual Canvas */}
            <div className="mt-4 flex-1 flex flex-col justify-center">
              {activeSample ? (
                /* Interactive Render of the Dark Pattern Layout */
                <div className="rounded-xl border border-red-500/40 bg-slate-950 p-4 shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-xs font-bold text-white">{activeSample.visualPreview.headline}</span>
                      <p className="text-[11px] text-slate-400">{activeSample.visualPreview.subheadline}</p>
                    </div>
                    <span className="rounded bg-red-950/80 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/30">
                      Trap Detected
                    </span>
                  </div>

                  {/* Price breakdown */}
                  <div className="rounded-lg bg-slate-900/80 p-3 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Base Advertised:</span>
                      <span className="font-bold text-slate-100">{activeSample.visualPreview.basePrice}</span>
                    </div>
                    <div className="flex justify-between text-red-400 bg-red-950/30 px-1.5 py-0.5 rounded border border-red-500/20">
                      <span>{activeSample.visualPreview.hiddenItem}:</span>
                      <span className="font-bold">{activeSample.visualPreview.hiddenFee}</span>
                    </div>
                  </div>

                  {/* Sneaky Checkbox or Urgency Banner */}
                  <div className="rounded-lg border border-amber-500/40 bg-amber-950/20 p-3 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked
                        readOnly
                        className="mt-0.5 h-4 w-4 rounded border-amber-500 text-amber-500 focus:ring-amber-400"
                      />
                      <span className="text-amber-200 text-xs font-medium">
                        {activeSample.visualPreview.precheckedLabel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic pl-6">
                      {activeSample.visualPreview.sneakyNote}
                    </p>
                  </div>

                  {/* Confirmshaming copy preview */}
                  <div className="rounded bg-slate-900/60 p-2.5 text-center text-xs">
                    <p className="text-slate-500 italic text-[11px]">
                      {activeSample.visualPreview.confirmshameText}
                    </p>
                  </div>

                  {/* Action CTA */}
                  <button className="w-full rounded-lg bg-emerald-600/90 py-2.5 text-xs font-bold text-white shadow">
                    {activeSample.visualPreview.actionButtonText}
                  </button>

                  <div className="flex items-center gap-1.5 rounded-lg bg-blue-950/40 p-2 text-[11px] text-blue-300 border border-blue-500/20">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span><strong>Consumer Remedy:</strong> {activeSample.remedyAction}</span>
                  </div>
                </div>
              ) : selectedImage ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center p-2">
                  <img
                    src={selectedImage}
                    alt="Active target"
                    className="max-h-72 w-full object-contain rounded-lg"
                  />
                  <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-slate-950/90 border border-slate-700 p-2 text-xs text-slate-300 flex items-center justify-between">
                    <span>Uploaded Document</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Ready for Multimodal Vision</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-3">
                  <div className="h-14 w-14 rounded-2xl border border-slate-800 bg-slate-950/60 flex items-center justify-center text-slate-600">
                    <Eye className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">No screen loaded yet</p>
                    <p className="text-xs text-slate-600 max-w-xs mt-1">
                      Choose one of the interactive samples above or upload your own checkout screenshot to preview layout elements here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audit Error State */}
      {auditError && !isScanning && (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/40 bg-red-950/30 p-6 text-center space-y-3"
        >
          <AlertOctagon className="mx-auto h-8 w-8 text-red-400" />
          <h3 className="font-bold text-red-300 text-sm">Audit Failed</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">{auditError}</p>
          <button
            onClick={runAudit}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
          >
            Retry Scan
          </button>
        </div>
      )}

      {/* Live Scanning Progress Overlay */}
      {isScanning && (
        <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/40 p-6 text-center space-y-4 shadow-xl">
          <div className="flex items-center justify-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500"></span>
            </span>
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-amber-300">
              Cyber-Safety Forensic Engine Running
            </span>
          </div>

          <p className="font-mono text-xs text-slate-300 animate-pulse" aria-live="polite">
            {scanningSteps[scanStepIndex]}
          </p>

          <div
            role="progressbar"
            aria-valuenow={Math.round(((scanStepIndex + 1) / scanningSteps.length) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Audit scan progress"
            className="mx-auto max-w-md h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500 rounded-full"
              style={{ width: `${((scanStepIndex + 1) / scanningSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Forensic Audit Results Dossier */}
      {auditResult && !isScanning && (
        <div id="audit-results-card" className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md">
          {/* Top Score Banner */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-500/20 border border-red-500/30 px-3 py-0.5 text-xs font-bold text-red-400 uppercase tracking-wider">
                  Audit Completed • Risk Level: {auditResult.riskLevel}
                </span>
                <span className="text-xs text-slate-400">
                  Target: <strong className="text-slate-200">{auditResult.siteNameOrUrl}</strong>
                </span>
              </div>
              <h2 className="font-display text-2xl font-extrabold text-white">
                Deception Risk Assessment & Violation Breakdown
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                {auditResult.summary}
              </p>
            </div>

            {/* Radial-styled Deception Gauge */}
            <div className="flex items-center gap-4 bg-slate-950/80 rounded-2xl border border-slate-800 p-4 shrink-0">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-500/30 bg-slate-900 shadow-inner">
                <div
                  className="absolute inset-0 rounded-full border-4 border-red-500"
                  style={{
                    clipPath: `polygon(50% 50%, 0 0, ${auditResult.deceptionScore}% 0, ${auditResult.deceptionScore}% 100%, 0 100%)`
                  }}
                />
                <div className="text-center z-10">
                  <span className="font-display text-2xl font-black text-red-400">
                    {auditResult.deceptionScore}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <div className="text-slate-400">DECEPTION INDEX:</div>
                <div className="font-bold text-red-400 text-sm uppercase">
                  {auditResult.deceptionScore >= 90 ? 'Severe Fraud Risk' : auditResult.deceptionScore >= 75 ? 'Predatory UI' : 'Deceptive Pattern'}
                </div>
                <div className="text-[11px] text-amber-300">
                  Est. Annual Toll: <strong className="text-white">${auditResult.totalEstimatedAnnualToll} / yr</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Violations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <AlertOctagon className="h-4 w-4 text-red-400" />
                <span>Detected Violations ({auditResult.violations.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Cross-referenced with FTC, CFPB & EU DSA standards</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {auditResult.violations.length === 0 ? (
                <div className="col-span-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 text-center space-y-2">
                  <ShieldCheck className="mx-auto h-10 w-10 text-emerald-400" />
                  <h4 className="font-bold text-emerald-300">No Violations Detected</h4>
                  <p className="text-xs text-slate-400">The scan did not identify obvious dark pattern mechanisms in the provided content. Consider reviewing manually or scanning a fuller checkout flow.</p>
                </div>
              ) : (
                auditResult.violations.map((violation) => (
                <div
                  key={violation.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {violation.categoryLabel}
                    </span>
                    <span className="font-mono text-xs font-bold text-red-400">
                      {violation.estimatedHiddenCost}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{violation.title}</h4>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {violation.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-xl bg-slate-900/60 p-3 text-[11px] font-mono">
                    <div className="text-slate-400">
                      <strong className="text-amber-400">Technique:</strong> {violation.manipulativeTechnique}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-cyan-400">Location:</strong> {violation.detectedLocation}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-purple-400">Law / Precedent:</strong> {violation.legalPrecedent}
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <strong className="font-bold text-emerald-200">How to Defend: </strong>
                      {violation.consumerRemedy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consumer Action Checklist & FTC Complaint Drawer */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 pt-2">
            {/* Consumer Defense Checklist */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 lg:col-span-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Consumer Defense Action Items</span>
              </h3>
              <ul className="space-y-2">
                {auditResult.consumerDefenseChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-[10px] text-amber-400">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FTC Regulatory Complaint Draft */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 lg:col-span-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-400" />
                    <span>FTC & Regulatory Complaint Draft</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(auditResult.ftcComplaintDraft, 'ftc')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copyFeedback === 'ftc' ? 'Copied!' : 'Copy Draft'}</span>
                  </button>
                </div>
                <div className="mt-2 max-h-32 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/90 p-3 font-mono text-[11px] text-slate-400 leading-relaxed">
                  {auditResult.ftcComplaintDraft}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  id="publish-to-hall-btn"
                  onClick={handlePublishToHall}
                  disabled={publishedFeedback}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    publishedFeedback
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:brightness-110 shadow-lg shadow-red-600/20'
                  }`}
                >
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{publishedFeedback ? 'Added to Community Hall of Shame!' : 'Add to Public Hall of Shame'}</span>
                </button>

                <button
                  onClick={() => copyToClipboard(JSON.stringify(auditResult, null, 2), 'dossier')}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  <Share2 className="h-3.5 w-3.5 inline mr-1" />
                  <span>{copyFeedback === 'dossier' ? 'Copied!' : 'Share Dossier'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
