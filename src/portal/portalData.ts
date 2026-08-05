import type {
  ClientProject,
  ActivityItem,
  FileItem,
  InvoiceItem,
  PaymentTransaction,
  MessageItem,
  ConversationThread,
  MeetingItem,
  MeetingNoteItem,
  SupportTicketItem,
  NotificationItem,
  ClientProfile
} from './types';

export const mockCurrentProject: ClientProject = {
  id: 'proj-aura-health',
  name: 'Aura Health Flagship Platform',
  projectType: 'Healthcare Practice Engine',
  description: 'Custom React 18 web platform with HIPAA-compliant 24/7 intake forms, Stripe payment deposits, and sub-500ms Core Web Vitals speed.',
  status: 'Development',
  progress: 75,
  currentPhase: 'Phase 4: Web Engineering & Sub-500ms Speed Optimization',
  startDate: 'Oct 10, 2026',
  estimatedCompletion: 'Nov 18, 2026',
  projectManager: {
    name: 'Marcus Vance',
    role: 'Senior Product Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  clientContact: {
    name: 'Alex Vance',
    company: 'Aura Health Medical Group',
    email: 'alex@aurahealth.com'
  },
  liveDemoUrl: 'https://aurahealth-staging.bytebuild.dev',
  milestones: [
    { id: 'm-1', name: 'Discovery Audit & Fixed Proposal Approved', status: 'completed', dueDate: 'Oct 17, 2026', completedDate: 'Oct 15, 2026' },
    { id: 'm-2', name: 'UX Journey Mapping & Low-Fi Wireframes', status: 'completed', dueDate: 'Oct 24, 2026', completedDate: 'Oct 22, 2026' },
    { id: 'm-3', name: 'Soft Neomorphic UI Tokens & Figma Prototype', status: 'completed', dueDate: 'Oct 30, 2026', completedDate: 'Oct 29, 2026' },
    { id: 'm-4', name: 'React 18 & HIPAA Intake API Integration', status: 'in-progress', dueDate: 'Nov 12, 2026' },
    { id: 'm-5', name: '100/100 Core Web Vitals Audit & Global Launch', status: 'upcoming', dueDate: 'Nov 18, 2026' }
  ],
  recentUpdates: [
    { id: 'u-1', title: 'Homepage Architecture & Design Approved', timestamp: 'Today, 2:15 PM' },
    { id: 'u-2', title: 'Phase 3 Milestone Invoice Paid ($7,500.00)', timestamp: 'Yesterday, 4:30 PM' },
    { id: 'u-3', title: 'HIPAA 256-Bit Encrypted Form Vault Configured', timestamp: 'Oct 29, 2026' },
    { id: 'u-4', title: 'Figma UI Token System Assets Uploaded', timestamp: 'Oct 28, 2026' },
    { id: 'u-5', title: 'Weekly Sprint Sync Meeting Scheduled', timestamp: 'Oct 27, 2026' }
  ],
  deliverables: [
    { id: 'del-1', title: 'Homepage Design', status: 'Approved', version: 'v2.4', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800', date: 'Oct 29, 2026' },
    { id: 'del-2', title: 'UI Kit', status: 'Approved', version: 'v2.0', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800', date: 'Oct 24, 2026' },
    { id: 'del-3', title: 'Source Code', status: 'In Review', version: 'v1.8', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', date: 'Oct 30, 2026' },
    { id: 'del-4', title: 'Brand Assets', status: 'Final', version: 'v1.0', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', date: 'Oct 15, 2026' },
    { id: 'del-5', title: 'Final Website', status: 'In Review', version: 'v0.9-beta', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', date: 'Nov 01, 2026' },
    { id: 'del-6', title: 'Documentation', status: 'Approved', version: 'v1.2', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', date: 'Oct 20, 2026' }
  ]
};

export const mockProjectsList: ClientProject[] = [
  mockCurrentProject,
  {
    id: 'proj-apex-estates',
    name: 'Apex Estates Luxury Portal',
    projectType: 'Real Estate Web Platform',
    description: 'High-prestige real estate showcase featuring 3D WebGL property walkthroughs and direct HNW client lead funnels.',
    status: 'Completed',
    progress: 100,
    currentPhase: 'Phase 5: Live Production Maintenance SLA',
    startDate: 'Jul 01, 2026',
    estimatedCompletion: 'Aug 20, 2026',
    projectManager: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    clientContact: {
      name: 'Alex Vance',
      company: 'Aura Health Medical Group',
      email: 'alex@aurahealth.com'
    },
    liveDemoUrl: 'https://apexestates.bytebuild.dev',
    milestones: [
      { id: 'm-1', name: 'Discovery & Scope Blueprint', status: 'completed', dueDate: 'Jul 10, 2026', completedDate: 'Jul 08, 2026' },
      { id: 'm-2', name: '3D WebGL Property Viewer Engine', status: 'completed', dueDate: 'Jul 28, 2026', completedDate: 'Jul 26, 2026' },
      { id: 'm-3', name: 'Global CDN Deployment & Launch', status: 'completed', dueDate: 'Aug 20, 2026', completedDate: 'Aug 18, 2026' }
    ],
    recentUpdates: [
      { id: 'u-1', title: 'Platform Handover & SLA Active', timestamp: 'Aug 20, 2026' },
      { id: 'u-2', title: 'Final Production Milestone Paid', timestamp: 'Aug 18, 2026' }
    ],
    deliverables: [
      { id: 'd-1', title: 'Apex Estates Live Codebase Package', status: 'Final', version: 'v1.0.0', downloadUrl: '#', previewUrl: '', date: 'Aug 20, 2026' }
    ]
  }
];

export const mockRecentActivities: ActivityItem[] = [
  { id: 'act-1', title: 'Homepage Architecture & Design Approved', timestamp: 'Today, 2:15 PM', type: 'approval' },
  { id: 'act-2', title: 'Milestone 2 Invoice Paid ($7,500.00)', timestamp: 'Yesterday, 4:30 PM', type: 'payment' },
  { id: 'act-3', title: 'Figma UI Token System Assets Uploaded', timestamp: 'Oct 29, 2026', type: 'file' },
  { id: 'act-4', title: 'Weekly Sprint Sync Meeting Scheduled', timestamp: 'Oct 28, 2026', type: 'meeting' },
  { id: 'act-5', title: 'Sub-500ms Core Web Vitals Benchmark Passed', timestamp: 'Oct 27, 2026', type: 'update' }
];

export const mockFiles: FileItem[] = [
  { id: 'f-1', name: 'Aura_Health_Homepage_Design_v2.4.fig', projectName: 'Aura Health Flagship', uploadedBy: 'Marcus Vance', size: '24.8 MB', category: 'FIG', fileType: 'design', uploadDate: 'Oct 29, 2026', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800' },
  { id: 'f-2', name: 'HIPAA_Security_Compliance_Audit.pdf', projectName: 'Aura Health Flagship', uploadedBy: 'Marcus Vance', size: '3.4 MB', category: 'PDF', fileType: 'pdf', uploadDate: 'Oct 22, 2026', downloadUrl: '#', previewUrl: '' },
  { id: 'f-3', name: 'Stripe_Intake_Integration_Demo.mp4', projectName: 'Aura Health Flagship', uploadedBy: 'Lead Engineer', size: '48.2 MB', category: 'MP4', fileType: 'video', uploadDate: 'Oct 20, 2026', downloadUrl: '#', previewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 'f-4', name: 'Aura_Medical_Group_Vector_Logos.zip', projectName: 'Aura Health Flagship', uploadedBy: 'Alex Vance', size: '18.5 MB', category: 'ZIP', fileType: 'archive', uploadDate: 'Oct 15, 2026', downloadUrl: '#', previewUrl: '' },
  { id: 'f-5', name: 'Patient_Appointment_Flow_Mockup.png', projectName: 'Aura Health Flagship', uploadedBy: 'UI Designer', size: '4.2 MB', category: 'PNG', fileType: 'image', uploadDate: 'Oct 12, 2026', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
  { id: 'f-6', name: 'Technical_Scope_Architecture_Spec.docx', projectName: 'Aura Health Flagship', uploadedBy: 'Marcus Vance', size: '1.2 MB', category: 'DOCX', fileType: 'doc', uploadDate: 'Oct 10, 2026', downloadUrl: '#', previewUrl: '' }
];

export const mockVersionHistory = [
  { id: 'vh-5', deliverableTitle: 'Homepage Design', version: 'v2.4', uploadDate: 'Oct 29, 2026', uploadedBy: 'Marcus Vance', revisionNotes: 'Added HIPAA intake badge & soft neomorphic CTA highlights.', downloadUrl: '#' },
  { id: 'vh-4', deliverableTitle: 'Homepage Design', version: 'v2.3', uploadDate: 'Oct 25, 2026', uploadedBy: 'Marcus Vance', revisionNotes: 'Refined mobile header navigation & hero font sizes.', downloadUrl: '#' },
  { id: 'vh-3', deliverableTitle: 'Homepage Design', version: 'v2.1', uploadDate: 'Oct 20, 2026', uploadedBy: 'UI Architect', revisionNotes: 'Integrated refined minimalist UI tokens & modern component architecture.', downloadUrl: '#' },
  { id: 'vh-2', deliverableTitle: 'UI Kit & Component Tokens', version: 'v1.8', uploadDate: 'Oct 18, 2026', uploadedBy: 'Marcus Vance', revisionNotes: 'Added form input tokens & button state shadows.', downloadUrl: '#' },
  { id: 'vh-1', deliverableTitle: 'Project Scope Architecture', version: 'v1.0', uploadDate: 'Oct 10, 2026', uploadedBy: 'Marcus Vance', revisionNotes: 'Initial discovery audit and technical architecture roadmap.', downloadUrl: '#' }
];

export const mockInvoices: InvoiceItem[] = [
  { id: 'inv-3', invoiceNumber: 'INV-2026-003', projectName: 'Aura Health Flagship Platform', title: 'Phase 4: Web Engineering & HIPAA API Integration', issueDate: 'Oct 30, 2026', dueDate: 'Nov 10, 2026', amount: '$7,500.00', status: 'Pending', downloadUrl: '#', description: 'Milestone 4 delivery covering React 18 frontend engineering, HIPAA 256-bit encrypted intake forms, and Stripe checkout setup.' },
  { id: 'inv-2', invoiceNumber: 'INV-2026-002', projectName: 'Aura Health Flagship Platform', title: 'Phase 3: Soft Neomorphic UI Tokens & Figma Prototype', issueDate: 'Oct 18, 2026', dueDate: 'Oct 28, 2026', amount: '$7,500.00', status: 'Paid', downloadUrl: '#', description: 'Milestone 3 delivery covering high-fidelity Figma UI tokens, component design system, and interactive client prototype.' },
  { id: 'inv-1', invoiceNumber: 'INV-2026-001', projectName: 'Aura Health Flagship Platform', title: 'Phase 1 & 2: Project Kickoff Deposit & Wireframes', issueDate: 'Oct 01, 2026', dueDate: 'Oct 10, 2026', amount: '$5,000.00', status: 'Paid', downloadUrl: '#', description: 'Initial 25% project deposit and technical scope architecture roadmap alignment.' }
];

export const mockPaymentTransactions: PaymentTransaction[] = [
  { id: 'txn-102', transactionDate: 'Oct 28, 2026, 04:30 PM', invoiceNumber: 'INV-2026-002', paymentMethod: 'Credit Card (Stripe PCI)', amount: '$7,500.00', status: 'Completed' },
  { id: 'txn-101', transactionDate: 'Oct 10, 2026, 11:15 AM', invoiceNumber: 'INV-2026-001', paymentMethod: 'Bank Transfer (ACH Direct)', amount: '$5,000.00', status: 'Completed' }
];

export const mockConversationsList: ConversationThread[] = [
  {
    id: 'conv-1',
    projectId: 'proj-aura-health',
    projectName: 'Aura Health Flagship Platform',
    projectManager: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    lastMessage: 'Hey Alex! Phase 4 web engineering is progressing ahead of schedule. All patient intake forms are HIPAA-encrypted.',
    timestamp: 'Today, 2:30 PM',
    unreadCount: 1,
    status: 'In Progress • Phase 4'
  },
  {
    id: 'conv-2',
    projectId: 'proj-apex-estates',
    projectName: 'Apex Estates Luxury Portal',
    projectManager: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    lastMessage: 'Final project handover completed. Live SLA maintenance is currently active.',
    timestamp: 'Aug 20, 2026',
    unreadCount: 0,
    status: 'Completed'
  }
];

export const mockMessages: MessageItem[] = [
  {
    id: 'm-1',
    conversationId: 'conv-1',
    sender: 'Marcus Vance',
    role: 'Senior Product Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    text: 'Hey Alex! Phase 4 web engineering is progressing ahead of schedule. All patient intake forms are now HIPAA 256-bit encrypted.',
    timestamp: 'Today, 2:30 PM',
    isAgency: true,
    attachments: [
      {
        name: 'HIPAA_Security_Encryption_Audit.pdf',
        size: '3.4 MB',
        fileType: 'pdf',
        downloadUrl: '#',
        previewUrl: ''
      }
    ],
    read: true
  },
  {
    id: 'm-2',
    conversationId: 'conv-1',
    sender: 'Alex Vance',
    role: 'Client (Aura Health)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    text: 'That sounds fantastic Marcus! The sub-500ms speed metrics on the preview link look incredible. I attached our updated brand guidelines.',
    timestamp: 'Today, 2:45 PM',
    isAgency: false,
    attachments: [
      {
        name: 'Aura_Health_Brand_Guidelines_v2.fig',
        size: '24.8 MB',
        fileType: 'design',
        downloadUrl: '#',
        previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
      }
    ],
    read: true
  },
  {
    id: 'm-3',
    conversationId: 'conv-1',
    sender: 'Marcus Vance',
    role: 'Senior Product Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    text: 'Received! We will incorporate the new font tokens into the clinic appointment booking flow before tomorrow’s sprint review.',
    timestamp: 'Today, 3:10 PM',
    isAgency: true,
    read: false
  }
];

export const mockMeetings: MeetingItem[] = [
  {
    id: 'meet-1',
    title: 'Phase 4 Sprint Review & Staging Walkthrough',
    projectName: 'Aura Health Flagship Platform',
    date: 'Tomorrow, Nov 3',
    time: '02:00 PM EST',
    duration: '30 mins',
    type: 'Development Update',
    status: 'Today',
    host: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    meetUrl: 'https://meet.google.com/abc-defg-hij',
    meetingId: 'meet-abc-defg-hij',
    platform: 'Google Meet'
  },
  {
    id: 'meet-2',
    title: 'Pre-Launch Security & Core Web Vitals Audit',
    projectName: 'Aura Health Flagship Platform',
    date: 'Friday, Nov 14',
    time: '11:00 AM EST',
    duration: '45 mins',
    type: 'Design Review',
    status: 'Scheduled',
    host: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    meetUrl: 'https://zoom.us/j/987654321',
    meetingId: 'zoom-987-654-321',
    platform: 'Zoom'
  }
];

export const mockPastMeetings: MeetingItem[] = [
  {
    id: 'meet-past-1',
    title: 'Phase 3 Design System & Figma UI Tokens Sign-off',
    projectName: 'Aura Health Flagship Platform',
    date: 'Oct 28, 2026',
    time: '03:30 PM EST',
    duration: '40 mins',
    type: 'Design Review',
    status: 'Completed',
    host: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    meetUrl: 'https://meet.google.com/past-one-abc',
    meetingId: 'past-one-abc',
    platform: 'Google Meet'
  },
  {
    id: 'meet-past-2',
    title: 'Project Kickoff & Technical Architecture Blueprint Alignment',
    projectName: 'Aura Health Flagship Platform',
    date: 'Oct 10, 2026',
    time: '10:00 AM EST',
    duration: '60 mins',
    type: 'Discovery Call',
    status: 'Completed',
    host: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    meetUrl: 'https://meet.google.com/past-two-def',
    meetingId: 'past-two-def',
    platform: 'Google Meet'
  }
];

export const mockMeetingNotes: MeetingNoteItem[] = [
  {
    id: 'note-1',
    meetingId: 'meet-past-1',
    meetingTitle: 'Phase 3 Design System & Figma UI Tokens Sign-off',
    date: 'Oct 28, 2026',
    summary: 'Reviewed all Figma UI token components, soft neomorphic depth elevation, and verified 100% HIPAA intake form compliance.',
    keyDecisions: [
      'Approved refined minimalist UI tokens and component design system.',
      'Confirmed patient appointment booking workflow layout.',
      'Selected Google Meet for upcoming technical sprint walkthroughs.'
    ],
    actionItems: [
      'Marcus: Finalize React component integration for patient intake.',
      'Alex: Provide high-res SVG medical icons for clinic directory.'
    ],
    filesDiscussed: [
      'Aura_Health_Homepage_Design_v2.4.fig',
      'HIPAA_Security_Compliance_Audit.pdf'
    ],
    nextSteps: 'Proceed with Phase 4 React frontend engineering and Stripe checkout API integration.'
  },
  {
    id: 'note-2',
    meetingId: 'meet-past-2',
    meetingTitle: 'Project Kickoff & Technical Architecture Blueprint Alignment',
    date: 'Oct 10, 2026',
    summary: 'Initial project kickoff establishing core Web Vitals sub-500ms goals, HIPAA compliance requirements, and sprint milestones.',
    keyDecisions: [
      'Agreed on 4-phase delivery schedule over 8 weeks.',
      'Set target Core Web Vitals page load velocity to sub-500ms.',
      'Established bi-weekly sync cadence on Thursdays.'
    ],
    actionItems: [
      'Marcus: Prepare Figma wireframes and token system.',
      'Alex: Transfer initial 25% kickoff deposit ($5,000.00).'
    ],
    filesDiscussed: [
      'Technical_Scope_Proposal_Final.pdf'
    ],
    nextSteps: 'Complete Phase 1 Wireframes and launch Figma prototype review.'
  }
];

export const mockSupportTickets: SupportTicketItem[] = [
  {
    id: 't-101',
    ticketId: 'TICK-2026-084',
    subject: 'Stripe Patient Checkout Billing Webhook Timeout On Staging',
    projectName: 'Aura Health Flagship Platform',
    category: 'Technical Issue',
    priority: 'High',
    status: 'In Progress',
    createdDate: 'Oct 30, 2026, 09:15 AM',
    lastUpdated: '10 min ago',
    assignedTo: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    description: 'When processing patient appointment intake on staging, the Stripe webhook response took over 3.2 seconds resulting in a temporary client timeout banner.',
    conversation: [
      {
        id: 'tm-1',
        sender: 'Alex Vance',
        role: 'Client (Aura Health)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        text: 'Hi Marcus! Notice a 3-second delay on the staging Stripe sandbox payment test.',
        timestamp: 'Oct 30, 09:15 AM',
        isAgency: false
      },
      {
        id: 'tm-2',
        sender: 'Marcus Vance',
        role: 'Senior Product Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        text: 'Looking into this immediately Alex. We are optimizing the 256-bit HIPAA encryption payload so the webhook resolves sub-300ms.',
        timestamp: 'Oct 30, 09:40 AM',
        isAgency: true
      }
    ]
  },
  {
    id: 't-102',
    ticketId: 'TICK-2026-079',
    subject: 'Doctor Directory Mobile Layout Grid Spacing Revision',
    projectName: 'Aura Health Flagship Platform',
    category: 'Revision Request',
    priority: 'Medium',
    status: 'Waiting for Client',
    createdDate: 'Oct 26, 2026, 02:40 PM',
    lastUpdated: 'Oct 28, 2026',
    assignedTo: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    description: 'Requesting padding adjustment on mobile cards for doctor specialty badges.',
    conversation: [
      {
        id: 'tm-3',
        sender: 'Marcus Vance',
        role: 'Senior Product Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        text: 'Updated mobile card padding to 16px soft neomorphic inset. Please review staging preview.',
        timestamp: 'Oct 28, 11:20 AM',
        isAgency: true
      }
    ]
  }
];

export const mockTicketHistory: SupportTicketItem[] = [
  {
    id: 't-090',
    ticketId: 'TICK-2026-050',
    subject: 'HIPAA Intake Encryption Audit Report Sign-off',
    projectName: 'Aura Health Flagship Platform',
    category: 'General Question',
    priority: 'Low',
    status: 'Resolved',
    createdDate: 'Oct 18, 2026',
    lastUpdated: 'Oct 22, 2026',
    assignedTo: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    description: 'Signed off compliance documentation for patient record storage.',
    conversation: []
  },
  {
    id: 't-085',
    ticketId: 'TICK-2026-032',
    subject: 'Initial Domain SSL & Edge CDN DNS Setup',
    projectName: 'Aura Health Flagship Platform',
    category: 'Technical Issue',
    priority: 'High',
    status: 'Closed',
    createdDate: 'Oct 12, 2026',
    lastUpdated: 'Oct 14, 2026',
    assignedTo: {
      name: 'Marcus Vance',
      role: 'Senior Product Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    description: 'Configured global edge SSL certificate and DNS routing.',
    conversation: []
  }
];

export const mockSupportFAQs = [
  {
    question: 'How quickly will I receive a response?',
    answer: 'Our agency guarantees an initial response within <12 hours for standard inquiries and <2 hours for urgent technical tickets.'
  },
  {
    question: 'How do I request design or code revisions?',
    answer: 'Create a Revision Request ticket with annotated screenshots, or comment directly on your Figma UI tokens in the Files Center.'
  },
  {
    question: 'How do I report a technical bug?',
    answer: 'Submit a Bug Report ticket specifying the page URL, device type, and optional screenshot attachment. Our engineers resolve high-priority items within 24h.'
  },
  {
    question: 'How do I schedule a live consultation?',
    answer: 'Click "Book Support Call" above or navigate to the Meetings section to select a 30-min live Google Meet sync with Marcus Vance.'
  }
];

export const mockNotifications: NotificationItem[] = [
  { id: 'n-1', category: 'update', title: 'Phase 4 Engineering 75% Complete', description: 'Core Web Vitals sub-500ms target achieved on staging server.', time: '10 min ago', read: false },
  { id: 'n-2', category: 'message', title: 'New message from Marcus Vance', description: 'HIPAA intake form encryption completed.', time: '1 hour ago', read: false },
  { id: 'n-3', category: 'invoice', title: 'Invoice INV-2026-003 Generated', description: 'Phase 3 React Engineering Kickoff due Nov 10.', time: '3 hours ago', read: true },
  { id: 'n-4', category: 'meeting', title: 'Sprint Review Scheduled', description: 'Tomorrow at 02:00 PM EST via Google Meet.', time: 'Yesterday', read: true }
];

export const mockClientProfile: ClientProfile = {
  organizationName: 'Aura Health Medical Group',
  company: 'Aura Health Medical Group',
  orgLogoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=250',
  photoUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=250',
  clientId: 'CLT-ORG-2026-8819',
  clientSince: 'July 2026',
  accountStatus: 'Active Client • Enterprise Tier',
  orgEmail: 'contact@aurahealth.com',
  orgPhone: '+1 (415) 890-3400',
  email: 'contact@aurahealth.com',
  phone: '+1 (415) 890-3400',
  preferredLanguage: 'English (US)',
  primaryContact: {
    name: 'Alex Vance',
    jobTitle: 'Chief Executive Officer',
    email: 'alex@aurahealth.com',
    phone: '+1 (415) 890-3420',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  companyInfo: {
    industry: 'Healthcare & Medical Tech',
    website: 'https://aurahealth.com',
    gstNumber: 'TAX-2026-US-8910',
    address: '100 Medical Center Blvd, Suite 400',
    city: 'San Francisco',
    state: 'California',
    country: 'United States'
  },
  notificationPreferences: {
    projectUpdates: true,
    messages: true,
    invoices: true,
    meetingReminders: true,
    supportTickets: true,
    marketingEmails: false,
    emailUpdates: true,
    smsAlerts: true,
    invoiceReminders: true
  },
  name: 'Aura Health Medical Group',
  jobTitle: 'Organization Account'
};
