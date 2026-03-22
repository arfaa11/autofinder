# autofinder

> **Helping Canadians get behind the wheel — regardless of credit history.**

autofinder is a full-stack auto financing lead generation platform built for the Edmonton, Alberta market. It captures prospective car buyers through a polished, animated multi-step funnel, persists their data to a cloud database in real time, and instantly notifies the dealership team via transactional email — all running on a globally distributed edge infrastructure with zero cold-start latency.

---

## live demo

[autofinder.ca](https://autofinder.ca) — hosted on Vercel, served through Cloudflare's CDN.

---

## what it does

Users land on a conversion-optimised page and are guided through a four-step qualification flow:

1. **Vehicle type selection** — horizontal snap-scroll carousel with car category imagery
2. **Employment status** — single-select with iconography and descriptive copy
3. **Monthly income range** — tiered range selection
4. **Contact details** — name, city, postal code, phone, and email with inline validation

On submission, the lead is written to a Supabase PostgreSQL database and a transactional email alert is dispatched to the business owner via Resend — all from a single edge-deployed API route.

---

## tech stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, routing, API routes |
| Language | TypeScript | End-to-end type safety |
| Styling | Tailwind CSS v4 | Utility-first styling with custom design tokens |
| Animation | Framer Motion | Step transitions, micro-interactions, scroll reveals |
| Database | Supabase (PostgreSQL) | Lead persistence and querying |
| Auth client | `@supabase/ssr` | Server-side Supabase client with cookie-based session handling |
| Email | Resend | Transactional email delivery |
| Hosting | Vercel | CI/CD pipeline, preview deployments, edge functions |
| CDN / DNS | Cloudflare | Global CDN, DDoS protection, DNS management |
| Font | Google Fonts — Montserrat | Brand typography via `next/font` |

---

## architecture

```
Browser
  │
  ├── Next.js App Router (Vercel Edge Network)
  │     ├── app/layout.tsx        — root layout, font loading, global header
  │     ├── app/page.tsx          — home page, section composition
  │     └── app/api/route.ts      — POST handler (edge runtime)
  │
  ├── components/
  │     ├── LeadFormContainer.tsx — multi-step state machine, form orchestration
  │     ├── HowItWorks.tsx        — trust/education section
  │     └── form/
  │           ├── VehicleStep.tsx
  │           ├── EmploymentStep.tsx
  │           ├── IncomeStep.tsx
  │           └── ContactStep.tsx
  │
  └── utils/supabase/
        └── server.ts             — Supabase SSR client factory

API Route (Edge Runtime)
  ├── Input validation (phone digits, email regex)
  ├── Supabase insert → leads table
  └── Resend email alert → dealership inbox
```

### why edge runtime?

The API route (`app/api/route.ts`) is explicitly deployed to Vercel's **edge runtime** (`export const runtime = 'edge'`). This means the function runs in a V8 isolate at the Cloudflare PoP closest to the user — eliminating cold starts entirely and keeping p99 response times well under 100ms globally. For a lead capture product where every millisecond of form submission latency affects conversion, this matters.

### form state management

Rather than reaching for a form library, the multi-step flow is managed with a single `useState` tuple `[step, direction]`. Direction is encoded alongside the step index so Framer Motion can determine the correct vertical slide direction (up vs down) for enter/exit animations — keeping transitions contextually correct regardless of whether the user advances or goes back.

```ts
const [[step, direction], setStepWithDirection] = useState([0, 0])

const paginate = (nextStep: number) => {
  setStepWithDirection([nextStep, nextStep > step ? 1 : -1])
}
```

### supabase integration

The Supabase client is initialised server-side using `@supabase/ssr`'s `createServerClient`, which reads and writes sessions via Next.js cookies. This keeps credentials off the client entirely. The `leads` table schema captures:

```sql
id                  uuid primary key default gen_random_uuid()
name                text
phone               text
email               text
vehicle_type        text
employment_status   text
monthly_income_range text
city                text
postal_code         text
source              text default 'web_form'
status              text default 'new'
created_at          timestamptz default now()
```

### validation

Server-side validation runs before any database write:

- **Phone**: stripped of non-digits, must be exactly 10 characters
- **Email**: validated against RFC-compliant regex
- Any validation failure returns a structured `{ success: false, error: string }` JSON response with a `400` status — surfaced to the user via the form's error state

### email delivery

Resend handles transactional email. On a successful database write, an HTML email is dispatched containing the lead's name, phone, and email — giving the dealership team an instant notification without needing to monitor a dashboard. Email failure is caught and logged independently so a Resend outage never blocks a lead from being saved.

---

## local development

**Prerequisites:** Node.js 18+, a Supabase project, a Resend API key.

```bash
# clone
git clone https://github.com/arfaa11/autofinder.git
cd autofinder

# install
npm install

# environment
cp .env.example .env.local
# fill in your keys (see below)

# run
npm run dev
```

### environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
RESEND_API_KEY=
```

---

## project structure

```
autofinder/
├── app/
│   ├── api/
│   │   └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── form/
│   │   ├── ContactStep.tsx
│   │   ├── EmploymentStep.tsx
│   │   ├── IncomeStep.tsx
│   │   └── VehicleStep.tsx
│   ├── HowItWorks.tsx
│   └── LeadFormContainer.tsx
├── public/
│   ├── images/
│   └── logo.png
├── utils/
│   └── supabase/
│       └── server.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## design decisions

**Montserrat + all-caps UI** — The typeface and casing choices reinforce urgency and authority, which are proven patterns in automotive and financial conversion UIs. The uppercase tracking creates a dealership/brand feel without requiring custom assets.

**Black, white, and blue-600 only** — A deliberately constrained palette. Blue-600 is reserved exclusively for primary CTAs and accent moments, ensuring it retains visual hierarchy weight throughout the funnel.

**Framer Motion for transitions** — CSS transitions alone can't encode directional context (back vs forward). Framer Motion's `AnimatePresence` with a custom `direction` value lets the enter/exit animations communicate navigation intent, reducing cognitive load for the user.

**No form library** — The form has four steps with a total of eight fields and zero interdependencies between steps. Pulling in React Hook Form or Zod would be over-engineering. Validation lives where it belongs — on the server.

---

## deployment

The production branch auto-deploys to Vercel on every push to `main`. Cloudflare sits in front as the CDN and DNS layer, with full proxy enabled for DDoS protection and caching of static assets.

---

## author

**Arfaa Mumtaz** — [github.com/arfaa11](https://github.com/arfaa11)

---

*Built for the Edmonton automotive market. All leads are handled in accordance with applicable Canadian privacy regulations.*
