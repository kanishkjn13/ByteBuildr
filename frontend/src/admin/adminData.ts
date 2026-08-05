import type {
  AdminMetric,
  AdminActivityItem,
  AdminNotification,
  AdminLead,
  AdminConsultation,
  AdminFollowUp,
  AdminClientItem,
  AdminProjectItem,
  AdminTeamMember,
  AdminRoleItem,
  AdminQuoteItem,
  AdminInvoiceItem,
  AdminPaymentLog,
  AdminExpenseItem,
  AdminCMSItem,
  AdminMeetingItem,
  AdminDeadlineItem,
  AdminSearchItem
} from './types';

export const mockAdminMetrics: AdminMetric[] = [
  { id: 'm-1', title: 'Total Leads', value: '24', change: '+18.4%', isPositive: true, subtext: '8 High-Value Enterprise Qualified' },
  { id: 'm-2', title: 'Active Clients', value: '12', change: '+12.0%', isPositive: true, subtext: '100% SLA Compliance Rate' },
  { id: 'm-3', title: 'Active Projects', value: '8', change: '+25.0%', isPositive: true, subtext: 'Sub-500ms Speed Standards Met' },
  { id: 'm-4', title: 'Pending Tasks', value: '15', change: '-8.5%', isPositive: true, subtext: '4 High Priority Backlog Items' },
  { id: 'm-5', title: 'Revenue Overview', value: '$148,500.00', change: '+22.4%', isPositive: true, subtext: 'MTD Paid & Verified Invoices' }
];

export const mockAdminActivities: AdminActivityItem[] = [
  { id: 'act-1', type: 'lead', title: 'New Enterprise Lead: Apex Global Real Estate ($85k)', timestamp: '12 min ago', user: 'Inbound Form' },
  { id: 'act-2', type: 'payment', title: 'Invoice INV-2026-002 Paid ($7,500.00)', timestamp: '45 min ago', user: 'Alex Vance (Client)' },
  { id: 'act-3', type: 'project', title: 'Project Milestone "Figma UI Tokens" Completed', timestamp: '2 hours ago', user: 'Marcus Vance' },
  { id: 'act-4', type: 'media', title: '4 High-Res WebGL 3D Model Assets Uploaded', timestamp: '3 hours ago', user: '3D Designer' },
  { id: 'act-5', type: 'message', title: 'Client Reply on Support Ticket TICK-2026-084', timestamp: '4 hours ago', user: 'Alex Vance' },
  { id: 'act-6', type: 'task', title: 'Core Web Vitals sub-500ms Staging Audit Passed', timestamp: 'Yesterday', user: 'Lead Engineer' },
  { id: 'act-7', type: 'lead', title: 'Proposal Sent to Lumina Health Systems ($60k)', timestamp: 'Yesterday', user: 'Sales Exec' },
  { id: 'act-8', type: 'project', title: 'Project Kickoff Deposit Confirmed ($15,000.00)', timestamp: '2 days ago', user: 'Finance Dept' },
  { id: 'act-9', type: 'media', title: 'Brand Vector SVG Asset Package Published', timestamp: '2 days ago', user: 'Brand Team' },
  { id: 'act-10', type: 'task', title: 'Stripe 256-Bit Webhook Integration Deployed', timestamp: '3 days ago', user: 'Backend Dev' }
];

export const mockAdminNotifications: AdminNotification[] = [
  { id: 'an-1', category: 'lead', title: 'New Inbound Lead Received', description: 'Apex Global Real Estate requested a 3D WebGL showcase proposal.', timestamp: '10 min ago', read: false },
  { id: 'an-2', category: 'payment', title: 'Stripe PCI Payment Confirmed', description: 'Aura Health paid Invoice INV-2026-002 ($7,500.00).', timestamp: '45 min ago', read: false },
  { id: 'an-3', category: 'message', title: 'New Client Message', description: 'Alex Vance replied on Ticket TICK-2026-084 regarding webhook speed.', timestamp: '2 hours ago', read: false },
  { id: 'an-4', category: 'project', title: 'Sprint Review Scheduled', description: 'Marcus Vance scheduled Phase 4 Sprint Review for tomorrow at 2 PM.', timestamp: '3 hours ago', read: true },
  { id: 'an-5', category: 'ticket', title: 'High Priority Ticket Created', description: 'Staging billing webhook timeout report submitted by client.', timestamp: '4 hours ago', read: true }
];

