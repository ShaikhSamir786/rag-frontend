import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const metadata = {
    title: 'Documents | RAG Platform',
};

// Components stubs
const DocumentFilters = ({ initialStatus, initialSearch }) => <div>Filters</div>;
const DocumentList = ({ page, status, search }) => <div>Document List</div>;

export default function DocumentsPage({ searchParams }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Documents</h1>
                    <p className="text-gray-600 mt-1">
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
            <DocumentFilters />

            {/* Document List */}
            <Suspense fallback={<LoadingSpinner />}>
                <DocumentList />
            </Suspense>
        </div>
    );
}
