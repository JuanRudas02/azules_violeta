"use client";

import { motion } from 'framer-motion';
import { LeadMagnet } from '@/shared/components/ui/LeadMagnet';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const role = await login(email, password);
            if (role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus datos.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-3xl animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <img src="https://azulesvioleta.com/cdn/shop/files/logo-2_fda935d7-875c-4e91-8fce-eafcf66116d5.png?v=1745890456&width=80" alt="Azules Violeta Logo" className="h-24 w-auto drop-shadow-lg" />
                    </div>
                    <p className="text-gray-500 font-medium">Log In a tu espacio de belleza</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 space-y-6">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100 text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="tu@correo.com"
                                        defaultValue="admin@azulesvioleta.com"
                                        className="input-field pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-2 ml-1 flex justify-between">
                                    <span>Contraseña</span>
                                    <a href="#" className="text-primary hover:underline normal-case font-bold">¿Olvidaste tu contraseña?</a>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        defaultValue="123456"
                                        className="input-field pl-12"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative flex items-center justify-center gap-2 bg-primary text-white p-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/40 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <span>Ingresar</span>
                                    <ArrowRight className="transition-transform group-hover:translate-x-2" />
                                </>
                            )}
                            {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
                        </button>
                    </form>

                    <div className="pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400">
                            ¿No tienes cuenta? <button onClick={() => router.push('/register')} className="text-primary font-bold cursor-pointer hover:underline">Únete al club</button>
                        </p>
                    </div>
                </div>
            </motion.div>

            <LeadMagnet />
        </div>
    );
}
