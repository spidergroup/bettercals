# Product Requirements Document — Mortgage Calculator

## 1. Product Overview

**Product Name:** Better Calculators
**Tagline:** *Structure your future with precision. Estimate your monthly commitments.*  
**Brand Identity:** "BC" logo mark — a premium fintech calculator suite  

The Better Calculators are the flagship module of a multi-tool financial calculator platform. It enables users to estimate monthly mortgage payments, visualize principal vs. interest breakdowns, account for recurring homeownership expenses, and explore a full amortization schedule — all within a single, highly polished interface.

---

## 2. Goals & Success Criteria

| Goal | Metric |
|---|---|
| Help users accurately estimate total monthly housing costs | Calculated payment matches standard amortization formula |
| Provide transparency into long-term loan costs | Full amortization schedule with per-period breakdown |
| Deliver a premium, trustworthy user experience | Design adheres to the "Digital Architect" design system |
| Support multiple financial tools under one roof | Navigation supports Mortgage, Dividend, and Car Loan calculators |

---

## 3. Target Users

- **Homebuyers** researching affordability before shopping
- **Refinancers** comparing new rate/term options against current loans
- **Real estate investors** modeling cash flow for rental properties
- **Financial advisors** walking clients through payment scenarios

---

## 4. Platform & Technology

| Attribute | Specification |
|---|---|
| Delivery | Single-page web application (static HTML) |
| Rendering | Client-side only — no backend required |
| Theming | Dark mode (primary) and Light mode variants |
| CSS Framework | Tailwind CSS (CDN) with custom design tokens |
| Fonts | **Manrope** (headlines/display) · **Inter** (body/data/labels) |
| Icons | Material Symbols Outlined (Google Fonts CDN) |
| Responsiveness | Desktop-first (1200 px max-width), responsive down to mobile with bottom nav |

---

## 5. Information Architecture

```
Header (sticky)
├── Logo ("BC")
├── Top Navigation
│   ├── Mortgage Calculator (active)
│   ├── Dividend Calculator
│   └── Car Loan Calculator
├── Notifications icon
└── User Avatar

Page Body (max-width 1200px, centered)
├── Page Title + Subtitle
├── Two-Column Layout (xl breakpoint)
│   ├── Left Column (7/12)
│   │   ├── Core Loan Details card
│   │   │   ├── Home Price (slider + input)
│   │   │   ├── Down Payment (slider + input, shows %)
│   │   │   ├── Loan Term (slider + input, years)
│   │   │   └── Interest Rate (slider + input, %)
│   │   └── Recurring Expenses card (collapsible)
│   │       ├── Property Tax (slider + input)
│   │       ├── Insurance (slider + input)
│   │       └── HOA Fees (slider + input)
│   └── Right Column (5/12, sticky)
│       ├── Monthly Payment hero number
│       ├── Donut chart (Principal vs Taxes & Fees)
│       ├── Legend rows
│       │   ├── Principal & Interest — $X,XXX.XX
│       │   └── Taxes & Fees — $XXX.XX
│       └── "Apply for Pre-Approval" CTA button
└── Amortization Schedule (full-width)
    ├── Section header + "Export PDF" button
    ├── Data table
    │   Columns: Period | Date | Starting | Payment | Principal | Interest | Extra | Total Principal | Total Interest | Balance
    └── "View All N Payments" link

Mobile Bottom Navigation (md:hidden)
├── Home
├── Calc (active)
├── Loans
└── Profile
```

---

## 6. Feature Requirements

### 6.1 Core Loan Details

| Input | Type | Default | Range | Step |
|---|---|---|---|---|
| Home Price | Slider + text input | $450,000 | $100,000 – $2,000,000 | — |
| Down Payment | Slider + text input | $90,000 (20%) | $0 – $1,000,000 | — |
| Loan Term | Slider + text input | 30 years | 5 – 30 years | 5 |
| Interest Rate | Slider + text input | 6.5% | 1% – 15% | 0.1 |

**Behavior:**
- Slider and text input are two-way synced: changing one updates the other in real time.
- Down Payment label dynamically shows the percentage relative to Home Price (e.g., "Down Payment (20%)").
- All monetary inputs display with `$` prefix; rate input with `%` suffix; term input with "Yrs" suffix.
- Inputs use emerald-accent styling with rounded-xl containers.