export const mockAdminLeads: AdminLead[] = [
  {
    id: 'l-1',
    name: 'Apex Global Real Estate Showcase',
    company: 'Apex Global Group',
    email: 'contact@apexglobal.com',
    phone: '+1 (212) 555-0199',
    budget: '$85,000.00',
    stage: 'New Lead',
    priority: 'Urgent',
    service: '3D WebGL Real Estate Showcase',
    source: 'Website Contact Form',
    assignedManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    lastActivity: '12 min ago',
    timeline: '6 Weeks',
    requirements: 'Custom WebGL 3D property walkthrough engine with direct lead intake and HNW client appointment booking.',
    notes: [
      'Submitted contact form requesting a 3D WebGL property showcase.',
      'High priority inbound lead from Manhattan luxury developer.'
    ],
    date: 'Today'
  },
  {
    id: 'l-2',
    name: 'Lumina Medical Systems Portal',
    company: 'Lumina Health Care',
    email: 'inquiries@luminamed.org',
    phone: '+1 (415) 555-0144',
    budget: '$60,000.00',
    stage: 'Proposal Sent',
    priority: 'High',
    service: 'HIPAA Medical Web Portal',
    source: 'Referral',
    assignedManager: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    lastActivity: 'Yesterday',
    timeline: '8 Weeks',
    requirements: 'HIPAA-compliant patient appointment intake, electronic record integration, and Stripe checkout.',
    notes: [
      'Proposal sent covering 4-phase rollout plan.',
      'Awaiting procurement team review on Nov 5.'
    ],
    date: 'Yesterday'
  },
  {
    id: 'l-3',
    name: 'Horizon Luxury Hotels Web Platform',
    company: 'Horizon Hospitality',
    email: 'dev@horizonhotels.com',
    phone: '+1 (305) 555-0182',
    budget: '$120,000.00',
    stage: 'Qualified',
    priority: 'High',
    service: 'Luxury Hotel Booking Platform',
    source: 'Inbound Inquiry',
    assignedManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    lastActivity: 'Oct 28',
    timeline: '10 Weeks',
    requirements: 'Bespoke hotel suite reservation system with multi-currency checkout and real-time room availability API.',
    notes: [
      'Discovery call completed with VP of Digital Marketing.',
      'Qualified for $120k enterprise scope.'
    ],
    date: 'Oct 28'
  },
  {
    id: 'l-4',
    name: 'Aura Health Flagship Platform',
    company: 'Aura Health Group',
    email: 'alex@aurahealth.com',
    phone: '+1 (415) 890-3420',
    budget: '$30,000.00',
    stage: 'Won',
    priority: 'Medium',
    service: 'Flagship Web App',
    source: 'Direct Client',
    assignedManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    lastActivity: 'Oct 10',
    timeline: '4 Weeks',
    requirements: 'React 18 frontend engineering with sub-500ms Core Web Vitals.',
    notes: [
      'Converted to active client (Phase 4 in progress).'
    ],
    date: 'Oct 10'
  }
];

export const mockAdminConsultations: AdminConsultation[] = [
  { id: 'c-1', clientName: 'Apex Global Real Estate', company: 'Apex Group', date: 'Tomorrow', time: '02:00 PM EST', meetUrl: 'https://meet.google.com/apex-discovery', status: 'Upcoming', assignedMember: 'Marcus Vance' },
  { id: 'c-2', clientName: 'Lumina Health Systems', company: 'Lumina Med', date: 'Friday, Nov 14', time: '11:00 AM EST', meetUrl: 'https://zoom.us/j/lumina-sync', status: 'Upcoming', assignedMember: 'Elena Rostova' },
  { id: 'c-3', clientName: 'Horizon Hospitality Group', company: 'Horizon Hotels', date: 'Oct 28, 2026', time: '03:30 PM EST', meetUrl: 'https://meet.google.com/horizon-past', status: 'Completed', assignedMember: 'Marcus Vance' }
];

