'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function Input({ className, type = 'text', error, ...props }) {
    return (
        <motion.input
            type={type}
            className={cn(
                'input',
                error && 'border-error focus-visible:ring-error',
                className
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            {...props}
        />
    );
}

export function Textarea({ className, error, ...props }) {
    return (
        <motion.textarea
            className={cn(
                'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-error focus-visible:ring-error',
                className
            )}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            {...props}
        />
    );
}

export function Label({ className, ...props }) {
    return (
        <label
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    );
}

export function FormField({ label, error, children, required }) {
    return (
        <div className="space-y-2">
            {label && (
                <Label>
                    {label}
                    {required && <span className="text-error ml-1">*</span>}
                </Label>
            )}
            {children}
            {error && (
                <motion.p
                    className="text-sm text-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
