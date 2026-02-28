"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { motion } from 'framer-motion';
import { Search, User, Mail, Calendar, MapPin, Star, MoreVertical, Filter, Download } from 'lucide-react';

export default function AdminUsersPage() {
    const users = [
        { id: '1', name: 'Adriana Silva', email: 'adri@beauty.com', joined: 'Feb 28, 2026', points: 1250, location: 'Bogotá', status: 'Activo' },
        { id: '2', name: 'Laura Restrepo', email: 'laura.r@correo.co', joined: 'Feb 27, 2026', points: 500, location: 'Medellín', status: 'Activo' },
        { id: '3', name: 'Camila Gomez', email: 'cami.gz@social.com', joined: 'Feb 25, 2026', points: 2100, location: 'Cali', status: 'Especial' },
        { id: '4', name: 'Ximena Duque', email: 'xduque@gmail.com', joined: 'Feb 12, 2026', points: 850, location: 'Barranquilla', status: 'Activo' },
    ];

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown">Trazabilidad de Usuarios</h1>
                        <p className="text-gray-500">Historial completo y actividad de tu comunidad.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white p-3 rounded-2xl border border-rose-100 text-gray-400 hover:text-primary transition-all">
                            <Download size={20} />
                        </button>
                        <button className="btn-primary flex items-center gap-2">
                            <Filter size={20} />
                            Filtrar
                        </button>
                    </div>
                </header>

                <section className="bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 overflow-hidden">
                    <div className="p-8 border-b border-rose-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, correo o ciudad..."
                                className="input-field pl-12"
                            />
                        </div>
                        <div className="flex bg-secondary/30 p-1 rounded-2xl text-xs font-bold">
                            <button className="px-6 py-2 bg-white rounded-xl shadow-sm text-primary">Todos</button>
                            <button className="px-6 py-2 text-gray-400">Activos</button>
                            <button className="px-6 py-2 text-gray-400">Inactivos</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-secondary/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-5">Socia</th>
                                    <th className="px-8 py-5">Ubicación</th>
                                    <th className="px-8 py-5">Registro</th>
                                    <th className="px-8 py-5">Puntos</th>
                                    <th className="px-8 py-5">Estado</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-rose-50">
                                {users.map((u, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={u.id}
                                        className="hover:bg-secondary/20 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-makeup-brown">{u.name}</p>
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                                        <Mail size={10} />
                                                        {u.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                                <MapPin size={14} className="text-rose-300" />
                                                {u.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Calendar size={14} />
                                                {u.joined}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1 bg-violet-50 w-fit px-3 py-1 rounded-full border border-primary/10">
                                                <Star size={12} className="text-primary fill-primary" />
                                                <span className="text-sm font-black text-primary">{u.points.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${u.status === 'Especial' ? 'bg-accent/20 text-accent' : 'bg-green-100 text-green-600'}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-gray-300 hover:text-makeup-brown transition-colors">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-rose-50 flex justify-between items-center text-sm font-bold text-gray-400">
                        <p>Mostrando 1-4 de 1,284 usuarias</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-secondary/50 rounded-xl hover:bg-primary hover:text-white transition-all">1</button>
                            <button className="px-4 py-2 rounded-xl hover:bg-secondary transition-all">2</button>
                            <button className="px-4 py-2 rounded-xl hover:bg-secondary transition-all">3</button>
                        </div>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
