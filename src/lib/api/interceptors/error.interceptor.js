import { parseError } from '@/lib/utils/errorHandler';
import axios from 'axios';
import { API_CONFIG } from '@/config/api.config';
import toast from 'react-hot-toast';

let refreshTokenPromise = null;

export const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            // Backend wraps responses in { success: true, data: {...} }
            // Extract data if present, otherwise return response as-is
            if (response.data && typeof response.data === 'object' && 'success' in response.data) {
                if (response.data.success) {
                    // Return data directly for easier access
                    return {
                        ...response,
                        data: response.data.data || response.data,
                        pagination: response.data.pagination,
                    };
                } else {
                    // Backend returned success: false
                    const error = parseError({
                        response: {
                            status: response.status,
                            data: response.data,
                        },
                    });
                    return Promise.reject(error);
                }
            }
            return response;
        },
        async (error) => {
            const apiError = parseError(error);

            // Handle specific status codes
            if (apiError.status === 401) {
                // Token expired - try to refresh
                const refreshToken = typeof window !== 'undefined' 
                    ? localStorage.getItem('refreshToken') 
                    : null;

                if (refreshToken && !error.config._retry) {
                    error.config._retry = true;

                    // Prevent multiple simultaneous refresh requests
                    if (!refreshTokenPromise) {
                        refreshTokenPromise = (async () => {
                            try {
                                const refreshClient = axios.create({
                                    baseURL: API_CONFIG.BASE_URL,
                                    timeout: API_CONFIG.TIMEOUT,
                                });

                                const response = await refreshClient.post('/auth/refresh', {
                                    refreshToken,
                                });

                                if (response.data?.data?.accessToken) {
                                    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
                                    
                                    if (typeof window !== 'undefined') {
                                        localStorage.setItem('accessToken', accessToken);
                                        if (newRefreshToken) {
                                            localStorage.setItem('refreshToken', newRefreshToken);
                                        }
                                    }

                                    return { accessToken };
                                }
                                throw new Error('Invalid refresh response');
                            } catch (refreshError) {
                                // Refresh failed - logout user
                                if (typeof window !== 'undefined') {
                                    localStorage.removeItem('accessToken');
                                    localStorage.removeItem('refreshToken');
                                    localStorage.removeItem('user');
                                    
                                    // Redirect to login
                                    if (window.location.pathname !== '/login') {
                                        window.location.href = '/login';
                                    }
                                }
                                toast.error('Session expired. Please log in again.');
                                throw refreshError;
                            } finally {
                                refreshTokenPromise = null;
                            }
                        })();
                    }

                    try {
                        const { accessToken } = await refreshTokenPromise;
                        // Retry original request with new token
                        error.config.headers.Authorization = `Bearer ${accessToken}`;
                        return axiosInstance(error.config);
                    } catch (refreshError) {
                        return Promise.reject(parseError(refreshError));
                    }
                } else {
                    // No refresh token or already retried - logout
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('user');
                        
                        if (window.location.pathname !== '/login') {
                            window.location.href = '/login';
                        }
                    }
                    toast.error('Please log in to continue.');
                }
            } else if (apiError.status === 403) {
                toast.error('Access denied. You do not have permission.');
            } else if (apiError.status === 404) {
                // Don't show toast for 404s - let components handle it
            } else if (apiError.status === 422) {
                // Validation errors - let forms handle field-level errors
            } else if (apiError.status === 429) {
                toast.error('Too many requests. Please wait a moment.');
            } else if (apiError.status >= 500) {
                toast.error('Server error. Please try again later.');
            } else if (apiError.status === 0) {
                toast.error('Connection failed. Please check your internet connection.');
            }

            console.error('API Error:', apiError);
            return Promise.reject(apiError);
        }
    );
};
