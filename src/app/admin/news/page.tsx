"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useContent, Post } from '@/features/news/hooks/useContent';
import { useState } from 'react';
import { Megaphone, Tag, Image as ImageIcon, Plus, Trash2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminContentPage() {
    const { posts, addPost, deletePost } = useContent();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Partial<Post>>({
        type: 'news',
        title: '',
        content: '',
        discountCode: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPost(formData as any);
        setShowForm(false);
        setFormData({ type: 'news', title: '', content: '', discountCode: '' });
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown">Gestión de Contenido</h1>
                        <p className="text-gray-500">Crea noticias y promociones para tus clientes.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Crear Nuevo
                    </button>
                </header>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex gap-4 p-1 bg-secondary rounded-2xl w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'news' })}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${formData.type === 'news' ? 'bg-primary text-white' : 'text-gray-400'}`}
                                    >
                                        Noticia
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'promotion' })}
                                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${formData.type === 'promotion' ? 'bg-primary text-white' : 'text-gray-400'}`}
                                    >
                                        Promoción
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-makeup-brown mb-2">Título</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="input-field"
                                                placeholder="Ej: Liquidación de Verano"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-makeup-brown mb-2">Contenido</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                                className="input-field resize-none"
                                                placeholder="Escribe los detalles aquí..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-makeup-brown mb-2">URL de Imagen</label>
                                            <div className="relative">
                                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input
                                                    value={formData.image}
                                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                    className="input-field pl-12"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        {formData.type === 'promotion' && (
                                            <div>
                                                <label className="block text-sm font-bold text-makeup-brown mb-2">Código de Descuento (Opcional)</label>
                                                <div className="relative">
                                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        value={formData.discountCode}
                                                        onChange={e => setFormData({ ...formData, discountCode: e.target.value })}
                                                        className="input-field pl-12"
                                                        placeholder="Ej: BEAUTY20"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-rose-50">
                                    <button type="submit" className="btn-primary flex-1">Publicar Ahora</button>
                                    <button type="button" onClick={() => setShowForm(false)} className="btn-secondary px-8">Cancelar</button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-makeup-brown">Publicaciones Recientes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post) => (
                            <motion.div
                                layout
                                key={post.id}
                                className="bg-white p-6 rounded-3xl border border-rose-50 flex gap-4 items-start group relative overflow-hidden"
                            >
                                <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${post.type === 'news' ? 'bg-blue-50 text-blue-500' : 'bg-rose-50 text-rose-500'}`}>
                                    {post.type === 'news' ? <Megaphone size={24} /> : <Tag size={24} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">{post.type}</p>
                                        <button
                                            onClick={() => deletePost(post.id)}
                                            className="text-red-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-makeup-brown truncate">{post.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">{post.content}</p>
                                    <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-300 font-bold">
                                        <Calendar size={12} />
                                        {post.date}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
