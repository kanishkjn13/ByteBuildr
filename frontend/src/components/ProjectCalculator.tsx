import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, Check, ArrowRight, 
  Building2, Activity, Utensils, Scale, Dumbbell, GraduationCap, Compass, Rocket,
  Clock, ShieldCheck
} from 'lucide-react';
import type { IndustryId } from '../types';

interface ProjectCalculatorProps {
  onOpenBookingWithScope: (scopeData: any) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({ onOpenBookingWithScope }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>('healthcare');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Lead Generation Engine', 'Automated Online Booking']);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Payment Gateway', 'CRM Sync']);
  const [selectedTimeline, setSelectedTimeline] = useState<'express' | 'standard' | 'enterprise'>('standard');

  const industriesList = [
    { id: 'healthcare', label: 'Clinics & Healthcare', icon: Activity, baseCost: 3800 },
    { id: 'realestate', label: 'Real Estate & Architecture', icon: Building2, baseCost: 4500 },
    { id: 'hospitality', label: 'Restaurants & Hotels', icon: Utensils, baseCost: 3500 },
    { id: 'legal', label: 'Lawyers & CAs', icon: Scale, baseCost: 3600 },
    { id: 'fitness', label: 'Gyms & Salons', icon: Dumbbell, baseCost: 3200 },
    { id: 'education', label: 'Schools & Coaching', icon: GraduationCap, baseCost: 3800 },
    { id: 'architecture', label: 'Construction & Interior', icon: Compass, baseCost: 4200 },
    { id: 'startups', label: 'Startups & Tech SMBs', icon: Rocket, baseCost: 4000 },
  ];

  const goalsList = [
    { id: 'Lead Generation Engine', label: 'Lead & Consultation Funnel', cost: 1200 },
    { id: 'Automated Online Booking', label: '24/7 Self-Service Booking Engine', cost: 1500 },
    { id: 'Soft Neomorphic Redesign', label: 'Soft Neomorphic Visual Identity', cost: 1400 },
    { id: 'E-commerce & Payments', label: 'Direct Payments & Digital Commerce', cost: 1800 },
    { id: 'Client Portal', label: 'Secure Client & Admin Dashboard', cost: 2200 },
    { id: 'SEO & Speed Overhaul', label: '100/100 Lighthouse & Search Ranking', cost: 950 },
  ];

  const featuresList = [
    { id: 'Payment Gateway', label: 'Stripe / Bank Payment Sync', cost: 600 },
    { id: 'CRM Sync', label: 'HubSpot / Salesforce / Pipeline API', cost: 750 },
    { id: 'SMS Reminders', label: 'Twilio Automated SMS & Email Reminders', cost: 500 },
    { id: 'AI Chat Assistant', label: '24/7 Intelligent AI Client Lead Bot', cost: 1200 },
    { id: 'Multi-Language', label: 'Multi-Language & Currency Support', cost: 650 },
    { id: 'Analytics Matrix', label: 'Custom Conversion Analytics Matrix', cost: 450 },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
    );
  };

  const toggleFeature = (featId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featId) ? prev.filter(f => f !== featId) : [...prev, featId]
    );
  };

  const calculateTotal = () => {
    const indObj = industriesList.find(i => i.id === selectedIndustry);
    const base = indObj ? indObj.baseCost : 3500;
    
    const goalsCost = selectedGoals.reduce((acc, goalId) => {
      const g = goalsList.find(item => item.id === goalId);
      return acc + (g ? g.cost : 0);
    }, 0);

    const featuresCost = selectedFeatures.reduce((acc, featId) => {
      const f = featuresList.find(item => item.id === featId);
      return acc + (f ? f.cost : 0);
    }, 0);

    let multiplier = 1.0;
    if (selectedTimeline === 'express') multiplier = 1.3;
    if (selectedTimeline === 'enterprise') multiplier = 1.6;

    const total = Math.round((base + goalsCost + featuresCost) * multiplier);
    const minEst = Math.round(total * 0.9);
    const maxEst = Math.round(total * 1.15);

    return { minEst, maxEst, total };
  };

  const { minEst, maxEst } = calculateTotal();

  const handleProceedToBooking = () => {
    const selectedIndObj = industriesList.find(i => i.id === selectedIndustry);
    onOpenBookingWithScope({
      industry: selectedIndObj?.label || selectedIndustry,
      goals: selectedGoals,
      features: selectedFeatures,
      timeline: selectedTimeline,
      estimatedBudget: `$${minEst.toLocaleString()} – $${maxEst.toLocaleString()}`
    });
  };

  return (
    <section id="calculator" className="py-24 relative bg-[var(--bg-primary)]">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-4">
            <Calculator className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Scope & Investment Estimator</span>
          </div>
          <h2 className="text-section-title text-[var(--text-primary)]">
            Calculate Your Digital Growth Engine Scope
          </h2>
          <p className="text-section-subtitle mt-4">
            Select your industry vertical, primary goals, and functional modules to configure a transparent estimate in real time.
          </p>
        </motion.div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Selection Steps (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Industry Selection */}
            <div className="neo-card p-6 md:p-8 border border-[var(--border-light)]">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block mb-2">
                Step 01 / Industry Vertical
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                What type of business are we engineering for?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {industriesList.map((ind) => {
                  const IconComp = ind.icon;
                  const isSelected = selectedIndustry === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndustry(ind.id as IndustryId)}
                      className={`neo-pill p-3 text-left flex flex-col items-center justify-center gap-2 transition-all ${
                        isSelected ? 'active shadow-md' : ''
                      }`}
                    >
                      <IconComp className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-[var(--accent-primary)]'}`} />
                      <span className="text-xs font-bold text-center leading-tight">{ind.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Primary Goals */}
            <div className="neo-card p-6 md:p-8 border border-[var(--border-light)]">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block mb-2">
                Step 02 / Core Objectives
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Select your primary digital goals (Multi-select)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalsList.map((goal) => {
                  const isChecked = selectedGoals.includes(goal.id);
                  return (
                    <div
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`neo-inset p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'border-2 border-[var(--accent-primary)] bg-blue-500/5' : ''
                      }`}
                    >
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{goal.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center neo-card ${isChecked ? 'bg-[var(--accent-primary)] text-white' : ''}`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Integrations & Features */}
            <div className="neo-card p-6 md:p-8 border border-[var(--border-light)]">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block mb-2">
                Step 03 / Modules & Integrations
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Choose advanced functional modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`neo-inset p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                        isChecked ? 'border-2 border-[var(--accent-primary)] bg-blue-500/5' : ''
                      }`}
                    >
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{feat.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center neo-card ${isChecked ? 'bg-[var(--accent-primary)] text-white' : ''}`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Timeline */}
            <div className="neo-card p-6 md:p-8 border border-[var(--border-light)]">
              <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block mb-2">
                Step 04 / Launch Velocity
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                What is your target launch timeframe?
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedTimeline('express')}
                  className={`neo-pill p-3 text-center ${selectedTimeline === 'express' ? 'active' : ''}`}
                >
                  <span className="block text-xs font-bold">Express Track</span>
                  <span className="block text-[10px] opacity-80">2–3 Weeks</span>
                </button>

                <button
                  onClick={() => setSelectedTimeline('standard')}
                  className={`neo-pill p-3 text-center ${selectedTimeline === 'standard' ? 'active' : ''}`}
                >
                  <span className="block text-xs font-bold">Standard Growth</span>
                  <span className="block text-[10px] opacity-80">4–6 Weeks</span>
                </button>

                <button
                  onClick={() => setSelectedTimeline('enterprise')}
                  className={`neo-pill p-3 text-center ${selectedTimeline === 'enterprise' ? 'active' : ''}`}
                >
                  <span className="block text-xs font-bold">Enterprise Suite</span>
                  <span className="block text-[10px] opacity-80">7–10 Weeks</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Live Scope & Estimate Output Card (Col 5 Sticky) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="neo-card p-8 border border-[var(--border-light)] sticky top-28 space-y-6 shadow-xl"
            >
              
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <h3 className="text-lg font-extrabold text-[var(--text-primary)]">Scope Summary</h3>
                <span className="badge-tag">Realtime Scope</span>
              </div>

              {/* Investment Price Range */}
              <div className="neo-inset p-6 rounded-xl text-center">
                <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase block mb-1">
                  Estimated Investment Range
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] glow-text block mb-2">
                  ${minEst.toLocaleString()} – ${maxEst.toLocaleString()}
                </span>
                <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                  Includes full soft neomorphic UI, React engineering, speed audit & launch QA.
                </span>
              </div>

              {/* Delivery & ROI Highlights */}
              <div className="space-y-3">
                <div className="neo-card p-4 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>Estimated Velocity</span>
                  </div>
                  <span className="font-bold text-[var(--text-primary)] uppercase">
                    {selectedTimeline === 'express' ? '2-3 Weeks (Fast Track)' : selectedTimeline === 'standard' ? '4-6 Weeks' : '7-10 Weeks'}
                  </span>
                </div>

                <div className="neo-card p-4 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Expected ROI Impact</span>
                  </div>
                  <span className="font-bold text-emerald-600">
                    3.2x – 4.5x Lead Uplift
                  </span>
                </div>
              </div>

              {/* Selected Scope Recap */}
              <div className="text-left text-xs space-y-2 text-[var(--text-secondary)]">
                <p><strong>Configured Modules:</strong> {selectedGoals.length + selectedFeatures.length} Active Specs</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedGoals.slice(0, 3).map((g, i) => (
                    <span key={i} className="neo-inset py-0.5 px-2 text-[10px]">{g}</span>
                  ))}
                  {selectedGoals.length > 3 && (
                    <span className="neo-inset py-0.5 px-2 text-[10px]">+{selectedGoals.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceedToBooking}
                className="neo-btn neo-btn-accent w-full py-4 justify-center text-sm font-bold shadow-xl"
              >
                <span>Schedule Consultation with Pre-Filled Scope</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="text-[11px] text-[var(--text-tertiary)] text-center">
                🔒 Zero obligation. Non-binding estimate delivered post-consultation.
              </p>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