### 6.2 Recurring Expenses (Collapsible Section)

| Input | Type | Default | Range |
|---|---|---|---|
| Property Tax | Slider + text input | $450/mo | $0 – $2,000 |
| Insurance | Slider + text input | $125/mo | $0 – $1,000 |
| HOA Fees | Slider + text input | $250/mo | $0 – $1,000 |

**Behavior:**
- Section is collapsible via chevron toggle (expand/collapse).
- These values are added to the monthly total as "Taxes & Fees."

### 6.3 Monthly Payment Summary (Sticky Results Card)

| Element | Description |
|---|---|
| **Hero Number** | Total monthly payment displayed prominently (e.g., **$3,160.34**). Dollars in large font, cents in smaller, reduced-opacity text. |
| **Donut Chart** | SVG ring chart showing the proportion of Principal & Interest vs. Taxes & Fees. Center displays the loan principal (Home Price − Down Payment). |
| **Legend Rows** | Two rows below the chart: "Principal & Interest" (emerald dot) and "Taxes & Fees" (grey dot), each showing their respective dollar amounts. |
| **CTA Button** | "Apply for Pre-Approval" — full-width, rounded-full, emerald primary fill. |

**Calculation:**
- **Loan Amount** = Home Price − Down Payment
- **Monthly P&I** = standard amortization formula: `M = P * [r(1+r)^n] / [(1+r)^n − 1]` where `P` = loan amount, `r` = monthly interest rate, `n` = total payments
- **Monthly Total** = P&I + Property Tax + Insurance + HOA Fees

### 6.4 Amortization Schedule

| Column | Description |
|---|---|
| Period | Payment number (1, 2, 3, …) |
| Date | Month/Year of payment (e.g., "Oct 2023") |
| Starting | Loan balance at beginning of period |
| Payment | Fixed monthly P&I amount |
| Principal | Portion of payment applied to principal |
| Interest | Portion of payment applied to interest |
| Extra | **Editable input** — user can enter additional principal payments per period |
| Total Principal | Cumulative principal paid to date |
| Total Interest | Cumulative interest paid to date |
| Balance | Remaining loan balance after payment |

**Behavior:**
- Table initially shows 3 rows with a "View All N Payments" button to expand.
- Extra payment cells are inline-editable inputs; non-zero values highlight with emerald styling.
- Extra payments recalculate all subsequent rows (remaining balance, total interest saved, etc.).
- Principal amounts styled in emerald/green; Interest amounts styled in rose/red for visual contrast.
- **Export PDF** button generates a downloadable PDF of the full schedule.

### 6.5 Navigation

- **Desktop:** Horizontal top navigation with three calculator links (Mortgage, Dividend, Car Loan). Active link has emerald text + bottom border.
- **Mobile:** Fixed bottom navigation bar with four items (Home, Calc, Loans, Profile) using Material Symbols icons. Active item highlighted in emerald.

### 6.6 Header

- Sticky header with glassmorphism blur background.
- "BC" branded logo (emerald square with diagonal accent).
- Notification bell icon.
- User avatar (circular, with ring accent in dark mode).

---

## 7. Design System

> Based on the "Digital Architect" design specification. See [DESIGN.md](Stitch/stitch_react_mortgage_calculator-dark-theme/DESIGN.md) for full tokens.

### 7.1 Theme: Dark Mode (Primary)

| Token | Value |
|---|---|
| `surface` | `#0f172a` |
| `surface-container-low` | `#1e293b` |
| `surface-container-high` | `#334155` |
| `surface-container-lowest` | `#020617` |
| `primary` | `#34d399` (Emerald 400) |
| `on-surface` | `#f1f5f9` |
| `on-surface-variant` | `#94a3b8` |
| `tertiary` (danger/interest) | `#ffb3ae` (Rose) |

### 7.2 Theme: Light Mode

| Token | Value |
|---|---|
| `surface` | `#f7f9fb` |
| `surface-container-low` | `#f2f4f6` |
| `surface-container-lowest` | `#ffffff` |
| `primary` | `#006948` (Deep Emerald) |
| `on-surface` | `#191c1e` |
| `tertiary` (danger/interest) | `#9b3e3b` |

