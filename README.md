<h1 align="center">
  <img src="new_logo.png" width="60" alt="VBSPU PYQ Hub Logo" /><br/>
  VBSPU PYQ Hub
</h1>

<p align="center">
  <strong>Free, Fast &amp; Organized — Previous Year Question Papers for VBSPU Students</strong>
</p>

<p align="center">
  <a href="https://www.vbspu-pyq-hub.online" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Website-vbspu--pyq--hub.online-a78bfa?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://github.com/Vaibhav-221/VBSPU-PYQ-Hub" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Vaibhav--221%2FVBSPU--PYQ--Hub-181717?style=for-the-badge&logo=github" alt="GitHub Repo" />
  </a>
  <img src="https://img.shields.io/badge/License-ISC-green?style=for-the-badge" alt="License ISC" />
  <img src="https://img.shields.io/badge/Papers-100%2B-a78bfa?style=for-the-badge" alt="100+ Papers" />
  <img src="https://img.shields.io/badge/Downloads-10k%2B-a78bfa?style=for-the-badge" alt="10k+ Downloads" />
</p>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages and Functionality](#-pages--functionality)
- [Backend API](#-backend-api)
- [Firebase Integration](#-firebase-integration)
- [Payment Integration (Razorpay)](#-payment-integration-razorpay)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Build and Scripts](#-build--scripts)
- [SEO and Sitemap](#-seo--sitemap)
- [Android App](#-android-app)
- [Contributing](#-contributing)
- [Credits](#-credits)
- [License](#-license)

---

## 🎓 About the Project

**VBSPU PYQ Hub** is a free academic resource platform built exclusively for students of **Veer Bahadur Singh Purvanchal University (VBSPU), Jaunpur, Uttar Pradesh**. The platform provides easy, organized access to **Previous Year Question Papers (PYQs)** across all 8 semesters and multiple subjects — completely free, no sign-up required.

The project was born from the simple idea that every student deserves equal access to exam preparation materials. With over **100+ authentic papers** and **10,000+ file downloads**, VBSPU PYQ Hub has become a trusted study companion for thousands of VBSPU students.

> *"Prepare Smarter with VBSPU PYQs."*

---

## 🌐 Live Demo

| Platform | URL |
|----------|-----|
| 🌍 Website | [https://www.vbspu-pyq-hub.online](https://www.vbspu-pyq-hub.online) |
| 📱 Android App | Included in repo as `VBSPU PYQ Hub.apk` |
| 🏛️ University | [https://www.vbspu.ac.in](https://www.vbspu.ac.in/en) |

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **PYQ Browser** | Browse papers by Semester → Subject → Year |
| 🔍 **Organized Navigation** | Clean 3-step flow: Semester → Subject → Paper |
| 📥 **Free PDF Download** | One-click download for all question papers |
| 📚 **Study Materials** | Access notes and reference materials |
| 📬 **Contact Form** | Powered by EmailJS with toast notifications |
| 💌 **Newsletter** | Footer newsletter via Web3Forms |
| 💜 **Support / Donations** | Voluntary Razorpay payment integration |
| 🔔 **Smart Support Popup** | Non-intrusive popup triggered every 3rd download |
| 📱 **Fully Responsive** | Mobile-first design with a fixed bottom navigation bar |
| 🌙 **Dark Mode UI** | Beautiful dark theme with purple (`#a78bfa`) accent |
| 🔒 **Privacy Policy** | Full GDPR-compliant privacy page |
| 🗺️ **Sitemap & Robots** | SEO-optimized with sitemap.xml and robots.txt |
| 🔧 **Express Backend** | Node.js/Express server for Razorpay order creation & verification |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3 + Tailwind CSS v4** | Styling and responsive layout |
| **Vanilla JavaScript (ES6+)** | All client-side interactivity |
| **Google Fonts** | Poppins & Geist typefaces |
| **Font Awesome 6** | Icons (brands: GitHub, LinkedIn, X) |
| **Google Material Symbols** | UI icons throughout the site |
| **LottieFiles (dotlottie-wc)** | Animated hero illustration |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js v5** | Web server & REST API |
| **dotenv** | Environment variable management |
| **Razorpay SDK** | Payment order creation & HMAC verification |
| **Node.js `crypto`** | Payment signature verification (HMAC-SHA256) |

### Third-Party Services

| Service | Purpose |
|---|---|
| **Firebase Firestore** | Database for storing PYQ paper metadata & URLs |
| **Razorpay** | Donation/support payment gateway |
| **EmailJS** | Contact form email delivery |
| **Web3Forms** | Newsletter subscription submission |
| **Google AdSense** | Site monetization |
| **Google Search Console** | SEO verification & monitoring |

---

## 📁 Project Structure

```
PYQS Website/
│
├── 📄 index.html               # Homepage — Hero, Stats, Resource Cards, Contact Form
├── 📄 semester.html            # Semester selection page (Sem 1–8 cards)
├── 📄 subject.html             # Subject listing page (populated via JS from URL params)
├── 📄 papers.html              # PYQ paper listing page (fetched from Firebase Firestore)
├── 📄 contact.html             # Dedicated contact page
├── 📄 support.html             # Support Us / Donation page with Razorpay integration
├── 📄 privacy.html             # Privacy Policy page
├── 📄 maintinance.html         # Study Materials / Maintenance placeholder page
│
├── 🟨 script.js                # Global JS — button tap animations, navbar, newsletter
├── 🟨 semester.js              # Semester page — routes clicks to subject.html?semester=N
├── 🟨 subject.js               # Subject page — renders subject cards from hardcoded map
├── 🟨 papers.js                # Papers page — fetches PYQs from Firebase Firestore
├── 🟨 contact.js               # EmailJS contact form handler (all forms site-wide)
├── 🟨 support-paper.js         # Support popup logic — triggers every 3rd PDF download
│
├── 🟦 style.css                # Custom CSS — animations, navbar, footer, cards, toasts
├── 🟦 contact-toast.css        # Toast notification styles (success/error)
│
├── ⚙️  server.js               # Express.js backend — serves static files + Razorpay API
├── ⚙️  package.json            # Project dependencies and npm scripts
├── ⚙️  package-lock.json       # Locked dependency versions
├── 🔒 .env                     # Environment variables (NOT committed to Git)
├── 🔒 .gitignore               # Excludes node_modules/ and .env from version control
│
├── 🗺️  sitemap.xml             # XML sitemap for all public pages (SEO)
├── 🤖 robots.txt               # Crawler directives for search engines
│
├── 🖼️  new_logo.png            # Primary site logo (used in navbar & footer)
├── 🖼️  logo.png                # Legacy logo
├── 🖼️  favicon.png             # Browser tab favicon (192x192)
├── 🖼️  apple-touch-icon.png    # iOS home screen icon (180x180)
├── 🖼️  pyqs.png                # Supplementary PYQ image asset
├── 🖼️  Stydy Materials.png     # Study materials section image
├── 📦 VBSPU PYQ Hub.apk        # Android app APK for direct installation
│
├── 📁 src/
│   ├── input.css               # Tailwind CSS entry point (@tailwind directives)
│   └── output.css              # Tailwind compiled output (development)
│
├── 📁 dist/
│   └── output.css              # Tailwind compiled output (production / served by Express)
│
├── 📁 api/                     # Reserved API directory (currently empty)
└── 📁 node_modules/            # npm dependencies (not tracked in Git)
```

---

## 📃 Pages & Functionality

### 🏠 `index.html` — Homepage

The main landing page. Contains:

- **Navbar** — Fixed top bar with logo, navigation links, and "Support Us" CTA
- **Hero Section** — Headline, description, CTA buttons ("Get Started" → `semester.html`, "Learn More"), and a Lottie animation
- **Stats Strip** — 100+ Papers · ❤️ With Students, For Students · 10k+ Downloads
- **Resource Cards** — Two cards linking to PYQs (`semester.html`) and Study Materials (`maintinance.html`)
- **Need Assistance Section** — Inline contact form powered by EmailJS, email, and social links
- **Resources Grid** — Dynamically populated resource cards (via `script.js`)
- **PDF Preview Modal** — Triggered when previewing papers
- **Footer** — Brand info, quick links, contact details, newsletter subscription form
- **Mobile Bottom Navbar** — Fixed bottom nav (Home · PYQs · Materials · Contact)

---

### 📅 `semester.html` — Semester Selection

Displays 8 semester cards (Sem 1–8, labeled by year: 1st–4th Year).

Clicking a semester card triggers `semester.js` which navigates to:

```
subject.html?semester=<N>
```

---

### 📚 `subject.html` — Subject Listing

Reads the `?semester=N` URL parameter and dynamically renders subject cards via `subject.js`.

**Subjects per semester (hardcoded in `subject.js`):**

| Semester | Subjects |
|---|---|
| **1** | FEC, FME, Chemistry, Soft Skill, Mathematics-I |
| **2** | Engineering Mathematics II, Environment and Ecology, PPS, FEE, Physics |
| **3** | COA, DSTL, Data Structure, Cyber Security, Universal Human Values, Digital Electronics |
| **4** | DBMS, Design & Analysis of Algorithms, Software Engineering, Computer Networks, Probability & Statistics |
| **5** | Artificial Intelligence, Web Technologies, Theory of Computation, Compiler Design, Elective I |
| **6** | Machine Learning, Cloud Computing, Data Mining, Information Security, Elective II |
| **7** | Major Project Phase I, Industrial Training/Internship, Elective III |
| **8** | Major Project Phase II, Internship/Seminar, Elective IV |

Clicking a subject navigates to:

```
papers.html?semester=<N>&subject=<subject-slug>
```

---

### 📄 `papers.html` — PYQ Paper Listing

Reads `?semester=N&subject=<slug>` from the URL and fetches matching papers from **Firebase Firestore** via `papers.js`.

- Renders download cards for each paper with title, year, and a **Download PDF** button
- A **Support Popup** (`support-paper.js`) is triggered every **3rd download**, nudging users to support the project — muted for 7 days if dismissed

---

### 📬 `contact.html` — Contact Page

A dedicated contact page with a full-width contact form powered by **EmailJS**.

Handles:

- Form submission with loading state (spinner)
- Success/error **toast notifications**
- Rate-limit and auth error messaging

---

### 💜 `support.html` — Support Us / Donation Page

Allows students to voluntarily donate to keep the project running.

- Razorpay payment gateway integration
- Users can select or enter a custom amount (minimum ₹19)
- Payment order created by the Express backend (`/api/create-order`)
- Payment signature verified server-side (`/api/verify-payment`) using HMAC-SHA256

---

### 🔒 `privacy.html` — Privacy Policy

Full GDPR-compliant privacy policy page detailing data collection, third-party services (Google AdSense, Firebase, Razorpay, EmailJS), and user rights.

---

### 🚧 `maintinance.html` — Study Materials (Placeholder)

A maintenance/coming-soon page shown when study materials are not yet available.

---

## ⚙️ Backend API

The Express.js server (`server.js`) runs on `PORT=3000` (configurable via `.env`) and provides:

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Returns the Razorpay public key ID to the client |
| `POST` | `/api/create-order` | Creates a Razorpay payment order |
| `POST` | `/api/verify-payment` | Verifies payment using HMAC-SHA256 signature |
| `GET` | `/*` | Serves the static frontend (`index.html`) |

### CORS Policy

Only these origins are whitelisted:

- `https://vbspu-pyq-hub.online`
- `https://www.vbspu-pyq-hub.online`

### Payment Verification

Payment integrity is verified using the Razorpay signature algorithm:

```
HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, RAZORPAY_KEY_SECRET)
```

---

## 🔥 Firebase Integration

PYQ paper metadata is stored in **Cloud Firestore** and fetched by `papers.js` on the client side.

### Collection Structure: `pyqs`

| Field | Type | Description |
|---|---|---|
| `semester` | `string` | Semester number (e.g., `"3"`) |
| `subject` | `string` | Subject slug (e.g., `"data-structure"`) |
| `title` | `string` | Paper title (e.g., `"Data Structure 2023"`) |
| `year` | `number` | Exam year (e.g., `2023`) |
| `url` | `string` | Direct PDF download URL |

Papers are queried and ordered by year (descending):

```js
query(
  collection(db, "pyqs"),
  where("semester", "==", semester),
  where("subject", "==", subject),
  orderBy("year", "desc")
)
```

> **Note:** Replace `"YOUR_REAL_API_KEY"` in `papers.js` with your actual Firebase API key before deploying.

---

## 💳 Payment Integration (Razorpay)

The support/donation flow works as follows:

```
User selects amount
      ↓
Frontend → POST /api/create-order  (amount in paise)
      ↓
Backend creates Razorpay Order → returns order_id
      ↓
Frontend opens Razorpay Checkout modal
      ↓
User completes payment
      ↓
Frontend → POST /api/verify-payment  (order_id, payment_id, signature)
      ↓
Backend verifies HMAC-SHA256 signature → returns success / failure
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **Razorpay** account (for payment features)
- A **Firebase** project with Firestore enabled (for PYQ data)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vaibhav-221/VBSPU-PYQ-Hub.git

# 2. Navigate to the project directory
cd VBSPU-PYQ-Hub

# 3. Install dependencies
npm install
```

### Setup Environment Variables

Create a `.env` file in the project root (see [Environment Variables](#-environment-variables) below).

### Run the Development Server

```bash
npm start
```

The site will be available at **[http://localhost:3000](http://localhost:3000)**

### Build Tailwind CSS

```bash
# One-time build
npm run build:css

# Watch mode (auto-recompile on changes)
npm run watch:css
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# Razorpay API Keys (from https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Server Port (default: 3000)
PORT=3000
```

> ⚠️ **IMPORTANT:** Never commit your `.env` file. It is already included in `.gitignore`.
> Also update `papers.js` with your actual Firebase API key before deploying.

---

## 📜 Build & Scripts

| Script | Command | Description |
|---|---|---|
| **Start server** | `npm start` | Starts the Express.js server |
| **Build CSS** | `npm run build:css` | Compiles Tailwind CSS (one-time) |
| **Watch CSS** | `npm run watch:css` | Watches and recompiles Tailwind on save |

---

## 🗺️ SEO & Sitemap

The project is fully SEO-optimized:

| File | Purpose |
|---|---|
| `sitemap.xml` | XML sitemap listing all 7 public pages with priority weights |
| `robots.txt` | Instructs crawlers to index the site |
| `<meta>` tags | Unique title, description, and canonical URL on every page |
| `<link rel="canonical">` | Prevents duplicate content issues |
| Google Search Console | Site verified via meta verification tag |

**Sitemap Pages:**

| Page | Priority |
|---|---|
| `/` (Homepage) | 1.0 |
| `/semester.html` | 0.9 |
| `/subject.html` | 0.8 |
| `/papers.html` | 0.8 |
| `/contact.html` | 0.5 |
| `/support.html` | 0.5 |
| `/privacy.html` | 0.3 |

---

## 📱 Android App

A prebuilt Android APK is included in the repository:

```
VBSPU PYQ Hub.apk
```

Students can sideload this on their Android device for a native-like experience.  
Enable **"Install from unknown sources"** in Android settings before installing.

---

## 🤝 Contributing

Contributions are warmly welcome! Here is how you can help:

1. **Fork** the repository
2. **Create** a new branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'Add: your feature description'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** on GitHub

### Ways to Contribute

- 📄 Upload more PYQ PDFs to Firebase Firestore
- 🐛 Report bugs via [GitHub Issues](https://github.com/Vaibhav-221/VBSPU-PYQ-Hub/issues)
- 🌐 Suggest new features or subject additions
- 💜 [Support the project financially](https://www.vbspu-pyq-hub.online/support.html)

---

## 👥 Credits

| Role | Name | Links |
|---|---|---|
| **Creator & Developer** | Vaibhav Singh | [GitHub](https://github.com/Vaibhav-221) · [LinkedIn](https://www.linkedin.com/in/vaibhav-singh-a9200a2b9/) · [X / Twitter](https://x.com/VaibhavS92068) |
| **Supporter** | Vansh Gupta | [LinkedIn](https://www.linkedin.com/in/vansh-gupta-09ba57382) |

**Contact:** vaibhavsingh56326@gmail.com

---

## 📄 License

This project is licensed under the **ISC License**.

```
Copyright © 2025 VBSPU PYQ Hub. All rights reserved.
Designed & Developed by Vaibhav Singh.
```

---

<p align="center">
  Made with ❤️ for VBSPU Students &nbsp;|&nbsp;
  <a href="https://www.vbspu-pyq-hub.online">Visit Website</a> &nbsp;|&nbsp;
  <a href="https://github.com/Vaibhav-221/VBSPU-PYQ-Hub">Star on GitHub ⭐</a>
</p>
