/**
 * Business Intelligence, Telemetry, Lead Scoring & CRM Integration Engine
 * Byte Build
 */

export interface TelemetryEvent {
  eventName: string;
  category: 'engagement' | 'conversion' | 'navigation' | 'download';
  label?: string;
  value?: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface LeadScoreInput {
  budgetRange?: string;
  timeline?: string;
  companySize?: string;
  requiredFeaturesCount?: number;
  industry?: string;
}

export interface CRMLeadPayload {
  leadScore: number;
  intentTier: 'HOT' | 'WARM' | 'QUALIFIED';
  contact: {
    name: string;
    email: string;
    phone?: string;
    preferredMethod?: string;
  };
  business: {
    name?: string;
    industry?: string;
    size?: string;
  };
  project: {
    goal?: string;
    budget?: string;
    timeline?: string;
    features?: string[];
    notes?: string;
  };
  telemetry: {
    submittedAt: string;
    sourceUrl: string;
    userAgent: string;
  };
}

class AnalyticsService {
  private eventsLog: TelemetryEvent[] = [];

  /**
   * Track user telemetry event
   */
  public trackEvent(eventName: string, category: TelemetryEvent['category'], label?: string, value?: number, metadata?: Record<string, unknown>) {
    const event: TelemetryEvent = {
      eventName,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      metadata
    };

    this.eventsLog.push(event);

    // Development Console Log for Debugging
    if (import.meta.env.DEV) {
      console.log(`[Telemetry Event]: ${category.toUpperCase()} -> ${eventName}`, event);
    }
  }

  /**
   * Calculate Algorithmic Lead Score (0 - 100)
   */
  public calculateLeadScore(input: LeadScoreInput): number {
    let score = 20; // Base score for reaching discovery/booking

    // Budget Tier Weight
    if (input.budgetRange?.includes('$50,000+')) score += 40;
    else if (input.budgetRange?.includes('$25,000')) score += 30;
    else if (input.budgetRange?.includes('$10,000')) score += 20;
    else if (input.budgetRange?.includes('$5,000')) score += 10;

    // Velocity Timeline Weight
    if (input.timeline?.includes('Immediately')) score += 20;
    else if (input.timeline?.includes('1 Month')) score += 15;
    else if (input.timeline?.includes('1–3 Months')) score += 10;

    // Company Size Weight
    if (input.companySize?.includes('200+')) score += 15;
    else if (input.companySize?.includes('51-200')) score += 10;
    else if (input.companySize?.includes('11-50')) score += 5;

    // Feature Complexity Weight
    if (input.requiredFeaturesCount && input.requiredFeaturesCount >= 4) score += 10;

    return Math.min(100, score);
  }

  /**
   * Format CRM Webhook Payload for HubSpot / Salesforce / Django DRF
   */
  public generateCRMPayload(formData: any): CRMLeadPayload {
    const leadScore = this.calculateLeadScore({
      budgetRange: formData.budgetRange || formData.budget,
      timeline: formData.timeline,
      companySize: formData.companySize,
      requiredFeaturesCount: formData.requiredFeatures?.length || 0,
      industry: formData.industry
    });

    const intentTier: CRMLeadPayload['intentTier'] = leadScore >= 75 ? 'HOT' : leadScore >= 50 ? 'WARM' : 'QUALIFIED';

    return {
      leadScore,
      intentTier,
      contact: {
        name: formData.name || formData.clientName || 'Anonymous Inquiry',
        email: formData.email || '',
        phone: formData.phone || '',
        preferredMethod: formData.contactMethod || 'Email'
      },
      business: {
        name: formData.businessName || '',
        industry: formData.industry || '',
        size: formData.companySize || ''
      },
      project: {
        goal: formData.projectGoal || formData.projectOverview || '',
        budget: formData.budgetRange || formData.budget || '',
        timeline: formData.timeline || '',
        features: formData.requiredFeatures || [],
        notes: formData.message || ''
      },
      telemetry: {
        submittedAt: new Date().toISOString(),
        sourceUrl: window.location.href,
        userAgent: navigator.userAgent
      }
    };
  }
}

export const analytics = new AnalyticsService();
