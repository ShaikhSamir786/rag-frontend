'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
];

export function DocumentFilters({ filters = {}, onFilterChange }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearchChange = (value) => {
        setSearch(value);
        onFilterChange?.({ ...filters, search: value });
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        onFilterChange?.({ ...filters, status: value || undefined });
    };

    const handleClear = () => {
        setSearch('');
        setStatus('');
        onFilterChange?.({});
    };

    const hasFilters = search || status;

    return (
        <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search documents..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {hasFilters && (
                <Button variant="outline" size="sm" onClick={handleClear}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                </Button>
            )}
        </div>
    );
}