### 7.3 Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headlines | Manrope | 700–800 | Page titles, section headers, hero numbers |
| Body / Labels / Data | Inter | 400–600 | Input labels, table data, descriptions |
| Table Headers | Inter | 900 (black) | All-caps, wide tracking (`+0.05em`) |

### 7.4 Key Design Principles

- **No hard borders for sectioning** — use background color shifts and tonal layering instead.
- **Glassmorphism** for floating elements (header blur, sticky result card in light mode).
- **Custom range sliders** — emerald thumb with glow, dark track, no native browser styling.
- **Rounded containers** — `rounded-2xl` (1.5 rem) for cards, `rounded-xl` for inputs, `rounded-full` for CTAs.
- **Right-aligned numerical data** in tables for professional legibility.
- **Color-coded financial data** — emerald for principal/positive, rose for interest/cost.

---

## 8. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| **≥ 1280 px (xl)** | Two-column grid (7/5 split). Results card is sticky. |
| **< 1280 px** | Single column. Results card stacks below inputs. |
| **< 768 px (md)** | Top nav hidden, bottom mobile nav shown. Table scrolls horizontally. |

---

## 9. Interactions & Micro-Animations

| Interaction | Behavior |
|---|---|
| Slider drag | Real-time update of all computed values (payment, chart, table) |
| Text input change | Validates and syncs slider position on blur/enter |
| Hover on table row | Subtle background tint (`surface-container-low`) |
| CTA button hover | Slight scale-up (`scale-[1.01]`), lighter emerald tint |
| CTA button press | Scale-down (`scale-95`) for tactile feedback |
| Logo hover | Scale-up (`scale-105`) |
| Logo press | Scale-down (`scale-95`) |
| Recurring Expenses toggle | Expand/collapse section with chevron rotation |
| Nav link hover | Text color transitions to emerald |

---

## 10. Future Scope (Out of MVP)

| Feature | Description |
|---|---|
| **Dividend Calculator** | Second calculator module (nav link present but unimplemented) |
| **Car Loan Calculator** | Third calculator module (nav link present but unimplemented) |
| **Pre-Approval Flow** | CTA button currently non-functional; future integration with lender APIs |
| **User Accounts / Login** | Avatar and notifications are presentational only |
| **Light/Dark Toggle** | Both themes exist as separate HTML files; add runtime toggle |
| **PDF Export** | "Export PDF" button present; needs client-side PDF generation (e.g., jsPDF) |
| **Amortization Chart** | Visual chart (line/area) showing balance over time |
| **PMI Calculation** | Auto-add Private Mortgage Insurance when down payment < 20% |
| **Comparison Mode** | Side-by-side comparison of two loan scenarios |
| **Save/Share Scenarios** | Persist calculations via URL params or user accounts |

---

## 11. Technical Notes

- The current prototype is a **static HTML file** with Tailwind CSS via CDN — no build step required.
- All calculations are client-side JavaScript (to be implemented — current HTML is static mockup data).
- Two theme variants exist as separate files:
  - Dark: [code.html](Stitch/stitch_react_mortgage_calculator-dark-theme/code.html)
  - Light: [Image 2.html](Stitch/Image%202.html)
- Design system specification: [Image 3.markdown](Stitch/Image%203.markdown)
- Reference screenshot: [Image 1.png](Stitch/Image%201.png)

---

## 12. Acceptance Criteria

1. **Accurate Calculations** — Monthly P&I matches the standard amortization formula for all valid input combinations.
2. **Real-Time Reactivity** — Adjusting any slider or input immediately recalculates and updates all dependent values (payment summary, donut chart, amortization table).
3. **Extra Payments** — Entering an extra payment on any period correctly recalculates all subsequent periods, reducing total interest and shortening the loan.
4. **Responsive Layout** — Two-column layout on desktop, single-column on tablet, mobile bottom nav on phones.
5. **Design Fidelity** — Implementation matches the "Digital Architect" design system: no hard borders, correct color tokens, proper typography pairing, glassmorphism effects.
6. **Accessibility** — All inputs have associated labels, focus states are visible, color is not the sole indicator of meaning.
7. **Cross-Browser** — Works on latest Chrome, Firefox, Safari, and Edge.
