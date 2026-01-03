'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { cva } from 'class-variance-authority';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export function Button({
    className,
    variant,
    size,
    isLoading,
    children,
    onClick,
    ...props
}) {
    const buttonRef = useRef(null);

    const handleMouseEnter = () => {
        if (!props.disabled && !isLoading) {
            gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2, ease: 'power1.out' });
        }
    };

    const handleMouseLeave = () => {
        if (!props.disabled && !isLoading) {
            gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: 'power1.out' });
        }
    };

    const handleMouseDown = () => {
        if (!props.disabled && !isLoading) {
            gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, ease: 'power1.out' });
        }
    };

    const handleMouseUp = () => {
        if (!props.disabled && !isLoading) {
            gsap.to(buttonRef.current, { scale: 1.05, duration: 0.1, ease: 'power1.out' });
        }
    };

    return (
        <button
            ref={buttonRef}
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={isLoading || props.disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={onClick}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
}
