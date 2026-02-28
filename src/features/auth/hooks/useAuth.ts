"use client";

import { useState, useEffect } from 'react';
import { User, Role } from '@/core/entities/User';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulando persistencia simple
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (role: Role) => {
        const mockUser: User = {
            id: '1',
            name: role === 'admin' ? 'Administradora Violeta' : 'Cliente Especial',
            email: role === 'admin' ? 'admin@azulesvioleta.com' : 'usuario@cliente.com',
            role,
            points: role === 'admin' ? 0 : 500,
        };
        setUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        document.cookie = `auth_role=${role}; path=/`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
        document.cookie = "auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    };

    return { user, loading, login, logout, isAdmin: user?.role === 'admin' };
};
