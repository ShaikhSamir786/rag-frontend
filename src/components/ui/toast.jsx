'use client';

import * as React from 'react';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';

export function Toaster() {
    return (
        <ToastProvider>
            {/* Toast implementation would go here */}
            <ToastViewport />
        </ToastProvider>
    );
}

// Minimal export to satisfy imports
export const toast = (props) => {
    console.log('Toast:', props);
};
