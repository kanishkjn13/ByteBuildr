# Byte Build - Enterprise Architecture Manual

This document outlines the directory structure, coding standards, state management, and conventions used across the Byte Build workspace.

---

## 1. Directory Structure

The project root is organized into functional layers:

```
src/
├── admin/          # Admin Dashboard views, proposal builder, and PM views
├── portal/         # Client Portal views (Billing, Support, Chat, Milestones)
├── auth/           # Authentication state context, protection filters, and types
├── components/     # Reusable UI elements, global sections, and common animations
│   ├── common/     # Reusable atomic controls (before/after sliders, skeleton loaders, springs)
│   ├── effects/    # Specialized aesthetic triggers (text highlights, reveals)
│   └── ui/         # Simulated hardware overlays (mockup laptops, phones)
├── constants/      # Routing definitions and path configurations
├── data/           # Hardcoded local structures (projects, FAQ catalogs)
├── hooks/          # Responsive hooks, browser state filters
├── layouts/        # Global layout containers (Lenis smooth scroll, headers)
├── pages/          # Public-facing views (Home, About, Services, Portfolio, Contact)
└── routes/         # Lazy-loaded page route registration matrices
```

---

## 2. Coding & Naming Standards

To ensure readability and code quality, we follow strict conventions:

* **Components**: PascalCase (e.g. `ConsultationModal.tsx`, `Navbar.tsx`).
* **Custom Hooks**: camelCase starting with `use` (e.g. `useBooking.ts`, `useIsMobile.ts`).
* **Utilities / Helpers**: camelCase (e.g. `getInputClass`).
* **Constants**: UPPER_CASE (e.g. `ROUTES`, `DEMO_USERS`).
* **Types / Interfaces**: PascalCase (e.g. `UserProfile`, `LoginCredentials`).
* **Directories**: kebab-case (all folders are kept lowercase and hyphenated).

---

## 3. State Management & Authentication Controls

* **User Authentication**: Managed globally via the custom `AuthContext.tsx` provider, exposing reactive user profiles, login hooks, and loading spinners.
* **Intranet Credentials Enforced**:
  - Email: `admin@bytebuild.security.intranet`
  - Password: `ByteBuild_Security_2026_KeyPass_Alpha!`
* **Client Lockout Protocol**: Any cached client sessions on startup are evicted automatically to secure billing/telemetry dashboards.
* **Role-Based Guards**: Protected routes (`ProtectedRoutes.tsx`) filter unauthorized sub-view accesses.

---

## 4. Reusability & Aesthetics

* **Magnetic Physics**: Standardized spring wrappers (`MagneticButton.tsx`) attract pointer cursors by offset displacements on desktop viewports.
* **Staggered Scroll Storyboards**: Reusable scroll layout wrapper (`ScrollStorySection.tsx`) staggers heading, description, CTAs sequentially on mobile entrances.
* **Neomorphic Layout System**: curates harmonious tailwind dark/light tokens with wide radii (`rounded-[32px]`) and soft neomorphic glows.
