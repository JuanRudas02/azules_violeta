"use client";

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Layout,
    Settings,
    UserCircle,
    LogOut,
    User as UserIcon,
    Ticket,
    Bell,
    Calendar,
    ShoppingBag,
    Menu,
    X,
    CreditCard,
    Crown
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface AppShellProps {
    children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
    const { user, logout, isAdmin } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const navItems = isAdmin ? [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Usuarios', icon: UserCircle, href: '/admin/users' },
        { label: 'Contenido', icon: Bell, href: '/admin/news' },
        { label: 'Sitio Web', icon: Layout, href: '/admin/cms' },
        { label: 'Facturas', icon: Ticket, href: '/admin/validate' },
        { label: 'Configuración', icon: Settings, href: '/admin/config' },
    ] : [
        { label: 'Inicio', icon: LayoutDashboard, href: '/user' },
        { label: 'Comunidad', icon: Bell, href: '/user/news' },
        { label: 'Promociones', icon: Ticket, href: '/user/points' },
        { label: 'Tienda', icon: ShoppingBag, href: 'https://azulesvioleta.com/', external: true },
        { label: 'Mis Puntos', icon: Crown, href: '/user/wallet' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Crown size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-primary">Azules Violeta</span>
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-0 z-40 bg-white md:relative md:flex md:w-64 flex-col p-6 border-r border-gray-100 transition-transform duration-300",
                isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="hidden md:flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Crown size={22} className="text-white" />
                    </div>
                    <span className="font-bold text-xl text-primary tracking-tight">Azules Violeta</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                if ('external' in item && item.external) {
                                    window.open(item.href, '_blank');
                                } else {
                                    router.push(item.href);
                                }
                                setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-500 hover:bg-violet-50 hover:text-primary transition-all font-medium group"
                        >
                            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-4 bg-secondary rounded-2xl mb-6">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-primary/10">
                            <UserIcon size={20} className="text-primary" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-primary truncate leading-none mb-1">{user?.name}</p>
                            <p className="text-[10px] text-gray-400 truncate tracking-wider uppercase font-bold">{user?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all font-semibold"
                    >
                        <LogOut size={20} />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full">
                {children}
            </main>
        </div>
    );
};
