export type IndustryId = 
  | 'healthcare' 
  | 'realestate' 
  | 'hospitality' 
  | 'legal' 
  | 'fitness' 
  | 'education' 
  | 'architecture' 
  | 'startups';

export interface IndustrySolution {
  id: IndustryId;
  name: string;
  category: string;
  iconName: string;
  headline: string;
  description: string;
  targetClients: string[];
  keyOutcomes: string[];
  metrics: { label: string; value: string }[];
  featuredTech: string[];
}

export interface PortfolioProject {
  id: string;
  industryId: IndustryId;
  title: string;
  clientName: string;
  summary: string;
  tags: string[];
  heroImage: string;
  result: string;
  projectType?: 'web' | 'mobile' | 'portfolio';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  outcomes: string[];
  deliverables: string[];
  badge?: string;
}

export interface CalculatorState {
  industry: IndustryId | '';
  goals: string[];
  features: string[];
  timeline: 'express' | 'standard' | 'enterprise';
  budgetTier?: string;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  selectedDate: string;
  selectedTime: string;
  projectBudget: string;
  projectOverview: string;
  serviceType?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Partnership' | 'Process & Speed' | 'ROI & Growth' | 'Support';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  image: string;
  content: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
}

export interface TechStackItem {
  name: string;
  category: string;
  iconName: string;
  description: string;
  badge: string;
}
