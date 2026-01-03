'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScroller({ children }) {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
}
