import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>

            <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
        </div>
    );
}
