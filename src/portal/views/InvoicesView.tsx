import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  X,
  History,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import type { InvoiceItem, PaymentTransaction, BillingStatus, PortalView } from '../types';
import { mockPaymentTransactions } from '../portalData';
import { EmptyState } from '../components/EmptyState';

interface InvoicesViewProps {
  invoices: InvoiceItem[];
  transactions?: PaymentTransaction[];
  onNavigate?: (view: PortalView) => void;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({
  invoices,
  transactions = mockPaymentTransactions,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invoiceList, setInvoiceList] = useState<InvoiceItem[]>(invoices);
  const [transactionList, setTransactionList] = useState<PaymentTransaction[]>(transactions);
  
  // Modals & Active Payment States
  const [inspectingInvoice, setInspectingInvoice] = useState<InvoiceItem | null>(null);
  const [payingInvoice, setPayingInvoice] = useState<InvoiceItem | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Credit Card (Stripe)');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentToast, setPaymentToast] = useState<string | null>(null);

  // 1. Calculations for Payment Summary Cards
  const summary = useMemo(() => {
    let outstanding = 0;
    let paid = 0;
    let nextDue = 'No Pending Due';
    let latestInv = invoiceList[0] || null;

    invoiceList.forEach((inv) => {
      // Parse numeric amount safely (e.g. "$7,500.00" -> 7500)
      const num = parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0;
      if (inv.status === 'Paid') {
        paid += num;
      } else if (inv.status === 'Pending' || inv.status === 'Overdue') {
        outstanding += num;
        if (nextDue === 'No Pending Due' || inv.dueDate < nextDue) {
          nextDue = inv.dueDate;
        }
      }
    });

    return {
      outstanding: `$${outstanding.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      paid: `$${paid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      nextDue,
      latestInv
    };
  }, [invoiceList]);

  // 2. Instant Search Filtering
  const filteredInvoices = useMemo(() => {
    if (!searchQuery.trim()) return invoiceList;
    const q = searchQuery.toLowerCase().trim();
    return invoiceList.filter(
      inv => inv.invoiceNumber.toLowerCase().includes(q) ||
             inv.projectName.toLowerCase().includes(q) ||
             inv.title.toLowerCase().includes(q) ||
             inv.status.toLowerCase().includes(q) ||
             inv.dueDate.toLowerCase().includes(q)
    );
  }, [invoiceList, searchQuery]);

  // 3. Status Badge Style Helper
  const getStatusStyle = (status: BillingStatus) => {
    switch (status) {
      case 'Paid':
        return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
      case 'Pending':
        return 'text-amber-600 bg-amber-500/10 border-amber-500/30 animate-pulse';
      case 'Partially Paid':
        return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'Overdue':
        return 'text-rose-600 bg-rose-500/10 border-rose-500/30 animate-bounce';
      case 'Cancelled':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  // 4. Handle Direct Payment
  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoice) return;

    setIsProcessingPayment(true);
    setTimeout(() => {
      // Mark invoice as paid
      setInvoiceList(prev => prev.map(inv => inv.id === payingInvoice.id ? { ...inv, status: 'Paid' } : inv));
      
      // Add new transaction
      const newTxn: PaymentTransaction = {
        id: `txn-${Date.now()}`,
        transactionDate: 'Today, Just now',
        invoiceNumber: payingInvoice.invoiceNumber,
        paymentMethod: selectedPaymentMethod,
        amount: payingInvoice.amount,
        status: 'Completed'
      };
      setTransactionList([newTxn, ...transactionList]);

      setIsProcessingPayment(false);
      setPayingInvoice(null);
      setPaymentToast(`Invoice ${payingInvoice.invoiceNumber} paid successfully! Receipt sent to email.`);
      setTimeout(() => setPaymentToast(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-12 text-left pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Max 2 lines description)                                 */}
      {/* ========================================================================= */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
          <Receipt className="w-3.5 h-3.5" />
          <span>Client Billing & Invoices Center</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Invoices & Payments
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Track outstanding milestone balances, review payment receipts, download official PDF invoices, and process PCI Stripe payments.
        </p>
      </div>

      {/* Payment Success Toast */}
      {paymentToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-inset p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{paymentToast}</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2. PAYMENT SUMMARY (4 Premium Summary Cards - NO Charts)                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Outstanding Balance */}
        <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Outstanding Balance</span>
            <Receipt className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-[var(--text-primary)] font-mono block">
            {summary.outstanding}
          </span>
          <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Pending Milestone Billing</p>
        </div>

        {/* Card 2: Total Paid Amount */}
        <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Paid Amount</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-600 font-mono block">
            {summary.paid}
          </span>
          <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Verified PCI Stripe Receipts</p>
        </div>

        {/* Card 3: Next Due Date */}
        <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Next Due Date</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-xl font-extrabold text-[var(--accent-primary)] font-mono block">
            {summary.nextDue}
          </span>
          <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Scheduled Milestone Deadline</p>
        </div>

        {/* Card 4: Latest Invoice */}
        <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Latest Invoice</span>
            <CreditCard className="w-4 h-4 text-blue-500" />
          </div>
          {summary.latestInv ? (
            <div>
              <span className="text-base font-extrabold text-[var(--text-primary)] block font-mono">
                {summary.latestInv.invoiceNumber}
              </span>
              <p className="text-xs font-mono text-[var(--text-secondary)]">{summary.latestInv.amount}</p>
            </div>
          ) : (
            <span className="text-xs font-mono text-[var(--text-tertiary)]">No Invoices</span>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. INVOICE LIST (Instant Search & Table / Cards)                          */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Project Invoices ({filteredInvoices.length})
          </span>

          <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice #, project, status..."
              className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
            />
          </div>
        </div>

        {filteredInvoices.length > 0 ? (
          <div>
            {/* Mobile Card List View (<768px) */}
            <div className="block md:hidden space-y-4">
              {filteredInvoices.map((inv) => (
                <div key={inv.id} className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold text-[var(--text-primary)]">{inv.invoiceNumber}</span>
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] leading-tight">{inv.title}</h3>
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)] block mt-0.5">{inv.projectName}</span>
                  </div>

                  <div className="neo-inset p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[var(--text-tertiary)] block">Due Date</span>
                      <span className="font-bold text-[var(--text-primary)]">{inv.dueDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[var(--text-tertiary)] block">Amount</span>
                      <span className="font-extrabold text-[var(--text-primary)] text-sm">{inv.amount}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-end gap-2 text-xs">
                    <button
                      onClick={() => setInspectingInvoice(inv)}
                      className="neo-pill px-3.5 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <a
                      href={inv.downloadUrl}
                      download
                      className="neo-pill px-3.5 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] font-bold inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </a>

                    {inv.status !== 'Paid' && inv.status !== 'Cancelled' && (
                      <button
                        onClick={() => setPayingInvoice(inv)}
                        className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Now</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>=768px) */}
            <div className="hidden md:block neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" aria-label="Project Invoices Table">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                      <th className="py-3.5 px-6 font-bold" scope="col">Invoice #</th>
                      <th className="py-3.5 px-6 font-bold" scope="col">Project</th>
                      <th className="py-3.5 px-6 font-bold" scope="col">Issue Date</th>
                      <th className="py-3.5 px-6 font-bold" scope="col">Due Date</th>
                      <th className="py-3.5 px-6 font-bold" scope="col">Amount</th>
                      <th className="py-3.5 px-6 font-bold" scope="col">Status</th>
                      <th className="py-3.5 px-6 font-bold text-right" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-[var(--text-primary)]">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                          <span className="block truncate max-w-xs">{inv.title}</span>
                          <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{inv.projectName}</span>
                        </td>
                        <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                          {inv.issueDate}
                        </td>
                        <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                          {inv.dueDate}
                        </td>
                        <td className="py-4 px-6 font-mono font-extrabold text-[var(--text-primary)]">
                          {inv.amount}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(inv.status)}`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setInspectingInvoice(inv)}
                            className="neo-pill px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          <a
                            href={inv.downloadUrl}
                            download
                            className="neo-pill px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] font-bold inline-flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </a>

                          {inv.status !== 'Paid' && inv.status !== 'Cancelled' && (
                            <button
                              onClick={() => setPayingInvoice(inv)}
                              className="neo-btn neo-btn-accent text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Pay Now</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Receipt}
            headline="No Invoices Found"
            description="No billing records match your search query."
            actionLabel="Reset Search"
            onAction={() => setSearchQuery('')}
          />
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. PAYMENT HISTORY (Max 10 Recent Transactions)                           */}
      {/* ========================================================================= */}
      <div id="payment-history-section" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
            <History className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Payment Transaction History (Max 10)</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">PCI Verified Records</span>
        </div>

        <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Payment Transactions Table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold" scope="col">Transaction Date</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Invoice #</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Payment Method</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Amount</th>
                  <th className="py-3.5 px-6 font-bold text-right" scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {transactionList.slice(0, 10).map((txn) => (
                  <tr key={txn.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                    <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                      {txn.transactionDate}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-[var(--text-primary)]">
                      {txn.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                      {txn.paymentMethod}
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-[var(--text-primary)]">
                      {txn.amount}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/30">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. QUICK ACTIONS (4 Buttons)                                              */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)]">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
          Quick Actions
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => {
              const pending = invoiceList.find(i => i.status !== 'Paid');
              if (pending) setPayingInvoice(pending);
              else alert('All invoices are fully paid!');
            }}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <CreditCard className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Pay Invoice</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => alert(`Downloading PDF for latest invoice ${summary.latestInv?.invoiceNumber || ''}...`)}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <Download className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Download Latest Invoice</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => {
              const el = document.getElementById('payment-history-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <History className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>View Payment History</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onNavigate && onNavigate('support')}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <HelpCircle className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Contact Billing</span>
          </motion.button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INVOICE DETAIL INSPECT MODAL                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingInvoice && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingInvoice(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setInspectingInvoice(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className={`neo-pill px-3 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(inspectingInvoice.status)}`}>
                  {inspectingInvoice.status}
                </span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{inspectingInvoice.invoiceNumber}</h3>
                <p className="text-xs text-[var(--accent-primary)] font-bold">{inspectingInvoice.title}</p>
              </div>

              <div className="neo-inset p-5 rounded-2xl space-y-3 text-xs">
                <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[var(--text-tertiary)] font-mono">Project</span>
                  <span className="font-bold text-[var(--text-primary)]">{inspectingInvoice.projectName}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[var(--text-tertiary)] font-mono">Issue Date</span>
                  <span className="font-bold text-[var(--text-primary)]">{inspectingInvoice.issueDate}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[var(--text-tertiary)] font-mono">Due Date</span>
                  <span className="font-bold text-[var(--text-primary)]">{inspectingInvoice.dueDate}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[var(--text-tertiary)] font-mono font-bold">Total Amount</span>
                  <span className="font-black text-lg text-[var(--accent-primary)]">{inspectingInvoice.amount}</span>
                </div>
              </div>

              {inspectingInvoice.description && (
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed neo-card p-4 rounded-xl border border-[var(--border-light)]">
                  {inspectingInvoice.description}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <a
                  href={inspectingInvoice.downloadUrl}
                  download
                  className="neo-btn text-xs py-2.5 px-5 font-bold inline-flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>

                {inspectingInvoice.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      const inv = inspectingInvoice;
                      setInspectingInvoice(null);
                      setPayingInvoice(inv);
                    }}
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Pay</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* STRIPE PCI PAYMENT MODAL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {payingInvoice && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setPayingInvoice(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-lg w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setPayingInvoice(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Stripe PCI 256-Bit Gateway</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Complete Invoice Payment</h3>
                <p className="text-xs text-[var(--text-secondary)]">Invoice {payingInvoice.invoiceNumber} • {payingInvoice.amount}</p>
              </div>

              <form onSubmit={handleExecutePayment} className="space-y-4">
                
                {/* Enabled Payment Methods Selection */}
                <div>
                  <label className="text-xs font-bold text-[var(--text-secondary)] block mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Credit Card (Stripe)',
                      'Bank Transfer (ACH)',
                      'UPI / Net Banking',
                      'Debit Card'
                    ].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(method)}
                        className={`p-3 rounded-xl border text-left font-bold transition-all ${
                          selectedPaymentMethod === method
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                            : 'border-[var(--border-light)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Details Mock Inputs */}
                {selectedPaymentMethod.includes('Card') && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[11px] font-bold text-[var(--text-tertiary)] block mb-1">Cardholder Name</label>
                      <input type="text" defaultValue="Alex Vance" className="neo-input" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-[11px] font-bold text-[var(--text-tertiary)] block mb-1">Card Number</label>
                        <input type="text" defaultValue="4242 •••• •••• 4242" className="neo-input font-mono" />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[var(--text-tertiary)] block mb-1">CVC</label>
                        <input type="text" defaultValue="888" className="neo-input font-mono" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="neo-inset p-3.5 rounded-xl flex items-center gap-2.5 text-[11px] text-[var(--text-secondary)]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-bit encrypted checkout. Instant Stripe digital receipt generated upon completion.</span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setPayingInvoice(null)}
                    className="neo-btn text-xs py-2.5 px-5 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isProcessingPayment ? 'Processing...' : `Pay ${payingInvoice.amount}`}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
