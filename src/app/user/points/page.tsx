"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { useContent } from '@/features/news/hooks/useContent';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function PromotionsPage() {
    const { posts, loading } = useContent('PROMOTION');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyToClipboard = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getMetadata = (metadata?: string) => {
        try {
            return JSON.parse(metadata || '{}');
        } catch {
            return {};
        }
    };

    return (
        <AppShell>
            <div className="max-w-5xl mx-auto space-y-8">
                <header>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black text-makeup-brown">Zona de Promociones</h1>
                        <Sparkles className="text-accent animate-pulse" />
                    </div>
                    <p className="text-gray-500 mt-1">Beneficios exclusivos por ser parte del Club Violeta.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={40} />
                        </div>
                    ) : (
                        posts.map((promo, i) => {
                            const meta = getMetadata(promo.metadata);
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={promo.id}
                                    className="group relative bg-white rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-900/5 overflow-hidden flex flex-col"
                                >
                                    {/* Image Header */}
                                    <div className="h-48 relative overflow-hidden bg-secondary">
                                        {promo.imageUrl ? (
                                            <Image
                                                src={promo.imageUrl}
                                                alt={promo.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-rose-200">
                                                <Tag size={64} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            Oferta
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-black text-makeup-brown mb-2">{promo.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{promo.content}</p>

                                        {meta.discountCode && (
                                            <div className="mt-auto space-y-4">
                                                <div className="bg-secondary/50 p-4 rounded-2xl border-2 border-dashed border-rose-200 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[10px] uppercase font-bold text-rose-400 tracking-widest">Código</p>
                                                        <p className="text-lg font-black text-primary font-mono">{meta.discountCode}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(meta.discountCode, promo.id)}
                                                        className={`p-3 rounded-xl transition-all ${copiedId === promo.id ? 'bg-green-500 text-white' : 'bg-primary text-white hover:scale-105 shadow-lg shadow-primary/20'}`}
                                                    >
                                                        {copiedId === promo.id ? <Check size={20} /> : <Copy size={20} />}
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => window.open(meta.externalLink || 'https://azulesvioleta.com/', '_blank')}
                                                    className="w-full btn-secondary text-sm py-4"
                                                >
                                                    Ir a la tienda
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto text-rose-300">
                                <Tag size={40} />
                            </div>
                            <p className="text-gray-400 font-medium italic">No hay promociones activas en este momento. ¡Vuelve pronto!</p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
