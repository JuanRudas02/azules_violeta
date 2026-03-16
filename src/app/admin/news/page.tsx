"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useContent } from '@/features/news/hooks/useContent';
import { useState } from 'react';
import { Megaphone, Tag, Image as ImageIcon, Plus, Trash2, Calendar, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminContentPage() {
    const { posts, addPost, fetchPosts, loading } = useContent();
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        type: 'NEWS' as 'NEWS' | 'PROMOTION',
        title: '',
        content: '',
        imageUrl: '',
        discountCode: '',
        externalLink: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const metadata = formData.type === 'PROMOTION'
                ? JSON.stringify({
                    discountCode: formData.discountCode,
                    externalLink: formData.externalLink,
                    likes: 0,
                    views: 0
                })
                : JSON.stringify({ likes: 0, views: 0 });

            const success = await addPost({
                type: formData.type,
                title: formData.title,
                content: formData.content,
                imageUrl: formData.imageUrl,
                metadata: metadata as any
            } as any);

            if (success) {
                setShowForm(false);
                setFormData({
                    type: 'NEWS',
                    title: '',
                    content: '',
                    imageUrl: '',
                    discountCode: '',
                    externalLink: ''
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-makeup-brown">Gestión de Contenido</h1>
                        <p className="text-gray-500">Crea noticias y promociones para tus clientes en tiempo real.</p>
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
                            className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-2xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex gap-4 p-1 bg-secondary rounded-2xl w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'NEWS' })}
                                        className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${formData.type === 'NEWS' ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
                                    >
                                        Noticia
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'PROMOTION' })}
                                        className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${formData.type === 'PROMOTION' ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
                                    >
                                        Promoción
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Título de la publicación</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="input-field"
                                                placeholder="Ej: Nueva Colección Pantone"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Contenido / Descripción</label>
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
                                            <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Imagen (URL)</label>
                                            <div className="relative">
                                                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                                <input
                                                    value={formData.imageUrl}
                                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                                    className="input-field pl-12"
                                                    placeholder="https://images.unsplash.com/..."
                                                />
                                            </div>
                                        </div>

                                        {formData.type === 'PROMOTION' && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Código Promocional</label>
                                                    <div className="relative">
                                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            value={formData.discountCode}
                                                            onChange={e => setFormData({ ...formData, discountCode: e.target.value })}
                                                            className="input-field pl-12"
                                                            placeholder="Ej: VIOLETA20"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Link Externo (Tienda)</label>
                                                    <input
                                                        value={formData.externalLink}
                                                        onChange={e => setFormData({ ...formData, externalLink: e.target.value })}
                                                        className="input-field"
                                                        placeholder="https://azulesvioleta.com/..."
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6 border-t border-rose-50">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                        Publicar en el Club
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="btn-secondary px-8"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="space-y-6">
                    <h2 className="text-xl font-black text-makeup-brown flex items-center gap-2">
                        <Megaphone className="text-primary" size={24} />
                        Historial de Publicaciones
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post) => (
                                <motion.div
                                    layout
                                    key={post.id}
                                    className="bg-white p-6 rounded-[2rem] border border-rose-50 flex gap-4 items-start group relative overflow-hidden shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-black ${post.type === 'NEWS' ? 'bg-blue-50 text-blue-500' : 'bg-rose-50 text-rose-500'}`}>
                                        {post.type === 'NEWS' ? <Megaphone size={24} /> : <Tag size={24} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">{post.type}</p>
                                            <button
                                                onClick={async () => {
                                                    if (confirm('¿Estás segura de eliminar esta publicación?')) {
                                                        const token = localStorage.getItem('auth_token');
                                                        await fetch(`/api/content?id=${post.id}`, {
                                                            method: 'DELETE',
                                                            headers: { 'Authorization': `Bearer ${token}` }
                                                        });
                                                        fetchPosts();
                                                    }
                                                }}
                                                className="text-gray-200 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <h3 className="font-black text-makeup-brown truncate">{post.title}</h3>
                                        <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-medium">{post.content}</p>
                                        <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-300 font-black">
                                            <Calendar size={12} />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {posts.length === 0 && (
                                <div className="col-span-full py-12 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
                                    <p className="text-gray-400 font-medium italic">No has publicado nada todavía.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </AppShell>
    );
}
