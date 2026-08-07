import type { IndustrySolution, PortfolioProject, ServiceItem, FaqItem, ResourceItem, TechStackItem } from '../types';

export const agencyInfo = {
  name: 'ByteBuilders',
  tagline: 'We build trust',
  subheadline: 'We design and engineer bespoke web platforms, client intake engines, and digital brand experiences that earn long-term trust and accelerate revenue.',
  established: '2026',
  location: 'Indore, India',
  stats: [
    { value: '100%', label: 'Custom Code Architecture' },
    { value: '100/100', label: 'Lighthouse Performance Target' },
    { value: '1-on-1', label: 'Senior Lead Architect Access' },
    { value: 'Sub-500ms', label: 'Global Edge Load Velocity' }
  ]
};

export const trustLogos = [
  { name: 'Aura Health', category: 'Medical Practice', metric: '3.8x Bookings' },
  { name: 'Apex Estates', category: 'Luxury Real Estate', metric: '$18.5M Q1 Sales' },
  { name: 'L’Éclat Dining', category: 'Fine Hospitality', metric: '$65k Saved' },
  { name: 'ByteBuilders Law', category: 'Corporate Practice', metric: '+190% Retainers' },
  { name: 'Equinox MedSpa', category: 'Wellness & Spa', metric: '92% Retention' },
  { name: 'Acadian School', category: 'Executive Academy', metric: '4.5x Enrollment' }
];

export const techStackList: TechStackItem[] = [
  { name: 'React 18', category: 'Frontend Framework', iconName: 'Code2', description: 'Declarative component rendering & UI state management.', badge: 'Core' },
  { name: 'TypeScript', category: 'Type Safety', iconName: 'FileCode', description: 'Strict static typing for robust enterprise application stability.', badge: 'Core' },
  { name: 'Vite', category: 'Build Tooling', iconName: 'Zap', description: 'Lightning-fast module bundling and instant HMR.', badge: 'Performance' },
  { name: 'Framer Motion', category: 'Animation Engine', iconName: 'Layers', description: 'Hardware-accelerated scroll reveals and micro-interactions.', badge: 'UI/UX' },
  { name: 'Vanilla & Modern CSS', category: 'Design System', iconName: 'Palette', description: 'Bespoke design system tokens, variables, & dark mode.', badge: 'Design' },
  { name: 'REST APIs & Webhooks', category: 'Backend Architecture', iconName: 'Database', description: 'High-throughput API endpoints and data pipelines.', badge: 'Backend' },
  { name: 'Stripe Payments', category: 'Checkout & Billing', iconName: 'CreditCard', description: 'PCI-compliant direct checkout & retainer processing.', badge: 'Payments' },
  { name: 'Node.js & Express', category: 'Runtime Environment', iconName: 'Cpu', description: 'Asynchronous event-driven server runtime.', badge: 'Backend' },
  { name: 'PostgreSQL', category: 'Database System', iconName: 'Database', description: 'ACID-compliant relational database storage.', badge: 'Data' },
  { name: 'Cloudflare Edge CDN', category: 'Global Infrastructure', iconName: 'Globe', description: 'Global edge caching, SSL encryption, & DDoS protection.', badge: 'Deployment' }
];

