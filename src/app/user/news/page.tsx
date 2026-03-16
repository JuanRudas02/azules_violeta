"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useContent } from '@/features/news/hooks/useContent';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Calendar, Megaphone, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function CommunityPage() {
    const { posts, loading, reactToPost } = useContent('NEWS');

    const getMetadata = (metadata?: string) => {
        try {
            return JSON.parse(metadata || '{"likes": 0, "views": 0}');
        } catch {
            return { likes: 0, views: 0 };
        }
    };

    return (
        <AppShell>
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        <Heart size={14} className="fill-primary" />
                        Comunidad Violeta
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-makeup-brown tracking-tight">Tips, Noticias & Tendencias</h1>
                    <p className="text-gray-500 max-w-xl mx-auto">Tu dosis diaria de inspiración y cuidado personal diseñada por expertas.</p>
                </header>

                <section className="space-y-10">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={40} />
                        </div>
                    ) : (
                        posts.map((item, i) => {
                            const meta = getMetadata(item.metadata);
                            return (
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={item.id}
                                    className="bg-white rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5 overflow-hidden flex flex-col md:flex-row"
                                >
                                    {item.imageUrl && (
                                        <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 40vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-10 flex-1 space-y-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                            <Megaphone size={14} />
                                            <span>Noticia</span>
                                            <span className="text-gray-200 mx-2">•</span>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Calendar size={12} />
                                                {new Date(item.createdAt).toLocaleDateString('es-CO', { day: '2-digit', month: 'long' })}
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-black text-makeup-brown leading-tight">{item.title}</h2>

                                        <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-wrap">
                                            {item.content}
                                        </p>

                                        <div className="pt-6 border-t border-rose-50 flex justify-between items-center">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => reactToPost(item.id, 'like')}
                                                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-black text-sm group active:scale-125"
                                                >
                                                    <Heart size={20} className="group-hover:fill-primary/20 transition-all font-bold" />
                                                    {meta.likes || 0}
                                                </button>
                                                <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-black text-sm">
                                                    <MessageCircle size={20} />
                                                    {meta.comments || 0}
                                                </button>
                                            </div>
                                            <button className="text-gray-400 hover:text-primary transition-colors">
                                                <Share2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        })
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="text-center py-20 bg-secondary/20 rounded-[3rem] border-2 border-dashed border-rose-100">
                            <p className="text-gray-400 font-medium italic">No hay noticias hoy. ¡Vuelve más tarde!</p>
                        </div>
                    )}
                </section>
            </div>
        </AppShell>
    );
}
