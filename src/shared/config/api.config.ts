export const API_CONFIG = {
    // Esta URL se configurará en Vercel apuntando a Railway/Render
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    ENDPOINTS: {
        AUTH: '/auth',
        POINTS: '/points/validate-invoice',
        NEWS: '/content/news',
        EVENTS: '/events',
    }
};
