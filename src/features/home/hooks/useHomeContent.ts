"use client";

import { useState, useEffect } from 'react';
import { HomeContent, HomeFeature } from '@/core/entities/HomeContent';

const DEFAULT_CONTENT: HomeContent = {
    hero: {
        title: 'Realza tu belleza natural con Azules Violeta',
        subtitle: 'Únete a nuestra comunidad exclusiva, acumula puntos con cada compra y accede a tutoriales premium de maquillaje.',
        badge: 'Nueva Colección de Maquillaje',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    features: [
        { id: '1', title: 'Comunidad', description: 'Noticias y tutoriales exclusivos.', icon: 'Heart', gradient: 'from-pink-100 to-rose-50' },
        { id: '2', title: 'Premios', description: 'Canjea tus puntos por productos.', icon: 'Sparkles', gradient: 'from-violet-100 to-primary/5' },
        { id: '3', title: 'Eventos', description: 'Clases en vivo y lanzamientos.', icon: 'UserCircle', gradient: 'from-accent/10 to-transparent' },
    ]
};

export const useHomeContent = () => {
    const [content, setContent] = useState<HomeContent>(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('violeta_home_content');
        if (saved) {
            setContent(JSON.parse(saved));
        }
        setLoading(false);
    }, []);

    const updateHero = (hero: HomeContent['hero']) => {
        const updated = { ...content, hero };
        setContent(updated);
        localStorage.setItem('violeta_home_content', JSON.stringify(updated));
        // Here we would call API_CONFIG.BASE_URL + '/cms/hero'
    };

    const updateFeature = (featureId: string, updatedFeature: Partial<HomeFeature>) => {
        const updatedFeatures = content.features.map(f => f.id === featureId ? { ...f, ...updatedFeature } : f);
        const updated = { ...content, features: updatedFeatures };
        setContent(updated);
        localStorage.setItem('violeta_home_content', JSON.stringify(updated));
        // Here we would call API_CONFIG.BASE_URL + '/cms/features/' + featureId
    };

    const addFeature = (feature: Omit<HomeFeature, 'id'>) => {
        const newFeature: HomeFeature = { ...feature, id: Date.now().toString() };
        const updated = { ...content, features: [...content.features, newFeature] };
        setContent(updated);
        localStorage.setItem('violeta_home_content', JSON.stringify(updated));
    };

    const removeFeature = (id: string) => {
        const updated = { ...content, features: content.features.filter(f => f.id !== id) };
        setContent(updated);
        localStorage.setItem('violeta_home_content', JSON.stringify(updated));
    };

    return { content, loading, updateHero, updateFeature, addFeature, removeFeature };
};
