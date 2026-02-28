"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useHomeContent } from '@/features/home/hooks/useHomeContent';
import { motion } from 'framer-motion';
import {
    Home,
    Layout,
    Image as ImageIcon,
    Plus,
    Trash2,
    Save,
    CheckCircle2,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

export default function AdminCMSPage() {
    const { content, updateHero, updateFeature, addFeature, removeFeature } = useHomeContent();
    const [saveStatus, setSaveStatus] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'features'>('hero');

    const handleManualSave = () => {
        // the useHomeContent hook already updates localStorage on every change,
        // so this is mostly for UX to give the user confidence.
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 2000);
    };

    const getIcon = (name: string) => {
        const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
        return <Icon className="text-primary mb-4" size={24} />;
    };

    return (
        <AppShell>
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-theme(spacing.24))] flex flex-col pb-6">
                <header className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown flex items-center gap-3">
                            <Layout className="text-primary" />
                            Editor de la Tienda
                        </h1>
                        <p className="text-gray-500 text-sm">Los cambios se previsualizan instantáneamente. Guarda para confirmar.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {saveStatus && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100 text-sm"
                            >
                                <CheckCircle2 size={16} />
                                Publicado
                            </motion.div>
                        )}
                        <button
                            onClick={handleManualSave}
                            className="btn-primary flex items-center gap-2 py-2"
                        >
                            <Save size={18} />
                            Guardar Cambios
                        </button>
                    </div>
                </header>

                <div className="flex-1 min-h-0 flex gap-6 overflow-hidden">
                    {/* LEFT: Editor Sidebar (Shopify Style) */}
                    <div className="w-[400px] flex flex-col bg-white rounded-[2rem] border border-rose-100 shadow-xl shadow-rose-900/5 overflow-hidden shrink-0">
                        <div className="flex border-b border-rose-50 p-2 shrink-0">
                            <button
                                onClick={() => setActiveTab('hero')}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'hero' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-400 hover:bg-rose-50'}`}
                            >
                                Banner Principal
                            </button>
                            <button
                                onClick={() => setActiveTab('features')}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'features' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-gray-400 hover:bg-rose-50'}`}
                            >
                                Características
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {activeTab === 'hero' ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Badge Flotante</label>
                                        <input
                                            type="text"
                                            value={content.hero.badge}
                                            onChange={(e) => updateHero({ ...content.hero, badge: e.target.value })}
                                            className="input-field text-sm p-3"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Título Principal</label>
                                        <textarea
                                            value={content.hero.title}
                                            onChange={(e) => updateHero({ ...content.hero, title: e.target.value })}
                                            className="input-field text-sm p-3 min-h-[100px] resize-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Subtítulo / Descripción</label>
                                        <textarea
                                            value={content.hero.subtitle}
                                            onChange={(e) => updateHero({ ...content.hero, subtitle: e.target.value })}
                                            className="input-field text-sm p-3 min-h-[100px] resize-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 border-t border-rose-50 pt-6">
                                        <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
                                            <ImageIcon size={14} /> URL de Imagen
                                        </label>
                                        <input
                                            type="url"
                                            value={content.hero.imageUrl}
                                            onChange={(e) => updateHero({ ...content.hero, imageUrl: e.target.value })}
                                            className="input-field text-sm p-3"
                                        />
                                        {content.hero.imageUrl && (
                                            <div className="mt-2 h-24 rounded-xl overflow-hidden border border-rose-100">
                                                <img src={content.hero.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {content.features.map((feature, index) => (
                                        <div key={feature.id} className="p-4 rounded-2xl border border-rose-100 bg-secondary/10 space-y-4">
                                            <div className="flex justify-between items-center border-b border-rose-50 pb-2">
                                                <span className="text-xs font-black text-makeup-brown uppercase tracking-widest">Tarjeta #{index + 1}</span>
                                                <button onClick={() => removeFeature(feature.id)} className="text-rose-400 hover:text-rose-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <input
                                                value={feature.title}
                                                onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                                                className="w-full bg-white border border-rose-50 p-2 text-sm rounded-lg outline-none focus:border-primary/50 font-bold text-makeup-brown"
                                                placeholder="Título"
                                            />
                                            <textarea
                                                value={feature.description}
                                                onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                                                className="w-full bg-white border border-rose-50 p-2 text-xs rounded-lg outline-none focus:border-primary/50 text-gray-500 resize-none h-20"
                                                placeholder="Descripción"
                                            />
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] uppercase font-bold text-gray-400">Icono (Lucide):</span>
                                                <input
                                                    value={feature.icon}
                                                    onChange={(e) => updateFeature(feature.id, { icon: e.target.value })}
                                                    className="flex-1 bg-white border border-rose-50 p-1.5 px-3 text-xs rounded-lg outline-none focus:border-primary/50 text-primary font-mono"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addFeature({ title: 'Nuevo Beneficio', description: 'Describe este beneficio aquí.', icon: 'Star', gradient: 'from-secondary to-white' })}
                                        className="w-full btn-secondary py-3 flex items-center justify-center gap-2 text-sm border-dashed border-2 hover:border-primary/30"
                                    >
                                        <Plus size={16} />
                                        Agregar Beneficio
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Live Preview (Iframe simulation) */}
                    <div className="flex-1 bg-gray-100 rounded-[2rem] border-4 border-gray-200 shadow-inner overflow-hidden flex flex-col">
                        <div className="bg-gray-200 h-10 shrink-0 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="mx-auto bg-white/50 px-32 py-1 rounded-md text-[10px] font-bold text-gray-500 tracking-wider">
                                preview.azulesvioleta.com
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-white pointer-events-none origin-top custom-scrollbar">
                            {/* --- LIVE PREVIEW CONTENT --- */}
                            <div className="relative pt-12 pb-16 px-8 overflow-hidden">
                                <div className="absolute top-0 right-[-10%] w-[50%] h-[100%] bg-secondary rounded-full blur-[80px] -z-10 opacity-50" />
                                <div className="absolute bottom-0 left-[-10%] w-[40%] h-[60%] bg-violet-100 rounded-full blur-[80px] -z-10 opacity-40" />

                                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 px-3 py-1.5 rounded-full text-xs font-bold border border-rose-100">
                                            <Sparkles size={14} />
                                            <span>{content.hero.badge || 'Badge'}</span>
                                        </div>
                                        <h1 className="text-4xl lg:text-5xl font-black text-makeup-brown leading-tight tracking-tight">
                                            {content.hero.title || 'Título vacío'}
                                        </h1>
                                        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
                                            {content.hero.subtitle || 'Subtítulo vacío'}
                                        </p>
                                        <div className="flex gap-3 pt-2">
                                            <div className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">Comenzar ahora</div>
                                            <div className="bg-secondary text-primary px-5 py-2 rounded-xl text-sm font-bold">Explorar Tienda</div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white h-[300px]">
                                            {content.hero.imageUrl ? (
                                                <img src={content.hero.imageUrl} alt="Hero" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">Sin imagen</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                                        </div>
                                    </div>
                                </div>

                                {/* Features Preview */}
                                <div className="mt-16 max-w-6xl mx-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {content.features.map((feature, i) => (
                                            <div key={feature.id} className={`p-6 rounded-[2rem] bg-gradient-to-br ${feature.gradient} border border-white/50 shadow-lg shadow-rose-900/5`}>
                                                {getIcon(feature.icon)}
                                                <h3 className="text-xl font-bold text-makeup-brown mb-2">{feature.title || 'Sin Título'}</h3>
                                                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* --- END LIVE PREVIEW --- */}
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #fce7f3; border-radius: 20px; }
      `}} />
        </AppShell>
    );
}
