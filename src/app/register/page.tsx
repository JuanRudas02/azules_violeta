"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ArrowLeft, UserPlus, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulación de registro exitoso
        setTimeout(() => {
            login('user');
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col md:flex-row">
            {/* Decorative Side */}
            <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center overflow-hidden p-12">
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-400 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[80px] opacity-20" />

                <div className="relative z-10 text-center space-y-8 max-w-md">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/20"
                    >
                        <Sparkles className="text-accent w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-4xl font-black text-white leading-tight">Únete al Club Violeta</h2>
                        <p className="text-violet-100 text-lg mt-4 leading-relaxed">
                            Consigue <span className="text-accent font-bold">500 puntos</span> gratis solo por registrarte hoy.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-2xl font-bold text-white">100%</p>
                            <p className="text-[10px] text-violet-200 uppercase tracking-widest font-bold">Gratis</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <p className="text-2xl font-bold text-white">+5k</p>
                            <p className="text-[10px] text-violet-200 uppercase tracking-widest font-bold">Socias</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 bg-white flex flex-col p-8 md:p-12 lg:p-24 justify-center">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-12 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Volver al inicio
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full mx-auto"
                >
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-black text-makeup-brown tracking-tight">Crea tu cuenta</h1>
                        <p className="text-gray-400 mt-2 font-medium">Empieza tu viaje de belleza con nosotros.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input required type="text" placeholder="Ej: Maria Lopez" className="input-field pl-12" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input required type="email" placeholder="tu@email.com" className="input-field pl-12" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input required type="password" placeholder="••••••••" className="input-field pl-12" />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-3 py-5"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus size={22} />
                                    Crear Cuenta
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-gray-400 font-medium">
                        ¿Ya tienes cuenta? <button onClick={() => router.push('/login')} className="text-primary font-bold hover:underline">Inicia Sesión</button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
