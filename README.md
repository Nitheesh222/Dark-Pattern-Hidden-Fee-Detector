<div align="center">

# 🕵️ DeceptiWatch
### Dark Pattern & Hidden Fee Detector

**AI-powered consumer protection platform that exposes deceptive UI layouts, hidden subscriptions, and phantom fees.**

[![promptwars](https://img.shields.io/badge/%23promptwars-FF4444?style=for-the-badge&logoColor=white)](https://github.com/Nitheesh222/Dark-Pattern-Hidden-Fee-Detector)
[![Hack2Skill](https://img.shields.io/badge/@Hack2Skill-0066FF?style=for-the-badge&logo=hackthebox&logoColor=white)](https://hack2skill.com)
[![Google For Developers](https://img.shields.io/badge/@Google_For_Developers-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com)
[![GEN AI CLUB](https://img.shields.io/badge/@GEN_AI_CLUB-8A2BE2?style=for-the-badge&logo=openai&logoColor=white)](https://github.com/Nitheesh222/Dark-Pattern-Hidden-Fee-Detector)

---

*Built for **#promptwars** · Powered by **Gemini AI** · Protecting consumers from deceptive digital design*

</div>

---

## 🎯 What is DeceptiWatch?

DeceptiWatch is a **forensic AI scanner** that detects and exposes dark patterns — deceptive UI/UX techniques used by websites to manipulate consumers into making unwanted purchases, signing up for hidden subscriptions, or paying undisclosed fees.

> 💡 **Did you know?** The average consumer loses **$240+ annually** to dark patterns and hidden fees — DeceptiWatch helps you fight back.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔍 **AI Dark Pattern Scanner** | Paste a URL or checkout text to get a forensic audit powered by Gemini AI |
| 🏛️ **Hall of Shame** | Community-voted index of the most deceptive websites |
| 🧪 **Deception Lab** | Interactive demos showing real dark patterns in action |
| 💸 **Subscription Leak Calculator** | Estimate how much hidden fees cost you annually |
| 📋 **FTC Complaint Generator** | Auto-generate a ready-to-submit regulatory complaint |
| 🌐 **Community Reports** | Crowdsourced deception reports with upvote/downvote system |

---

## 🕵️ Dark Patterns Detected

- **🛒 Sneak into Basket** — Pre-selected items added without consent
- **🔁 Hidden Subscriptions** — Negative option billing disguised as one-time purchases
- **💧 Drip Pricing** — Fees revealed only at checkout after initial low price shown
- **😔 Confirmshaming** — Emotionally coercive opt-out language
- **🏨 Roach Motel** — Easy to sign up, near-impossible to cancel
- **⏰ Fake Urgency** — False countdown timers and scarcity warnings
- **❓ Trick Questions** — Double-negative checkboxes and confusing consent language
- **🎭 Disguised Ads** — Sponsored content masquerading as organic results

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- A **Gemini API Key** (free from [Google AI Studio](https://aistudio.google.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nitheesh222/Dark-Pattern-Hidden-Fee-Detector.git
cd Dark-Pattern-Hidden-Fee-Detector

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Launch the app
npm run dev
```

Open your browser at **http://localhost:3000** 🎉

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + TailwindCSS v4 |
| **Backend** | Node.js + Express |
| **AI Engine** | Google Gemini AI (`@google/genai`) |
| **Build Tool** | Vite 8 |
| **Animations** | Motion (Framer Motion) |
| **Icons** | Lucide React |

---

## 🧠 How It Works

```
User Input (URL / Checkout Text)
        │
        ▼
┌─────────────────────┐
│  Gemini AI Analysis │  ← Structured forensic scan via function calling
└─────────────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│  Deception Report                        │
│  • Risk Score (0-100)                    │
│  • Dark Pattern Violations               │
│  • Estimated Annual Financial Toll       │
│  • Consumer Defense Checklist            │
│  • FTC Complaint Draft                   │
└─────────────────────────────────────────┘
```

> If the Gemini API key is not configured, DeceptiWatch falls back to an intelligent **heuristic forensic analyzer** that still provides detailed reports.

---

## 📸 Key Sections

- **🔍 Detector** — Run an AI audit on any site
- **🏛️ Hall of Shame** — Browse and filter community-reported offenders
- **🧪 Deception Lab** — Learn dark patterns through interactive mockups
- **💸 Leak Calculator** — See your annual subscription leak estimate

---

## 📜 Legal Context

DeceptiWatch references consumer protection laws including:

- 🇺🇸 **FTC Act Section 5** — Unfair or deceptive acts
- 🇺🇸 **ROSCA** — Restore Online Shoppers' Confidence Act
- 🇪🇺 **EU Digital Services Act** — Article 25 (Dark Patterns prohibition)
- 🇪🇺 **GDPR** — Consent and data practices

---

## 🤝 Contributing

Contributions are welcome! To add a community report or improve detection logic:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/improve-detection`)
3. Commit your changes (`git commit -m 'Add: improved drip pricing detection'`)
4. Push to the branch (`git push origin feature/improve-detection`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for the #promptwars hackathon**

[@Hack2Skill](https://hack2skill.com) · [@Google For Developers](https://developers.google.com) · [@GEN AI CLUB](https://github.com/Nitheesh222/Dark-Pattern-Hidden-Fee-Detector)

*Empowering consumers. Exposing deception. One dark pattern at a time.*

</div>
