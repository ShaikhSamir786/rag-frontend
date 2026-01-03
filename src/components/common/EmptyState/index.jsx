import { File, Search, Inbox } from 'lucide-react';

const icons = {
    file: File,
    search: Search,
    inbox: Inbox,
    default: Inbox
};

export function EmptyState({ icon, title, description, action }) {
    const Icon = icons[icon] || icons.default;

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10 border-dashed">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-muted">
                <Icon className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    {description}
                </p>
            )}
            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}
