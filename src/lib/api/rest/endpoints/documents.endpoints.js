import { apiClient } from '../client/axios.client';

export const documentsEndpoints = {
    getAll: (params) => apiClient.get('/documents', { params }),
    getById: (id) => apiClient.get(`/documents/${id}`),
    upload: (data, config) => apiClient.post('/documents', data, config),
    delete: (id) => apiClient.delete(`/documents/${id}`),
};
