export type DarkPatternCategory =
  | 'sneak_into_basket'
  | 'hidden_subscription'
  | 'drip_pricing'
  | 'confirmshaming'
  | 'roach_motel'
  | 'fake_urgency'
  | 'disguised_ads'
  | 'trick_questions';

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface DarkPatternViolation {
  id: string;
  category: DarkPatternCategory;
  categoryLabel: string;
  title: string;
  description: string;
  manipulativeTechnique: string;
  estimatedHiddenCost: string;
  detectedLocation: string;
  legalPrecedent: string;
  consumerRemedy: string;
  severity: SeverityLevel;
}

export interface AuditResult {
  deceptionScore: number; // 0 to 100
  riskLevel: SeverityLevel;
  summary: string;
  siteNameOrUrl: string;
  violations: DarkPatternViolation[];
  totalEstimatedAnnualToll: number;
  ftcComplaintDraft: string;
  consumerDefenseChecklist: string[];
  timestamp: string;
}

export interface CommunityReport {
  id: string;
  companyName: string;
  domain: string;
  platformType: 'E-Commerce' | 'Subscription / SaaS' | 'Travel & Airlines' | 'Ticketing & Events' | 'Gaming & Apps';
  screenshotUrl?: string;
  primaryCategory: DarkPatternCategory;
  categoryLabel: string;
  deceptionScore: number;
  estimatedFee: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  confirmedCount: number;
  hasUserConfirmed?: boolean;
  status: 'ai_verified' | 'community_flagged' | 'under_review' | 'merchant_remedied';
  reportedAt: string;
  auditDetails: AuditResult;
}

export interface CategoryMeta {
  key: DarkPatternCategory;
  name: string;
  badgeColor: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
  shortDesc: string;
  ftcRule: string;
}
