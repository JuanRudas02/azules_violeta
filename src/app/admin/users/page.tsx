"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Mail,
    Calendar,
    Smartphone,
    Star,
    MoreVertical,
    Filter,
    Download,
    Loader2,
    Users as UsersIcon,
    ChevronLeft,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface UserData {
    id: string;
    email: string;
    name: string;
    whatsapp?: string;
    status: string;
    createdAt: string;
    wallet?: {
        balance: number;
        lifetimePoints: number;
    }
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const limit = 10;

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
                setTotal(data.total || 0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filtered users for search (ideally this should be on the backend, for now let's do it here or just show all)
    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(total / limit);

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8 pb-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown flex items-center gap-3">
                            <UsersIcon className="text-primary" size={32} />
                            Trazabilidad de Usuarios
                        </h1>
                        <p className="text-gray-500">Historial completo y actividad real de tu comunidad.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white p-3 rounded-2xl border border-rose-100 text-gray-400 hover:text-primary transition-all shadow-sm">
                            <Download size={20} />
                        </button>
                        <button className="btn-primary flex items-center gap-2">
                            <Filter size={20} />
                            Filtrar
                        </button>
                    </div>
                </header>

                <section className="bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 overflow-hidden">
                    <div className="p-8 border-b border-rose-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o correo..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-field pl-12"
                            />
                        </div>
                        <div className="flex bg-secondary/30 p-1 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <button
                                onClick={() => setSelectedStatus(null)}
                                className={`px-6 py-2 rounded-xl transition-all ${!selectedStatus ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                            >
                                Todos
                            </button>
                            <button
                                onClick={() => setSelectedStatus('ACTIVE')}
                                className={`px-6 py-2 rounded-xl transition-all ${selectedStatus === 'ACTIVE' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                            >
                                Activos
                            </button>
                            <button
                                onClick={() => setSelectedStatus('SUSPENDED')}
                                className={`px-6 py-2 rounded-xl transition-all ${selectedStatus === 'SUSPENDED' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                            >
                                Inactivos
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto min-h-[400px] relative">
                        {loading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                <Loader2 className="animate-spin text-primary" size={40} />
                            </div>
                        )}

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-5">Socia</th>
                                    <th className="px-8 py-5">Contacto</th>
                                    <th className="px-8 py-5">Registro</th>
                                    <th className="px-8 py-5">Puntos</th>
                                    <th className="px-8 py-5">Estado</th>
                                    <th className="px-8 py-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-50">
                                <AnimatePresence mode="popLayout">
                                    {filteredUsers.map((u, i) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            key={u.id}
                                            className="hover:bg-secondary/10 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-primary/10">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-makeup-brown leading-none mb-1">{u.name}</p>
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                                                            <Mail size={10} />
                                                            {u.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
                                                    <Smartphone size={14} className="text-primary" />
                                                    {u.whatsapp || 'Sin WhatsApp'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                    <Calendar size={14} className="text-rose-300" />
                                                    {new Date(u.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 bg-violet-50 w-fit px-4 py-1.5 rounded-full border border-primary/10 shadow-sm">
                                                    <Star size={14} className="text-primary fill-primary" />
                                                    <span className="text-sm font-black text-primary">{(u.wallet?.balance || 0).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${u.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                                                    {u.status === 'ACTIVE' ? 'Activo' : 'Suspendido'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 text-gray-300 hover:text-primary hover:bg-rose-50 rounded-xl transition-all">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {!loading && filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-gray-400">
                                                <AlertCircle size={48} className="opacity-20" />
                                                <p className="font-bold italic">No se encontraron usuarias registradas.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-rose-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-black text-gray-400">
                        <p>Mostrando {users.length} de {total} usuarias</p>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="p-2 rounded-xl hover:bg-rose-50 text-primary disabled:opacity-30 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <div className="flex gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-black transition-all ${page === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-rose-50 text-gray-400'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="p-2 rounded-xl hover:bg-rose-50 text-primary disabled:opacity-30 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
