export interface InteractiveMockup {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryKey: string;
  deceptionScore: number;
  highlightSummary: string;
  htmlSnippet: string;
  visualPreview: {
    headline: string;
    subheadline: string;
    basePrice: string;
    hiddenItem: string;
    hiddenFee: string;
    precheckedLabel: string;
    confirmshameText: string;
    sneakyNote: string;
    actionButtonText: string;
  };
  remedyAction: string;
}

export const INTERACTIVE_MOCKUPS: InteractiveMockup[] = [
  {
    id: 'mock-airline',
    name: 'Airline Sneak-in-Basket & Drip Fee',
    brand: 'SkyLink Air Express',
    category: 'Travel / Sneak into Basket',
    categoryKey: 'sneak_into_basket',
    deceptionScore: 91,
    highlightSummary: 'Pre-selected $34.50 travel protection and $16.00 seat fee automatically inserted into cart.',
    htmlSnippet: `<div class="checkout-review">
  <h3>Flight SFO to JFK: $189.00</h3>
  <div class="opt-in-box">
    <input type="checkbox" checked id="insurance" />
    <label for="insurance">SkyShield 100% Comprehensive Flight Cancellation Protection ($34.50)</label>
  </div>
  <div class="confirm-modal hidden">
    <p>Are you sure? 89% of smart passengers choose protection. Declining exposes you to total ticket forfeiture.</p>
    <button class="btn-primary">Keep My Trip Safe ($34.50)</button>
    <a class="btn-dimmed">I am willing to risk total ticket loss</a>
  </div>
</div>`,
    visualPreview: {
      headline: 'Complete Your Passenger Flight Booking',
      subheadline: 'Flight SK-492 • Economy Non-Stop',
      basePrice: '$189.00',
      hiddenItem: 'SkyShield Medical & Delay Protection',
      hiddenFee: '+$34.50 (Pre-Checked)',
      precheckedLabel: '☑ Add SkyShield Flight Protection ($34.50 per traveler - Recommended)',
      confirmshameText: '"I understand I am willingly traveling unprotected and risk total fare forfeiture"',
      sneakyNote: 'Pre-selected by default. Must actively uncheck to avoid charge.',
      actionButtonText: 'Confirm & Continue with Protected Fare ($223.50)'
    },
    remedyAction: 'Uncheck the SkyShield checkbox. When the warning popup appears, click the muted text link.'
  },
  {
    id: 'mock-trial',
    name: 'Negative Option $1 Trial to $89.99/Quarter',
    brand: 'ZenMind Meditation Pro',
    category: 'SaaS / Hidden Subscription',
    categoryKey: 'hidden_subscription',
    deceptionScore: 95,
    highlightSummary: 'Misleading $1.00 intro with 8px grey text auto-converting into $89.99 quarterly renewal on Day 5.',
    htmlSnippet: `<div class="subscription-card">
  <h2>Unlock ZenMind Pro for just $1.00</h2>
  <button class="cta-large">Claim My $1.00 Trial</button>
  <p class="microprint text-slate-500 text-xs">
    By continuing, you agree your subscription will automatically renew at $89.99 billed quarterly 48 hours before trial expiration unless cancelled via written notice.
  </p>
  <a class="shame-link">No thanks, I prefer dealing with anxiety alone</a>
</div>`,
    visualPreview: {
      headline: 'Claim 7 Days of Unlimited Mindfulness',
      subheadline: 'Special Limited Offer: Only $1.00 Today',
      basePrice: '$1.00 for 7 Days',
      hiddenItem: 'Recurring Pro Membership',
      hiddenFee: '+$89.99 / quarter automatically',
      precheckedLabel: '☑ Automatic VIP Member Guarantee (Renews at standard quarterly rate)',
      confirmshameText: '"No thanks, I prefer paying full price later and enduring daily stress"',
      sneakyNote: 'The 8px microprint discloses auto-renewal triggers 48 hours BEFORE the 7 days complete.',
      actionButtonText: 'Start My $1.00 Trial Now'
    },
    remedyAction: 'Set an immediate calendar reminder or use a virtual credit card with a strict $1 limit.'
  },
  {
    id: 'mock-ticketing',
    name: 'Ticket Drip Pricing 85% Fee Explosion',
    brand: 'ConcertPass Prime',
    category: 'Ticketing / Drip Pricing',
    categoryKey: 'drip_pricing',
    deceptionScore: 89,
    highlightSummary: '$40.00 advertised ticket jumps to $74.50 at the payment step via partitioned junk surcharges.',
    htmlSnippet: `<div class="ticket-breakdown">
  <div class="row"><span>General Admission:</span> <span>$40.00</span></div>
  <div class="row text-red"><span>Convenience Service Charge:</span> <span>+$18.50</span></div>
  <div class="row text-red"><span>Facility Infrastructure Fee:</span> <span>+$11.00</span></div>
  <div class="row text-red"><span>Electronic Delivery Surcharge:</span> <span>+$5.00</span></div>
  <div class="total font-bold"><span>Total Order:</span> <span>$74.50</span></div>
</div>`,
    visualPreview: {
      headline: 'Summer Soundfest 2026 - Main Stage Pass',
      subheadline: 'Advertised Face Value: $40.00',
      basePrice: '$40.00 base',
      hiddenItem: 'Convenience + Facility + Digital Delivery Fees',
      hiddenFee: '+$34.50 in partitioned junk fees (+86%)',
      precheckedLabel: '☑ Opt into FastTrack Express Entry Pass (+$12.00)',
      confirmshameText: 'Disclosed only after entering credit card credentials',
      sneakyNote: 'Essential operational costs partitioned into artificial late-checkout fees.',
      actionButtonText: 'Pay Total $74.50 (Includes Unavoidable Surcharges)'
    },
    remedyAction: 'Check the venue’s physical box office or verify whether state laws mandate all-in upfront pricing.'
  },
  {
    id: 'mock-cancel',
    name: 'Roach Motel "Call During Business Hours"',
    brand: 'ClubFit Stream',
    category: 'Fitness / Roach Motel',
    categoryKey: 'roach_motel',
    deceptionScore: 94,
    highlightSummary: '1-click sign-up requires a 5-step guilt questionnaire and mandatory phone call to cancel.',
    htmlSnippet: `<div class="cancel-flow">
  <h2>Are you sure you want to surrender your progress?</h2>
  <div class="survey">
    <p>Please tell us why you are giving up on your health:</p>
    <textarea placeholder="Explain your decision..."></textarea>
  </div>
  <div class="phone-call-box">
    <p>To finalize membership termination, speak with a retention specialist at 1-800-555-0192 (Mon-Fri 10am-12pm CST).</p>
  </div>
</div>`,
    visualPreview: {
      headline: 'Manage Your Membership Subscription',
      subheadline: 'Joined via 1-Click Apple Pay',
      basePrice: '$24.99 / month',
      hiddenItem: 'Obstructionist Cancellation Flow',
      hiddenFee: 'Indefinite billing until phone call completed',
      precheckedLabel: 'Clicking Cancel launches a 5-step exit survey',
      confirmshameText: '"Surrendering your membership will permanently wipe your fitness streaks"',
      sneakyNote: 'Requires a live telephone call during a restrictive 2-hour weekday window.',
      actionButtonText: 'Keep My Membership with 10% Discount'
    },
    remedyAction: 'Under the FTC Click-to-Cancel Rule, online sign-up must offer online cancel. Send written cancellation or revoke card authorization.'
  },
  {
    id: 'mock-urgency',
    name: 'Algorithmic Fake Urgency & False Scarcity',
    brand: 'TrendVault Express',
    category: 'E-Commerce / Fake Urgency',
    categoryKey: 'fake_urgency',
    deceptionScore: 82,
    highlightSummary: 'Programmed JavaScript counter resetting every 5 minutes with fabricated live viewer count.',
    htmlSnippet: `<div class="urgency-banner">
  <div class="timer">⚡ High Demand! Cart reserved for only <span id="clock">04:47</span></div>
  <div class="viewers">👀 23 people looking at this item right now!</div>
  <div class="stock">⚠️ Only 1 unit left in stock. Order now before someone else takes it!</div>
</div>`,
    visualPreview: {
      headline: 'UltraGlow Wireless Noise-Cancelling Headphones',
      subheadline: 'Regular Price: $129.99 • "Today Only $49.99"',
      basePrice: '$49.99',
      hiddenItem: 'Manufactured FOMO & Panic Buying Triggers',
      hiddenFee: 'Artificial price pressure',
      precheckedLabel: '⚡ "Price guaranteed for next 04:59 only! Reset upon page reload."',
      confirmshameText: '"28 customers have this exact pair in their cart right now"',
      sneakyNote: 'Inspecting browser network shows viewer count is a randomized Math.random() number.',
      actionButtonText: 'Claim Before Timer Expires ($49.99)'
    },
    remedyAction: 'Reload the browser page; the countdown resets and item will remain in stock at the same price.'
  }
];
