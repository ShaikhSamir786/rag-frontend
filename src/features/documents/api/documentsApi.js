import { apiClient } from '@/lib/api/client/axios.client';

export const documentsApi = {
    getAll: async (params) => {
        const response = await apiClient.get('/documents', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await apiClient.get(`/documents/${id}`);
        return response.data;
    },

    upload: async (file, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post(
            '/documents',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        onProgress(progress);
                    }
                },
            }
        );

        return response.data;
    },

    delete: async (id) => {
        await apiClient.delete(`/documents/${id}`);
    },

    updateStatus: async (id, status) => {
        const response = await apiClient.patch(`/documents/${id}`, {
            status,
        });
        return response.data;
    },
};
