import { CommunityReport } from '../types';

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-001',
    companyName: 'AeroSky Air',
    domain: 'flyaerosky-travel.com',
    platformType: 'Travel & Airlines',
    title: 'Pre-Checked Travel Insurance & Hidden Seat Selection Surcharges',
    description: 'During the checkout flow, a $34.50 "Comprehensive Flight Protection" is pre-ticked by default under an accordion. If unselected, a confirmshaming popup appears claiming "You are flying unprotected at your own severe risk".',
    primaryCategory: 'sneak_into_basket',
    categoryLabel: 'Sneak into Basket',
    deceptionScore: 92,
    estimatedFee: '$34.50 / booking',
    upvotes: 842,
    downvotes: 18,
    confirmedCount: 631,
    status: 'ai_verified',
    reportedAt: '2 days ago',
    auditDetails: {
      deceptionScore: 92,
      riskLevel: 'critical',
      siteNameOrUrl: 'flyaerosky-travel.com',
      summary: 'Critical violation of negative option billing principles. Pre-selected opt-ins add $34.50 to the passenger invoice without affirmative active consent, paired with high-stress confirmshaming modal dialogs.',
      totalEstimatedAnnualToll: 138,
      timestamp: '2026-09-20T14:32:00Z',
      violations: [
        {
          id: 'v-101',
          category: 'sneak_into_basket',
          categoryLabel: 'Sneak into Basket',
          title: 'Pre-Checked Insurance Option Box',
          description: 'A pre-ticked checkbox in step 3 automatically adds a 3rd-party flight insurance policy for $34.50.',
          manipulativeTechnique: 'Default effect exploitation: relies on user cognitive exhaustion near end of multi-step checkout.',
          estimatedHiddenCost: '$34.50 per flight',
          detectedLocation: 'Checkout Step 3 > Additional Options > Protection (collapsed dropdown)',
          legalPrecedent: 'US Dept of Transportation (DOT) Full Fare Advertising Rule (14 CFR 399.84) prohibiting opt-out fees.',
          consumerRemedy: 'Manually uncheck the box labeled "Yes, protect my trip"; disregard warning modal.',
          severity: 'critical'
        },
        {
          id: 'v-102',
          category: 'confirmshaming',
          categoryLabel: 'Confirmshaming',
          title: 'Guilt-Tripping De-selection Dialog',
          description: 'Clicking "No" launches a modal: "I choose to risk losing my entire ticket value without assistance."',
          manipulativeTechnique: 'Emotional coercion and asymmetric button contrast (Bright Red "Protect Me" vs faint grey text "Take Risk").',
          estimatedHiddenCost: 'Indirect coercion',
          detectedLocation: 'Modal overlay upon unchecking insurance',
          legalPrecedent: 'EU Digital Services Act (DSA) Article 25 dark pattern ban on subverting autonomous choice.',
          consumerRemedy: 'Click the small faint grey text at the bottom left to proceed safely without paying.',
          severity: 'high'
        }
      ],
      consumerDefenseChecklist: [
        'Review the line-item invoice breakdown before clicking "Complete Purchase"',
        'Ensure the "Protection Plan" checkbox is empty',
        'Check with your credit card provider; most travel cards already include flight cancellation coverage free of charge'
      ],
      ftcComplaintDraft: 'FORMAL COMPLAINT TO FTC & CFPB: AeroSky Air engages in unlawful negative option billing and deceptive drip pricing at checkout on flyaerosky-travel.com, in violation of FTC Act Section 5 and DOT 14 CFR § 399.84.'
    }
  },
  {
    id: 'rep-002',
    companyName: 'FitPulse Daily AI',
    domain: 'getfitpulse-app.io',
    platformType: 'Subscription / SaaS',
    title: 'The "$1 Trial Trap" with Hidden $79.99 Quarterly Auto-Renewal in 8px Grey Text',
    description: 'Promoted as a "$1 7-Day Trial", but terms in low-contrast 8px grey text beneath the payment button authorize an immediate $79.99 charge every 3 months starting 48 hours BEFORE trial ends.',
    primaryCategory: 'hidden_subscription',
    categoryLabel: 'Negative Option / Hidden Subscription',
    deceptionScore: 96,
    estimatedFee: '$319.96 / year',
    upvotes: 1205,
    downvotes: 12,
    confirmedCount: 940,
    status: 'ai_verified',
    reportedAt: '3 days ago',
    auditDetails: {
      deceptionScore: 96,
      riskLevel: 'critical',
      siteNameOrUrl: 'getfitpulse-app.io',
      summary: 'Severe negative option trap violating ROSCA guidelines. The merchant obfuscates recurring membership terms with near-invisible typography and deceptive billing trigger windows.',
      totalEstimatedAnnualToll: 320,
      timestamp: '2026-09-19T10:15:00Z',
      violations: [
        {
          id: 'v-201',
          category: 'hidden_subscription',
          categoryLabel: 'Negative Option',
          title: 'Concealed Auto-Renewal Terms',
          description: 'Payment button says "Start My $1 Trial", while ultra-faint text states user is billed $79.99 quarterly automatically.',
          manipulativeTechnique: 'Visual interference and print suppression: #999 grey text against #111 dark background with 8px sizing.',
          estimatedHiddenCost: '$79.99 every 90 days ($319.96/yr)',
          detectedLocation: 'Bottom of payment screen, underneath the Apple Pay / Credit Card CTA',
          legalPrecedent: 'FTC Enforcement Action re: ROSCA (Restore Online Shoppers\' Confidence Act) 15 U.S.C. § 8403.',
          consumerRemedy: 'Immediately cancel recurring mandate inside iOS/Google Play subscriptions or issue card freeze.',
          severity: 'critical'
        },
        {
          id: 'v-202',
          category: 'roach_motel',
          categoryLabel: 'Roach Motel',
          title: 'Early Trial Expiration & No In-App Cancellation',
          description: 'The subscription actually bills on Day 5 of the 7-day trial, and cancellation requires emailing a non-responsive support desk.',
          manipulativeTechnique: 'Asymmetric cancellation friction (1-click purchase vs unmonitored email backlog).',
          estimatedHiddenCost: 'Non-refundable upfront charge',
          detectedLocation: 'Account Settings > Subscriptions (redirects to email form)',
          legalPrecedent: 'FTC Click-to-Cancel Rule (mandating cancellation mechanism as easy as sign-up).',
          consumerRemedy: 'Notify card issuer within 60 days to initiate a chargeback for unauthorized recurring charges under Regulation E.',
          severity: 'critical'
        }
      ],
      consumerDefenseChecklist: [
        'Use virtual burner cards with a $1.00 hard spending limit',
        'Immediately navigate to Apple/Google subscriptions upon signing up and toggle auto-renew off',
        'Take a screenshot of the trial terms and initial checkout button for dispute documentation'
      ],
      ftcComplaintDraft: 'FORMAL REGULATORY SUBMISSION: FitPulse Daily AI violates 15 U.S.C. § 8403 (ROSCA) by failing to provide clear and conspicuous disclosure of recurring billing terms before obtaining consumer billing information.'
    }
  },
  {
    id: 'rep-003',
    companyName: 'TicketVault Live',
    domain: 'ticketvaultlive.net',
    platformType: 'Ticketing & Events',
    title: '$45 Concert Ticket Inflated to $89.20 at Final Checkout Step (Drip Pricing)',
    description: 'Ticket advertised on Google and search listing as $45.00. At final step after inputting credit card, a $22.50 "Venue Facility Fee", $14.20 "Web Delivery Fee", and $7.50 "Processing Surcharge" are tacked on.',
    primaryCategory: 'drip_pricing',
    categoryLabel: 'Drip Pricing & Phantom Surcharges',
    deceptionScore: 88,
    estimatedFee: '$44.20 / ticket (98% surcharge)',
    upvotes: 670,
    downvotes: 24,
    confirmedCount: 512,
    status: 'ai_verified',
    reportedAt: '4 days ago',
    auditDetails: {
      deceptionScore: 88,
      riskLevel: 'high',
      siteNameOrUrl: 'ticketvaultlive.net',
      summary: 'Classic drip pricing pattern where essential unavoidable costs are withheld until the consumer has invested significant time and sunk cost into seat selection.',
      totalEstimatedAnnualToll: 176,
      timestamp: '2026-09-18T18:40:00Z',
      violations: [
        {
          id: 'v-301',
          category: 'drip_pricing',
          categoryLabel: 'Drip Pricing',
          title: '98% Hidden Add-on Surcharge at Review Step',
          description: 'Mandatory fees exceeding 98% of the original advertised ticket face value were excluded from upfront listings.',
          manipulativeTechnique: 'Sunk cost fallacy exploitation: user spent 10 minutes choosing seats and queueing.',
          estimatedHiddenCost: '$44.20 per single ticket',
          detectedLocation: 'Final Review & Pay step, disclosed only after CC entered',
          legalPrecedent: 'FTC Trade Regulation Rule on Unfair or Deceptive Fees (16 CFR Part 464).',
          consumerRemedy: 'Check venue box office directly; venue websites typically sell tickets at base face value without third-party platform markups.',
          severity: 'high'
        }
      ],
      consumerDefenseChecklist: [
        'Always toggle "Show prices with fees included" if platform provides the filter',
        'Compare against venue direct box office pricing before finalizing purchase',
        'File consumer pricing complaint citing FTC Junk Fee rules'
      ],
      ftcComplaintDraft: 'FORMAL NOTICE OF DRIP PRICING: TicketVault Live fails to display the total mandatory price upfront, violating federal consumer protection guidelines against deceptive fee partitioning.'
    }
  },
  {
    id: 'rep-004',
    companyName: 'StreamBox Plus',
    domain: 'streamboxplus.tv',
    platformType: 'Subscription / SaaS',
    title: 'The 6-Step Guilt Survey & Mandatory Daytime Phone Call to Cancel',
    description: 'Subscribing takes 1 click with Google Pay. Cancelling requires completing a 6-step questionnaire, declining 4 discount counter-offers, and calling a 1-800 number during 10am-12pm PST weekdays only.',
    primaryCategory: 'roach_motel',
    categoryLabel: 'Roach Motel / Obstructionist Cancel',
    deceptionScore: 94,
    estimatedFee: '$18.99 / mo indefinitely',
    upvotes: 1540,
    downvotes: 9,
    confirmedCount: 1120,
    status: 'ai_verified',
    reportedAt: '1 week ago',
    auditDetails: {
      deceptionScore: 94,
      riskLevel: 'critical',
      siteNameOrUrl: 'streamboxplus.tv',
      summary: 'Extreme asymmetry in transaction mechanics. Sign-up is frictionless while cancellation requires navigation through deceptive friction barriers and phone-call hurdles.',
      totalEstimatedAnnualToll: 228,
      timestamp: '2026-09-15T09:20:00Z',
      violations: [
        {
          id: 'v-401',
          category: 'roach_motel',
          categoryLabel: 'Roach Motel',
          title: 'Mandatory Telephone Cancellation for Digital Service',
          description: 'Users cannot terminate electronic membership via browser; site presents a phone number with artificial 2-hour daily window.',
          manipulativeTechnique: 'Administrative friction & social intimidation (calling a live sales retention representative).',
          estimatedHiddenCost: 'Ongoing unwanted billing ($18.99/mo)',
          detectedLocation: 'Account > Manage Billing > Cancel Membership',
          legalPrecedent: 'California Automatic Renewal Law (ARL) Cal. Bus. & Prof. Code § 17602 & FTC Click-to-Cancel Rule.',
          consumerRemedy: 'Under California and FTC law, digital sign-ups must provide digital cancellation. Use merchant bank stop-payment if blocked.',
          severity: 'critical'
        }
      ],
      consumerDefenseChecklist: [
        'Ask your credit card or PayPal to block future pre-authorized merchant debits',
        'Send written notice of cancellation via email to create an indisputable audit trail',
        'Report to State Attorney General Consumer Protection Division'
      ],
      ftcComplaintDraft: 'REGULATORY ESCALATION: StreamBox Plus systematically obstructs consumer cancellation in blatant violation of the FTC Click-to-Cancel Rule and state Automatic Renewal Laws.'
    }
  },
  {
    id: 'rep-005',
    companyName: 'ModaChic Fast Fashion',
    domain: 'modachic-deals.com',
    platformType: 'E-Commerce',
    title: 'Fabricated 04:59 Countdown Timer & Fake "14 People Looking Right Now" Badge',
    description: 'Every product page features a red flashing countdown timer: "Price guaranteed for next 04:59 only!". Inspecting the JavaScript shows the timer simply resets back to 5 minutes on refresh.',
    primaryCategory: 'fake_urgency',
    categoryLabel: 'Fake Urgency & False Scarcity',
    deceptionScore: 78,
    estimatedFee: 'Impulse purchase pressure',
    upvotes: 432,
    downvotes: 15,
    confirmedCount: 310,
    status: 'ai_verified',
    reportedAt: '1 week ago',
    auditDetails: {
      deceptionScore: 78,
      riskLevel: 'high',
      siteNameOrUrl: 'modachic-deals.com',
      summary: 'Algorithmic fabrication of consumer urgency through programmed JavaScript counters designed to induce panic buying and bypass rational price comparison.',
      totalEstimatedAnnualToll: 75,
      timestamp: '2026-09-14T11:00:00Z',
      violations: [
        {
          id: 'v-501',
          category: 'fake_urgency',
          categoryLabel: 'Fake Urgency',
          title: 'Hardcoded Client-Side Resetting Countdown',
          description: 'A 5-minute timer resets indefinitely upon browser refresh, fabricating non-existent scarcity.',
          manipulativeTechnique: 'Psychological pressure triggering FOMO (Fear Of Missing Out).',
          estimatedHiddenCost: 'Preventing thoughtful price comparison',
          detectedLocation: 'Directly above the "Add to Cart" button',
          legalPrecedent: 'UK CMA (Competition and Markets Authority) action against deceptive countdown timers.',
          consumerRemedy: 'Ignore timers; price does not change upon expiration.',
          severity: 'high'
        }
      ],
      consumerDefenseChecklist: [
        'Refresh page or open in incognito window to verify if timer is genuine or programmed loop',
        'Compare items on independent price history trackers',
        'Enforce a personal 24-hour cooling-off rule on high-urgency checkout banners'
      ],
      ftcComplaintDraft: 'FTC REPORT: ModaChic deploys fabricated artificial urgency timers on modachic-deals.com to deceive consumers regarding product availability.'
    }
  },
  {
    id: 'rep-006',
    companyName: 'SpeedyStay Hotels',
    domain: 'speedystay-booking.com',
    platformType: 'Travel & Airlines',
    title: 'Undisclosed $48/Night "Mandatory Urban Amenity & Wi-Fi Fee"',
    description: 'Hotel room advertised for $120/night. When checking out, a $48 daily "Resort & Digital Access Fee" is added, converting a 3-night stay from $360 to $504 before tax.',
    primaryCategory: 'drip_pricing',
    categoryLabel: 'Drip Pricing & Phantom Surcharges',
    deceptionScore: 85,
    estimatedFee: '$144 per 3-night stay',
    upvotes: 520,
    downvotes: 11,
    confirmedCount: 388,
    status: 'ai_verified',
    reportedAt: '2 weeks ago',
    auditDetails: {
      deceptionScore: 85,
      riskLevel: 'high',
      siteNameOrUrl: 'speedystay-booking.com',
      summary: 'Deceptive hidden mandatory resort fee, making comparison shopping impossible across travel aggregators.',
      totalEstimatedAnnualToll: 288,
      timestamp: '2026-09-08T16:00:00Z',
      violations: [
        {
          id: 'v-601',
          category: 'drip_pricing',
          categoryLabel: 'Drip Pricing',
          title: 'Mandatory Daily Resort Surcharge Excluded from Search Display',
          description: 'The $48/night fee is non-optional but withheld from search result cards.',
          manipulativeTechnique: 'Price masking to artificially rank higher in sorting algorithms.',
          estimatedHiddenCost: '$48/night mandatory surcharge',
          detectedLocation: 'Step 4 Booking Summary, printed below local municipal tax line',
          legalPrecedent: 'Bipartisan Hotel Fees Transparency Act & FTC Section 5 Unfair Trade Practices.',
          consumerRemedy: 'Request itemized receipt upon arrival; cite local pricing transparency rules.',
          severity: 'high'
        }
      ],
      consumerDefenseChecklist: [
        'Always check the "Taxes and mandatory fees" line item before booking',
        'Filter booking engines by "Total Price Including All Taxes & Fees"',
        'Ask front desk to remove amenity charges if amenities were not utilized'
      ],
      ftcComplaintDraft: 'CONSUMER REPORT: SpeedyStay disguises base room tariffs by siphoning essential costs into deceptive amenity fees.'
    }
  }
];