export const mockAdminFollowUps: AdminFollowUp[] = [
  { id: 'f-1', leadName: 'Apex Global Real Estate', company: 'Apex Group', nextDate: 'Nov 04, 2026', reminder: 'Send customized WebGL 3D property demo video.', assignedPerson: 'Marcus Vance', status: 'Pending', notes: 'High priority lead review.' },
  { id: 'f-2', leadName: 'Lumina Health Systems', company: 'Lumina Med', nextDate: 'Nov 06, 2026', reminder: 'Follow up on proposal procurement sign-off.', assignedPerson: 'Elena Rostova', status: 'Pending', notes: 'Proposal sent Oct 30.' }
];

export const mockAdminClients: AdminClientItem[] = [
  {
    id: 'cli-1',
    name: 'Alex Vance',
    company: 'Aura Health Medical Group',
    email: 'alex@aurahealth.com',
    phone: '+1 (415) 890-3420',
    industry: 'Healthcare & Medical Tech',
    website: 'https://aurahealth.com',
    gstNumber: 'TAX-2026-US-8910',
    address: '100 Medical Center Blvd, Suite 400',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    status: 'VIP Tier',
    projectManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    activeProjects: [
      {
        id: 'p-101',
        name: 'Aura Health Flagship Platform',
        phase: 'Phase 4: Final Polishing & Launch',
        progress: 75,
        deadline: 'Nov 30, 2026',
        status: 'In Progress'
      }
    ],
    outstandingBalance: '$7,500.00',
    totalPaid: '$22,500.00',
    lastActivity: '10 min ago',
    joinedDate: 'July 2026'
  },
  {
    id: 'cli-2',
    name: 'Sarah Jenkins',
    company: 'Horizon Luxury Resorts',
    email: 'sarah@horizonresorts.com',
    phone: '+1 (305) 555-0812',
    industry: 'Hospitality & Travel',
    website: 'https://horizonresorts.com',
    gstNumber: 'TAX-2026-US-4412',
    address: '500 Ocean Drive, Suite 12',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    status: 'Active',
    projectManager: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    activeProjects: [
      {
        id: 'p-102',
        name: 'Horizon Resort Booking Engine',
        phase: 'Phase 2: Booking Engine API',
        progress: 40,
        deadline: 'Dec 15, 2026',
        status: 'In Progress'
      }
    ],
    outstandingBalance: '$0.00',
    totalPaid: '$45,000.00',
    lastActivity: 'Yesterday',
    joinedDate: 'August 2026'
  },
  {
    id: 'cli-3',
    name: 'Robert Sterling',
    company: 'Sterling Capital Partners',
    email: 'robert@sterlingcap.com',
    phone: '+1 (212) 555-9011',
    industry: 'Financial Services & VC',
    website: 'https://sterlingcap.com',
    gstNumber: 'TAX-2026-US-1190',
    address: '250 Park Avenue, 30th Floor',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    status: 'Onboarding',
    projectManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    activeProjects: [
      {
        id: 'p-103',
        name: 'Sterling VC Portfolio Portal',
        phase: 'Phase 1: Architecture & Token System',
        progress: 15,
        deadline: 'Jan 20, 2027',
        status: 'In Progress'
      }
    ],
    outstandingBalance: '$15,000.00',
    totalPaid: '$15,000.00',
    lastActivity: '2 days ago',
    joinedDate: 'October 2026'
  }
];

