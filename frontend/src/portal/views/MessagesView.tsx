import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Search,
  CheckCheck,
  PanelRightClose,
  PanelRightOpen,
  Download,
  FileText,
  Video,
  Image as ImageIcon,
  ExternalLink,
  Calendar,
  FolderOpen,
  Receipt,
  Palette,
  X
} from 'lucide-react';
import type {
  MessageItem,
  ConversationThread,
  ClientProfile,
  ClientProject,
  MessageAttachment,
  PortalView
} from '../types';
import { mockConversationsList, mockCurrentProject } from '../portalData';

interface MessagesViewProps {
  messages: MessageItem[];
  conversations?: ConversationThread[];
  currentProject?: ClientProject;
  profile: ClientProfile;
  onNavigate?: (view: PortalView) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  messages,
  conversations = mockConversationsList,
  currentProject = mockCurrentProject,
  profile,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [msgList, setMsgList] = useState<MessageItem[]>(messages);
  const [inputText, setInputText] = useState('');
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true);
  
  // Pending File Attachment State
  const [pendingAttachment, setPendingAttachment] = useState<MessageAttachment | null>(null);
  
  // Quick Emoji Picker Toggle
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Active Selected Conversation
  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  // Search Conversations & Messages
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations.slice(0, 10);
    const q = searchQuery.toLowerCase().trim();
    return conversations.filter(
      c => c.projectName.toLowerCase().includes(q) ||
           c.projectManager.name.toLowerCase().includes(q) ||
           c.lastMessage.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [conversations, searchQuery]);

  // Active Messages for Selected Conversation
  const activeMessages = useMemo(() => {
    return msgList.filter(m => m.conversationId === activeConvId || !m.conversationId);
  }, [msgList, activeConvId]);

  // Handle Send Message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !pendingAttachment) return;

    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      conversationId: activeConvId,
      sender: profile.name || 'Client',
      role: 'Client',
      avatar: profile.photoUrl,
      text: inputText.trim(),
      timestamp: 'Just now',
      isAgency: false,
      attachments: pendingAttachment ? [pendingAttachment] : undefined,
      read: true
    };

    setMsgList([...msgList, newMsg]);
    setInputText('');
    setPendingAttachment(null);
    setShowEmojiPicker(false);
  };

  // Attachment File Selection Handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const att: MessageAttachment = {
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: f.type.startsWith('image/') ? 'image' : f.type.startsWith('video/') ? 'video' : 'doc',
        downloadUrl: '#',
        previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined
      };
      setPendingAttachment(att);
    }
  };

  const getAttachmentIcon = (fileType: MessageAttachment['fileType']) => {
    switch (fileType) {
      case 'image': return <ImageIcon className="w-4 h-4 text-indigo-500" />;
      case 'video': return <Video className="w-4 h-4 text-rose-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'design': return <Palette className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 text-left pb-10 h-[calc(100vh-120px)] min-h-[620px] flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 shrink-0">
        <div>
          <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Agency Messenger</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
            Client Communication Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
            className="neo-pill px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5"
            title="Toggle Project Info Panel"
          >
            {isInfoPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            <span className="hidden sm:inline">{isInfoPanelOpen ? 'Hide Info' : 'Show Info'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column or 3-Column Layout Grid */}
      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* COLUMN 1: CONVERSATION LIST (Left Column)                                  */}
        {/* ========================================================================= */}
        <div className="w-72 lg:w-80 neo-card rounded-[24px] border border-[var(--border-light)] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            
            {/* Search Conversations Input */}
            <div className="neo-inset p-2.5 rounded-xl flex items-center gap-2 text-xs">
              <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
              />
            </div>

            {/* Conversation Threads (Max 10) */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredConversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all border ${
                      isActive
                        ? 'neo-inset border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5 shadow-inner'
                        : 'neo-card border-transparent hover:border-[var(--border-light)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={conv.projectManager.avatar}
                        alt={conv.projectManager.name}
                        className="w-9 h-9 rounded-xl object-cover shrink-0 border border-[var(--border-light)]"
                      />
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[var(--text-primary)] truncate">{conv.projectName}</span>
                          <span className="text-[9px] font-mono text-[var(--text-tertiary)] shrink-0">{conv.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2: CHAT WINDOW (Center Column)                                      */}
        {/* ========================================================================= */}
        <div className="flex-1 neo-card rounded-[24px] border border-[var(--border-light)] p-5 md:p-6 flex flex-col justify-between min-w-0">
          
          {/* Chat Window Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.projectManager.avatar}
                alt={activeConv.projectManager.name}
                className="w-10 h-10 rounded-xl object-cover border border-[var(--border-light)] shrink-0"
              />
              <div>
                <span className="text-sm font-black text-[var(--text-primary)] block leading-tight">
                  {activeConv.projectManager.name}
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-primary)] block">
                  {activeConv.projectName} • {activeConv.status}
                </span>
              </div>
            </div>

            <div className="neo-inset px-3 py-1 rounded-xl text-[10px] font-mono text-[var(--text-tertiary)] hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Response SLA: &lt;12h</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            
            {/* Date Separator */}
            <div className="text-center my-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] neo-pill px-3 py-1">
                Today
              </span>
            </div>

            {activeMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-xl ${m.isAgency ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <img
                  src={m.avatar}
                  alt={m.sender}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--border-light)] mt-1"
                />
                <div className={`space-y-1.5 ${m.isAgency ? 'text-left' : 'text-right'}`}>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)]">
                    <span className="font-bold text-[var(--text-primary)]">{m.sender}</span>
                    <span>•</span>
                    <span>{m.timestamp}</span>
                  </div>

                  {/* Message Content Bubble */}
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.isAgency
                      ? 'neo-inset text-[var(--text-primary)] rounded-tl-none'
                      : 'bg-[var(--accent-primary)] text-white font-medium rounded-tr-none'
                  }`}>
                    {m.text}

                    {/* Render Message Attachments */}
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2 border-t border-white/20">
                        {m.attachments.map((att, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs ${
                              m.isAgency ? 'neo-card border border-[var(--border-light)]' : 'bg-black/20 text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {getAttachmentIcon(att.fileType)}
                              <div className="min-w-0">
                                <span className="font-bold block truncate max-w-[180px]">{att.name}</span>
                                <span className="text-[9px] font-mono opacity-80">{att.size}</span>
                              </div>
                            </div>

                            <a
                              href={att.downloadUrl}
                              download
                              className="w-7 h-7 rounded-lg neo-inset flex items-center justify-center shrink-0"
                              title="Download Attachment"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Read Status */}
                  {!m.isAgency && (
                    <div className="flex items-center justify-end gap-1 text-[9px] font-mono text-emerald-500 font-bold">
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)] pt-2 pl-2">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>{activeConv.projectManager.name} is online</span>
            </div>

          </div>

          {/* Pending Attachment Badge */}
          {pendingAttachment && (
            <div className="neo-inset p-2.5 rounded-xl mb-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <Paperclip className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <span className="font-bold text-[var(--text-primary)] truncate">{pendingAttachment.name} ({pendingAttachment.size})</span>
              </div>
              <button
                onClick={() => setPendingAttachment(null)}
                className="text-rose-500 hover:text-rose-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Emoji Picker Strip */}
          {showEmojiPicker && (
            <div className="neo-card p-2 rounded-xl mb-3 border border-[var(--border-light)] flex items-center gap-2 text-base">
              {['👍', '🙌', '🚀', '🔥', '✅', '❤️', '👏', '🎯'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setInputText(prev => prev + ' ' + emoji)}
                  className="hover:scale-125 transition-transform p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 shrink-0 pt-2 border-t border-[var(--border-subtle)]">
            <div className="neo-inset flex-1 px-4 py-2.5 rounded-xl flex items-center gap-2 border border-[var(--border-subtle)]">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message ${activeConv.projectManager.name}... (Press Enter)`}
                className="bg-transparent w-full text-xs focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
              />

              {/* Emoji Picker Button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-[var(--text-tertiary)] hover:text-[var(--accent-primary)]"
                title="Add Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>

              {/* File Attachment Button */}
              <label className="text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] cursor-pointer">
                <Paperclip className="w-4 h-4" />
                <input type="file" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              className="neo-btn neo-btn-accent text-xs py-2.5 px-5 font-bold shrink-0 justify-center inline-flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3: PROJECT INFORMATION PANEL (Right Column - Collapsible)           */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isInfoPanelOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="w-72 neo-card rounded-[24px] border border-[var(--border-light)] p-5 flex flex-col justify-between shrink-0 hidden lg:flex space-y-6 overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Project Header Info */}
                <div className="space-y-3 text-center border-b border-[var(--border-subtle)] pb-4">
                  <img
                    src={activeConv.projectManager.avatar}
                    alt={activeConv.projectManager.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--accent-primary)] mx-auto shadow-md"
                  />
                  <div>
                    <h3 className="text-sm font-black text-[var(--text-primary)]">{activeConv.projectManager.name}</h3>
                    <p className="text-[10px] font-mono text-[var(--accent-primary)]">{activeConv.projectManager.role}</p>
                  </div>

                  <div className="pt-1">
                    <span className="badge-tag">{activeConv.status}</span>
                  </div>
                </div>

                {/* Project Title & Short Spec */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                    Active Project
                  </span>
                  <span className="font-bold text-[var(--text-primary)] block leading-snug">
                    {currentProject.name}
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* Quick Project Files Links */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                    Project Deliverables
                  </span>

                  <div className="space-y-1.5">
                    {currentProject.deliverables.slice(0, 3).map((del) => (
                      <a
                        key={del.id}
                        href={del.downloadUrl}
                        download
                        className="neo-inset p-2.5 rounded-xl flex items-center justify-between text-[11px] font-bold text-[var(--text-primary)] hover:border-[var(--accent-primary)] border border-transparent"
                      >
                        <span className="truncate">{del.title}</span>
                        <Download className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Quick Actions (4 Buttons) */}
              <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)] text-xs">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                  Quick Actions
                </span>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    onClick={() => onNavigate && onNavigate('files')}
                    className="neo-pill p-2 font-bold text-[var(--text-primary)] text-center flex flex-col items-center gap-1"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Upload File</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('meetings')}
                    className="neo-pill p-2 font-bold text-[var(--text-primary)] text-center flex flex-col items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Book Meeting</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('projects')}
                    className="neo-pill p-2 font-bold text-[var(--text-primary)] text-center flex flex-col items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>View Project</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('invoices')}
                    className="neo-pill p-2 font-bold text-[var(--text-primary)] text-center flex flex-col items-center gap-1"
                  >
                    <Receipt className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Open Invoice</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
