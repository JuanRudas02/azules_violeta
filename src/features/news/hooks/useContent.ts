"use client";

import { useState, useEffect } from 'react';

export interface Post {
    id: string;
    type: 'news' | 'promotion';
    title: string;
    content: string;
    image?: string;
    date: string;
    expiryDate?: string;
    discountCode?: string;
}

export const useContent = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('violeta_content');
        if (saved) {
            setPosts(JSON.parse(saved));
        } else {
            // Mock inicial
            const initial: Post[] = [
                {
                    id: '1',
                    type: 'news',
                    title: 'Nueva Colección Pantone',
                    content: 'Ya llegó la colección inspirada en los colores del año. Tonos maquillaje puros.',
                    date: '2026-02-28',
                    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&w=400&q=80'
                },
                {
                    id: '2',
                    type: 'promotion',
                    title: '20% OFF en Bases',
                    content: 'Usa este código en tu próxima compra de bases de maquillaje.',
                    date: '2026-02-28',
                    discountCode: 'VIOLETA20',
                    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=400&q=80'
                }
            ];
            setPosts(initial);
            localStorage.setItem('violeta_content', JSON.stringify(initial));
        }
    }, []);

    const addPost = (post: Omit<Post, 'id' | 'date'>) => {
        const newPost: Post = {
            ...post,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
        };
        const updated = [newPost, ...posts];
        setPosts(updated);
        localStorage.setItem('violeta_content', JSON.stringify(updated));
    };

    const deletePost = (id: string) => {
        const updated = posts.filter(p => p.id !== id);
        setPosts(updated);
        localStorage.setItem('violeta_content', JSON.stringify(updated));
    };

    return { posts, addPost, deletePost };
};
