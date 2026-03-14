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
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-secondary to-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Elementos decorativos animados */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/30 rounded-full blur-[120px]"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex justify-center mb-6"
                    >
                        <img
                            src="https://azulesvioleta.com/cdn/shop/files/logo-2_fda935d7-875c-4e91-8fce-eafcf66116d5.png?v=1745890456&width=120"
                            alt="Azules Violeta Logo"
                            className="h-28 w-auto drop-shadow-[0_10px_10px_rgba(179,130,170,0.3)]"
                        />
                    </motion.div>
                    <h1 className="text-2xl font-black text-makeup-brown tracking-tight mb-2">Bienvenida al Club</h1>
                    <p className="text-primary font-medium">Log In a tu espacio de belleza exclusivo</p>
                </div>

                <div className="bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(179,130,170,0.2)] border border-white/60 space-y-8">
                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50/80 backdrop-blur-md text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100/50 text-center shadow-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                        <div className="space-y-5">
                            <div className="group">
                                <label className="block text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-3 ml-1">Correo Electrónico</label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-primary">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="tu@correo.com"
                                        defaultValue="admin@azulesvioleta.com"
                                        className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-white/70 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none transition-all shadow-sm shadow-primary/5 placeholder:text-gray-300 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black uppercase text-primary tracking-[0.2em] mb-3 ml-1 flex justify-between">
                                    <span>Contraseña</span>
                                    <a href="#" className="text-accent hover:text-primary transition-colors normal-case font-bold">¿Olvidaste tu contraseña?</a>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/60 transition-colors group-focus-within:text-primary">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        defaultValue="123456"
                                        className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-white/70 border-2 border-transparent focus:border-primary/30 focus:bg-white focus:outline-none transition-all shadow-sm shadow-primary/5 placeholder:text-gray-300 font-medium"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-rose-400 text-white p-6 rounded-[1.5rem] font-black text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    <span>Ingresar</span>
                                    <ArrowRight className="transition-transform group-hover:translate-x-2" size={24} />
                                </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </button>
                    </form>

                    <div className="pt-8 border-t border-primary/10 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            ¿Aún no tienes cuenta exclusiva? <br />
                            <button onClick={() => router.push('/register')} className="mt-2 text-primary font-black cursor-pointer hover:text-accent transition-colors underline-offset-4 hover:underline">ÚNETE AL CLUB VIOLETA</button>
                        </p>
                    </div>
                </div>
            </motion.div>

            <LeadMagnet />
        </div>
    );
}
