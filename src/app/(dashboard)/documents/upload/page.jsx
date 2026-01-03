'use client';

import { useRouter } from 'next/navigation';
import { DocumentUploader } from '@/components/features/documents/DocumentUploader';
import { toast } from 'react-hot-toast';

export default function UploadDocumentPage() {
    const router = useRouter();

    const handleUploadComplete = (result) => {
        toast.success('Document uploaded successfully');
        setTimeout(() => {
            router.push('/documents');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Upload Document</h1>
                <p className="text-muted-foreground mt-1">
                    Upload PDF, DOC, DOCX, or TXT files to process and index
                </p>
            </div>

            <DocumentUploader onUploadComplete={handleUploadComplete} />
        </div>
    );
}
