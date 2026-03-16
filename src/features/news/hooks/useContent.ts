"use client";

import { useState, useEffect, useCallback } from 'react';

export interface Post {
    id: string;
    type: 'NEWS' | 'PROMOTION';
    title: string;
    content: string;
    imageUrl?: string;
    metadata?: string;
    createdAt: string;
}

export const useContent = (type?: 'NEWS' | 'PROMOTION') => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            const url = type ? `/api/content?type=${type}` : '/api/content';
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const addPost = async (post: { type: 'NEWS' | 'PROMOTION', title: string, content: string, imageUrl?: string }) => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(post)
            });
            if (res.ok) {
                await fetchPosts();
                return true;
            }
        } catch (error) {
            console.error('Error adding content:', error);
        }
        return false;
    };

    const reactToPost = async (id: string, action: 'like' | 'view') => {
        try {
            const res = await fetch(`/api/content/${id}/react`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });
            if (res.ok) {
                // Update local state for immediate feedback
                setPosts(prev => prev.map(p => {
                    if (p.id === id) {
                        const meta = JSON.parse(p.metadata || '{"likes":0,"views":0}');
                        if (action === 'like') meta.likes += 1;
                        if (action === 'view') meta.views += 1;
                        return { ...p, metadata: JSON.stringify(meta) };
                    }
                    return p;
                }));
            }
        } catch (error) {
            console.error('Error reacting to content:', error);
        }
    };

    return { posts, loading, fetchPosts, addPost, reactToPost };
};
