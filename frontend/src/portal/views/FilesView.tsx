import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen,
  Upload,
  Download,
  Search,
  Eye,
  FileText,
  X,
  FileCheck,
  Video,
  Image as ImageIcon,
  History,
  Palette
} from 'lucide-react';
import type { FileItem, DeliverableItem, VersionHistoryItem, PortalView } from '../types';
import { mockVersionHistory } from '../portalData';

interface FilesViewProps {
  files: FileItem[];
  deliverables?: DeliverableItem[];
  versionHistory?: VersionHistoryItem[];
  onNavigate?: (view: PortalView) => void;
}

export const FilesView: React.FC<FilesViewProps> = ({
  files,
  deliverables = [],
  versionHistory = mockVersionHistory,
  onNavigate: _onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fileList, setFileList] = useState<FileItem[]>(files);
  const [activePreviewFile, setActivePreviewFile] = useState<FileItem | DeliverableItem | null>(null);
  
  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Default Deliverables Fallback
  const defaultDeliverables: DeliverableItem[] = deliverables.length > 0 ? deliverables : [
    { id: 'del-1', title: 'Homepage Design', status: 'Approved', version: 'v2.4', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800', date: 'Oct 29, 2026' },
    { id: 'del-2', title: 'UI Kit', status: 'Approved', version: 'v2.0', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800', date: 'Oct 24, 2026' },
    { id: 'del-3', title: 'Source Code', status: 'In Review', version: 'v1.8', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', date: 'Oct 30, 2026' },
    { id: 'del-4', title: 'Brand Assets', status: 'Final', version: 'v1.0', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', date: 'Oct 15, 2026' },
    { id: 'del-5', title: 'Final Website', status: 'In Review', version: 'v0.9-beta', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', date: 'Nov 01, 2026' },
    { id: 'del-6', title: 'Documentation', status: 'Approved', version: 'v1.2', downloadUrl: '#', previewUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', date: 'Oct 20, 2026' }
  ];

  // Search Filter
  const filteredFiles = useMemo(() => {
    if (!searchQuery.trim()) return fileList.slice(0, 8);
    const q = searchQuery.toLowerCase().trim();
    return fileList.filter(
      f => f.name.toLowerCase().includes(q) ||
           f.projectName.toLowerCase().includes(q) ||
           f.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [fileList, searchQuery]);

  // Upload Handler Simulation
  const handleSimulatedUpload = (file: File) => {
    setUploadedFileName(file.name);
    setUploadProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setUploadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          const newFile: FileItem = {
            id: `f-${Date.now()}`,
            name: file.name,
            projectName: 'Aura Health Flagship',
            uploadedBy: 'Alex Vance (Client)',
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            category: file.name.split('.').pop()?.toUpperCase() || 'FILE',
            fileType: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'doc',
            uploadDate: 'Just now',
            downloadUrl: '#',
            previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
          };
          setFileList([newFile, ...fileList]);
          setUploadProgress(null);
          setIsUploadModalOpen(false);
        }, 400);
      }
    }, 150);
  };

  const getDeliverableStatusStyle = (status: DeliverableItem['status']) => {
    switch (status) {
      case 'Approved':
        return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
      case 'In Review':
        return 'text-amber-600 bg-amber-500/10 border-amber-500/30 animate-pulse';
      case 'Final':
        return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
    }
  };

  const getFileTypeIcon = (fileType: FileItem['fileType']) => {
    switch (fileType) {
      case 'image': return <ImageIcon className="w-5 h-5 text-indigo-500" />;
      case 'video': return <Video className="w-5 h-5 text-rose-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'design': return <Palette className="w-5 h-5 text-purple-500" />;
      default: return <FileCheck className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-12 text-left pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Max 2 lines description)                                 */}
      {/* ========================================================================= */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Client Deliverable Center</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Files & Deliverables
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Access final project deliverables, download design assets, preview client files, and track version history in one calm, effortless workspace.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTIONS (4 Large Buttons)                                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => setIsUploadModalOpen(true)}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <Upload className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">Upload Files</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => alert('Downloading complete project deliverable ZIP package...')}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <Download className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">Download All</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => {
            const el = document.getElementById('project-deliverables-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <FileCheck className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">View Deliverables</span>
        </motion.button>

        <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search filename, project..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RECENT FILES (Max 8 Recent Files)                                      */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Recent Files ({filteredFiles.length})
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Max 8 recent items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <motion.div
              key={file.id}
              whileHover={{ y: -3 }}
              className="neo-card p-4 rounded-2xl border border-[var(--border-light)] space-y-3 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all group"
            >
              <div className="space-y-2.5">
                {/* File Thumbnail or Icon Header */}
                <div className="h-28 w-full neo-inset rounded-xl flex items-center justify-center overflow-hidden relative group-hover:neo-card transition-all">
                  {file.previewUrl ? (
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center space-y-1">
                      {getFileTypeIcon(file.fileType)}
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block font-bold">
                        {file.category}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => setActivePreviewFile(file)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-bold text-xs backdrop-blur-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>

                {/* File Details */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block truncate" title={file.name}>
                    {file.name}
                  </span>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] space-y-0.5">
                    <p className="truncate">Project: {file.projectName}</p>
                    <p>Uploaded by: {file.uploadedBy}</p>
                    <p>{file.size} • {file.uploadDate}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                <button
                  onClick={() => setActivePreviewFile(file)}
                  className="neo-pill px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <a
                  href={file.downloadUrl}
                  download
                  className="neo-btn text-[11px] py-1.5 px-3 font-bold inline-flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PROJECT DELIVERABLES (Homepage, UI Kit, Source Code, Brand Assets...)   */}
      {/* ========================================================================= */}
      <div id="project-deliverables-section" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Project Deliverables Center
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Official Client Sign-Off Assets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultDeliverables.map((del) => (
            <motion.div
              key={del.id}
              whileHover={{ y: -3 }}
              className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getDeliverableStatusStyle(del.status)}`}>
                    {del.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--accent-primary)] font-extrabold">
                    {del.version}
                  </span>
                </div>

                <div className="h-32 w-full neo-inset rounded-xl overflow-hidden relative group">
                  {del.previewUrl ? (
                    <img src={del.previewUrl} alt={del.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)] font-mono text-xs">
                      {del.title} Preview
                    </div>
                  )}

                  <button
                    onClick={() => setActivePreviewFile(del)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-bold text-xs backdrop-blur-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Asset</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">{del.title}</h3>
                  <p className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">Updated: {del.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => setActivePreviewFile(del)}
                  className="neo-btn text-xs py-2 px-4 font-bold flex-1 justify-center inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <a
                  href={del.downloadUrl}
                  download
                  className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold flex-1 justify-center inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. VERSION HISTORY (Max 5 Previous Versions)                               */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
            <History className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Deliverables Version History (Max 5)</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Previous Asset Revisions</span>
        </div>

        <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold">Deliverable</th>
                  <th className="py-3.5 px-6 font-bold">Version</th>
                  <th className="py-3.5 px-6 font-bold">Upload Date</th>
                  <th className="py-3.5 px-6 font-bold">Uploaded By</th>
                  <th className="py-3.5 px-6 font-bold">Revision Notes</th>
                  <th className="py-3.5 px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {versionHistory.slice(0, 5).map((vh) => (
                  <tr key={vh.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                      {vh.deliverableTitle}
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-[var(--accent-primary)]">
                      {vh.version}
                    </td>
                    <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                      {vh.uploadDate}
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">
                      {vh.uploadedBy}
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)] max-w-xs truncate">
                      {vh.revisionNotes}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <a
                        href={vh.downloadUrl}
                        download
                        className="neo-pill px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] font-bold inline-flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {vh.version}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILE PREVIEW MODAL                                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePreviewFile && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActivePreviewFile(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-3xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setActivePreviewFile(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">File Preview</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">
                  {'name' in activePreviewFile ? activePreviewFile.name : activePreviewFile.title}
                </h3>
              </div>

              {/* Preview Content Renderer */}
              <div className="neo-inset rounded-2xl min-h-[280px] flex items-center justify-center overflow-hidden p-2">
                {activePreviewFile.previewUrl && activePreviewFile.previewUrl.endsWith('.mp4') ? (
                  <video src={activePreviewFile.previewUrl} controls className="w-full max-h-[380px] rounded-xl" />
                ) : activePreviewFile.previewUrl ? (
                  <img src={activePreviewFile.previewUrl} alt="Preview" className="w-full max-h-[380px] object-contain rounded-xl" />
                ) : (
                  <div className="text-center py-12 space-y-3 text-[var(--text-tertiary)] font-mono">
                    <FileText className="w-12 h-12 mx-auto text-[var(--accent-primary)]" />
                    <p className="text-xs font-bold">Standard Document Preview Ready</p>
                    <p className="text-[11px]">Click download below to access complete high-res source files.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                  {'size' in activePreviewFile ? activePreviewFile.size : activePreviewFile.version}
                </span>

                <a
                  href={activePreviewFile.downloadUrl}
                  download
                  className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* UPLOAD MODAL (Drag & Drop, Progress, Supported Types)                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsUploadModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-lg w-full p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Drag & Drop Upload</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Upload Project Assets</h3>
                <p className="text-xs text-[var(--text-secondary)]">Files are securely dispatched to your Senior Product Architect.</p>
              </div>

              {uploadProgress !== null ? (
                <div className="space-y-4 py-6">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-[var(--text-primary)]">{uploadedFileName}</span>
                    <span className="text-[var(--accent-primary)]">{uploadProgress}%</span>
                  </div>

                  <div className="h-3 w-full neo-inset rounded-full p-0.5 overflow-hidden">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-200"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setUploadProgress(null)}
                      className="text-xs font-bold text-rose-500 hover:underline"
                    >
                      Cancel Upload
                    </button>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Uploading...</span>
                  </div>
                </div>
              ) : (
                <label className="neo-inset p-8 rounded-2xl border-2 border-dashed border-[var(--border-light)] hover:border-[var(--accent-primary)] flex flex-col items-center justify-center text-center cursor-pointer space-y-3 transition-colors block">
                  <Upload className="w-10 h-10 text-[var(--accent-primary)]" />
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-[var(--text-primary)] block">
                      Drag & drop files here or click to browse
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
                      Supported: PNG, JPG, PDF, DOCX, ZIP, FIG, PSD, MP4 (Max 250MB)
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleSimulatedUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
