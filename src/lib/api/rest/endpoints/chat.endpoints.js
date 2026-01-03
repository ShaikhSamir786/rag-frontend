import { apiClient } from '../client/axios.client';

export const chatEndpoints = {
    getSessions: () => apiClient.get('/chat/sessions'),
    getSession: (id) => apiClient.get(`/chat/sessions/${id}`),
    sendMessage: (sessionId, message) => apiClient.post(`/chat/sessions/${sessionId}/messages`, { message }),
};
