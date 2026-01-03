'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function Card({ className, children, hover = false, glass = false, ...props }) {
    const baseClasses = 'rounded-2xl border bg-card text-card-foreground shadow-sm';
    const glassClasses = glass ? 'glass-card' : '';
    const hoverClasses = hover ? 'card-hover cursor-pointer' : '';

    return (
        <motion.div
            className={cn(baseClasses, glassClasses, hoverClasses, className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hover ? { y: -4 } : {}}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }) {
    return (
        <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ className, children, ...props }) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    );
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }) {
    return (
        <div className={cn('flex items-center p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
}
