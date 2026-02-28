"use client";

import { motion } from 'framer-motion';
import { LeadMagnet } from '@/shared/components/ui/LeadMagnet';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (role: 'user' | 'admin') => {
        login(role);
        router.push('/dashboard');
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
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary p-4 rounded-3xl shadow-xl shadow-primary/30">
                            <Sparkles className="text-white w-12 h-12" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">
                        Azules Violeta
                    </h1>
                    <p className="text-gray-500 font-medium">Fidelización & Belleza Premium</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 space-y-6">
                    <div className="space-y-4">
                        <button
                            onClick={() => handleLogin('user')}
                            className="w-full group relative flex items-center justify-between bg-primary text-white p-5 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/40 active:scale-95"
                        >
                            <span>Acceso Cliente</span>
                            <ArrowRight className="transition-transform group-hover:translate-x-2" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>

                        <button
                            onClick={() => handleLogin('admin')}
                            className="w-full group relative flex items-center justify-between bg-white border-2 border-primary/20 text-primary p-5 rounded-2xl font-bold text-lg transition-all hover:bg-violet-50 active:scale-95"
                        >
                            <span>Acceso Admin</span>
                            <ArrowRight className="text-primary/40 group-hover:text-primary transition-transform group-hover:translate-x-2" />
                        </button>
                    </div>

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
