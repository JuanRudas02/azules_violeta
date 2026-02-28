import { API_CONFIG } from '../config/api.config';

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const fetchApi = async <T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    let token = null;

    if (typeof window !== 'undefined') {
        token = localStorage.getItem('auth_token');
    }

    const headers: Record<string, string> = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Include Content-Type only if it's not a FormData payload (e.g. uploading images)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Merge consumer headers
    const finalHeaders = {
        ...headers,
        ...(options.headers as Record<string, string> || {}),
    };

    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: finalHeaders,
        });

        // Verify HTTP errors
        if (!response.ok) {
            let errorMsg = `Error ${response.status}`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorData.error || errorMsg;
            } catch (jsonErr) {
                // Not JSON returned, fallback to status text
                errorMsg = response.statusText || errorMsg;
            }
            throw new ApiError(response.status, errorMsg);
        }

        // Try to read generic response text instead of directly converting to JSON.
        // If it's empty, avoid throwing an exception on JSON.parse.
        const resText = await response.text();
        if (!resText) {
            return {} as T;
        }

        return JSON.parse(resText) as T;

    } catch (error) {
        // If error is already ApiError just bubble it up
        if (error instanceof ApiError) {
            throw error;
        }

        throw new Error(error instanceof Error ? error.message : 'Error desconocido de red al conectarse a la API');
    }
};
