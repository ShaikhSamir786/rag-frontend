'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

const badgeVariants = {
    variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-success-500 text-white',
        warning: 'bg-warning-500 text-white',
        error: 'bg-error-500 text-white',
        info: 'bg-info-500 text-white',
        outline: 'border border-input bg-background',
        glass: 'glass-card',
    },
    size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
    },
};

export function Badge({
    children,
    variant = 'default',
    size = 'default',
    className,
    animate = true,
    ...props
}) {
    const Component = animate ? motion.span : 'span';
    const animationProps = animate ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.2 },
    } : {};

    return (
        <Component
            className={cn(
                'inline-flex items-center rounded-full font-medium transition-colors',
                badgeVariants.variant[variant],
                badgeVariants.size[size],
                className
            )}
            {...animationProps}
            {...props}
        >
            {children}
        </Component>
    );
}

export function StatusBadge({ status, ...props }) {
    const statusConfig = {
        processing: { variant: 'info', label: 'Processing' },
        ready: { variant: 'success', label: 'Ready' },
        failed: { variant: 'error', label: 'Failed' },
        pending: { variant: 'warning', label: 'Pending' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <Badge variant={config.variant} {...props}>
            {config.label}
        </Badge>
    );
}
