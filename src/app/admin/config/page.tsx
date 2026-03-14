"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { motion } from 'framer-motion';
import {
    Settings,
    Bell,
    Lock,
    Globe,
    CheckCircle2,
    Coins,
    Trash2,
    Save,
    User,
    Mail,
    Smartphone
} from 'lucide-react';
import { useState } from 'react';

export default function AdminConfigPage() {
    const [saveStatus, setSaveStatus] = useState(false);

    const handleSave = () => {
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 2000);
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8 pb-10">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown">Configuración General</h1>
                        <p className="text-gray-500">Ajusta los parámetros globales de la plataforma.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="btn-primary flex items-center gap-2"
                    >
                        {saveStatus ? <CheckCircle2 size={20} /> : <Save size={20} />}
                        {saveStatus ? 'Guardado' : 'Guardar Cambios'}
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Tabs (Mocked) */}
                    <div className="md:col-span-1 space-y-2">
                        {[
                            { label: 'Perfil Admin', icon: User, active: true },
                            { label: 'Reglas de Puntos', icon: Coins, active: false },
                            { label: 'Notificaciones', icon: Bell, active: false },
                            { label: 'Seguridad', icon: Lock, active: false },
                            { label: 'Personalización', icon: Globe, active: false },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.label}
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all ${tab.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-rose-50'}`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>

                    {/* Form Content */}
                    <div className="md:col-span-2 space-y-8">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 space-y-6"
                        >
                            <h3 className="text-xl font-bold text-makeup-brown flex items-center gap-2">
                                <User className="text-primary" />
                                Perfil de la Administradora
                            </h3>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Nombre Público</label>
                                    <input type="text" defaultValue="Admin Azules Violeta" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Email de Soporte</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input type="email" defaultValue="soporte@azulesvioleta.com" className="input-field pl-12" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">WhatsApp de Contacto</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input type="text" defaultValue="+57 300 000 0000" className="input-field pl-12" />
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 space-y-6"
                        >
                            <h3 className="text-xl font-bold text-makeup-brown flex items-center gap-2">
                                <Coins className="text-primary" />
                                Reglas del Programa de Puntos
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-secondary/30 p-4 rounded-2xl">
                                    <label className="block text-[10px] font-black uppercase text-rose-400 tracking-widest mb-2">Valor de la Compra</label>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-makeup-brown">$10.000</span>
                                        <span className="text-gray-300 font-bold">=</span>
                                    </div>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded-2xl">
                                    <label className="block text-[10px] font-black uppercase text-rose-400 tracking-widest mb-2">Puntos Otorgados</label>
                                    <input type="number" defaultValue="10" className="w-full bg-transparent font-black text-primary text-xl outline-none" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic font-medium">
                                * Por cada $10.000 COP que la cliente registre, el sistema le asignará automáticamente 10 puntos (ajustable).
                            </p>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100 space-y-4"
                        >
                            <h3 className="text-lg font-bold text-rose-500 flex items-center gap-2">
                                <Trash2 size={20} />
                                Zona de Peligro
                            </h3>
                            <p className="text-xs text-rose-400">Ten cuidado, estas acciones son irreversibles para el historial de la marca.</p>
                            <button className="bg-white text-rose-500 border border-rose-200 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-rose-500 hover:text-white transition-all">
                                Reiniciar Todos los Puntos
                            </button>
                        </motion.section>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
