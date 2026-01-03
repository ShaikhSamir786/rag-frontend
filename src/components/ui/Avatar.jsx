'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function Avatar({ src, alt, fallback, size = 'default', className, status }) {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
    };

    const statusColors = {
        online: 'bg-success-500',
        offline: 'bg-muted',
        busy: 'bg-error-500',
        away: 'bg-warning-500',
    };

    return (
        <div className="relative inline-block">
            <motion.div
                className={cn(
                    'relative flex items-center justify-center rounded-full bg-muted overflow-hidden',
                    sizes[size],
                    className
                )}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {src ? (
                    <img src={src} alt={alt} className="h-full w-full object-cover" />
                ) : (
                    <span className="font-medium text-muted-foreground">
                        {fallback || alt?.charAt(0).toUpperCase() || '?'}
                    </span>
                )}
            </motion.div>

            {status && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background',
                        statusColors[status]
                    )}
                />
            )}
        </div>
    );
}

export function AvatarGroup({ children, max = 3, className }) {
    const childrenArray = React.Children.toArray(children);
    const displayedChildren = childrenArray.slice(0, max);
    const remaining = childrenArray.length - max;

    return (
        <div className={cn('flex -space-x-2', className)}>
            {displayedChildren}
            {remaining > 0 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    +{remaining}
                </div>
            )}
        </div>
    );
}