export const industrySolutions: IndustrySolution[] = [
  {
    id: 'healthcare',
    name: 'Clinics & Hospitals',
    category: 'Healthcare & Wellness',
    iconName: 'Activity',
    headline: 'HIPAA-Compliant Patient Intake & Online Booking Engine',
    description: 'Transform your medical practice with frictionless online scheduling, automated EHR synchronization, patient portals, and high-trust clinic branding.',
    targetClients: ['Multi-Specialty Clinics', 'Dental Practices', 'Cosmetic Surgery Centers', 'Mental Health Practices', 'Private Hospitals'],
    keyOutcomes: [
      '3.8x Increase in Online Patient Appointments',
      '85% Reduction in Staff Scheduling Phone Overhead',
      'Zero-Friction Mobile Intake & Patient Portals'
    ],
    metrics: [
      { label: 'Booking Uplift', value: '+280%' },
      { label: 'Patient Retention', value: '92%' },
      { label: 'Load Speed', value: '0.4s' }
    ],
    featuredTech: ['React.js', 'HIPAA API Sync', 'Soft Neomorphic UI', 'Twilio SMS']
  },
  {
    id: 'realestate',
    name: 'Real Estate & Architecture',
    category: 'Property & Design',
    iconName: 'Building2',
    headline: 'Immersive 3D Property Showcases & High-Intent Buyer Engines',
    description: 'Elevate luxury developments, architectural studios, and commercial brokerages with cinematic property presentation, interactive floor plans, and VIP lead capture.',
    targetClients: ['Luxury Property Developers', 'Architecture Studios', 'Commercial Brokerages', 'Interior Designers', 'Residential Firms'],
    keyOutcomes: [
      'Interactive 360° Property Tour Integration',
      '4.2x Higher Qualified Inquiries from High-Net-Worth Buyers',
      'Automated Lead Scoring & CRM Pipeline Synchronization'
    ],
    metrics: [
      { label: 'High-Intent Leads', value: '+340%' },
      { label: 'Avg Time on Site', value: '4m 12s' },
      { label: 'Closing Velocity', value: '+45%' }
    ],
    featuredTech: ['WebGL / 3D Canvas', 'Vite React', 'Mapbox SDK', 'HubSpot API']
  },
  {
    id: 'hospitality',
    name: 'Restaurants & Hotels',
    category: 'Hospitality & Dining',
    iconName: 'Utensils',
    headline: 'Direct Reservation Engines & Interactive Culinary Menus',
    description: 'Eliminate third-party commission fees with custom direct-booking engines, table reservations, interactive culinary showcases, and guest concierge portals.',
    targetClients: ['Fine Dining Restaurants', 'Boutique Luxury Hotels', 'Café Chains', 'Resorts & Spas', 'Hospitality Groups'],
    keyOutcomes: [
      'Zero 3rd-Party Commission Fees on Direct Bookings',
      'Instant QR & Mobile Menu Ordering Experience',
      'Dynamic Event & VIP Private Dining Reservation Flow'
    ],
    metrics: [
      { label: 'Direct Bookings', value: '+310%' },
      { label: 'Commission Saved', value: '$65k/yr' },
      { label: 'Mobile Conversion', value: '8.4%' }
    ],
    featuredTech: ['Realtime Reservations', 'Stripe POS Sync', 'Touch Optimized', 'PWA Support']
  },
  {
    id: 'legal',
    name: 'Lawyers & CAs',
    category: 'Professional Services',
    iconName: 'Scale',
    headline: 'Authority-Building Client Intake & Consultation Funnels',
    description: 'Project unshakeable trust and prestige with high-conversion intake questionnaires, retainer payment portals, and secure document vaults.',
    targetClients: ['Corporate Law Firms', 'Chartered Accountant Practices', 'Tax Consultants', 'Wealth Advisors', 'Audit Firms'],
    keyOutcomes: [
      'Automated Client Intake & Conflict Check Flow',
      'High-Ticket Retainer Lead Generation',
      '256-Bit Encrypted Client Portal & Document Submission'
    ],
    metrics: [
      { label: 'Retainer Volume', value: '+190%' },
      { label: 'Qualifying Speed', value: '10x' },
      { label: 'Trust Rating', value: '99/100' }
    ],
    featuredTech: ['Encrypted Storage', 'Typeform Integration', 'Stripe Billing', 'Next-Gen UI']
  },
  {
    id: 'fitness',
    name: 'Gyms & Salons',
    category: 'Wellness & Lifestyle',
    iconName: 'Dumbbell',
    headline: 'Recurring Membership Engines & Instant Class Scheduling',
    description: 'Scale recurring subscription revenue for fitness clubs, boutique wellness studios, and premium salons with seamless mobile member portals.',
    targetClients: ['CrossFit & Fitness Studios', 'MedSpas', 'Luxury Hair & Beauty Salons', 'Personal Training Academies', 'Wellness Centers'],
    keyOutcomes: [
      'Automated Recurring Monthly Membership Billing',
      'Realtime Class & Specialist Slot Booking',
      'Automated Attendance & Re-engagement Reminders'
    ],
    metrics: [
      { label: 'Member Retention', value: '+42%' },
      { label: 'Trial Conversions', value: '38%' },
      { label: 'No-Show Reduction', value: '-75%' }
    ],
    featuredTech: ['Stripe Billing', 'Calendar Matrix', 'PWA App', 'Twilio']
  },
  {
    id: 'education',
    name: 'Schools & Coaching',
    category: 'Education & Academies',
    iconName: 'GraduationCap',
    headline: 'Student Admissions Funnels & Interactive Learning Portals',
    description: 'Streamline admissions, course inquiries, virtual campus tours, and student enrollment with modern educational web platforms.',
    targetClients: ['Private Schools', 'Coaching Institutes', 'Executive Education Academies', 'Language Institutes', 'EdTech Ventures'],
    keyOutcomes: [
      '4.5x Enrollment Inquiry Growth',
      'Automated Application & Document Submission Engine',
      'Parent & Student Dashboard with Course Management'
    ],
    metrics: [
      { label: 'Enquiries Uplift', value: '+350%' },
      { label: 'Admissions Cycle', value: '-50% Time' },
      { label: 'Student Rating', value: '4.9/5' }
    ],
    featuredTech: ['React Portal', 'Video Streaming', 'LMS Integration', 'Fast CDN']
  },
  {
    id: 'architecture',
    name: 'Construction & Interior',
    category: 'Engineering & Craftsmanship',
    iconName: 'Compass',
    headline: 'High-Impact Portfolio Showcases & Commercial RFP Capture',
    description: 'Win multi-million dollar commercial projects with interactive project galleries, material spec calculators, and enterprise RFQ workflows.',
    targetClients: ['General Contractors', 'Interior Architecture Studios', 'Civil Engineering Firms', 'Custom Builders', 'Design Studios'],
    keyOutcomes: [
      'Cinematic High-Resolution Project Showcase',
      'Structured Commercial RFP Request Engine',
      'Interactive Material & Budget Estimator'
    ],
    metrics: [
      { label: 'Commercial RFPs', value: '+220%' },
      { label: 'Avg Deal Size', value: '$850k' },
      { label: 'Client Satisfaction', value: '100%' }
    ],
    featuredTech: ['High-Res Image Pipeline', 'Interactive Canvas', 'PDF Generator']
  },
  {
    id: 'startups',
    name: 'Startups & SMBs',
    category: 'High-Growth Tech',
    iconName: 'Rocket',
    headline: 'Conversion-Engineered Product Launches & SaaS Landing Hubs',
    description: 'Launch your product or scale your business with investor-ready web architecture, viral lead loops, and enterprise scalability.',
    targetClients: ['SaaS Ventures', 'AI Product Startups', 'Fintech Platforms', 'D2C Brands', 'Growth SMBs'],
    keyOutcomes: [
      'Sub-Second Page Load Speed on Global Edge Network',
      'A/B Tested Hero Conversion Architecture',
      'Full Analytics, CRM & Payment Stack Setup'
    ],
    metrics: [
      { label: 'Waitlist Leads', value: '12,500+' },
      { label: 'Page Speed', value: '99/100' },
      { label: 'Investor Traction', value: '$4.2M Raised' }
    ],
    featuredTech: ['Vite', 'React TS', 'PostgreSQL Sync', 'Analytics Pipeline']
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-healthcare',
    industryId: 'healthcare',
    title: 'Aura Health Clinics • Patient Intake & Booking Engine',
    clientName: 'Aura Health Clinics',
    summary: 'Soft neomorphic web application with 1-click calendar booking and instant digital patient intake.',
    tags: ['Healthcare', 'Web App', 'Booking Engine'],
    heroImage: '/images/clinic.png',
    result: '+280% Patient Appointments',
    projectType: 'web'
  },
  {
    id: 'proj-realestate',
    industryId: 'realestate',
    title: 'Apex Estates • Luxury Real Estate Portal',
    clientName: 'Apex Luxury Real Estate',
    summary: 'High-speed web portal featuring interactive property previews and VIP inquiry channels.',
    tags: ['Real Estate', 'Luxury Portal', 'Interactive UI'],
    heroImage: '/images/realestate.png',
    result: '$18.5M Qualified Sales',
    projectType: 'web'
  },
  {
    id: 'proj-hospitality',
    industryId: 'hospitality',
    title: "L'Éclat Restaurant & Boutique Hotel",
    clientName: "L'Éclat Hospitality Group",
    summary: 'Direct table reservation engine with digital culinary previews and guest notifications.',
    tags: ['Hospitality', 'Direct Reservations', 'Stripe POS'],
    heroImage: '/images/hospitality.png',
    result: '$65,000 Saved in Fees',
    projectType: 'web'
  },
  {
    id: 'proj-law',
    industryId: 'legal',
    title: 'ByteBuilders Law • Legal Intake & Retainer Platform',
    clientName: 'ByteBuilders Corporate Law',
    summary: 'Secure legal client onboarding portal with dynamic legal intake questionnaires and Stripe retainers.',
    tags: ['Legal Tech', 'Intake Funnel', 'Retainers'],
    heroImage: '/images/realestate.png',
    result: '+190% Monthly Retainers',
    projectType: 'web'
  },
  {
    id: 'proj-medspa',
    industryId: 'healthcare',
    title: 'Equinox MedSpa • Mobile Intake App',
    clientName: 'Equinox MedSpa',
    summary: 'Lightweight mobile web onboarding companion with touch-friendly scheduler, treatment visualizer, and custom service consultation.',
    tags: ['Wellness', 'Mobile Web App', 'Intake Engine'],
    heroImage: '/images/clinic.png',
    result: '92% Customer Retention',
    projectType: 'mobile'
  },
  {
    id: 'proj-portfolio',
    industryId: 'architecture',
    title: 'Studio Horizon • Immersive Architectural Portfolio',
    clientName: 'Studio Horizon Architects',
    summary: 'Sub-500ms immersive portfolio showcase featuring modular media grids, interactive project stories, and consultation intake channels.',
    tags: ['Architecture', 'Creative Portfolio', 'Media Optimization'],
    heroImage: '/images/realestate.png',
    result: '+140% Qualified Inquiries',
    projectType: 'portfolio'
  },
  {
    id: 'proj-portfolio-2',
    industryId: 'startups',
    title: 'Vanguard Studio • Creative Director Immersive Portfolio',
    clientName: 'Vanguard Creative Director',
    summary: 'Cinematic, dark-mode portfolio showcase with fluid animations, dynamic work filters, and integrated consulting scheduler.',
    tags: ['Creative Director', 'Media Showcase', 'Framer Motion'],
    heroImage: '/images/realestate.png',
    result: '+165% Agency Bookings',
    projectType: 'portfolio'
  },
  {
    id: 'proj-portfolio-3',
    industryId: 'startups',
    title: 'Aether Gallery • Immersive Photography Portfolio',
    clientName: 'Aether Studio Photography',
    summary: 'Ultra-high resolution photography showcase featuring zero-layout shift masonry grids, next-gen WebP compression pipelines, and booking triggers.',
    tags: ['Photography', 'Media Showcase', 'WebP Optimizer'],
    heroImage: '/images/hospitality.png',
    result: '+150% Booking Conversion',
    projectType: 'portfolio'
  }
];

