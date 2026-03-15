"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { motion } from 'framer-motion';
import {
    Users,
    Ticket,
    FileCheck,
    TrendingUp,
    Plus,
    Search,
    Check,
    X,
    Megaphone,
    MousePointer2,
    Copy,
    Calendar,
    Filter,
    BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<{
        stats: { userCount: number; pendingInvoices: number; totalPoints: number; totalTransactions: number };
        pendingInvoices: any[];
    }>({
        stats: { userCount: 0, pendingInvoices: 0, totalPoints: 0, totalTransactions: 0 },
        pendingInvoices: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const headers: HeadersInit = token
                    ? { 'Authorization': `Bearer ${token}` }
                    : {};

                const [statsRes, invoicesRes] = await Promise.all([
                    fetch('/api/admin/stats', { headers }),
                    fetch('/api/admin/invoices/pending', { headers })
                ]);

                if (statsRes.ok && invoicesRes.ok) {
                    const stats = await statsRes.json();
                    const invoices = await invoicesRes.json();
                    setDashboardData({ stats, pendingInvoices: Array.isArray(invoices) ? invoices : [] });
                } else {
                    console.error('Failed to fetch admin data, status:', statsRes.status);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'Clientes Registrados', value: dashboardData.stats.userCount.toString(), icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: 'Actualizado' },
        { label: 'Facturas Pendientes', value: dashboardData.stats.pendingInvoices.toString(), icon: Ticket, color: 'text-amber-500', bg: 'bg-amber-50', trend: 'Acción requerida' },
        { label: 'Puntos Emitidos', value: dashboardData.stats.totalPoints.toLocaleString(), icon: Copy, color: 'text-primary', bg: 'bg-violet-50', trend: 'Total histórico' },
        { label: 'Interacciones', value: dashboardData.stats.totalTransactions.toString(), icon: MousePointer2, color: 'text-green-500', bg: 'bg-green-50', trend: 'Total eventos' },
    ];

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-makeup-brown tracking-tight">Centro de Trazabilidad</h1>
                        <p className="text-gray-500 mt-2">Monitorea el comportamiento de tus clientes y promociones.</p>
                    </div>
                    <div className="flex gap-3 bg-white p-1.5 rounded-2xl border border-rose-100 shadow-sm">
                        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">Dashboard</button>
                        <button className="px-6 py-2.5 text-gray-400 text-sm font-medium hover:text-primary transition-colors">Reportes</button>
                    </div>
                </header>

                {/* Real-time Stats */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-rose-50 shadow-xl shadow-rose-900/5 hover:shadow-primary/5 transition-all"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shadow-inner`}>
                                    <stat.icon size={28} />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-3xl font-black text-makeup-brown">{stat.value}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-rose-50 flex items-center gap-2 text-[10px] font-bold text-gray-400 italic">
                                <TrendingUp size={12} className="text-green-500" />
                                {stat.trend}
                            </div>
                        </motion.div>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section: Validaciones Pendientes */}
                    <section className="bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 overflow-hidden">
                        <div className="p-8 border-b border-rose-50 flex items-center justify-between bg-secondary/10">
                            <h2 className="font-black text-xl text-makeup-brown flex items-center gap-2">
                                <Ticket className="text-primary" />
                                Validaciones Pendientes
                            </h2>
                            <button className="text-xs font-bold text-primary hover:underline">Ver todas</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-secondary/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <th className="px-8 py-5">Usuario</th>
                                        <th className="px-8 py-5">Factura ID</th>
                                        <th className="px-8 py-5">Estado</th>
                                        <th className="px-8 py-5">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-rose-50">
                                    {dashboardData.pendingInvoices.length > 0 ? (
                                        dashboardData.pendingInvoices.map((invoice) => (
                                            <tr key={invoice.id} className="hover:bg-violet-50/30 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center font-bold text-xs text-primary">
                                                            {invoice.user.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-makeup-brown leading-none">{invoice.user.name}</p>
                                                            <p className="text-[10px] text-gray-400 mt-1">{invoice.user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                        {invoice.id.substring(0, 8).toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-black bg-amber-100 text-amber-600 px-3 py-1 rounded-full uppercase tracking-widest">Revision</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => router.push(`/admin/validate?id=${invoice.id}`)}
                                                            className="p-2 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20 hover:scale-110 transition-transform"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => router.push(`/admin/validate?id=${invoice.id}`)}
                                                            className="p-2 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:scale-110 transition-transform"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium">
                                                No hay facturas pendientes de validación.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Section: Trazabilidad de Promociones */}
                    <section className="bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 overflow-hidden">
                        <div className="p-8 border-b border-rose-50 flex items-center justify-between bg-secondary/10">
                            <h2 className="font-black text-xl text-makeup-brown flex items-center gap-2">
                                <BarChart3 className="text-primary" />
                                Uso de Promociones
                            </h2>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white rounded-xl border border-rose-100 text-gray-400 hover:text-primary transition-colors">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                                <BarChart3 size={40} className="text-rose-200" />
                                <p className="text-gray-500 font-bold">Sin datos de promociones aún</p>
                                <p className="text-xs text-gray-400">Las estadísticas aparecerán cuando los clientes interactúen con las promociones.</p>
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-4">
                            <div className="bg-secondary/30 p-6 rounded-3xl border border-rose-50">
                                <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-4">Actividad Reciente</h3>
                                <p className="text-xs text-gray-400 text-center py-4">La actividad en tiempo real aparecerá aquí cuando los clientes interactúen con la plataforma.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Global Activity Timeline */}
                <section className="bg-makeup-brown p-10 rounded-[3rem] text-white shadow-2xl shadow-rose-900/20">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black">Timeline de Interacción</h2>
                            <p className="text-rose-200/50 text-sm mt-1">Registros y validaciones en tiempo real.</p>
                        </div>
                        <BarChart3 className="text-accent w-12 h-12 opacity-50" />
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 text-center gap-3 opacity-60">
                        <Calendar size={48} className="text-accent" />
                        <p className="font-bold text-white">¡El sistema está listo!</p>
                        <p className="text-rose-200/70 text-sm">Los eventos de clientes aparecerán aquí en tiempo real a medida que se registren e interactúen con la plataforma.</p>
                    </div>
                </section>

                {/* Floating Action Buttons */}
                <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
                    <motion.button
                        onClick={() => router.push('/admin/news')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white text-primary p-4 pr-6 rounded-2xl shadow-2xl border border-primary/10 font-bold group"
                    >
                        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                            <Megaphone size={20} />
                        </div>
                        <span>Nueva Oferta</span>
                    </motion.button>

                    <motion.button
                        onClick={() => router.push('/admin/cms')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-primary text-white p-4 pr-6 rounded-2xl shadow-2xl shadow-primary/30 font-bold group"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                            <Plus size={24} />
                        </div>
                        <span>Crear Contenido</span>
                    </motion.button>
                </div>
            </div>
        </AppShell>
    );
}

// Add these to types if not exist
interface ShoppingBagProps { size: number }
const ShoppingBag = ({ size }: ShoppingBagProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);
