import { apiClient } from '@/lib/api/client/axios.client';

/**
 * Chat API
 * Handles chat messages and streaming
 */
export const chatApi = {
    /**
     * Send a message (non-streaming)
     * POST /chat/chat
     */
    sendMessage: async (sessionId, message, model = 'gpt-4') => {
        const response = await apiClient.post('/chat/api/chat', {
            sessionId,
            message,
            model,
            stream: false,
        });
        return response.data;
    },

    /**
     * Send a message with streaming (SSE)
     * POST /chat/chat/stream
     * Returns an EventSource-like stream
     */
    sendMessageStream: async (sessionId, message, model = 'gpt-4', onChunk, onComplete, onError) => {
        const token = typeof window !== 'undefined' 
            ? localStorage.getItem('accessToken') 
            : null;

        if (!token) {
            throw new Error('No access token available');
        }

        const baseURL = apiClient.defaults.baseURL;
        const url = `${baseURL}/chat/api/chat/stream`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-tenant-id': typeof window !== 'undefined' 
                        ? localStorage.getItem('tenantId') || '' 
                        : '',
                },
                body: JSON.stringify({
                    sessionId,
                    message,
                    model,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    if (onComplete) onComplete();
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        
                        if (data === '[DONE]') {
                            if (onComplete) onComplete();
                            return;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            
                            if (parsed.type === 'chunk' && parsed.content) {
                                if (onChunk) onChunk(parsed.content);
                            } else if (parsed.type === 'complete') {
                                if (onComplete) onComplete(parsed.data);
                            } else if (parsed.type === 'error') {
                                if (onError) onError(parsed.error);
                            }
                        } catch (e) {
                            console.warn('Failed to parse SSE chunk:', e);
                        }
                    }
                }
            }
        } catch (error) {
            if (onError) onError(error);
            throw error;
        }
    },

    /**
     * Regenerate last response
     * POST /chat/chat/regenerate
     */
    regenerate: async (sessionId, messageId, model = 'gpt-4') => {
        const response = await apiClient.post('/chat/api/chat/regenerate', {
            sessionId,
            messageId,
            model,
        });
        return response.data;
    },

    /**
     * Get messages for a session
     * GET /chat/api/sessions/:sessionId/messages
     */
    getMessages: async (sessionId, options = {}) => {
        const { limit = 50, skip = 0 } = options;
        const response = await apiClient.get(`/chat/api/sessions/${sessionId}/messages`, {
            params: { limit, skip },
        });
        return response.data;
    },

    /**
     * Get a single message
     * GET /chat/api/messages/:messageId
     */
    getMessage: async (messageId) => {
        const response = await apiClient.get(`/chat/api/messages/${messageId}`);
        return response.data;
    },

    /**
     * Add feedback to a message
     * POST /chat/api/messages/:messageId/feedback
     */
    addFeedback: async (messageId, rating, comment = '') => {
        const response = await apiClient.post(`/chat/api/messages/${messageId}/feedback`, {
            rating,
            comment,
        });
        return response.data;
    },

    /**
     * Delete a message
     * DELETE /chat/api/messages/:messageId
     */
    deleteMessage: async (messageId) => {
        await apiClient.delete(`/chat/api/messages/${messageId}`);
    },

    /**
     * Get conversation history
     * GET /chat/api/sessions/:sessionId/history
     */
    getHistory: async (sessionId, options = {}) => {
        const { limit = 50, skip = 0 } = options;
        const response = await apiClient.get(`/chat/api/sessions/${sessionId}/history`, {
            params: { limit, skip },
        });
        return response.data;
    },

    /**
     * Export conversation history
     * GET /chat/api/sessions/:sessionId/history/export
     */
    exportHistory: async (sessionId) => {
        const response = await apiClient.get(`/chat/api/sessions/${sessionId}/history/export`);
        return response.data;
    },

    /**
     * Clear conversation history
     * DELETE /chat/api/sessions/:sessionId/history
     */
    clearHistory: async (sessionId) => {
        await apiClient.delete(`/chat/api/sessions/${sessionId}/history`);
    },
};