export const servicesList: ServiceItem[] = [
  {
    id: 'service-web-engineering',
    title: 'Custom Web Apps & Flagship Websites',
    shortDesc: 'Bespoke, high-performance web platforms engineered with React, Vite, and soft neomorphic UI systems.',
    fullDesc: 'We craft digital flagships tailored to your exact business workflow. Zero clunky templates, zero bloatware—just ultra-fast, robust web software designed for high conversion and enterprise stability.',
    icon: 'Code2',
    outcomes: [
      'Sub-500ms lightning page load speeds',
      'Responsive soft neomorphic & minimalist design',
      'Enterprise-grade security and SEO foundation'
    ],
    deliverables: ['Custom React App', 'CMS Integration', 'Global CDN Deployment', 'Core Web Vitals 99+'],
    badge: 'Core Capability'
  },
  {
    id: 'service-lead-engine',
    title: 'High-Conversion Lead Platforms & Funnels',
    shortDesc: 'Turning passive website visitors into qualified consultations, appointments, and long-term clients.',
    fullDesc: 'We don’t measure success by visitors; we measure by revenue. Every layout, CTA button, questionnaire, and form is engineered with psychology-backed conversion rate optimization.',
    icon: 'Target',
    outcomes: [
      'Multi-step intake forms that boost submission rates significantly',
      'Automated CRM sync (HubSpot, Salesforce, Pipedrive)',
      'Instant calendar booking and SMS confirmation loops'
    ],
    deliverables: ['Lead Capture System', 'Interactive Estimator', 'Automated Email Follow-up', 'A/B Testing Framework'],
    badge: 'Highest Business Impact'
  },
  {
    id: 'service-booking-systems',
    title: 'Automated Booking & Client Intake Systems',
    shortDesc: 'Custom scheduling, payment collection, and appointment management tailored to your practice.',
    fullDesc: 'Free your team from phone tag and manual scheduling. We build seamless, self-serve booking engines for clinics, salons, law firms, and consulting practices with integrated payments.',
    icon: 'CalendarCheck',
    outcomes: [
      '24/7 self-service scheduling for clients',
      'Automated deposit and upfront payment collection',
      'Eliminate up to 80% of scheduling admin work'
    ],
    deliverables: ['Calendar Sync', 'Stripe Payment Gateway', 'Reminders Matrix', 'Admin Management Console']
  },
  {
    id: 'service-uiux-system',
    title: 'Soft Neomorphic UI/UX & Design Systems',
    shortDesc: 'Creating tactile, memorable visual experiences that build immediate credibility and brand prestige.',
    fullDesc: 'Stand out in a sea of flat, generic corporate templates. Our design team creates soft neomorphic interfaces with subtle depth, elegant typography, and micro-interactions that inspire confidence.',
    icon: 'Layers',
    outcomes: [
      'Unique visual identity that commands premium pricing',
      'Fully accessible, WCAG-compliant interface tokens',
      'Scalable design component system in Figma'
    ],
    deliverables: ['Complete UI Kit', 'Dark/Light Theme Tokens', 'Component Library', 'Interactive Prototypes'],
    badge: 'Design Signature'
  },
  {
    id: 'service-seo-growth',
    title: 'Organic SEO & Performance Engineering',
    shortDesc: 'Dominating search results with technical SEO, page velocity, and semantic content architecture.',
    fullDesc: 'Position your business at the top of Google for high-intent keywords. We optimize structure, meta schema, site velocity, and content hierarchy so customers find you first.',
    icon: 'TrendingUp',
    outcomes: [
      'Top Google rankings for targeted industry search terms',
      'Schema markup for Rich Snippets (Local Business, Medical, Event)',
      'Clean Semantic HTML5 structured for search engine crawlers'
    ],
    deliverables: ['Technical SEO Audit', 'Local Business Schema', 'Speed Optimization', 'Rank Tracking Dashboard']
  },
  {
    id: 'service-automation',
    title: 'AI Assistant & CRM Workflow Integration',
    shortDesc: 'Integrating intelligent AI agents, automated lead scoring, and CRM automations into your site.',
    fullDesc: 'Empower your web presence with intelligent agents that qualify leads 24/7, answer client FAQs instantly, and route high-value opportunities to your team automatically.',
    icon: 'Bot',
    outcomes: [
      'Instant 24/7 response time to customer inquiries',
      'Automated lead qualification before booking calls',
      'Seamless API integrations with your existing software stack'
    ],
    deliverables: ['Custom AI Chat Assistant', 'Webhook Integrations', 'Automated Email Workflows', 'Staff Notification Bot']
  }
];