export const mockAdminProjects: AdminProjectItem[] = [
  {
    id: 'prj-101',
    name: 'Aura Health Flagship Web Platform',
    clientName: 'Alex Vance',
    company: 'Aura Health Medical Group',
    projectType: 'Healthcare Web Platform',
    status: 'Development',
    health: 'Healthy',
    progress: 75,
    currentPhase: 'Phase 4: Final Polishing & Launch',
    deadline: 'Nov 30, 2026',
    startDate: 'Oct 01, 2026',
    budget: '$30,000.00',
    projectManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    teamMembers: [
      { role: 'UI/UX Designer', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
      { role: 'Full-Stack Developer', name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }
    ],
    milestones: [
      { id: 'm-101', projectId: 'prj-101', title: 'Figma UI Component System', description: 'Soft neomorphic luxury component design kit.', dueDate: 'Oct 15, 2026', completedDate: 'Oct 14, 2026', assignedTeam: ['Elena Rostova'], status: 'Completed', progress: 100 },
      { id: 'm-102', projectId: 'prj-101', title: 'React 18 Frontend Architecture', description: 'Core Web Vitals sub-500ms speed target.', dueDate: 'Nov 05, 2026', assignedTeam: ['David Chen'], status: 'In Progress', progress: 85 },
      { id: 'm-103', projectId: 'prj-101', title: 'Stripe 256-Bit Billing Integration', description: 'PCI-compliant checkout and client portal webhook.', dueDate: 'Nov 20, 2026', assignedTeam: ['David Chen'], status: 'Pending', progress: 40 }
    ],
    deliverables: [
      'Interactive Figma UI Tokens & Source Files',
      'Production Vite React Web App Codebase',
      'Stripe PCI Billing Webhook Backend',
      'Technical System Documentation'
    ],
    lastActivity: '10 min ago'
  },
  {
    id: 'prj-102',
    name: 'Horizon Resort Booking Engine',
    clientName: 'Sarah Jenkins',
    company: 'Horizon Luxury Resorts',
    projectType: 'Hospitality & Travel Engine',
    status: 'UI/UX Design',
    health: 'Needs Attention',
    progress: 40,
    currentPhase: 'Phase 2: Booking Engine API',
    deadline: 'Dec 15, 2026',
    startDate: 'Oct 15, 2026',
    budget: '$45,000.00',
    projectManager: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    teamMembers: [
      { role: 'UI/UX Designer', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' }
    ],
    milestones: [
      { id: 'm-201', projectId: 'prj-102', title: 'Wireframes & User Flow Approval', description: 'High-converting luxury suite booking funnel.', dueDate: 'Nov 10, 2026', assignedTeam: ['Elena Rostova'], status: 'In Progress', progress: 60 }
    ],
    deliverables: [
      'Figma High-Fidelity Design System',
      'Multi-currency Room API Integration'
    ],
    lastActivity: 'Yesterday'
  },
  {
    id: 'prj-103',
    name: 'Sterling VC Portfolio Portal',
    clientName: 'Robert Sterling',
    company: 'Sterling Capital Partners',
    projectType: 'Fintech VC Portal',
    status: 'Planning',
    health: 'Healthy',
    progress: 15,
    currentPhase: 'Phase 1: Architecture & Token System',
    deadline: 'Jan 20, 2027',
    startDate: 'Nov 01, 2026',
    budget: '$30,000.00',
    projectManager: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    teamMembers: [
      { role: 'Product Architect', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' }
    ],
    milestones: [
      { id: 'm-301', projectId: 'prj-103', title: 'Scope & Architecture Sign-Off', description: 'System requirements spec & security protocol.', dueDate: 'Nov 25, 2026', assignedTeam: ['Marcus Vance'], status: 'Pending', progress: 20 }
    ],
    deliverables: [
      'Technical Architecture Blueprint',
      'Security Audit Compliance Documentation'
    ],
    lastActivity: '2 days ago'
  }
];

export const mockAdminTeam: AdminTeamMember[] = [
  {
    id: 'tm-1',
    name: 'Marcus Vance',
    role: 'Senior Product Architect',
    department: 'Engineering & Product Architecture',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    email: 'marcus@bytebuild.dev',
    phone: '+1 (415) 555-0199',
    status: 'Available',
    workloadCapacity: 75,
    workingHours: '09:00 AM - 06:00 PM EST',
    assignedProjects: [
      { id: 'prj-101', name: 'Aura Health Flagship Web Platform', role: 'Lead Architect', deadline: 'Nov 30, 2026' },
      { id: 'prj-103', name: 'Sterling VC Portfolio Portal', role: 'System Architect', deadline: 'Jan 20, 2027' }
    ],
    completedProjectsCount: 14,
    skills: ['React 18', 'WebGL 3D', 'Stripe PCI', 'System Architecture', 'Node.js'],
    lastActivity: 'Active now'
  },
  {
    id: 'tm-2',
    name: 'Elena Rostova',
    role: 'Lead UI/UX Designer',
    department: 'Design System & Luxury UI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    email: 'elena@bytebuild.dev',
    phone: '+1 (415) 555-0188',
    status: 'Available',
    workloadCapacity: 60,
    workingHours: '09:00 AM - 05:00 PM EST',
    assignedProjects: [
      { id: 'prj-101', name: 'Aura Health Flagship Web Platform', role: 'Lead UI Designer', deadline: 'Nov 30, 2026' },
      { id: 'prj-102', name: 'Horizon Resort Booking Engine', role: 'UI/UX Designer', deadline: 'Dec 15, 2026' }
    ],
    completedProjectsCount: 18,
    skills: ['Figma Tokens', 'Neomorphism UI', 'User Flow Wireframing', 'Design Systems'],
    lastActivity: '12 min ago'
  },
  {
    id: 'tm-3',
    name: 'David Chen',
    role: 'Full-Stack React Engineer',
    department: 'Frontend & Backend Systems',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    email: 'david@bytebuild.dev',
    phone: '+1 (415) 555-0177',
    status: 'Busy',
    workloadCapacity: 90,
    workingHours: '10:00 AM - 07:00 PM EST',
    assignedProjects: [
      { id: 'prj-101', name: 'Aura Health Flagship Web Platform', role: 'Full-Stack Engineer', deadline: 'Nov 30, 2026' }
    ],
    completedProjectsCount: 11,
    skills: ['TypeScript', 'Vite', 'REST & GraphQL APIs', 'Tailwind & Vanilla CSS'],
    lastActivity: '35 min ago'
  }
];

export const mockAdminRoles: AdminRoleItem[] = [
  { id: 'r-1', title: 'Super Administrator', memberCount: 1, permissions: ['Full System Access', 'Manage Finances', 'Manage Team', 'Client Portal Overrides'] },
  { id: 'r-2', title: 'Project Manager', memberCount: 2, permissions: ['Manage Projects', 'Assign Team', 'Schedule Meetings', 'Update Statuses'] },
  { id: 'r-3', title: 'UI/UX Designer', memberCount: 1, permissions: ['Upload Figma Deliverables', 'Edit Design System', 'View Projects'] },
  { id: 'r-4', title: 'Frontend Developer', memberCount: 2, permissions: ['Codebase Commits', 'Sprint Task Completion', 'View Telemetry'] },
  { id: 'r-5', title: 'Backend Developer', memberCount: 1, permissions: ['API Webhook Management', 'Database Schema', 'Security Protocols'] },
  { id: 'r-6', title: 'QA Tester', memberCount: 1, permissions: ['Bug Auditing', 'Performance Verification', 'Staging Tests'] }
];

export const mockAdminQuotes: AdminQuoteItem[] = [
  { id: 'q-1', quoteNumber: 'QTE-2026-081', clientName: 'Alex Vance', company: 'Aura Health Medical Group', projectName: 'HIPAA Intake & Web Platform', issueDate: 'Oct 01, 2026', expiryDate: 'Nov 01, 2026', subtotal: '$27,272.73', tax: '$2,727.27', discount: '$0.00', total: '$30,000.00', status: 'Accepted' },
  { id: 'q-2', quoteNumber: 'QTE-2026-084', clientName: 'Apex Real Estate', company: 'Apex Global Group', projectName: '3D WebGL Property Showcase', issueDate: 'Oct 28, 2026', expiryDate: 'Nov 28, 2026', subtotal: '$77,272.73', tax: '$7,727.27', discount: '$0.00', total: '$85,000.00', status: 'Sent' },
  { id: 'q-3', quoteNumber: 'QTE-2026-088', clientName: 'Sarah Jenkins', company: 'Horizon Luxury Resorts', projectName: 'Booking Funnel Engine', issueDate: 'Oct 15, 2026', expiryDate: 'Nov 15, 2026', subtotal: '$40,909.09', tax: '$4,090.91', discount: '$0.00', total: '$45,000.00', status: 'Accepted' }
];

export const mockAdminInvoices: AdminInvoiceItem[] = [
  { id: 'inv-1', invoiceNumber: 'INV-2026-001', clientName: 'Alex Vance', company: 'Aura Health Medical Group', projectName: 'Phase 1 Architecture Deposit', issueDate: 'Oct 01, 2026', dueDate: 'Oct 10, 2026', amount: '$7,500.00', status: 'Paid' },
  { id: 'inv-2', invoiceNumber: 'INV-2026-002', clientName: 'Alex Vance', company: 'Aura Health Medical Group', projectName: 'Phase 2 Figma UI Tokens', issueDate: 'Oct 15, 2026', dueDate: 'Oct 25, 2026', amount: '$7,500.00', status: 'Paid' },
  { id: 'inv-3', invoiceNumber: 'INV-2026-003', clientName: 'Alex Vance', company: 'Aura Health Medical Group', projectName: 'Phase 4 React Engineering', issueDate: 'Nov 01, 2026', dueDate: 'Nov 10, 2026', amount: '$7,500.00', status: 'Pending' },
  { id: 'inv-4', invoiceNumber: 'INV-2026-004', clientName: 'Robert Sterling', company: 'Sterling Capital Partners', projectName: 'Phase 1 Kickoff Deposit', issueDate: 'Nov 01, 2026', dueDate: 'Nov 15, 2026', amount: '$15,000.00', status: 'Pending' }
];

export const mockAdminPayments: AdminPaymentLog[] = [
  { id: 'pay-1', transactionId: 'TXN-991201', invoiceNumber: 'INV-2026-001', clientName: 'Alex Vance', company: 'Aura Health', amount: '$7,500.00', method: 'Stripe', date: 'Oct 05, 2026', status: 'Completed' },
  { id: 'pay-2', transactionId: 'TXN-991202', invoiceNumber: 'INV-2026-002', clientName: 'Alex Vance', company: 'Aura Health', amount: '$7,500.00', method: 'Credit Card', date: 'Oct 20, 2026', status: 'Completed' },
  { id: 'pay-3', transactionId: 'TXN-991205', invoiceNumber: 'INV-2026-000', clientName: 'Sarah Jenkins', company: 'Horizon Resorts', amount: '$45,000.00', method: 'Bank Transfer', date: 'Oct 18, 2026', status: 'Completed' }
];

export const mockAdminExpenses: AdminExpenseItem[] = [
  { id: 'exp-1', name: 'Vercel Enterprise & AWS Hosting', category: 'Hosting', amount: '$1,200.00', vendor: 'Vercel / AWS', date: 'Nov 01, 2026', notes: 'High-speed edge node infrastructure.' },
  { id: 'exp-2', name: 'Figma Enterprise Organization License', category: 'Software', amount: '$850.00', vendor: 'Figma Inc.', date: 'Oct 28, 2026', notes: 'UI token design seats.' },
  { id: 'exp-3', name: 'Google Workspace & Meet Enterprise', category: 'Software', amount: '$450.00', vendor: 'Google LLC', date: 'Oct 25, 2026', notes: 'Team email and video infrastructure.' }
];

export const mockAdminCMSItems: AdminCMSItem[] = [
  { id: 'cms-1', title: 'Building Sub-500ms Web Architectures with React 18', category: 'Blog', author: 'Marcus Vance', lastUpdated: 'Yesterday', status: 'Published', views: 4280, slug: '/blog/building-sub-500ms-web-architectures' },
  { id: 'cms-2', title: 'Aura Health Medical Group Web Platform', category: 'Case Studies', author: 'Elena Rostova', lastUpdated: '3 days ago', status: 'Published', views: 1890, slug: '/case-studies/aura-health' },
  { id: 'cms-3', title: 'Custom Web Application Engineering', category: 'Services', author: 'Marcus Vance', lastUpdated: 'Oct 20, 2026', status: 'Published', views: 5610, slug: '/services/web-applications' },
  { id: 'cms-4', title: 'Horizon Resort Booking Funnel Engine', category: 'Portfolio', author: 'Elena Rostova', lastUpdated: 'Oct 15, 2026', status: 'Published', views: 3120, slug: '/portfolio/horizon-resort' },
  { id: 'cms-5', title: 'Byte Build Luxury Design System Overview', category: 'Homepage', author: 'Marcus Vance', lastUpdated: 'Nov 01, 2026', status: 'Published', views: 12400, slug: '/' },
  { id: 'cms-6', title: 'Why Soft Neomorphism Outperforms Flat UI in 2027', category: 'Blog', author: 'Elena Rostova', lastUpdated: 'Drafting', status: 'Draft', slug: '/blog/soft-neomorphism-2027' }
];

export const mockAdminMeetings: AdminMeetingItem[] = [
  {
    id: 'mtg-1',
    title: 'Aura Health Phase 4 Sprint Sync & Demo',
    clientName: 'Alex Vance',
    company: 'Aura Health Medical Group',
    projectName: 'Aura Health Flagship Platform',
    date: 'Today',
    time: '02:00 PM EST',
    duration: '45 min',
    type: 'Development Review',
    assignedTeam: ['Marcus Vance', 'David Chen'],
    link: 'https://meet.google.com/bytebuild-aura-demo',
    status: 'Scheduled'
  },
  {
    id: 'mtg-2',
    title: 'Horizon Resort Suite Booking Wireframe Review',
    clientName: 'Sarah Jenkins',
    company: 'Horizon Luxury Resorts',
    projectName: 'Horizon Booking Engine',
    date: 'Today',
    time: '04:30 PM EST',
    duration: '30 min',
    type: 'Design Review',
    assignedTeam: ['Elena Rostova'],
    link: 'https://meet.google.com/bytebuild-horizon-review',
    status: 'Scheduled'
  },
  {
    id: 'mtg-3',
    title: 'Sterling VC Portfolio Scope & Security Kickoff',
    clientName: 'Robert Sterling',
    company: 'Sterling Capital Partners',
    projectName: 'Sterling VC Portal',
    date: 'Tomorrow',
    time: '11:00 AM EST',
    duration: '60 min',
    type: 'Project Kickoff',
    assignedTeam: ['Marcus Vance'],
    link: 'https://meet.google.com/bytebuild-sterling-kickoff',
    status: 'Scheduled'
  }
];

export const mockAdminDeadlines: AdminDeadlineItem[] = [
  { id: 'dl-1', title: 'Stripe 256-Bit Billing Webhook Integration', type: 'Milestone Deadline', date: 'Nov 20, 2026', priority: 'High', status: 'Pending', assignedPerson: 'David Chen', projectName: 'Aura Health Platform' },
  { id: 'dl-2', title: 'Horizon Resort Figma Tokens Final Sign-Off', type: 'Project Deadline', date: 'Nov 10, 2026', priority: 'Medium', status: 'Pending', assignedPerson: 'Elena Rostova', projectName: 'Horizon Booking Engine' },
  { id: 'dl-3', title: 'Sterling Capital Invoice INV-2026-004 Settlement', type: 'Invoice Due Date', date: 'Nov 15, 2026', priority: 'Normal', status: 'Pending', assignedPerson: 'Marcus Vance', projectName: 'Sterling VC Portal' }
];

export const mockAdminSearchItems: AdminSearchItem[] = [
  { id: 's-1', type: 'Lead', title: 'Apex Global Real Estate ($85k)', subtitle: 'Inbound Enterprise Lead', view: 'leads' },
  { id: 's-2', type: 'Client', title: 'Aura Health Medical Group', subtitle: 'VIP Enterprise Client', view: 'clients' },
  { id: 's-3', type: 'Project', title: 'Aura Health Flagship Platform', subtitle: 'Phase 4 Engineering (75% Complete)', view: 'projects' },
  { id: 's-4', type: 'Invoice', title: 'INV-2026-003 ($7,500.00)', subtitle: 'Pending Milestone 4 Billing', view: 'finance' },
  { id: 's-5', type: 'Media', title: 'Figma UI Token System Assets', subtitle: 'Design Component Package', view: 'media' },
  { id: 's-6', type: 'Blog', title: 'Building Sub-500ms Web Architectures', subtitle: 'Published CMS Article', view: 'cms' },
  { id: 's-7', type: 'Team', title: 'Marcus Vance (Product Architect)', subtitle: 'Senior Agency Team Lead', view: 'team' }
];
