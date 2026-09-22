import { DarkPatternCategory, CategoryMeta } from '../types';

export const DARK_PATTERN_CATEGORIES: CategoryMeta[] = [
  {
    key: 'sneak_into_basket',
    name: 'Sneak into Basket',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    bgColor: 'bg-amber-950/30',
    borderColor: 'border-amber-500/30',
    iconName: 'ShoppingBag',
    shortDesc: 'Items, protection plans, or charity donations silently slipped into your cart without active consent.',
    ftcRule: 'FTC Act Section 5: Unfair or Deceptive Trade Practices & Negative Option Rule'
  },
  {
    key: 'hidden_subscription',
    name: 'Negative Option / Hidden Subscription',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    bgColor: 'bg-rose-950/30',
    borderColor: 'border-rose-500/30',
    iconName: 'Repeat',
    shortDesc: 'Free trials or one-time purchases secretly auto-enrolling into expensive recurring monthly billing cycles.',
    ftcRule: 'Restore Online Shoppers\' Confidence Act (ROSCA) & FTC Click-to-Cancel Rule'
  },
  {
    key: 'drip_pricing',
    name: 'Drip Pricing & Phantom Surcharges',
    badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    bgColor: 'bg-orange-950/30',
    borderColor: 'border-orange-500/30',
    iconName: 'Layers',
    shortDesc: 'Disclosing only a portion of the price upfront, then stacking mandatory convenience and processing fees at the final step.',
    ftcRule: 'FTC Rule on Unfair or Deceptive Fees (16 CFR Part 464) & Junk Fee Ban'
  },
  {
    key: 'confirmshaming',
    name: 'Confirmshaming & Manipulative Copy',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    bgColor: 'bg-purple-950/30',
    borderColor: 'border-purple-500/30',
    iconName: 'MessageSquareWarning',
    shortDesc: 'Guilt-tripping or emotionally manipulating users into clicking consent (e.g. "No thanks, I prefer paying full price").',
    ftcRule: 'EU Digital Services Act (DSA) Article 25 & FTC Deceptive Architecture Guides'
  },
  {
    key: 'roach_motel',
    name: 'Roach Motel / Obstructionist Cancel',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    bgColor: 'bg-red-950/30',
    borderColor: 'border-red-500/30',
    iconName: 'ShieldAlert',
    shortDesc: 'Making sign-up effortless (1 click) while making cancellation an agonizing maze of phone calls or retention obstacles.',
    ftcRule: 'FTC Click-to-Cancel Mandate: Cancellation must be as simple as sign-up'
  },
  {
    key: 'fake_urgency',
    name: 'Fake Urgency & False Scarcity',
    badgeColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    bgColor: 'bg-yellow-950/30',
    borderColor: 'border-yellow-500/30',
    iconName: 'ClockAlert',
    shortDesc: 'Artificial countdown clocks, fabricated "Only 2 left in stock!" notices, or fake "18 people viewing" tickers.',
    ftcRule: 'FTC vs. UrthBox / Consumer Fraud & False Advertising Precedents'
  },
  {
    key: 'trick_questions',
    name: 'Trick Questions & Inverted Checkboxes',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    bgColor: 'bg-cyan-950/30',
    borderColor: 'border-cyan-500/30',
    iconName: 'HelpCircle',
    shortDesc: 'Confusing double-negatives: "Uncheck this box if you do not wish to avoid receiving our partner charges".',
    ftcRule: 'California Consumer Privacy Act (CCPA) Regulations § 7004 & FTC Deceptive Layouts'
  },
  {
    key: 'disguised_ads',
    name: 'Disguised Ads & Bait-and-Switch',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    bgColor: 'bg-blue-950/30',
    borderColor: 'border-blue-500/30',
    iconName: 'EyeOff',
    shortDesc: 'Sponsored promotional traps camouflaged as navigation buttons, system download alerts, or organic content.',
    ftcRule: 'FTC Enforcement Policy Statement on Deceptively Formatted Advertisements'
  }
];

export function getCategoryMeta(cat: DarkPatternCategory): CategoryMeta {
  const found = DARK_PATTERN_CATEGORIES.find(c => c.key === cat);
  return found || DARK_PATTERN_CATEGORIES[0];
}
