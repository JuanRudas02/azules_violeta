"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { InvoiceForm } from '@/shared/components/ui/InvoiceForm';
import { motion } from 'framer-motion';
import { Crown, History, TrendingUp, Gift } from 'lucide-react';

export default function walletPage() {
    const { user } = useAuth();

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
                                    <h2 className="text-5xl font-black">{user?.points.toLocaleString()}</h2>
                                    <p className="text-violet-200 font-bold uppercase tracking-widest text-xs mt-1">Puntos Disponibles</p>
                                </div>
                                <div className="md:w-1/2">
                                    <ProgressBar current={user?.points ?? 0} target={5000} label="Próximo Nivel: Platino" />
                                </div>
                            </div>
                        </motion.div>

                        {/* History Table */}
                        <div className="bg-white rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-900/5 overflow-hidden">
                            <div className="p-8 border-b border-rose-50 flex items-center gap-3">
                                <History className="text-primary" />
                                <h3 className="font-bold text-makeup-brown">Historial de Movimientos</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-secondary/30 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">
                                            <th className="px-8 py-4">Concepto</th>
                                            <th className="px-8 py-4">Fecha</th>
                                            <th className="px-8 py-4">Puntos</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-rose-50">
                                        {[
                                            { task: 'Bono de Bienvenida', date: '2026-02-28', points: +500, type: 'plus' },
                                            { task: 'Compra Base Makeup', date: '2026-02-28', points: +150, type: 'plus' },
                                        ].map((item, i) => (
                                            <tr key={i} className="hover:bg-secondary/20 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-makeup-brown">{item.task}</p>
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-400">{item.date}</td>
                                                <td className="px-8 py-6 font-black text-primary">+{item.points}</td>
                                            </tr>
                                        ))}
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
