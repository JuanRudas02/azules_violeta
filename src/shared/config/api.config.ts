export const API_CONFIG = {
    // URL principal del Backend API (Prisma/PostgreSQL + Railway)
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://azulesvioleta-back-production.up.railway.app/api',
    ENDPOINTS: {
        AUTH_REGISTER: '/auth/register',
        AUTH_LOGIN: '/auth/login',
        USER_PROFILE: '/users/profile',
        USER_TRANSACTIONS: '/users/transactions',
        INVOICES: '/invoices',
        ADMIN_INVOICES_PENDING: '/invoices/pending',
        ADMIN_INVOICES_APPROVE: (id: string) => `/invoices/${id}/approve`,
        ADMIN_INVOICES_REJECT: (id: string) => `/invoices/${id}/reject`,
        ADMIN_USERS: '/admin/users',
        ADMIN_ADJUST_POINTS: (id: string) => `/admin/users/${id}/adjust-points`,
        CMS_PUBLIC: '/cms/public',
    }
};
