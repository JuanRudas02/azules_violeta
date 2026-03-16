"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileCheck,
    Search,
    Filter,
    Check,
    X,
    Eye,
    Clock,
    AlertCircle,
    ChevronRight,
    Loader2,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface Invoice {
    id: string;
    amountSpent: string | number;
    pointsAwarded: number;
    imageUrl: string | null;
    status: string;
    createdAt: string;
    user: { name: string; email: string };
}

export default function AdminValidatePage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchInvoices = useCallback(async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/admin/invoices/pending', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInvoices(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching invoices:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

    const handleApprove = async () => {
        if (!selectedInvoice) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`/api/invoices/${selectedInvoice.id}/approve`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                showToast(`✅ Factura aprobada exitosamente para ${selectedInvoice.user.name}`, 'success');
                setSelectedInvoice(null);
                fetchInvoices();
            } else {
                const err = await res.json();
                showToast(err.message || 'Error al aprobar', 'error');
            }
        } catch {
            showToast('Error de conexión', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedInvoice || !rejectionReason.trim()) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`/api/invoices/${selectedInvoice.id}/reject`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rejectionReason })
            });
            if (res.ok) {
                showToast(`❌ Factura rechazada de ${selectedInvoice.user.name}`, 'success');
                setSelectedInvoice(null);
                setShowRejectInput(false);
                setRejectionReason('');
                fetchInvoices();
            } else {
                const err = await res.json();
                showToast(err.message || 'Error al rechazar', 'error');
            }
        } catch {
            showToast('Error de conexión', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    // Helper to calculate estimated points (match backends default divisor of 1000)
    const calculateEstimatedPoints = (amount: string | number) => {
        return Math.floor(Number(amount) / 1000);
    };

    return (
        <AppShell>
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl font-black text-sm flex items-center gap-3 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'
                            }`}
                    >
                        {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown flex items-center gap-3">
                            <FileCheck className="text-primary" size={32} />
                            Validación de Facturas
                        </h1>
                        <p className="text-gray-500">Revisa y aprueba los puntos cargados por tus clientes.</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-2xl border border-rose-100 shadow-sm">
                        <button className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
                            Pendientes ({invoices.length})
                        </button>
                        <button className="px-6 py-2 text-gray-400 text-sm font-medium">Historial</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white p-4 rounded-[2rem] border border-rose-50 shadow-sm flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input type="text" placeholder="Buscar por cliente..." className="w-full bg-secondary/20 p-3 pl-12 rounded-xl text-sm outline-none border border-transparent focus:border-primary/10 transition-all font-medium text-makeup-brown" />
                            </div>
                            <button className="p-3 bg-white border border-rose-100 rounded-xl text-gray-400 hover:text-primary transition-all">
                                <Filter size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : invoices.length === 0 ? (
                                <div className="bg-white rounded-[2.5rem] border border-rose-50 p-12 text-center shadow-lg shadow-rose-900/5">
                                    <FileCheck size={48} className="text-rose-200 mx-auto mb-4" />
                                    <p className="font-black text-makeup-brown">¡Todo al día!</p>
                                    <p className="text-sm text-gray-400 mt-1">No hay facturas pendientes de validación.</p>
                                </div>
                            ) : (
                                invoices.map((inv, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={inv.id}
                                        onClick={() => { setSelectedInvoice(inv); setShowRejectInput(false); setRejectionReason(''); }}
                                        className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer group flex items-center justify-between ${selectedInvoice?.id === inv.id
                                            ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20'
                                            : 'bg-white border-rose-50 hover:border-primary/20 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${selectedInvoice?.id === inv.id ? 'bg-white/20 text-white' : 'bg-secondary text-primary'}`}>
                                                {inv.user.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold">{inv.user.name}</h3>
                                                <div className={`flex items-center gap-2 text-[10px] uppercase font-black tracking-widest ${selectedInvoice?.id === inv.id ? 'text-violet-200' : 'text-gray-400'}`}>
                                                    <Clock size={12} />
                                                    {new Date(inv.createdAt).toLocaleString('es-CO', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <p className={`text-sm font-black ${selectedInvoice?.id === inv.id ? 'text-white' : 'text-primary'}`}>
                                                    +{calculateEstimatedPoints(inv.amountSpent)} pts
                                                </p>
                                                <p className={`text-[10px] font-bold ${selectedInvoice?.id === inv.id ? 'text-violet-100' : 'text-gray-400'}`}>
                                                    ${Number(inv.amountSpent).toLocaleString()}
                                                </p>
                                            </div>
                                            <ChevronRight className={selectedInvoice?.id === inv.id ? 'text-white' : 'text-gray-200 group-hover:text-primary transition-colors'} />
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Details & Actions Section */}
                    <div className="lg:col-span-1">
                        <AnimatePresence mode="wait">
                            {selectedInvoice ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={selectedInvoice.id}
                                    className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 sticky top-8"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Detalles de Validación</p>
                                            <h2 className="text-xl font-black text-makeup-brown">{selectedInvoice.user.name}</h2>
                                            <p className="text-xs text-gray-400 font-medium">{selectedInvoice.user.email}</p>
                                        </div>
                                        <button onClick={() => setSelectedInvoice(null)} className="text-gray-300 hover:text-primary transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    {selectedInvoice.imageUrl ? (
                                        <div className="aspect-[4/5] bg-secondary rounded-[2.5rem] overflow-hidden mb-8 border border-rose-50 relative group shadow-inner">
                                            <img src={selectedInvoice.imageUrl} alt="Factura" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <a href={selectedInvoice.imageUrl} target="_blank" rel="noreferrer" className="absolute inset-0 bg-makeup-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-black backdrop-blur-sm text-sm">
                                                <Eye size={20} />
                                                Click para ampliar
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="aspect-[4/5] bg-secondary/30 rounded-[2.5rem] mb-8 border-2 border-dashed border-rose-100 flex items-center justify-center">
                                            <p className="text-gray-400 text-sm font-bold">Sin imagen</p>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center py-6 border-y border-rose-50">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">A acreditar</p>
                                                <p className="text-2xl font-black text-primary">{calculateEstimatedPoints(selectedInvoice.amountSpent)} Pts</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monto Total</p>
                                                <p className="text-xl font-black text-makeup-brown">${Number(selectedInvoice.amountSpent).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {showRejectInput ? (
                                            <div className="space-y-4">
                                                <textarea
                                                    value={rejectionReason}
                                                    onChange={e => setRejectionReason(e.target.value)}
                                                    placeholder="Escribe el motivo del rechazo..."
                                                    className="input-field h-28 resize-none text-sm"
                                                    autoFocus
                                                />
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={handleReject}
                                                        disabled={actionLoading || !rejectionReason.trim()}
                                                        className="flex-1 bg-rose-500 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-500/20 disabled:opacity-50"
                                                    >
                                                        {actionLoading ? <Loader2 className="animate-spin" size={18} /> : <X size={18} />}
                                                        Confirmar
                                                    </button>
                                                    <button onClick={() => setShowRejectInput(false)} className="flex-1 bg-gray-50 text-gray-500 p-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-colors">
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleApprove}
                                                    disabled={actionLoading}
                                                    className="flex-1 bg-green-500 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/20 disabled:opacity-50"
                                                >
                                                    {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Check size={24} />}
                                                    Aprobar
                                                </button>
                                                <button
                                                    onClick={() => setShowRejectInput(true)}
                                                    disabled={actionLoading}
                                                    className="flex-1 bg-rose-500 text-white p-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-500/20 disabled:opacity-50"
                                                >
                                                    <X size={20} />
                                                    Rechazar
                                                </button>
                                            </div>
                                        )}

                                        <div className="bg-amber-50/50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100/50">
                                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                                            <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                                                Verifica que los datos del cliente y el soporte visual coincidan antes de procesar la solicitud.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-secondary/20 rounded-[3rem] border-2 border-dashed border-rose-100 p-12 text-center flex flex-col items-center justify-center h-[600px] sticky top-8">
                                    <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-rose-900/5 text-rose-200 mb-6 motion-safe:animate-pulse">
                                        <FileCheck size={64} />
                                    </div>
                                    <h3 className="text-xl font-black text-makeup-brown tracking-tight">Panel de Validación</h3>
                                    <p className="text-sm text-gray-400 max-w-[220px] mx-auto mt-4 font-medium leading-relaxed">
                                        Selecciona una factura pendiente para revisar los detalles y acreditar los puntos.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
