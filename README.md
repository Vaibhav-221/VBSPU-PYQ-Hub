# VBSPU PYQ Hub

Free, organized previous year question papers for students of Veer Bahadur Singh Purvanchal University.

## Migration plan

1. **Foundation** — Set up Next.js App Router, TypeScript, Tailwind CSS v4, shared UI primitives, and a responsive high-tech visual system. **Complete**
2. **Pages and navigation** — Migrate the landing page, semester and subject browser, paper archive, contact, support, study materials, and privacy pages. Keep the existing `.html` URLs working through redirects. **Complete**
3. **Integrations** — Move Razorpay order creation and signature verification to Next.js route handlers; retain configurable Firebase paper queries, EmailJS contact, and Web3Forms newsletter signup. **Complete**
4. **Verification and launch** — Install dependencies and run type/lint/build plus route and mobile-browser checks. Local validation is complete; production Firebase and newsletter credentials still need configuring. **Complete**

## Technology

- Next.js App Router, React, and TypeScript
- Tailwind CSS v4 and lightweight shadcn-inspired accessible UI primitives
- Firebase Firestore for the PYQ archive
- EmailJS for contact messages
- Web3Forms for newsletter signup
- Razorpay for optional project support

## Getting started

1. Install Node.js 20.19 or newer.
2. Copy `.env.example` to `.env.local` and fill in the values for integrations you use.
3. Install dependencies and start the development server:

   ```sh
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Paper archive | Firebase web-app API key |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Paper archive | Firestore project ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Contact form | Optional; the existing public key is used if omitted |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Contact form | Optional; existing service ID is used if omitted |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Contact form | Optional; existing template ID is used if omitted |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Newsletter | Create a Web3Forms access key |
| `RAZORPAY_KEY_ID` | Support payments | Public checkout key ID |
| `RAZORPAY_KEY_SECRET` | Support payments | Server-only secret; never use a `NEXT_PUBLIC_` prefix |

Firebase must have the `pyqs` collection with `semester`, `subject`, `year`, `title`, and `url` fields. The previous static site contained a placeholder Firebase API key; use the actual Firebase web-app API key and project ID in `.env.local`.

The current site logo is `public/vbspupyqhub.png`. The PNG favicon and Apple touch icon are generated from that source logo; update the header, loading screen, and metadata references when replacing it.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/about` | Platform purpose and maintainers |
| `/semesters` | Semester selection |
| `/subjects?semester=1` | Subject selection |
| `/papers?semester=1&subject=fec` | Previous year papers |
| `/materials` | Study materials availability |
| `/contact` | Contact form and contact information |
| `/support` | Voluntary Razorpay support |
| `/privacy` | Privacy policy |

The original `/index.html`, `/semester.html`, `/subject.html`, `/papers.html`, `/contact.html`, `/support.html`, `/privacy.html`, and `/maintinance.html` URLs redirect to their Next.js equivalents.

## Scripts

- `npm run dev` — local development
- `npm run typecheck` — TypeScript validation
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm start` — serve the production build

## Deployment

Deploy as a Render **Web Service** (not a Static Site). The root-level `render.yaml` configures the service to run `npm ci && npm run build` before `npm start`; this ensures the `.next` production build exists when Next.js starts.

For a service configured manually in the Render dashboard, set:

- **Build Command:** `npm ci && npm run build`
- **Start Command:** `npm start`
- **Root Directory:** leave blank (the repository root contains `package.json`)

If the existing Render service is not managed by this Blueprint, update its dashboard commands directly or sync the Blueprint. Configure the environment variables in Render, use HTTPS, and set `RAZORPAY_KEY_SECRET` only in the server environment. Update the Firebase settings before expecting paper listings to load.
