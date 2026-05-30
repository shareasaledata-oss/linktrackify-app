# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview
Linktrackify is a performance affiliate marketing SaaS platform.

- **Marketing site** (this repo): linktrackify.com → Vercel (shareasaledata-oss/linktrackify-app)
- **Dashboard app**: app.linktrackify.com → Vercel (shareasaledata-oss/linktrackify-dashboard)
- **Company:** Linktrackify Ltd, Covent Garden, London, UK
- **Stack:** React + Tailwind CSS + Framer Motion + Lucide React

## Commands
```bash
npm start        # dev server at localhost:3000
npm run build    # production build
```

## Critical Rules
- NEVER rewrite entire files — only edit specific functions/sections
- NEVER make false claims or add fake statistics
- Use UK English spelling (optimise, monetise, authorise)
- Always use find/replace approach on specific code blocks
- Primary colors: Blue #2563eb, Emerald #059669
- Lucide React icons already installed — use these not SVG inline icons
- Framer Motion already installed — use for animations
- Card border radius: rounded-[28px] to rounded-[40px]

## File Structure
## App.js Architecture
BrowserRouter is in index.js NOT App.js. App.js uses Routes/Route directly.

### Current Homepage Sections (in order)
1. **AnnouncementBar** — dismissible top bar, fixed z-[60]
2. **Navbar** — floating pill style, fixed top-[38px] z-50
3. **Hero** — shimmer headings, email capture, CTA buttons, marquee ticker, AppShowcase carousel
4. **HowItWorks** — 3 step cards with connecting line
5. **Features** — 4 traffic channel cards (Content, Voucher, PPC, Social)
6. **EarningsFlow** — 6 industry cards grid
7. **PublishersSection** — compliance section with 3 features + blue gradient card
8. **AdvertisersSection** — dark slate bg, dual value cards (blue + emerald)
9. **FAQ** — accordion with 6 questions
10. **CTA** — blue gradient card
11. **Footer** — dark bg-gray-950 with giant LINKTRACKIFY wordmark

### Key Components in App.js
- **AppShowcase** — 5-panel interactive carousel (Publisher Dashboard, Programs, Tracking Links, Reports, Payments). Infinite loop clicking. Uses APP_SCREENS array.
- **AnnouncementBar** — useState visible, dismissible with X button
- **StatsSection** — NEW: dark bg-gray-950 section with 4 stat cards (needs to be added between Hero and HowItWorks)

### Styling Rules
- App.js uses Tailwind CSS classes (NOT globalStyles string)
- index.css has shimmer animation keyframes
- Shimmer classes: .shimmer-text (blue), .shimmer-text-emerald (green)
- Section chips style: `inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full`
- Marquee animation class: .marquee-track (in index.css)

### Hero Shimmer Headings (DO NOT CHANGE)
```jsx
<span className="shimmer-text">Performance-First Affiliate</span>
// & — black shimmer inline style
// Partnership Management — emerald shimmer inline style
```

## Pages Architecture
All pages in src/pages/ use Tailwind CSS.
Each page has:
- Hero section
- Multi-step form modal (useState showForm)
- AnimateOnScroll wrapper component (defined locally in each page)
- Motion variants: fadeUp, slideLeft, slideRight, staggerContainer, cardVariant

## Routing (App.js)
NO_LAYOUT_PAGES — login, register, forgot-password, publisher/register, advertiser/register, terms, registration-success (these hide Navbar and Footer)

## Database Schema (Supabase)
- **profiles**: id, email, full_name, role, status, is_admin, website, promotion_method, monthly_traffic, country, description, serial_id
- **programs**: id, name, domain, category, region, commission, cookie_days, epc, network
- **program_applications**: id, user_id, program_id, status, applied_at
- **transactions**: id, user_id, program_id, sale_amount, commission_amount, platform_margin, publisher_earning, status

## Dashboard App (linktrackify-dashboard repo)
- Publisher pages: Dashboard, Programs, Reports, Payments, Profile
- Admin pages: Overview, Publishers, Pending Publishers, Pending Advertisers, Program Applications, Revenue
- Admin login: /admin-login | Admin email: shareasaledata@gmail.com
- Protected routes require profiles.status = 'approved'
- RLS disabled on all tables

## Pending Tasks (in priority order)
1. Add StatsSection between Hero and HowItWorks in HomePage function
2. Add HowTrackingWorks visual flow section after HowItWorks
3. Add micro-interactions: button glow effects, card hover animations
4. Add sticky scroll progress indicator (right side)
5. Add back-to-top button
6. Improve mobile menu
7. Add testimonials section (industry principle quotes — no fake reviews)
8. Legal pages: Privacy Policy, Terms & Conditions, Cookie Policy, Imprint
9. Apply to Awin & Impact agency accounts (website must be complete first)
10. Email automation via Hostinger SMTP
11. Tracking link generator for publishers
12. Connect live Awin/Impact API data

## Lucide Icons Already Imported in App.js
Shield, BarChart2, Link2, DollarSign, Star, Target, Lock, Users, Globe, Search, Code, Package, CheckCircle