export const processTimeline = [
  {
    step: '01',
    title: 'Discovery & Business ROI Audit',
    desc: 'We analyze your target market, current conversion bottlenecks, and competitors to map out a high-ROI digital strategy.',
    deliverable: 'Strategic Blueprint & Feature Roadmap'
  },
  {
    step: '02',
    title: 'Architecture & UX Wireframing',
    desc: 'We map user journeys specifically designed to move visitors from curiosity to booking a consultation naturally.',
    deliverable: 'Interactive Low-Fi UX Blueprint'
  },
  {
    step: '03',
    title: 'Bespoke UI/UX Design System',
    desc: 'We craft high-fidelity interface designs with modern minimalism and tactile visual elevation that elevate brand prestige.',
    deliverable: 'Figma System & High-Fi Prototypes'
  },
  {
    step: '04',
    title: 'Web Engineering & Integrations',
    desc: 'We engineer your platform with ultra-fast modular code. We connect payment gateways, booking engines, and CRM pipelines.',
    deliverable: 'Production Code & API Integrations'
  },
  {
    step: '05',
    title: 'Performance QA & Launch',
    desc: 'We conduct 50+ checklist audits covering 100/100 Lighthouse speed, security, responsiveness, accessibility, and lead tracking.',
    deliverable: 'Live Deployment & Growth Handoff'
  }
];



