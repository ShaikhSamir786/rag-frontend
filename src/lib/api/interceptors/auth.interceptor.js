import { getSession } from 'next-auth/react';

export const authInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Get token from localStorage (primary method)
            let token = typeof window !== 'undefined' 
                ? localStorage.getItem('accessToken') 
                : null;

            // Fallback to NextAuth session if available
            if (!token && typeof window !== 'undefined') {
                try {
                    const session = await getSession();
                    if (session?.accessToken) {
                        token = session.accessToken;
                    }
                } catch (error) {
                    // getSession might fail in some contexts, ignore
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
