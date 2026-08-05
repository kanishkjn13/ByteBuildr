export type AdminView = 
  | 'dashboard'
  | 'leads'
  | 'clients'
  | 'projects'
  | 'team'
  | 'finance'
  | 'cms'
  | 'calendar'
  | 'notifications'
  | 'media'
  | 'analytics'
  | 'settings';

export interface AdminMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface AdminActivityItem {
  id: string;
  type: 'lead' | 'project' | 'payment' | 'media' | 'message' | 'task';
  title: string;
  timestamp: string;
  user?: string;
}

export interface AdminNotification {
  id: string;
  category: 'lead' | 'message' | 'payment' | 'project' | 'ticket' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export type LeadStage = 'New Lead' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
export type LeadPriority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface AdminLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  stage: LeadStage;
  priority: LeadPriority;
  service: string;
  source: string;
  assignedManager: {
    name: string;
    avatar: string;
  };
  lastActivity: string;
  timeline: string;
  requirements: string;
  notes: string[];
  date: string;
}

export interface AdminConsultation {
  id: string;
  clientName: string;
  company: string;
  date: string;
  time: string;
  meetUrl: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  assignedMember: string;
}

export interface AdminFollowUp {
  id: string;
  leadName: string;
  company: string;
  nextDate: string;
  reminder: string;
  assignedPerson: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  notes: string;
}

export interface AdminClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  status: 'VIP Tier' | 'Active' | 'Onboarding' | 'Inactive';
  projectManager: {
    name: string;
    avatar: string;
  };
  activeProjects: {
    id: string;
    name: string;
    phase: string;
    progress: number;
    deadline: string;
    status: 'In Progress' | 'In Review' | 'Completed';
  }[];
  outstandingBalance: string;
  totalPaid: string;
  lastActivity: string;
  joinedDate: string;
}

export type ProjectStatusStage = 
  | 'Planning'
  | 'Research'
  | 'UI/UX Design'
  | 'Development'
  | 'Testing'
  | 'Client Review'
  | 'Deployment'
  | 'Maintenance'
  | 'Completed'
  | 'Archived';

export type ProjectHealthStatus = 'Healthy' | 'Needs Attention' | 'Delayed' | 'Blocked' | 'At Risk';

export interface AdminMilestoneItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  assignedTeam: string[];
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  progress: number;
}

export interface AdminProjectItem {
  id: string;
  name: string;
  clientName: string;
  company: string;
  projectType: string;
  status: ProjectStatusStage;
  health: ProjectHealthStatus;
  progress: number;
  currentPhase: string;
  deadline: string;
  startDate: string;
  budget: string;
  projectManager: {
    name: string;
    avatar: string;
  };
  teamMembers: {
    role: string;
    name: string;
    avatar: string;
  }[];
  milestones: AdminMilestoneItem[];
  deliverables: string[];
  lastActivity: string;
}

export type TeamAvailabilityStatus = 'Available' | 'Busy' | 'On Leave' | 'Offline';

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  status: TeamAvailabilityStatus;
  workloadCapacity: number;
  workingHours: string;
  assignedProjects: {
    id: string;
    name: string;
    role: string;
    deadline: string;
  }[];
  completedProjectsCount: number;
  skills: string[];
  lastActivity: string;
}

export interface AdminRoleItem {
  id: string;
  title: string;
  memberCount: number;
  permissions: string[];
}

export type QuoteStatus = 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Overdue' | 'Cancelled';
export type ExpenseCategory = 'Software' | 'Hosting' | 'Marketing' | 'Salary' | 'Office' | 'Miscellaneous';
export type PaymentMethodType = 'UPI' | 'Bank Transfer' | 'Credit Card' | 'Debit Card' | 'Stripe' | 'Razorpay';

export interface AdminQuoteItem {
  id: string;
  quoteNumber: string;
  clientName: string;
  company: string;
  projectName: string;
  issueDate: string;
  expiryDate: string;
  subtotal: string;
  tax: string;
  discount: string;
  total: string;
  status: QuoteStatus;
}

export interface AdminInvoiceItem {
  id: string;
  invoiceNumber: string;
  clientName: string;
  company: string;
  projectName: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: PaymentStatus;
}

export interface AdminPaymentLog {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  clientName: string;
  company: string;
  amount: string;
  method: PaymentMethodType;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface AdminExpenseItem {
  id: string;
  name: string;
  category: ExpenseCategory;
  amount: string;
  vendor: string;
  date: string;
  notes: string;
}

export type CMSContentStatus = 'Draft' | 'Published' | 'Scheduled' | 'Archived' | 'Pending Review';

export interface AdminCMSItem {
  id: string;
  title: string;
  category: 'Homepage' | 'Services' | 'Portfolio' | 'Case Studies' | 'Blog' | 'Industries' | 'SEO';
  author: string;
  lastUpdated: string;
  status: CMSContentStatus;
  views?: number;
  slug: string;
}

export type MeetingType = 'Discovery Call' | 'Project Kickoff' | 'Design Review' | 'Development Review' | 'QA Review' | 'Client Feedback' | 'Support Call' | 'Internal Meeting';

export interface AdminMeetingItem {
  id: string;
  title: string;
  clientName: string;
  company: string;
  projectName: string;
  date: string;
  time: string;
  duration: string;
  type: MeetingType;
  assignedTeam: string[];
  link: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface AdminDeadlineItem {
  id: string;
  title: string;
  type: 'Project Deadline' | 'Milestone Deadline' | 'Invoice Due Date' | 'Content Deadline' | 'Deployment Date';
  date: string;
  priority: 'High' | 'Medium' | 'Normal';
  status: 'Pending' | 'Completed' | 'Overdue';
  assignedPerson: string;
  projectName: string;
}

export interface AdminSearchItem {
  id: string;
  type: 'Lead' | 'Client' | 'Project' | 'Invoice' | 'Media' | 'Blog' | 'Team';
  title: string;
  subtitle: string;
  view: AdminView;
}
