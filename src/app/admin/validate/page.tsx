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
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function AdminValidatePage() {
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

    const pendingInvoices = [
        { id: 'FAC-001', user: 'Adriana Silva', date: '2026-02-28 10:20', amount: '$120.000', points: 120, img: 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&w=400&q=80' },
        { id: 'FAC-002', user: 'Laura Restrepo', date: '2026-02-28 09:15', amount: '$54.500', points: 54, img: 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&w=400&q=80' },
        { id: 'FAC-003', user: 'Camila Gomez', date: '2026-02-27 18:45', amount: '$302.000', points: 302, img: 'https://images.unsplash.com/photo-1554224155-169641357599?auto=format&fit=crop&w=400&q=80' },
    ];

    return (
        <AppShell>
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
                        <button className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">Pendientes (3)</button>
                        <button className="px-6 py-2 text-gray-400 text-sm font-medium">Historial</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white p-4 rounded-[2rem] border border-rose-50 shadow-sm flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input type="text" placeholder="Buscar por ID o cliente..." className="w-full bg-secondary/20 p-3 pl-12 rounded-xl text-sm outline-none border border-transparent focus:border-primary/10 transition-all font-medium" />
                            </div>
                            <button className="p-3 bg-white border border-rose-100 rounded-xl text-gray-400 hover:text-primary transition-all">
                                <Filter size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {pendingInvoices.map((inv, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={inv.id}
                                    onClick={() => setSelectedInvoice(inv)}
                                    className={`p-6 rounded-[2.5rem] border transition-all cursor-pointer group flex items-center justify-between ${selectedInvoice?.id === inv.id ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-white border-rose-50 hover:border-primary/20 shadow-sm'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${selectedInvoice?.id === inv.id ? 'bg-white/20' : 'bg-secondary text-primary'}`}>
                                            {inv.id.split('-')[1]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold flex items-center gap-2">
                                                {inv.user}
                                            </h3>
                                            <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest ${selectedInvoice?.id === inv.id ? 'text-violet-200' : 'text-gray-400'}`}>
                                                <Clock size={12} />
                                                {inv.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden sm:block">
                                            <p className={`text-sm font-black ${selectedInvoice?.id === inv.id ? 'text-white' : 'text-primary'}`}>+{inv.points} pts</p>
                                            <p className={`text-[10px] font-bold ${selectedInvoice?.id === inv.id ? 'text-violet-200' : 'text-gray-400'}`}>{inv.amount}</p>
                                        </div>
                                        <ChevronRight className={selectedInvoice?.id === inv.id ? 'text-white' : 'text-gray-200 group-hover:text-primary transition-colors'} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Details & Actions Section */}
                    <div className="lg:col-span-1">
                        <AnimatePresence mode="wait">
                            {selectedInvoice ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    key={selectedInvoice.id}
                                    className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 sticky top-8"
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Detalles de Validación</p>
                                            <h2 className="text-2xl font-black text-makeup-brown">{selectedInvoice.id}</h2>
                                        </div>
                                        <button className="text-gray-300 hover:text-primary transition-colors">
                                            <ExternalLink size={20} />
                                        </button>
                                    </div>

                                    <div className="aspect-[4/5] bg-secondary rounded-[2rem] overflow-hidden mb-8 border border-rose-50 relative group">
                                        <img src={selectedInvoice.img} alt="Invoice" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <button className="absolute inset-0 bg-makeup-brown/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold backdrop-blur-sm">
                                            <Eye size={20} />
                                            Ver pantalla completa
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center py-4 border-y border-rose-50">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">A acreditar</p>
                                                <p className="text-xl font-black text-makeup-brown">{selectedInvoice.points} Puntos</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Referencia</p>
                                                <p className="text-sm font-bold text-makeup-brown">{selectedInvoice.amount}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-1 bg-green-500 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/20">
                                                <Check size={20} />
                                                Aprobar
                                            </button>
                                            <button className="flex-1 bg-rose-500 text-white p-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-rose-500/20">
                                                <X size={20} />
                                                Rechazar
                                            </button>
                                        </div>

                                        <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100">
                                            <AlertCircle className="text-amber-500 shrink-0" size={18} />
                                            <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                                                Asegúrate de que el número de factura y el valor total coincidan con los datos ingresados por la cliente.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-secondary/30 rounded-[3rem] border-2 border-dashed border-rose-100 p-12 text-center flex flex-col items-center justify-center h-[600px] sticky top-8">
                                    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-rose-900/5 text-rose-200 mb-6">
                                        <FileCheck size={48} />
                                    </div>
                                    <h3 className="text-lg font-black text-makeup-brown">Selecciona una factura</h3>
                                    <p className="text-sm text-gray-400 max-w-[200px] mx-auto mt-2 italic">Haz clic en una factura de la lista para ver el detalle y validarla.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
