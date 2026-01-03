import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    documents: [],
    selectedDocument: null,
    filters: {},
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
    isLoading: false,
    uploadProgress: {}, // { documentId: progressPercentage }
    uploading: false,
    statistics: null,
};

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        setDocuments: (state, action) => {
            state.documents = action.payload;
        },
        addDocument: (state, action) => {
            state.documents.unshift(action.payload);
        },
        updateDocument: (state, action) => {
            const index = state.documents.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.documents[index] = action.payload;
            }
        },
        removeDocument: (state, action) => {
            state.documents = state.documents.filter(d => d.id !== action.payload);
        },
        setSelectedDocument: (state, action) => {
            state.selectedDocument = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUploadProgress: (state, action) => {
            const { documentId, progress } = action.payload;
            state.uploadProgress[documentId] = progress;
        },
        setUploading: (state, action) => {
            state.uploading = action.payload;
        },
        clearUploadProgress: (state, action) => {
            const documentId = action.payload;
            delete state.uploadProgress[documentId];
        },
        setStatistics: (state, action) => {
            state.statistics = action.payload;
        },
    },
});

export const {
    setDocuments,
    addDocument,
    updateDocument,
    removeDocument,
    setSelectedDocument,
    setFilters,
    setPagination,
    setLoading,
    setUploadProgress,
    setUploading,
    clearUploadProgress,
    setStatistics,
} = documentsSlice.actions;

export default documentsSlice.reducer;
