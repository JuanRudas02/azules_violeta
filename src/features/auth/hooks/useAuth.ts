"use client";

import { useState, useEffect } from 'react';
import { User, Role } from '@/core/entities/User';
import { fetchApi } from '@/shared/utils/api';
import { API_CONFIG } from '@/shared/config/api.config';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Inicializar desde localStorage al cargar
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                // Ignore parse errors
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password?: string) => {
        // Llamada a API de Railway
        const data = await fetchApi<{ token: string; user: any }>(API_CONFIG.ENDPOINTS.AUTH_LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        const { token, user: userData } = data;

        // Guarda el token para futuras peticiones
        localStorage.setItem('auth_token', token);

        // Mapear user. (El backend idealmente devuelve un rol)
        const role: Role = userData.role || (email === 'admin@azulesvioleta.com' ? 'admin' : 'user');

        const loggedUser: User = {
            id: userData.id || '1',
            name: userData.name || 'Usuario',
            email: userData.email || email,
            role,
            points: userData.points || 0, // Profile endpoint updates points later
        };

        setUser(loggedUser);
        localStorage.setItem('auth_user', JSON.stringify(loggedUser));
        document.cookie = `auth_role=${role}; path=/`;
        return role;
    };

    const register = async (name: string, email: string, password?: string, phone?: string) => {
        // Llamada a API de Railway
        const data = await fetchApi<{ token: string; user: any }>(API_CONFIG.ENDPOINTS.AUTH_REGISTER, {
            method: 'POST',
            body: JSON.stringify({ name, email, password, phone: phone || '' })
        });

        const { token, user: userData } = data;

        localStorage.setItem('auth_token', token);

        const role: Role = userData?.role || 'user';

        const newUser: User = {
            id: userData?.id || '1',
            name: userData?.name || name,
            email: userData?.email || email,
            role,
            points: userData?.points || 500, // Bono de bienvenida
        };

        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        document.cookie = `auth_role=${role}; path=/`;
        return role;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        document.cookie = "auth_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    };

    return { user, loading, login, register, logout, isAdmin: user?.role === 'admin' };
};
