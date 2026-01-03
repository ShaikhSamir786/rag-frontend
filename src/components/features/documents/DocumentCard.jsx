'use client';

import { FileText, CheckCircle, XCircle, Loader2, Clock, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const statusConfig = {
    pending: {
        icon: Clock,
        label: 'Pending',
        color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    },
    processing: {
        icon: Loader2,
        label: 'Processing',
        color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    completed: {
        icon: CheckCircle,
        label: 'Completed',
        color: 'bg-green-500/10 text-green-600 border-green-500/20',
    },
    failed: {
        icon: XCircle,
        label: 'Failed',
        color: 'bg-red-500/10 text-red-600 border-red-500/20',
    },
};

export function DocumentCard({ document, onDelete }) {
    const config = statusConfig[document.status] || statusConfig.pending;
    const StatusIcon = config.icon;
    const isProcessing = document.status === 'processing';

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate mb-1">{document.filename}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={config.color}>
                                <StatusIcon
                                    className={`h-3 w-3 mr-1 ${isProcessing ? 'animate-spin' : ''}`}
                                />
                                {config.label}
                            </Badge>
                            {document.size && (
                                <span className="text-xs text-muted-foreground">
                                    {formatFileSize(document.size)}
                                </span>
                            )}
                            {document.chunkCount && (
                                <span className="text-xs text-muted-foreground">
                                    {document.chunkCount} chunks
                                </span>
                            )}
                        </div>
                        {document.createdAt && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Uploaded {new Date(document.createdAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {document.status === 'completed' && (
                        <Link href={`/documents/${document.id}`}>
                            <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete?.(document.id)}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

