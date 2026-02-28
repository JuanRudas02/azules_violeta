"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useHomeContent } from '@/features/home/hooks/useHomeContent';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Layout,
    Image as ImageIcon,
    Type,
    Plus,
    Trash2,
    Save,
    CheckCircle2,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { useState } from 'react';

export default function AdminCMSPage() {
    const { content, updateHero, updateFeature, addFeature, removeFeature } = useHomeContent();
    const [saveStatus, setSaveStatus] = useState(false);
    const [editingFeature, setEditingFeature] = useState<string | null>(null);

    const handleSaveHero = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        updateHero({
            title: formData.get('title') as string,
            subtitle: formData.get('subtitle') as string,
            badge: formData.get('badge') as string,
            imageUrl: formData.get('imageUrl') as string,
        });
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 2000);
    };

    return (
        <AppShell>
            <div className="max-w-5xl mx-auto space-y-12 pb-20">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown flex items-center gap-3">
                            <Layout className="text-primary" />
                            Gestión de Contenido (CMS)
                        </h1>
                        <p className="text-gray-500">Personaliza la experiencia de la página principal.</p>
                    </div>
                    {saveStatus && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl border border-green-100"
                        >
                            <CheckCircle2 size={18} />
                            Cambios Guardados
                        </motion.div>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Hero Editor */}
                    <section className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5">
                            <h2 className="text-xl font-black text-makeup-brown mb-8 flex items-center gap-2">
                                <ImageIcon className="text-primary" />
                                Sección Hero (Banner Principal)
                            </h2>

                            <form onSubmit={handleSaveHero} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Badge Flotante</label>
                                        <input name="badge" type="text" defaultValue={content.hero.badge} className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Título Principal</label>
                                        <textarea name="title" defaultValue={content.hero.title} className="input-field min-h-[100px] resize-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Subtítulo / Descripción</label>
                                        <textarea name="subtitle" defaultValue={content.hero.subtitle} className="input-field min-h-[80px] resize-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">URL de Imagen (Femenina / Producto)</label>
                                        <input name="imageUrl" type="url" defaultValue={content.hero.imageUrl} className="input-field" required />
                                    </div>
                                </div>

                                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                                    <Save size={20} />
                                    Actualizar Banner
                                </button>
                            </form>
                        </div>

                        {/* Features Editor */}
                        <div className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-black text-makeup-brown flex items-center gap-2">
                                    <Sparkles className="text-primary" />
                                    Tarjetas de Características
                                </h2>
                                <button
                                    onClick={() => addFeature({ title: 'Nueva Opción', description: 'Descripción de la opción', icon: 'Heart', gradient: 'from-rose-50 to-white' })}
                                    className="bg-secondary text-primary p-2 rounded-xl hover:scale-110 transition-transform"
                                >
                                    <Plus size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {content.features.map((feature) => (
                                    <div key={feature.id} className="p-6 rounded-[2rem] border border-rose-50 bg-secondary/10 flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div className="bg-white p-3 rounded-2xl text-primary shadow-sm">
                                                <Home size={20} />
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => removeFeature(feature.id)} className="p-2 text-rose-300 hover:text-rose-500 transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                defaultValue={feature.title}
                                                onChange={(e) => updateFeature(feature.id, { title: e.target.value })}
                                                className="bg-transparent font-bold text-makeup-brown outline-none w-full border-b border-transparent focus:border-primary/20"
                                            />
                                            <textarea
                                                defaultValue={feature.description}
                                                onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                                                className="bg-transparent text-sm text-gray-500 outline-none w-full mt-2 resize-none border-b border-transparent focus:border-primary/20"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Preview Section */}
                    <aside className="space-y-8">
                        <div className="bg-makeup-brown p-8 rounded-[3rem] text-white shadow-xl shadow-rose-900/20">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-accent">
                                <ArrowRight size={18} />
                                Vista Previa Rápida
                            </h3>
                            <div className="space-y-6 opacity-80 pointer-events-none">
                                <div className="space-y-2">
                                    <div className="h-4 w-20 bg-accent/20 rounded-full" />
                                    <div className="h-8 w-full bg-white/10 rounded-xl" />
                                    <div className="h-8 w-2/3 bg-white/10 rounded-xl" />
                                </div>
                                <div className="h-32 w-full bg-white/5 rounded-[2rem]" />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-16 w-full bg-white/5 rounded-2xl" />
                                    <div className="h-16 w-full bg-white/5 rounded-2xl" />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-8 font-medium italic text-center">
                                * Los cambios se verán reflejados en la web principal al guardar cada sección.
                            </p>
                        </div>

                        <div className="bg-primary/10 p-8 rounded-[3rem] border border-primary/20">
                            <h3 className="font-black text-primary mb-2">Consejo de Diseño</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Usa títulos cortos e impactantes. Las imágenes del Hero funcionan mejor si tienen fondos limpios o degradados suaves que combinen con el color <strong>Violeta</strong> de la marca.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </AppShell>
    );
}
