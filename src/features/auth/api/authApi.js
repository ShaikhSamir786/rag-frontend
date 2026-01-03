import { apiClient } from '@/lib/api/client/axios.client';

/**
 * Authentication API service
 * Handles all authentication-related API calls
 */
export const authApi = {
    /**
     * Register a new user
     * POST /auth/register
     */
    register: async (data) => {
        const response = await apiClient.post('/auth/register', {
            email: data.email,
            password: data.password,
            name: data.name,
        });
        return response.data;
    },

    /**
     * Login user
     * POST /auth/login
     */
    login: async (email, password) => {
        const response = await apiClient.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    /**
     * Refresh access token
     * POST /auth/refresh
     */
    refresh: async (refreshToken) => {
        const response = await apiClient.post('/auth/refresh', {
            refreshToken,
        });
        return response.data;
    },

    /**
     * Logout user
     * POST /auth/logout
     */
    logout: async () => {
        await apiClient.post('/auth/logout');
    },

    /**
     * Verify email
     * POST /auth/verify-email
     */
    verifyEmail: async (token) => {
        const response = await apiClient.post('/auth/verify-email', {
            token,
        });
        return response.data;
    },

    /**
     * Resend verification email
     * POST /auth/resend-verification
     */
    resendVerification: async (email) => {
        const response = await apiClient.post('/auth/resend-verification', {
            email,
        });
        return response.data;
    },

    /**
     * Forgot password
     * POST /auth/forgot-password
     */
    forgotPassword: async (email) => {
        const response = await apiClient.post('/auth/forgot-password', {
            email,
        });
        return response.data;
    },

    /**
     * Reset password
     * POST /auth/reset-password
     */
    resetPassword: async (token, password) => {
        const response = await apiClient.post('/auth/reset-password', {
            token,
            password,
        });
        return response.data;
    },

    /**
     * Change password (protected)
     * POST /auth/change-password
     */
    changePassword: async (currentPassword, newPassword) => {
        const response = await apiClient.post('/auth/change-password', {
            currentPassword,
            newPassword,
        });
        return response.data;
    },

    /**
     * Get user sessions
     * GET /auth/sessions
     */
    getSessions: async () => {
        const response = await apiClient.get('/auth/sessions');
        return response.data;
    },

    /**
     * Revoke a session
     * DELETE /auth/sessions/:sessionId
     */
    revokeSession: async (sessionId) => {
        await apiClient.delete(`/auth/sessions/${sessionId}`);
    },

    /**
     * Revoke all sessions
     * DELETE /auth/sessions
     */
    revokeAllSessions: async () => {
        await apiClient.delete('/auth/sessions');
    },

    /**
     * Initiate OAuth login
     * Redirects to provider
     */
    oauthLogin: (provider) => {
        if (typeof window !== 'undefined') {
            window.location.href = `${apiClient.defaults.baseURL}/auth/${provider}`;
        }
    },
};

