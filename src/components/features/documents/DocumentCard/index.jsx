import { FileText, MoreVertical, Trash2, Calendar, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DocumentCard({ document, onDelete }) {
    const { id, title, status, createdAt, type } = document;

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-500 bg-green-50';
            case 'processing': return 'text-blue-500 bg-blue-50';
            case 'error': return 'text-red-500 bg-red-50';
            default: return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(status)}`}>
                    <FileText className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {createdAt ? format(new Date(createdAt), 'MMM d, yyyy') : 'Unknown date'}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{type || 'document'}</span>
                        <span>•</span>
                        <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-secondary">
                            {status}
                        </span>
                    </div>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => onDelete(id)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
