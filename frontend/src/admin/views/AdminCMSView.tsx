import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  Edit,
  Globe,
  Download,
  Upload,
  X
} from 'lucide-react';
import type {
  AdminCMSItem,
  CMSContentStatus,
  AdminView
} from '../types';
import { mockAdminCMSItems } from '../adminData';

interface AdminCMSViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminCMSView: React.FC<AdminCMSViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'homepage' | 'services' | 'portfolio' | 'casestudies' | 'blog' | 'industries' | 'seo' | 'media'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  // Data State
  const [cmsItems, setCmsItems] = useState<AdminCMSItem[]>(mockAdminCMSItems);
  const [inspectingItem, setInspectingItem] = useState<AdminCMSItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const published = cmsItems.filter(i => i.status === 'Published').length;
    const drafts = cmsItems.filter(i => i.status === 'Draft').length;
    const scheduled = cmsItems.filter(i => i.status === 'Scheduled').length;
    const totalViews = cmsItems.reduce((acc, i) => acc + (i.views || 0), 0);
    const seoScore = '96%';
    return { published, drafts, scheduled, totalViews, seoScore };
  }, [cmsItems]);

  // Filtered CMS items
  const filteredItems = useMemo(() => {
    return cmsItems.filter(item => {
      const matchQuery = !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatusFilter === 'All' || item.status === selectedStatusFilter;

      const matchTab = activeTab === 'dashboard' || activeTab === 'seo' || activeTab === 'media' ||
        (activeTab === 'homepage' && item.category === 'Homepage') ||
        (activeTab === 'services' && item.category === 'Services') ||
        (activeTab === 'portfolio' && item.category === 'Portfolio') ||
        (activeTab === 'casestudies' && item.category === 'Case Studies') ||
        (activeTab === 'blog' && item.category === 'Blog') ||
        (activeTab === 'industries' && item.category === 'Industries');

      return matchQuery && matchStatus && matchTab;
    });
  }, [cmsItems, searchQuery, selectedStatusFilter, activeTab]);

  const getStatusBadge = (status: CMSContentStatus) => {
    switch (status) {
      case 'Published': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-extrabold';
      case 'Draft': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'Scheduled': return 'text-purple-600 bg-purple-500/10 border-purple-500/30 font-bold';
      case 'Pending Review': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleExportCMS = (format: 'JSON' | 'CSV' | 'Markdown') => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Byte Build_CMS_Export_${format.toLowerCase()}_${Date.now()}.${format === 'JSON' ? 'json' : 'csv'}`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast(`Exported all CMS content in ${format} format!`);
  };

  return (
    <div className="space-y-8 text-left pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 neo-card p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold shadow-2xl"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Header & Sub-Nav Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Agency CMS Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Website Content Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportCMS('JSON')}
              className="neo-pill px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 border border-[var(--border-light)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CMS</span>
            </button>

            <button
              onClick={() => {
                triggerToast('Opening Content Editor...');
              }}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Content</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'homepage', label: 'Homepage Editor' },
            { id: 'services', label: 'Services' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'casestudies', label: 'Case Studies' },
            { id: 'blog', label: 'Blog Articles' },
            { id: 'industries', label: 'Industries' },
            { id: 'seo', label: 'SEO Audit' },
            { id: 'media', label: 'Media Library' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 border ${
                activeTab === tab.id
                  ? 'neo-inset text-[var(--accent-primary)] border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5'
                  : 'neo-card border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search, Filter, and Grid/List Switcher Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-80">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, author, slug..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="neo-input text-xs py-1.5 px-3 w-40"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="neo-card p-1 rounded-xl border border-[var(--border-light)] flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'neo-inset text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'neo-inset text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CMS DASHBOARD                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Telemetry Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Published Pages</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.published}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Live Website Pages</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Draft Content</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.drafts}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">In Editorial Review</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Scheduled Posts</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.scheduled}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Automated Queue</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total CMS Views</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">{metrics.totalViews.toLocaleString()}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Visitor Engagements</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">SEO Health Score</span>
              <span className="text-2xl font-black text-[var(--accent-primary)] font-mono block">{metrics.seoScore}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Sub-500ms Speed Optimized</span>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Create Blog', action: () => triggerToast('Opening Blog Editor...') },
              { label: 'Add Portfolio', action: () => triggerToast('Opening Portfolio Editor...') },
              { label: 'Add Service', action: () => triggerToast('Opening Service Editor...') },
              { label: 'Upload Media', action: () => onNavigate ? onNavigate('media') : triggerToast('Opening Media Library...') },
              { label: 'Edit Homepage', action: () => triggerToast('Opening Homepage Layout...') }
            ].map((qa, idx) => (
              <button
                key={idx}
                onClick={qa.action}
                className="neo-card p-3.5 rounded-xl border border-[var(--border-light)] text-xs font-bold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all text-center"
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* CMS Content Roster */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Central Content Inventory ({filteredItems.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="badge-tag">{item.category}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{item.title}</h3>
                      <p className="text-[10px] font-mono text-[var(--accent-primary)] font-bold mt-1">{item.slug}</p>
                    </div>

                    <div className="neo-inset p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] text-[var(--text-tertiary)]">Author: {item.author}</span>
                      <span className="font-bold text-[var(--text-primary)]">{item.views ? `${item.views} Views` : item.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <button
                      onClick={() => setInspectingItem(item)}
                      className="neo-btn text-xs py-1.5 px-3.5 font-bold inline-flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>
                    <a
                      href={item.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-pill px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts Grid (SEO & Media) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SEO Shortcut Card */}
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--accent-primary)]" />
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">SEO Health & Audit Shortcut</h3>
                </div>
                <span className="neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10">96% Optimal</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="neo-inset p-3 rounded-xl">
                  <span className="text-[10px] text-[var(--text-tertiary)] block">Missing Meta Titles</span>
                  <span className="font-bold text-emerald-600 block">0 Found ✓</span>
                </div>
                <div className="neo-inset p-3 rounded-xl">
                  <span className="text-[10px] text-[var(--text-tertiary)] block">Missing Descriptions</span>
                  <span className="font-bold text-emerald-600 block">0 Found ✓</span>
                </div>
              </div>

              <button
                onClick={() => triggerToast('Running instant automated SEO audit...')}
                className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold w-full justify-center inline-flex items-center gap-1.5"
              >
                <span>Run SEO Quick Audit</span>
              </button>
            </div>

            {/* Media Shortcut Card */}
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--accent-primary)]" />
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">Media Library Shortcut</h3>
                </div>
                <span className="neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold">1.4 GB / 10 GB</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="neo-inset p-3 rounded-xl text-center">
                  <span className="font-extrabold text-[var(--text-primary)] block">128</span>
                  <span className="text-[9px] text-[var(--text-tertiary)] block">Images</span>
                </div>
                <div className="neo-inset p-3 rounded-xl text-center">
                  <span className="font-extrabold text-[var(--text-primary)] block">14</span>
                  <span className="text-[9px] text-[var(--text-tertiary)] block">Videos</span>
                </div>
                <div className="neo-inset p-3 rounded-xl text-center">
                  <span className="font-extrabold text-[var(--text-primary)] block">42</span>
                  <span className="text-[9px] text-[var(--text-tertiary)] block">Brand Assets</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate ? onNavigate('media') : triggerToast('Opening Media Center...')}
                className="neo-btn text-xs py-2 px-4 font-bold w-full justify-center inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Open Media Manager</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TABS 2-10: INDIVIDUAL CATEGORY VIEWS                                      */}
      {/* ========================================================================= */}
      {activeTab !== 'dashboard' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Category Management: {activeTab.toUpperCase()} ({filteredItems.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(item.status)}`}>{item.status}</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{item.lastUpdated}</span>
                </div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs font-mono text-[var(--accent-primary)] font-bold">{item.slug}</p>
                <div className="pt-2 border-t border-[var(--border-subtle)] flex justify-end">
                  <button onClick={() => setInspectingItem(item)} className="neo-btn text-xs py-1.5 px-3 font-bold">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INSPECT / EDIT CONTENT MODAL */}
      <AnimatePresence>
        {inspectingItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingItem(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[28px] max-w-xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button onClick={() => setInspectingItem(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">{inspectingItem.category}</span>
                <h2 className="text-xl font-black text-[var(--text-primary)]">{inspectingItem.title}</h2>
                <p className="text-xs font-mono text-[var(--accent-primary)] font-bold">{inspectingItem.slug}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Content Title</label>
                  <input type="text" value={inspectingItem.title} onChange={(e) => setInspectingItem({ ...inspectingItem, title: e.target.value })} className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Status Stage</label>
                  <select value={inspectingItem.status} onChange={(e) => setInspectingItem({ ...inspectingItem, status: e.target.value as CMSContentStatus })} className="neo-input text-xs font-bold">
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-end gap-3 text-xs">
                <button onClick={() => setInspectingItem(null)} className="neo-btn text-xs py-2 px-5 font-bold">Cancel</button>
                <button
                  onClick={() => {
                    if (inspectingItem) {
                      setCmsItems(cmsItems.map(i => i.id === inspectingItem.id ? inspectingItem : i));
                    }
                    setInspectingItem(null);
                    triggerToast('CMS Content item updated!');
                  }}
                  className="neo-btn neo-btn-accent text-xs py-2 px-6 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