export const faqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Will your team understand the unique requirements of my business?',
    answer: 'Yes. Before writing a single line of code, we conduct a deep Business ROI Discovery Audit tailored to your industry—whether you run a medical clinic, law practice, real estate brokerage, fine dining establishment, or tech startup. We study your client acquisition bottlenecks and design custom workflows matching your exact business model.',
    category: 'Partnership'
  },
  {
    id: 'faq-2',
    question: 'How does the collaboration process work, and will communication be easy?',
    answer: 'Communication is simple, direct, and transparent. You work directly with a dedicated Senior Web Architect. We use async video updates, weekly milestone reviews, and a clear 5-phase roadmap. Zero jargon, zero corporate noise—just clear, actionable progress updates.',
    category: 'Process & Speed'
  },
  {
    id: 'faq-3',
    question: 'Will our new website actually generate qualified leads and revenue?',
    answer: 'Every layout, button, form, and page hierarchy we design is engineered with psychology-backed Conversion Rate Optimization (CRO). Rather than building static digital brochures, we build automated client intake engines, interactive scope calculators, and direct reservation tools that convert casual visitors into booked consultations.',
    category: 'ROI & Growth'
  },
  {
    id: 'faq-4',
    question: 'What launch timelines do you offer, and can we request express delivery?',
    answer: 'Our standard growth project velocity is 4 to 6 weeks. For time-sensitive product launches or practice inaugurations, we offer an Express Velocity track (2 to 3 weeks) with dedicated engineering resources.',
    category: 'Process & Speed'
  },
  {
    id: 'faq-5',
    question: 'Do you provide long-term technical support and maintenance after launch?',
    answer: 'We view every engagement as a long-term strategic partnership. Following launch, we provide ongoing speed audits, security updates, feature expansions, and conversion monitoring so your platform scales as your business grows.',
    category: 'Support'
  },
  {
    id: 'faq-6',
    question: 'Is there any obligation when booking an initial strategy consultation?',
    answer: 'None whatsoever. Our initial 30-minute strategy call is a free, 100% consultative conversation. We review your current digital presence, evaluate your growth goals, and present a clear architectural blueprint—with zero high-pressure sales tactics.',
    category: 'Partnership'
  }
];

export const resourcesList: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'The 2026 Digital Practice ROI Checklist',
    description: 'A 50-point audit framework for medical clinic directors and practice owners to evaluate patient intake conversion.',
    category: 'Healthcare Growth',
    fileType: 'PDF Guide',
    fileSize: '2.4 MB',
    downloadUrl: '#'
  },
  {
    id: 'res-2',
    title: 'Luxury Property 3D Tour & Conversion Blueprint',
    description: 'Best practices for high-net-worth real estate brokerages to capture international buyer leads.',
    category: 'Real Estate Architecture',
    fileType: 'Whitepaper',
    fileSize: '3.8 MB',
    downloadUrl: '#'
  }
];
