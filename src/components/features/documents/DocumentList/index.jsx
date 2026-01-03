'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DocumentCard } from '@/components/features/documents/DocumentCard';
import { documentsApi } from '@/features/documents/api/documentsApi';
import {
    setDocuments,
    removeDocument,
    setLoading,
    setPagination,
} from '@/features/documents/store/documentsSlice';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { Pagination } from '@/components/common/Pagination';

export function DocumentList({ filters = {} }) {
    const dispatch = useDispatch();
    const { documents, pagination, isLoading } = useSelector((state) => state.documents);
    const [pollingInterval, setPollingInterval] = useState(null);

    useEffect(() => {
        loadDocuments();
    }, [filters, pagination.page]);

    useEffect(() => {
        // Poll for status updates on processing documents
        const processingDocs = documents.filter((d) => d.status === 'processing' || d.status === 'pending');
        
        if (processingDocs.length > 0) {
            const interval = setInterval(() => {
                processingDocs.forEach(async (doc) => {
                    try {
                        const status = await documentsApi.getStatus(doc.id);
                        if (status.status !== doc.status) {
                            // Status changed, reload documents
                            loadDocuments();
                        }
                    } catch (error) {
                        console.error('Failed to poll status:', error);
                    }
                });
            }, 3000); // Poll every 3 seconds

            setPollingInterval(interval);
            return () => clearInterval(interval);
        }
    }, [documents]);

    const loadDocuments = async () => {
        try {
            dispatch(setLoading(true));
            const response = await documentsApi.getAll({
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            });
            dispatch(setDocuments(response.documents || []));
            if (response.pagination) {
                dispatch(setPagination(response.pagination));
            }
        } catch (error) {
            console.error('Failed to load documents:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDelete = async (documentId) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            await documentsApi.delete(documentId);
            dispatch(removeDocument(documentId));
        } catch (error) {
            console.error('Failed to delete document:', error);
        }
    };

    const handlePageChange = (page) => {
        dispatch(setPagination({ ...pagination, page }));
    };

    if (isLoading && documents.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <EmptyState
                icon="file"
                title="No documents"
                description="Upload your first document to get started"
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Documents ({pagination.total || documents.length})
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={loadDocuments}
                    disabled={isLoading}
                >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            <div className="grid gap-4">
                {documents.map((document) => (
                    <DocumentCard
                        key={document.id}
                        document={document}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {pagination.totalPages > 1 && (
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

