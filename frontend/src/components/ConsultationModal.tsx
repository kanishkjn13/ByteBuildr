import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Send,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import type { BookingData } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<BookingData>;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    message: initialData?.projectOverview || ''
  });

  // Validation Errors & Touched Fields
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Full Name must be at least 2 characters.';
        if (value.trim().length > 60) return 'Full Name cannot exceed 60 characters.';
        if (!/^[a-zA-Z\s'.-]+$/.test(value)) return 'Full Name can only contain letters and spaces.';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email Address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address (e.g. alex@company.com).';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone Number is required.';
        const digitCount = value.replace(/[^0-9]/g, '').length;
        if (digitCount < 7 || digitCount > 15) return 'Please enter a valid phone number (7 to 15 digits).';
        return '';

      case 'message':
        if (!value.trim()) return 'Project Notes are required.';
        if (value.trim().length > 1000) return 'Notes cannot exceed 1000 characters.';
        return '';

      case 'company':
        if (value.length > 80) return 'Company Name cannot exceed 80 characters.';
        return '';

      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      company: validateField('company', formData.company),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, company: true, message: true });

    const hasErrors = Object.values(newErrors).some(msg => msg !== '');
    if (hasErrors) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
    } else {
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrors({});
    setTouched({});
    onClose();
  };

  const getInputClass = (field: string) => {
    const hasError = touched[field as keyof typeof touched] && errors[field];
    return `w-full pl-10 pr-4 font-medium text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 rounded-xl shadow-sm focus:outline-none transition-all placeholder-[var(--text-tertiary)] ${
      isMobile ? 'min-h-[52px] rounded-2xl text-base py-3' : 'py-2.5 text-xs md:text-sm'
    } ${
      hasError 
        ? 'border-rose-500/80 ring-4 ring-rose-500/10' 
        : 'border-[var(--border-light)] hover:border-[var(--accent-primary)]/40 focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-blue-500/15'
    }`;
  };

  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`modal-content relative max-w-xl text-left shadow-2xl ${
          isMobile ? 'p-8 rounded-[32px]' : 'p-5 sm:p-7 rounded-[28px]'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full neo-pill flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-2">
                <span>30-MINUTE STRATEGY CONSULTATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                Schedule a Free Consultation
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Directly connect with our Senior Web Architect to review your project goals.
              </p>
            </div>

            <motion.div
              animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.35 }}
            >
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    autoCapitalize="words"
                    autoCorrect="off"
                    inputMode="text"
                    enterKeyHint="next"
                    minLength={2}
                    maxLength={60}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Dr. Anya Sharma"
                    className={getInputClass('name')}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-primary)] block">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      inputMode="email"
                      enterKeyHint="next"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="anya@clinic.com"
                      className={getInputClass('email')}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-primary)] block">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      minLength={7}
                      maxLength={20}
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+91 98765 43210"
                      className={getInputClass('phone')}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Company / Organization <span className="text-[var(--text-tertiary)] font-normal">(Optional, Max 80 chars)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={80}
                    autoCapitalize="words"
                    enterKeyHint="next"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    onBlur={() => handleBlur('company')}
                    placeholder="Aura Health Medical Group"
                    className={getInputClass('company')}
                  />
                </div>
                {touched.company && errors.company && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.company}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--text-primary)] block">
                  Project Notes / Requirements <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--accent-primary)]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    required
                    maxLength={1000}
                    rows={4}
                    autoCapitalize="sentences"
                    enterKeyHint="done"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="How can we help? Share your target timeline, features needed..."
                    className={`w-full pl-10 pr-4 py-3 text-xs md:text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 rounded-xl shadow-sm focus:outline-none transition-all leading-relaxed placeholder-[var(--text-tertiary)] ${
                      isMobile ? 'min-h-[100px] rounded-2xl text-base' : ''
                    } ${
                      touched.message && errors.message 
                        ? 'border-rose-500/80 ring-4 ring-rose-500/10' 
                        : 'border-[var(--border-light)] hover:border-[var(--accent-primary)]/40 focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-blue-500/15'
                    }`}
                  />
                </div>
                {touched.message && errors.message && (
                  <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className={`w-full neo-btn neo-btn-accent justify-center font-bold gap-2 group ${
                    isMobile ? 'min-h-[52px] rounded-full text-sm font-extrabold py-3.5 px-8 shadow-xl' : 'text-xs md:text-sm py-4 px-8 shadow-xl'
                  }`}
                >
                  <span>Reserve Free Consultation Slot</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              <p className="text-[11px] text-[var(--text-tertiary)] text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>100% confidential. Response within 12 hours.</span>
                </p>
              </div>

            </form>
          </motion.div>
        </div>
        ) : (
          /* Submission Success View */
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full neo-card bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                Consultation Request Received!
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A calendar confirmation has been sent to <strong>{formData.email || 'your email'}</strong>. Our team will reach out within 12 hours.
              </p>
            </div>

            <div className="neo-inset p-4 rounded-xl max-w-sm mx-auto text-xs text-left space-y-1.5 border border-[var(--border-subtle)]">
              <div className="flex justify-between">
                <span className="text-[var(--text-tertiary)]">Response Window:</span>
                <span className="font-bold text-emerald-500">&lt; 12 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-tertiary)]">Assigned Lead:</span>
                <span className="font-bold text-[var(--text-primary)]">Senior Web Architect</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className={`neo-btn neo-btn-accent justify-center font-bold ${
                isMobile ? 'w-full min-h-[52px] rounded-full text-sm font-extrabold py-3.5 px-8 shadow-md' : 'text-xs py-3 px-8 font-bold'
              }`}
            >
              Back to Website
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
