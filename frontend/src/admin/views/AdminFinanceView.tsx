import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Download,
  Plus,
  FileText,
  CreditCard,
  CheckCircle2,
  X,
  Printer,
  Receipt
} from 'lucide-react';
import type {
  AdminQuoteItem,
  AdminInvoiceItem,
  AdminPaymentLog,
  AdminExpenseItem,
  QuoteStatus,
  PaymentStatus,
  ExpenseCategory,
  AdminView
} from '../types';
import {
  mockAdminQuotes,
  mockAdminInvoices,
  mockAdminPayments,
  mockAdminExpenses
} from '../adminData';

interface AdminFinanceViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminFinanceView: React.FC<AdminFinanceViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quotes' | 'invoices' | 'payments' | 'expenses' | 'revenue'>('dashboard');

  // Data State
  const [quotes, setQuotes] = useState<AdminQuoteItem[]>(mockAdminQuotes);
  const [invoices, setInvoices] = useState<AdminInvoiceItem[]>(mockAdminInvoices);
  const [payments] = useState<AdminPaymentLog[]>(mockAdminPayments);
  const [expenses, setExpenses] = useState<AdminExpenseItem[]>(mockAdminExpenses);

  // Modals & Toasts
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [newInvClient, setNewInvClient] = useState('Aura Health Medical Group');
  const [newInvProject, setNewInvProject] = useState('Phase 5 Retainer');
  const [newInvAmount, setNewInvAmount] = useState('$7,500.00');

  const [newExpName, setNewExpName] = useState('');
  const [newExpCategory, setNewExpCategory] = useState<ExpenseCategory>('Software');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpVendor, setNewExpVendor] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const monthlyRevenue = '$148,500.00';
    const outstandingPayments = '$22,500.00';
    const paidInvoicesCount = invoices.filter(i => i.status === 'Paid').length;
    const pendingInvoicesCount = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length;
    const monthlyExpenses = '$14,200.00';
    const netRevenue = '$134,300.00';
    return { monthlyRevenue, outstandingPayments, paidInvoicesCount, pendingInvoicesCount, monthlyExpenses, netRevenue };
  }, [invoices]);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "InvoiceNumber,Client,Project,IssueDate,DueDate,Amount,Status\n" +
      invoices.map(i => `${i.invoiceNumber},"${i.clientName}","${i.projectName}",${i.issueDate},${i.dueDate},${i.amount},${i.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Byte Build_Financial_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Financial report exported to CSV successfully!');
  };

  const handleSimulatePDFDownload = (invNum: string) => {
    triggerToast(`Generating PCI PDF Invoice report for "${invNum}"...`);
  };

  const handleConvertQuoteToInvoice = (quote: AdminQuoteItem) => {
    const newInv: AdminInvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-0${invoices.length + 1}`,
      clientName: quote.clientName,
      company: quote.company,
      projectName: quote.projectName,
      issueDate: 'Today',
      dueDate: '14 Days',
      amount: quote.total,
      status: 'Pending'
    };
    setInvoices([newInv, ...invoices]);
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: 'Accepted' } : q));
    triggerToast(`Quote "${quote.quoteNumber}" converted into Invoice "${newInv.invoiceNumber}"!`);
  };

  const handleAddInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv: AdminInvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-0${invoices.length + 1}`,
      clientName: newInvClient,
      company: newInvClient,
      projectName: newInvProject,
      issueDate: 'Today',
      dueDate: '14 Days',
      amount: newInvAmount,
      status: 'Pending'
    };
    setInvoices([newInv, ...invoices]);
    setIsAddInvoiceModalOpen(false);
    triggerToast(`Invoice "${newInv.invoiceNumber}" generated successfully!`);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpName.trim() || !newExpAmount.trim()) return;

    const newExp: AdminExpenseItem = {
      id: `exp-${Date.now()}`,
      name: newExpName.trim(),
      category: newExpCategory,
      amount: newExpAmount.trim().startsWith('$') ? newExpAmount.trim() : `$${newExpAmount.trim()}`,
      vendor: newExpVendor.trim() || 'Vendor',
      date: 'Today',
      notes: 'Recorded by Admin team'
    };

    setExpenses([newExp, ...expenses]);
    setIsAddExpenseModalOpen(false);
    setNewExpName('');
    setNewExpAmount('');
    setNewExpVendor('');
    triggerToast(`Expense "${newExp.name}" recorded!`);
  };

  const getQuoteStatusStyle = (s: QuoteStatus) => {
    switch (s) {
      case 'Accepted': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-extrabold';
      case 'Sent': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      case 'Viewed': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30 font-bold';
      case 'Draft': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
      default: return 'text-rose-600 bg-rose-500/10 border-rose-500/30';
    }
  };

  const getInvoiceStatusStyle = (s: PaymentStatus) => {
    switch (s) {
      case 'Paid': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-black';
      case 'Pending': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'Partially Paid': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      case 'Overdue': return 'text-rose-600 bg-rose-500/10 border-rose-500/30 font-extrabold animate-pulse';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
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
              <DollarSign className="w-3.5 h-3.5" />
              <span>Agency Financial Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Quotes, Invoices & Revenue
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="neo-pill px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 border border-[var(--border-light)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddInvoiceModalOpen(true)}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Invoice</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'quotes', label: `Quotes (${quotes.length})` },
            { id: 'invoices', label: `Invoices (${invoices.length})` },
            { id: 'payments', label: `Payments (${payments.length})` },
            { id: 'expenses', label: `Expenses (${expenses.length})` },
            { id: 'revenue', label: 'Revenue Overview' }
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

      {/* ========================================================================= */}
      {/* TAB 1: FINANCE DASHBOARD                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Telemetry Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Monthly Revenue</span>
              <span className="text-xl font-black text-emerald-600 font-mono block">{metrics.monthlyRevenue}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">MTD Verified Billing</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Outstanding Payments</span>
              <span className="text-xl font-black text-amber-600 font-mono block">{metrics.outstandingPayments}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Pending Client Due</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Paid Invoices</span>
              <span className="text-xl font-black text-blue-600 font-mono block">{metrics.paidInvoicesCount} Paid</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Settled Transactions</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Pending Invoices</span>
              <span className="text-xl font-black text-purple-600 font-mono block">{metrics.pendingInvoicesCount} Pending</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Awaiting Settlement</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Monthly Expenses</span>
              <span className="text-xl font-black text-rose-600 font-mono block">{metrics.monthlyExpenses}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Hosting & Software</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Net Revenue</span>
              <span className="text-xl font-black text-[var(--accent-primary)] font-mono block">{metrics.netRevenue}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">After Agency Overhead</span>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => setIsAddInvoiceModalOpen(true)}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Generate Invoice</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <Receipt className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Create Quote</span>
            </button>

            <button
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <CreditCard className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Record Expense</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <Printer className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Download Report</span>
            </button>
          </div>

          {/* Recent Financial Transactions Feed */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Recent Verified Billing Log
            </span>

            <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="neo-inset p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[var(--text-primary)] block">{p.company} ({p.invoiceNumber})</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Method: {p.method} • Txn: {p.transactionId}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-600 block">{p.amount}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">{p.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: QUOTES MANAGER                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Agency Quotations & Proposals ({quotes.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <div key={q.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase border ${getQuoteStatusStyle(q.status)}`}>
                    {q.status}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{q.quoteNumber}</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">{q.company}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{q.projectName}</p>
                </div>

                <div className="neo-inset p-3.5 rounded-xl space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-tertiary)]">Subtotal</span>
                    <span>{q.subtotal}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-[var(--border-subtle)]">
                    <span>Total Amount</span>
                    <span className="text-[var(--accent-primary)]">{q.total}</span>
                  </div>
                </div>

                {q.status !== 'Accepted' && (
                  <button
                    onClick={() => handleConvertQuoteToInvoice(q)}
                    className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold flex-1 justify-center inline-flex items-center gap-1.5 w-full"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Convert to Invoice</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INVOICES MANAGER                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Client Invoices & Billing Center ({invoices.length})
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
            <table className="w-full text-left border-collapse" aria-label="Invoices Table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold" scope="col">Invoice #</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Client / Company</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Project Milestone</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Due Date</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Amount</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Status</th>
                  <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[var(--text-primary)]">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                      <span className="block">{inv.company}</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{inv.clientName}</span>
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">
                      {inv.projectName}
                    </td>
                    <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                      {inv.dueDate}
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-[var(--accent-primary)]">
                      {inv.amount}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getInvoiceStatusStyle(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleSimulatePDFDownload(inv.invoiceNumber)}
                        className="neo-pill px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PAYMENTS MANAGER                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Verified Stripe PCI & Bank Transaction Logs ({payments.length})
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
            <div className="divide-y divide-[var(--border-subtle)] text-xs font-mono">
              {payments.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between gap-4 text-left">
                  <div className="space-y-1">
                    <span className="font-bold text-[var(--text-primary)] block">{p.company} • {p.invoiceNumber}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Txn ID: {p.transactionId} • Method: {p.method}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-600 block">{p.amount}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">{p.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: EXPENSES MANAGER                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Agency Operational Expenses ({expenses.length})
            </span>
            <button
              onClick={() => setIsAddExpenseModalOpen(true)}
              className="neo-btn text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Expense</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expenses.map((e) => (
              <div key={e.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="badge-tag">{e.category}</span>
                  <span className="text-sm font-black font-mono text-rose-600">{e.amount}</span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{e.name}</h3>
                  <p className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">Vendor: {e.vendor} • {e.date}</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-mono neo-inset p-3 rounded-xl">{e.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: REVENUE OVERVIEW                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Annualized Agency Revenue Telemetry
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Annualized Revenue</span>
              <span className="text-3xl font-black text-emerald-600 font-mono block">$1,420,000.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Trailing 12-Month Collected</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Collected MTD</span>
              <span className="text-3xl font-black text-[var(--accent-primary)] font-mono block">$148,500.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Settled Client Billing</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Expenses MTD</span>
              <span className="text-3xl font-black text-rose-600 font-mono block">$14,200.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Hosting & Infrastructure Overhead</span>
            </div>
          </div>
        </div>
      )}

      {/* GENERATE INVOICE MODAL */}
      <AnimatePresence>
        {isAddInvoiceModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsAddInvoiceModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-md w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button onClick={() => setIsAddInvoiceModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Billing Intake</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Generate Client Invoice</h3>
              </div>

              <form onSubmit={handleAddInvoiceSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Company / Client</label>
                  <input type="text" required value={newInvClient} onChange={(e) => setNewInvClient(e.target.value)} className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Project Milestone</label>
                  <input type="text" required value={newInvProject} onChange={(e) => setNewInvProject(e.target.value)} className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Amount</label>
                  <input type="text" required value={newInvAmount} onChange={(e) => setNewInvAmount(e.target.value)} className="neo-input text-xs font-mono" />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAddInvoiceModalOpen(false)} className="neo-btn text-xs py-2.5 px-5 font-bold">Cancel</button>
                  <button type="submit" className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Generate Invoice</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECORD EXPENSE MODAL */}
      <AnimatePresence>
        {isAddExpenseModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsAddExpenseModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-md w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button onClick={() => setIsAddExpenseModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Expense Log</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Record Operating Expense</h3>
              </div>

              <form onSubmit={handleAddExpenseSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Expense Item Name</label>
                  <input type="text" required value={newExpName} onChange={(e) => setNewExpName(e.target.value)} placeholder="e.g. AWS Edge Infrastructure" className="neo-input text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Category</label>
                    <select value={newExpCategory} onChange={(e) => setNewExpCategory(e.target.value as ExpenseCategory)} className="neo-input text-xs font-bold">
                      <option value="Software">Software</option>
                      <option value="Hosting">Hosting</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Office">Office</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Amount</label>
                    <input type="text" required value={newExpAmount} onChange={(e) => setNewExpAmount(e.target.value)} placeholder="$450.00" className="neo-input text-xs font-mono" />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Vendor</label>
                  <input type="text" value={newExpVendor} onChange={(e) => setNewExpVendor(e.target.value)} placeholder="e.g. Google LLC" className="neo-input text-xs" />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAddExpenseModalOpen(false)} className="neo-btn text-xs py-2.5 px-5 font-bold">Cancel</button>
                  <button type="submit" className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Record Expense</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
