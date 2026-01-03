import { getSession } from 'next-auth/react';

export const authInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Check for session (NextAuth) or LocalStorage
            // Adapting for standard JWT usage

            // Example: Try to get token from localStorage first (if manual auth)
            let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

            // If not found, try NextAuth session (if using server-side or next-auth provider)
            if (!token) {
                const session = await getSession();
                if (session?.accessToken) {
                    token = session.accessToken;
                }
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );
};
