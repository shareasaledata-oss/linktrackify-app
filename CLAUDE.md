# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Linktrackify is a full-stack affiliate marketing SaaS platform split across two separate React apps:

1. **Marketing site** (this repo): `linktrackify.com` → Vercel (`shareasaledata-oss/linktrackify-app`)
2. **App platform**: `app.linktrackify.com` → Vercel (`shareasaledata-oss/linktrackify-dashboard`)

**Company:** Linktrackify Ltd — Covent Garden, London, United Kingdom  
**Contact:** linktrackify@linktrackify.com

## Commands

```bash
npm start        # dev server at localhost:3000
npm run build    # production build
npm test         # run tests (CRA jest, watch mode)
npm test -- --watchAll=false  # run tests once (CI mode)
```

## Marketing Site Architecture

### Routing

`BrowserRouter` wraps `App` in `src/index.js`. All routes are defined in `src/App.js`. Currently every path (`/`, `/advertisers`, `/publishers`, `/about-us`, `/contact-us`) renders `<HomePage />` — the page components in `src/pages/` (Login, Register, etc.) are **not yet wired into the router**.

To add a new routed page:
1. Create the component in `src/pages/`
2. Add a `<Route path="..." element={<YourPage />} />` inside the `<Routes>` block in `App.js`

### Page sections (all in `src/App.js`)

| Component | Description |
|---|---|
| `TopBanner` | Fixed announcement bar at very top (~37px tall) |
| `Navbar` | Fixed navigation below TopBanner |
| `Hero` | Main hero with animated dashboard mockup |
| `HowItWorks` | 4-step explainer cards |
| `Features` | 6 feature cards |
| `EarningsModel` | Revenue sharing flow diagram |
| `ForPublishers` | Publisher benefits + mini dashboard preview |
| `ForAdvertisers` | Advertiser feature grid |
| `FAQ` | Accordion |
| `CTA` | Final call to action |
| `Footer` | Links and contact info |

### Styling — marketing site only

All marketing site styles live in the `globalStyles` string constant at the top of `App.js`, injected into `<head>` via `useEffect`. **Do not use Tailwind classes in `App.js`.**

CSS custom properties defined in `:root`:

| Variable | Value |
|---|---|
| `--bg` | `#03070f` (dark navy) |
| `--bg2` | `#060d1a` |
| `--blue` | `#1a6fff` |
| `--cyan` | `#00c2ff` |
| `--font-display` | `Syne` |
| `--font-body` | `DM Sans` |

Reusable utility classes defined in `globalStyles`: `.btn-primary`, `.btn-glow`, `.btn-ghost`, `.glass-card`, `.grad-text`, `.grad-text-blue`, `.section-badge`, `.container`, `.container-sm`, `.section-divider`, `.hero-grid`, `.stars-container`.

Background aesthetic: dark with animated star particles (`<Stars />`), radial glow orbs, and grid lines — inspired by wope.com.

### Styling — page components (`src/pages/`)

All page components (Login, Register, PublisherRegister, AdvertiserRegister, etc.) use **Tailwind CSS** utility classes. Tailwind is configured in `tailwind.config.js` and imported via `src/index.css`. Do not use `globalStyles` classes in these files.

### Known layout issue

`TopBanner` is `position: fixed; top: 0` (~37px tall). `Navbar` is also `position: fixed; top: 0`, which hides it behind the banner. Fix:
- In `globalStyles`: change `.navbar { top: 0 }` → `.navbar { top: 37px }`
- Update `Hero` `paddingTop` from `102px` → `140px`

### Backend / Auth

`src/supabaseClient.js` exports a single `supabase` client used across all pages.

- **Sign up**: `supabase.auth.signUp()` with `options.data` storing `role`, `full_name`, `username`, `website`, `promotion_method`, `monthly_traffic`, `country` in user metadata.
- **Sign in**: `supabase.auth.signInWithPassword()` — role from local UI toggle determines redirect (`/dashboard` vs `/advertiser-dashboard`).
- Successful registration redirects to `/registration-success`.

`PublisherRegister` and `AdvertiserRegister` are 3-step forms with per-step validation; `signUp` is only called on final submission.

### Key dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` v7 | Client-side routing |
| `@supabase/supabase-js` | Auth and database |
| `framer-motion` | Animations (available, used selectively) |
| `tailwindcss` | Utility CSS for `src/pages/` only |

## Database Schema (Supabase)

| Table | Key columns |
|---|---|
| `profiles` | `id, email, full_name, role, status, is_admin, website, promotion_method, monthly_traffic, country, description` |
| `programs` | `id, name, domain, category, region, commission, cookie_days, epc, network` |
| `program_applications` | `id, user_id, program_id, status, applied_at` |
| `transactions` | `id, user_id, program_id, sale_amount, commission_amount, platform_margin, publisher_earning, status` |

## Dashboard App (separate repo: `linktrackify-dashboard`)

- Publisher-facing pages: Dashboard, Programs, Reports, Payments, Profile
- Admin panel pages: Overview, Total Publishers, Pending Publishers, Pending Advertisers, Program Applications, Affiliate Revenue
- Admin login at `/admin-login` (separate from publisher login); admin email: shareasaledata@gmail.com
- Protected routes: publishers must have `status = approved` in `profiles`

## Pending Work

1. Fix Navbar hidden behind TopBanner (see layout issue above)
2. Build out individual marketing pages: Advertisers, Publishers, About Us, Contact Us
3. Email automation via Hostinger SMTP
4. Tracking link generator for publishers
5. Connect live Awin/Impact API data
