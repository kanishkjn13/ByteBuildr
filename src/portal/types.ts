export type PortalView = 
  | 'dashboard'
  | 'projects'
  | 'files'
  | 'invoices'
  | 'messages'
  | 'meetings'
  | 'support'
  | 'profile';

export type ProjectStatus = 'Planning' | 'Design' | 'Development' | 'Testing' | 'Review' | 'Completed';

export interface MilestoneItem {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dueDate: string;
  completedDate?: string;
}

export interface DeliverableItem {
  id: string;
  title: 'Homepage Design' | 'UI Kit' | 'Source Code' | 'Brand Assets' | 'Final Website' | 'Documentation' | string;
  status: 'Approved' | 'In Review' | 'Final';
  version: string;
  downloadUrl: string;
  previewUrl: string;
  date: string;
}

export interface VersionHistoryItem {
  id: string;
  deliverableTitle: string;
  version: string;
  uploadDate: string;
  uploadedBy: string;
  revisionNotes: string;
  downloadUrl: string;
}

export interface ClientProject {
  id: string;
  name: string;
  projectType: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  currentPhase: string;
  startDate: string;
  estimatedCompletion: string;
  projectManager: {
    name: string;
    role: string;
    avatar: string;
  };
  clientContact: {
    name: string;
    company: string;
    email: string;
  };
  liveDemoUrl?: string;
  milestones: MilestoneItem[];
  recentUpdates: Array<{ id: string; title: string; timestamp: string }>;
  deliverables: DeliverableItem[];
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'approval' | 'payment' | 'file' | 'meeting' | 'update';
}

export interface FileItem {
  id: string;
  name: string;
  projectName: string;
  uploadedBy: string;
  size: string;
  category: string;
  fileType: 'image' | 'pdf' | 'video' | 'design' | 'doc' | 'archive';
  uploadDate: string;
  downloadUrl: string;
  previewUrl: string;
}

export type BillingStatus = 'Paid' | 'Pending' | 'Partially Paid' | 'Overdue' | 'Cancelled';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  projectName: string;
  title: string;
  issueDate: string;
  dueDate: string;
  amount: string;
  status: BillingStatus;
  downloadUrl: string;
  description?: string;
}

export interface PaymentTransaction {
  id: string;
  transactionDate: string;
  invoiceNumber: string;
  paymentMethod: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface MessageAttachment {
  name: string;
  size: string;
  fileType: 'image' | 'pdf' | 'doc' | 'archive' | 'video' | 'design';
  downloadUrl: string;
  previewUrl?: string;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  sender: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  isAgency: boolean;
  attachments?: MessageAttachment[];
  read?: boolean;
}

export interface ConversationThread {
  id: string;
  projectId: string;
  projectName: string;
  projectManager: {
    name: string;
    role: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: string;
}

export type MeetingType = 'Discovery Call' | 'Project Discussion' | 'Design Review' | 'Development Update' | 'Training Session' | 'Support Call';
export type MeetingStatus = 'Scheduled' | 'Today' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface MeetingItem {
  id: string;
  title: string;
  projectName: string;
  date: string;
  time: string;
  duration: string;
  type: MeetingType;
  status: MeetingStatus;
  host: {
    name: string;
    role: string;
    avatar: string;
  };
  meetUrl: string;
  meetingId?: string;
  platform: 'Google Meet' | 'Zoom' | 'Microsoft Teams';
}

export interface MeetingNoteItem {
  id: string;
  meetingId: string;
  meetingTitle: string;
  date: string;
  summary: string;
  keyDecisions: string[];
  actionItems: string[];
  filesDiscussed: string[];
  nextSteps: string;
}

export type TicketCategory = 'General Question' | 'Technical Issue' | 'Bug Report' | 'Revision Request' | 'Billing' | 'Meeting Request' | 'Other';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting for Client' | 'Resolved' | 'Closed' | 'Cancelled';

export interface TicketMessageItem {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  text: string;
  timestamp: string;
  isAgency: boolean;
  attachment?: string;
}

export interface SupportTicketItem {
  id: string;
  ticketId: string;
  subject: string;
  projectName: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdDate: string;
  lastUpdated: string;
  assignedTo: {
    name: string;
    role: string;
    avatar: string;
  };
  description: string;
  conversation: TicketMessageItem[];
}

export interface NotificationItem {
  id: string;
  category: 'update' | 'message' | 'invoice' | 'meeting';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface ClientProfile {
  organizationName: string;
  company: string;
  orgLogoUrl: string;
  photoUrl: string;
  clientId: string;
  clientSince: string;
  accountStatus: string;
  orgEmail: string;
  orgPhone: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  primaryContact: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  companyInfo: {
    industry: string;
    website: string;
    gstNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  notificationPreferences: {
    projectUpdates: boolean;
    messages: boolean;
    invoices: boolean;
    meetingReminders: boolean;
    supportTickets: boolean;
    marketingEmails: boolean;
    emailUpdates?: boolean;
    smsAlerts?: boolean;
    invoiceReminders?: boolean;
  };
  firstName?: string;
  lastName?: string;
  name?: string;
  jobTitle?: string;
}
