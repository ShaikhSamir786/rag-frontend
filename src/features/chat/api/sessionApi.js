import { apiClient } from '@/lib/api/client/axios.client';

/**
 * Chat Session API
 * Handles chat session management
 */
export const sessionApi = {
    /**
     * Create a new chat session
     * POST /chat/sessions
     */
    create: async (title, metadata = {}) => {
        const response = await apiClient.post('/chat/api/sessions', {
            title,
            metadata,
        });
        return response.data;
    },

    /**
     * Get all user sessions
     * GET /chat/sessions
     */
    getAll: async (options = {}) => {
        const { limit = 20, skip = 0, includeInactive = false } = options;
        const response = await apiClient.get('/chat/api/sessions', {
            params: { limit, skip, includeInactive },
        });
        return response.data;
    },

    /**
     * Get a single session
     * GET /chat/api/sessions/:sessionId
     */
    getById: async (sessionId) => {
        const response = await apiClient.get(`/chat/api/sessions/${sessionId}`);
        return response.data;
    },

    /**
     * Update session (e.g., title)
     * PUT /chat/api/sessions/:sessionId
     */
    update: async (sessionId, data) => {
        const response = await apiClient.put(`/chat/api/sessions/${sessionId}`, data);
        return response.data;
    },

    /**
     * Archive session
     * POST /chat/api/sessions/:sessionId/archive
     */
    archive: async (sessionId) => {
        const response = await apiClient.post(`/chat/api/sessions/${sessionId}/archive`);
        return response.data;
    },

    /**
     * Delete session
     * DELETE /chat/api/sessions/:sessionId
     */
    delete: async (sessionId) => {
        await apiClient.delete(`/chat/api/sessions/${sessionId}`);
    },
};

