import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Lock, 
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Clock,
  MapPin
} from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TextReveal } from '../components/effects/TextReveal';
import { GradientText } from '../components/effects/GradientText';
import { TextHighlighter } from '../components/effects/TextHighlighter';
import { useIsMobile } from '../hooks/useIsMobile';

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Simple Client Contact Information State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // Validation Error State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return `Message must be at least 10 characters (${value.trim().length}/10).`;
        if (value.trim().length > 1000) return 'Message cannot exceed 1000 characters.';
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
      setIsSubmitted(true);
    }
  };

  const getInputClass = (field: string) => {
    const hasError = touched[field as keyof typeof touched] && errors[field];
    return `w-full pl-11 pr-4 font-medium text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 rounded-xl shadow-sm focus:outline-none transition-all placeholder-[var(--text-tertiary)] ${
      isMobile ? 'min-h-[52px] rounded-2xl text-base py-3' : 'py-3.5 text-xs md:text-sm'
    } ${
      hasError 
        ? 'border-rose-500/80 ring-4 ring-rose-500/10' 
        : 'border-[var(--border-light)] hover:border-[var(--accent-primary)]/40 focus:border-[var(--accent-primary)] focus:ring-4 focus:ring-blue-500/15'
    }`;
  };

  return (
    <>
      <SEOHead 
        title="Contact Us | Byte Build"
        description="Get in touch with Byte Build. Send us a message with your contact information and our team will reach out to you within 12 hours."
      />

      <section className="min-h-0 md:min-h-[calc(100vh-80px)] flex flex-col justify-start md:justify-center pt-20 pb-6 md:pb-16 bg-[var(--bg-primary)] relative overflow-hidden text-left">
        {/* Ambient Radial Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto space-y-6 md:space-y-10 relative z-10 px-4">
          
          <Breadcrumbs />

          {/* 1. Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6 pt-2 pb-2"
          >
            <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="text-hero text-[var(--text-primary)] leading-[1.1]">
              <TextReveal text="We'd Love to Hear From" />{' '}
              <GradientText>You.</GradientText>
            </h1>

            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              <TextReveal text="Please share your details below. Our senior team will review your message and reach out to you" />{' '}
              <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                <span className="font-bold text-[var(--text-primary)]">within 12 hours.</span>
              </TextHighlighter>
            </p>
          </motion.div>

          {/* 2. Simple & Beautiful Client Contact Form */}
          <div id="contact-form" className="max-w-2xl mx-auto text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`neo-card border border-[var(--border-light)] shadow-2xl relative overflow-hidden text-left ${
                isMobile ? 'p-5 rounded-[24px]' : 'p-6 sm:p-10 rounded-[28px]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-subtle)] pb-4 md:pb-6 mb-4 md:mb-8 gap-3 md:gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
                    CONTACT INFORMATION
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)] mt-1">
                    Send Us a Message
                  </h2>
                </div>
                <div className="flex items-center gap-2 neo-pill px-3 py-1.5 text-[11px] text-[var(--text-secondary)] font-mono self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Privacy</span>
                </div>
              </div>

              {!isSubmitted ? (
                <motion.div
                  animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
                  transition={{ duration: 0.35 }}
                >
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-primary)] block">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--accent-primary)]">
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
                        onChange={e => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. John Doe"
                        className={getInputClass('name')}
                      />
                      {touched.name && !errors.name && formData.name.trim() !== '' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in zoom-in duration-200" />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-primary)] block">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--accent-primary)]">
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
                          onChange={e => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          placeholder="john@example.com"
                          className={getInputClass('email')}
                        />
                        {touched.email && !errors.email && formData.email.trim() !== '' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in zoom-in duration-200" />
                        )}
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-[11px] font-semibold text-rose-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[var(--text-primary)] block">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--accent-primary)]">
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
                          onChange={e => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="+1 (555) 000-0000"
                          className={getInputClass('phone')}
                        />
                        {touched.phone && !errors.phone && formData.phone.trim() !== '' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in zoom-in duration-200" />
                        )}
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
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[var(--text-primary)] block">
                      Company / Organization <span className="text-[var(--text-tertiary)] font-normal">(Optional, Max 80 chars)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--accent-primary)]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={80}
                        autoCapitalize="words"
                        enterKeyHint="next"
                        value={formData.company}
                        onChange={e => handleChange('company', e.target.value)}
                        onBlur={() => handleBlur('company')}
                        placeholder="e.g. Acme Corporation"
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
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-[var(--text-primary)] block">
                        Your Message / Query <span className="text-rose-500">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${formData.message.trim().length < 10 ? 'text-rose-500' : 'text-[var(--text-tertiary)]'}`}>
                        {formData.message.trim().length} / 1000 (Min 10 chars)
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none text-[var(--accent-primary)]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        minLength={10}
                        maxLength={1000}
                        rows={4}
                        autoCapitalize="sentences"
                        enterKeyHint="done"
                        value={formData.message}
                        onChange={e => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        placeholder="How can we help you? Tell us about your project ideas (Min 10 characters)..."
                        className={`w-full pl-11 pr-4 py-3 font-medium text-[var(--text-primary)] bg-[var(--bg-primary)] border-2 rounded-xl shadow-sm focus:outline-none transition-all leading-relaxed placeholder-[var(--text-tertiary)] ${
                          isMobile ? 'min-h-[100px] rounded-2xl text-base' : 'text-xs md:text-sm'
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

                  {/* Submit Button */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className={`w-full neo-btn neo-btn-accent justify-center font-bold gap-2 group ${
                        isMobile ? 'min-h-[52px] rounded-full text-sm font-extrabold py-3.5 px-8 shadow-xl' : 'text-xs md:text-sm py-4 px-8 shadow-xl'
                      }`}
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-[10px] sm:text-[11px] text-[var(--text-tertiary)] text-center max-w-xs mx-auto leading-relaxed">
                      <Lock className="w-3 h-3 text-emerald-500 inline-block mr-1.5 align-middle -mt-0.5" />
                      <span className="align-middle">Your info is 100% confidential. No spam ever.</span>
                    </p>
                  </div>

                </form>
              </motion.div>
              ) : (
                /* Success View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center neo-card mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. We have received your query and will contact you back shortly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.
                    </p>
                  </div>

                  <div className="neo-inset p-4 rounded-xl max-w-sm mx-auto text-xs text-left space-y-1.5 border border-[var(--border-subtle)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)]">Response Time:</span>
                      <span className="font-bold text-emerald-500">&lt; 12 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)]">Contact Line:</span>
                      <span className="font-bold text-[var(--text-primary)]">{formData.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', company: '', message: '' }); setErrors({}); setTouched({}); }}
                    className={`neo-btn justify-center font-bold ${
                      isMobile ? 'w-full min-h-[52px] rounded-full text-sm font-extrabold py-3.5 px-8 shadow-md bg-[var(--surface-recessed)] text-[var(--text-primary)]' : 'text-xs py-3 px-8 rounded-xl'
                    }`}
                  >
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. Direct Agency Information & Response Protocol Section */}
      <section className="pt-4 pb-16 md:py-16 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        <div className="container mx-auto px-4 space-y-12 max-w-5xl relative z-10">
            <div className="text-center space-y-3">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AGENCY DIRECTORY</span>
              </div>
              <h2 className="text-section-title text-[var(--text-primary)]">
                <GradientText>Direct Channels & Response Protocol</GradientText>
              </h2>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
                Prefer direct communication? Reach out to our senior team through our verified channels below.
              </p>
            </div>

            {/* Direct Contact Cards (2 Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Card 1: Direct Email */}
              <motion.div
                whileHover={{ y: -4 }}
                className="neo-card p-6 rounded-2xl border border-[var(--border-light)] space-y-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                    Direct Email
                  </span>
                  <a
                    href="mailto:ByteBuildd@gmail.com"
                    className="text-sm font-extrabold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors block truncate"
                  >
                    ByteBuildd@gmail.com
                  </a>
                </div>
                <div className="neo-pill px-3 py-1 text-[10px] font-mono text-emerald-500 font-bold inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>SLA: &lt; 12-Hour Response</span>
                </div>
              </motion.div>

              {/* Card 2: Studio HQ */}
              <motion.div
                whileHover={{ y: -4 }}
                className="neo-card p-6 rounded-2xl border border-[var(--border-light)] space-y-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                    Studio Headquarters
                  </span>
                  <address className="text-xs font-bold text-[var(--text-primary)] not-italic leading-relaxed block">
                    Indore, Madhya Pradesh<br />India
                  </address>
                </div>
                <div className="neo-pill px-3 py-1 text-[10px] font-mono text-[var(--text-tertiary)] font-bold inline-flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>Global Client Services</span>
                </div>
              </motion.div>
            </div>

            {/* What Happens Next - 3-Step Process */}
            <div className="neo-card p-5 md:p-10 rounded-3xl border border-[var(--border-light)] text-left space-y-6">
              <div className="border-b border-[var(--border-subtle)] pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider block">
                    TRANSPARENT PROCESS
                  </span>
                  <h3 className="text-xl font-extrabold text-[var(--text-primary)] mt-0.5">
                    What Happens After You Contact Us?
                  </h3>
                </div>
                <span className="neo-pill px-3 py-1 text-[10px] font-mono text-emerald-500 font-bold hidden sm:inline-block">
                  Guaranteed 3-Step Workflow
                </span>
              </div>

              <div className="relative">
                {/* Mobile vertical line connector */}
                <div className="absolute left-[15px] top-[20px] bottom-[20px] w-0.5 bg-gradient-to-b from-[var(--accent-primary)]/80 via-blue-500/40 to-cyan-500/10 md:hidden pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                  {/* Step 1 */}
                  <div className="relative pl-10 md:pl-0 flex flex-col space-y-2 text-left">
                    {/* Node */}
                    <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto flex items-center gap-2 font-mono text-xs font-black text-[var(--accent-primary)]">
                      <span className="w-8 h-8 md:w-6 md:h-6 rounded-full md:rounded-lg bg-[var(--surface-recessed)] md:bg-transparent neo-inset md:shadow-none flex items-center justify-center text-xs md:text-[10px] border border-[var(--border-light)] md:border-none">
                        01
                      </span>
                      <span className="hidden md:inline">Inquiry Review</span>
                    </div>
                    {/* Mobile Title */}
                    <div className="md:hidden font-mono text-xs font-black text-[var(--accent-primary)] -mt-1 pb-1">
                      Inquiry Review
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Our Senior Web Architect conducts an initial review of your project ideas, requirements, and technical scope within 4 hours.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-10 md:pl-0 flex flex-col space-y-2 text-left">
                    {/* Node */}
                    <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto flex items-center gap-2 font-mono text-xs font-black text-[var(--accent-primary)]">
                      <span className="w-8 h-8 md:w-6 md:h-6 rounded-full md:rounded-lg bg-[var(--surface-recessed)] md:bg-transparent neo-inset md:shadow-none flex items-center justify-center text-xs md:text-[10px] border border-[var(--border-light)] md:border-none">
                        02
                      </span>
                      <span className="hidden md:inline">Custom Proposal</span>
                    </div>
                    {/* Mobile Title */}
                    <div className="md:hidden font-mono text-xs font-black text-[var(--accent-primary)] -mt-1 pb-1">
                      Custom Proposal
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      We generate an itemized project proposal including deliverables, timeline estimates, and a transparent pricing quote.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-10 md:pl-0 flex flex-col space-y-2 text-left">
                    {/* Node */}
                    <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto flex items-center gap-2 font-mono text-xs font-black text-[var(--accent-primary)]">
                      <span className="w-8 h-8 md:w-6 md:h-6 rounded-full md:rounded-lg bg-[var(--surface-recessed)] md:bg-transparent neo-inset md:shadow-none flex items-center justify-center text-xs md:text-[10px] border border-[var(--border-light)] md:border-none">
                        03
                      </span>
                      <span className="hidden md:inline">Kickoff Alignment</span>
                    </div>
                    {/* Mobile Title */}
                    <div className="md:hidden font-mono text-xs font-black text-[var(--accent-primary)] -mt-1 pb-1">
                      Kickoff Alignment
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      We schedule a brief 15-minute alignment call to confirm key milestone dates, answer questions, and begin development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
