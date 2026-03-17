"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { InvoiceForm } from '@/shared/components/ui/InvoiceForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, History, TrendingUp, Gift, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Transaction {
    id: string;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
}

export default function WalletPage() {
    const { user, updateUserPoints } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/users/transactions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTransactions(data);

                // Calculate total points from transactions or fetch fresh profile
                // Actually, the profile has the real-time balance if we use getAuthUser correctly
                // In my case, user.points comes from the stored object.
                // Let's try to reload the profile to get fresh balance after approval
                const profileRes = await fetch('/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    if (updateUserPoints) {
                        updateUserPoints(profileData.wallet?.balance || 0);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Concepts for better display
    const getConceptInfo = (type: string, desc: string) => {
        switch (type) {
            case 'WELCOME_BONUS': return { label: 'Bono de Bienvenida', color: 'text-primary' };
            case 'INVOICE_APPROVED': return { label: 'Compra Validada', color: 'text-primary' };
            case 'MANUAL_ADJUSTMENT': return { label: 'Ajuste de Cuenta', color: 'text-primary' };
            case 'PRIZE_REDEEMED': return { label: 'Canje de Premio', color: 'text-rose-500' };
            default: return { label: desc, color: 'text-primary' };
        }
    };

    return (
        <AppShell>
            <div className="max-w-5xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-black text-makeup-brown">Mis Puntos Violeta</h1>
                    <p className="text-gray-500">Gestiona tu saldo y sube tus facturas.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                                <Crown size={120} />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div>
                                    <div className="bg-white/20 w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                        Nivel Oro
                                    </div>
                                    <h2 className="text-5xl font-black">{user?.points?.toLocaleString() || '0'}</h2>
                                    <p className="text-violet-200 font-bold uppercase tracking-widest text-xs mt-1">Puntos Disponibles</p>
                                </div>
                                <div className="md:w-1/2">
                                    <ProgressBar current={user?.points ?? 0} target={5000} label="Próximo Nivel: Platino" />
                                </div>
                            </div>
                        </motion.div>

                        {/* History Table */}
                        <div className="bg-white rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-900/5 overflow-hidden">
                            <div className="p-8 border-b border-rose-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <History className="text-primary" />
                                    <h3 className="font-bold text-makeup-brown">Historial de Movimientos</h3>
                                </div>
                                <button
                                    onClick={fetchTransactions}
                                    className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                                >
                                    Refrescar
                                </button>
                            </div>
                            <div className="overflow-x-auto min-h-[300px] relative">
                                {loading && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-primary" size={32} />
                                    </div>
                                )}
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-secondary/30 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                                            <th className="px-8 py-4">Concepto</th>
                                            <th className="px-8 py-4">Fecha</th>
                                            <th className="px-8 py-4">Puntos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-rose-50">
                                        <AnimatePresence mode="popLayout">
                                            {transactions.length > 0 ? (
                                                transactions.map((t) => {
                                                    const info = getConceptInfo(t.type, t.description);
                                                    return (
                                                        <motion.tr
                                                            layout
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            key={t.id}
                                                            className="hover:bg-secondary/20 transition-colors"
                                                        >
                                                            <td className="px-8 py-6">
                                                                <p className="font-bold text-makeup-brown leading-none mb-1">{info.label}</p>
                                                                <p className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{t.description}</p>
                                                            </td>
                                                            <td className="px-8 py-6 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                                {new Date(t.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                                                            </td>
                                                            <td className={`px-8 py-6 font-black ${info.color}`}>
                                                                {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()}
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })
                                            ) : (
                                                !loading && (
                                                    <tr>
                                                        <td colSpan={3} className="px-8 py-20 text-center text-gray-400 italic text-sm">
                                                            No tienes movimientos todavía.
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Upload Invoice */}
                    <div className="space-y-8">
                        <div className="bg-secondary p-8 rounded-[2.5rem] border border-rose-100">
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <TrendingUp size={24} />
                                <h3 className="font-black">¿Tienes una factura?</h3>
                            </div>
                            <InvoiceForm />
                        </div>

                        <div className="bg-accent/10 p-8 rounded-[2.5rem] border border-accent/20">
                            <Gift className="text-accent mb-4" size={32} />
                            <h3 className="font-bold text-makeup-brown mb-2">Canje Rápido</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Tienes suficientes puntos para reclamar un <span className="font-black text-primary">Labial Hidratante</span> hoy mismo.
                            </p>
                            <button className="w-full mt-4 bg-accent text-makeup-brown py-3 rounded-2xl font-bold hover:scale-105 transition-all">
                                Ir a Catálogo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
