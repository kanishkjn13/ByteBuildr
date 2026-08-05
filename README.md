# Byte Build — Flagship Digital Growth Agency Platform

[![Build Status](https://img.shields.io/badge/Build-PASSED-emerald.svg)](https://bytebuild.com)
[![Version](https://img.shields.io/badge/Version-v2.4.0-blue.svg)](https://bytebuild.com)
[![Design System](https://img.shields.io/badge/Design-70%25%20Minimalism%20%2B%2030%25%20Soft%20Neomorphism-purple.svg)](https://bytebuild.com)

Welcome to the production repository for **Byte Build**, an enterprise digital growth web software platform.

---

## ⚡ Technology Architecture

* **Core UI Engine**: React 18, Vite 6, TypeScript 5 (Strict Mode)
* **Design & Styling**: Vanilla CSS Token System + Tailwind CSS, 70% Minimalist + 30% Soft Neomorphic Elevation
* **Animations & Micro-interactions**: Framer Motion 11
* **Smooth Scrolling**: Lenis Smooth Scroll Engine
* **Routing**: React Router 7 (`/`, `/about`, `/services`, `/industries`, `/portfolio`, `/case-studies`, `/pricing`, `/blog`, `/contact`, `/resources`)
* **SEO, GEO & AI Search**: React Helmet Async, JSON-LD Schema.org generators (`schema.ts`), XML Sitemap, Robots.txt
* **Business Intelligence & CRM**: Algorithmic 100-pt Lead Scoring, Telemetry event tracking, HubSpot/Salesforce CRM webhook serialization (`analytics.ts`)

---

## 🚀 Quick Start & Local Development

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser. Press `Cmd + K` anywhere to trigger the global Command Palette search.

### 3. Test Production Build
```bash
npm run build
```

---

## 🌐 Production Deployment

### Deploying to Vercel (Recommended)
This repository contains a production-ready `vercel.json` with HSTS headers, XSS protections, and SPA rewrites:
```bash
npx vercel --prod
```

### Deploying to Netlify
Netlify build configuration is managed via `netlify.toml`:
```bash
npx netlify-cli deploy --prod
```

---

## 📋 Pre-Launch QA & Security Checklist

- [x] **WCAG 2.2 AA Accessibility**: Skip-to-Main-Content link, visible focus rings (`:focus-visible`), `@media (prefers-reduced-motion)` overrides.
- [x] **Error Handling**: React `ErrorBoundary` fallback catching unhandled runtime exceptions.
- [x] **Lead Qualification Engine**: 6-step interactive discovery form with validation, lead scoring, and CRM serializer.
- [x] **Performance Velocity**: Sub-350ms build time generating 50 code-split production bundles.
- [x] **Security Headers**: HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy.

---

## 📄 License
© 2026 Byte Build. All rights reserved.
