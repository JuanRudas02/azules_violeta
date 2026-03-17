"use client";

import { AppShell } from '@/shared/components/layout/AppShell';
import { ProgressBar } from '@/shared/components/ui/ProgressBar';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, ShoppingBag, Bell, Ticket } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useContent } from '@/features/news/hooks/useContent';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
    const { user, updateUserPoints } = useAuth();
    const router = useRouter();
    const { posts: allContent } = useContent();

    useEffect(() => {
        const syncPoints = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const res = await fetch('/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (updateUserPoints) {
                        updateUserPoints(data.wallet?.balance || 0);
                    }
                }
            } catch (error) {
                console.error('Error syncing points:', error);
            }
        };
        syncPoints();
    }, []);

    const newsCount = allContent.filter(p => p.type === 'NEWS').length;
    const promoCount = allContent.filter(p => p.type === 'PROMOTION').length;

    const stats = [
        { label: 'Mis Puntos', value: user?.points.toLocaleString(), icon: Star, color: 'text-accent', bg: 'bg-accent/10', href: '/user/wallet' },
        { label: 'Promociones', value: `${promoCount} Activas`, icon: Ticket, color: 'text-rose-500', bg: 'bg-rose-50', href: '/user/points' },
        { label: 'Novedades', value: `${newsCount} Nuevas`, icon: Bell, color: 'text-primary', bg: 'bg-primary/10', href: '/user/news' },
    ];

    return (
        <AppShell>
            <div className="max-w-6xl mx-auto space-y-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-black text-makeup-brown">¡Hola, {user?.name.split(' ')[0]}! ✨</h1>
                        <p className="text-gray-500 mt-2 text-lg">Bienvenida de nuevo a tu espacio de belleza.</p>
                    </motion.div>
                    <button
                        onClick={() => window.open('https://azulesvioleta.com/', '_blank')}
                        className="btn-primary flex items-center gap-3"
                    >
                        <ShoppingBag size={20} />
                        Ir a la tienda
                    </button>
                </header>

                {/* Quick Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.button
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => router.push(stat.href)}
                            className="bg-white p-6 rounded-[2.5rem] border border-rose-50 shadow-xl shadow-rose-900/5 flex items-center gap-6 hover:scale-105 transition-all text-left"
                        >
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-3xl`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs uppercase font-black text-gray-400 tracking-widest leading-none mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-makeup-brown">{stat.value}</p>
                            </div>
                        </motion.button>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Feed Preview */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-rose-100 shadow-2xl shadow-rose-900/5">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-makeup-brown">Estatus de Recompensas</h2>
                                <Star className="text-accent fill-accent" />
                            </div>

                            <ProgressBar current={user?.points ?? 0} target={1500} label="Próximo Regalo: Mini Kit de Skin Care" />

                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-secondary/50 p-6 rounded-[2.5rem] border border-rose-100">
                                    <Heart className="text-rose-500 mb-2" size={24} />
                                    <p className="font-bold text-makeup-brown">Club Benefit</p>
                                    <p className="text-sm text-gray-500 mt-1">Ganas puntos por cada compra registrada.</p>
                                </div>
                                <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10">
                                    <Sparkles className="text-primary mb-2" size={24} />
                                    <p className="font-bold text-makeup-brown">Guía Gratuita</p>
                                    <p className="text-sm text-gray-500 mt-1">Nuevos tips de belleza disponibles en la sección de Novedades.</p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Promo */}
                        <div className="relative h-64 rounded-[3rem] overflow-hidden group cursor-pointer" onClick={() => router.push('/user/news')}>
                            <Image
                                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=1200&q=80"
                                alt="Promo"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-makeup-brown/80 to-transparent flex flex-col justify-center p-12">
                                <p className="text-accent font-black uppercase tracking-widest text-sm mb-2">Comunidad</p>
                                <h3 className="text-3xl font-black text-white max-w-sm leading-tight">Explora las últimas tendencias</h3>
                                <button className="mt-6 text-white text-sm font-bold flex items-center gap-2 hover:underline">
                                    Ver todas las novedades →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Side */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-rose-50 shadow-xl shadow-rose-900/5">
                            <h3 className="font-black text-makeup-brown mb-6 flex items-center gap-2">
                                <Ticket className="text-primary" />
                                Acceso Rápido
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Eventos en Vivo', icon: '📅' },
                                    { label: 'Tutoriales', icon: '💄' },
                                    { label: 'Mis Compras', icon: '🛍️' },
                                    { label: 'Configuración', icon: '⚙️' },
                                ].map((item) => (
                                    <button key={item.label} className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-2xl hover:bg-secondary transition-all font-bold text-sm text-makeup-brown">
                                        <span className="flex items-center gap-3">
                                            <span className="text-lg">{item.icon}</span>
                                            {item.label}
                                        </span>
                                        <span className="text-primary opacity-30">→</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-makeup-brown p-8 rounded-[2.5rem] text-white">
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Premium Member</p>
                            <h3 className="text-xl font-bold mb-4">¿Necesitas Ayuda?</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">Estamos aquí para asesorarte con tus productos y puntos.</p>
                            <button className="w-full bg-white text-makeup-brown py-3 rounded-2xl font-bold hover:scale-105 transition-all text-sm">
                                Chatear con una experta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
