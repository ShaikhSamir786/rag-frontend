'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { DocumentList } from '@/components/features/documents/DocumentList';
import { DocumentFilters } from '@/components/features/documents/DocumentFilters';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/features/documents/store/documentsSlice';

export default function DocumentsPage() {
    const dispatch = useDispatch();
    const [filters, setFiltersState] = useState({});

    const handleFilterChange = (newFilters) => {
        setFiltersState(newFilters);
        dispatch(setFilters(newFilters));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Documents</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and analyze your documents
                    </p>
                </div>
                <Link href="/documents/upload">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <DocumentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            {/* Document List */}
            <DocumentList filters={filters} />
        </div>
    );
}
