"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingBag, UserCircle, Star, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { LeadMagnet } from '@/shared/components/ui/LeadMagnet';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <span className="font-bold text-primary text-xl tracking-tight">Azules Violeta</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.open('https://azulesvioleta.com/', '_blank')}
            className="hidden md:flex items-center gap-2 text-makeup-brown font-semibold hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} />
            Tienda
          </button>
          <button
            onClick={() => router.push('/login')}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            <UserCircle size={20} />
            Mi Cuenta
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[50%] h-[100%] bg-secondary rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="absolute bottom-0 left-[-10%] w-[40%] h-[60%] bg-violet-100 rounded-full blur-[100px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 px-4 py-2 rounded-full text-sm font-bold border border-rose-100">
              <Sparkles size={16} />
              <span>Nueva Colección de Maquillaje</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-makeup-brown leading-[1.1] tracking-tight">
              Realza tu <span className="text-primary italic">belleza</span> natural con Azules Violeta
            </h1>

            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Únete a nuestra comunidad exclusiva, acumula puntos con cada compra y accede a tutoriales premium de maquillaje.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/login')}
                className="btn-primary group"
              >
                Comenzar ahora
                <ArrowRight className="inline ml-2 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => window.open('https://azulesvioleta.com/', '_blank')}
                className="btn-secondary"
              >
                Explorar Tienda
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-secondary overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-makeup-brown">+2,000 Chicas Violeta</p>
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Highlight or Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white active:scale-[0.98] transition-all">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Beauty Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-rose-50 flex items-center gap-4 max-w-[240px]"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <p className="font-black text-primary text-xl">500</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Puntos de Bienvenida</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Categories */}
      <section className="py-20 bg-secondary/30 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-makeup-brown mb-4 tracking-tighter">Tu Experiencia de Belleza</h2>
            <p className="text-gray-500">Todo lo que necesitas en un solo lugar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Comunidad', desc: 'Noticias y tutoriales exclusivos.', icon: Heart, grad: 'from-pink-100 to-rose-50' },
              { title: 'Premios', desc: 'Canjea tus puntos por productos.', icon: Sparkles, grad: 'from-violet-100 to-primary/5' },
              { title: 'Eventos', desc: 'Clases en vivo y lanzamientos.', icon: UserCircle, grad: 'from-accent/10 to-transparent' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${feature.grad} border border-white/50 shadow-xl shadow-rose-900/5`}
              >
                <feature.icon className="text-primary mb-6" size={40} />
                <h3 className="text-2xl font-bold text-makeup-brown mb-2">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LeadMagnet />

      <footer className="py-12 border-t border-rose-50 text-center text-gray-400 text-sm">
        <p>© 2026 Azules Violeta. Todos los derechos reservados.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">TikTok</a>
          <a href="#" className="hover:text-primary transition-colors">Soporte</a>
        </div>
      </footer>
    </div>
  );
}
