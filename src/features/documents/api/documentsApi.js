import { apiClient } from '@/lib/api/client/axios.client';

/**
 * Documents API
 * Handles document upload, management, and processing
 */
export const documentsApi = {
    /**
     * Get all documents with pagination and filters
     * GET /documents?page=1&limit=20&status=processing&orderBy=createdAt&order=DESC
     */
    getAll: async (params = {}) => {
        const {
            page = 1,
            limit = 20,
            status,
            orderBy = 'createdAt',
            order = 'DESC',
        } = params;

        const response = await apiClient.get('/documents', {
            params: {
                page,
                limit,
                status,
                orderBy,
                order,
            },
        });
        return {
            documents: response.data,
            pagination: response.pagination,
        };
    },

    /**
     * Get document by ID
     * GET /documents/:id
     */
    getById: async (id) => {
        const response = await apiClient.get(`/documents/${id}`);
        return response.data;
    },

    /**
     * Upload single document
     * POST /documents
     */
    upload: async (file, sessionId = null, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);
        if (sessionId) {
            formData.append('sessionId', sessionId);
        }

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

    /**
     * Upload multiple documents (max 5)
     * POST /documents/batch
     */
    uploadBatch: async (files, sessionId = null, onProgress) => {
        if (files.length > 5) {
            throw new Error('Maximum 5 files allowed per batch upload');
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        if (sessionId) {
            formData.append('sessionId', sessionId);
        }

        const response = await apiClient.post(
            '/documents/batch',
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

    /**
     * Delete document
     * DELETE /documents/:id
     */
    delete: async (id) => {
        await apiClient.delete(`/documents/${id}`);
    },

    /**
     * Get document status
     * GET /documents/:id/status
     */
    getStatus: async (id) => {
        const response = await apiClient.get(`/documents/${id}/status`);
        return response.data;
    },

    /**
     * Get document chunks
     * GET /documents/:id/chunks
     */
    getChunks: async (id) => {
        const response = await apiClient.get(`/documents/${id}/chunks`);
        return response.data;
    },

    /**
     * Get document statistics
     * GET /documents/statistics/overview
     */
    getStatistics: async () => {
        const response = await apiClient.get('/documents/statistics/overview');
        return response.data;
    },
};
