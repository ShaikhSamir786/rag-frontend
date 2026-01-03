'use client';

import { useEffect } from 'react';
import { useTenant } from '@/lib/tenant/TenantContext';
import { getThemeForTenant } from './tenantThemes';

export function ThemeProvider({ children }) {
    const { tenant } = useTenant();

    useEffect(() => {
        if (tenant) {
            const theme = getThemeForTenant(tenant.id);

            if (theme) {
                // Apply CSS variables
                const root = document.documentElement;
                root.style.setProperty('--color-primary', theme.colors.primary);
                root.style.setProperty('--color-secondary', theme.colors.secondary);
                root.style.setProperty('--color-accent', theme.colors.accent);
                root.style.setProperty('--color-background', theme.colors.background);
                root.style.setProperty('--color-foreground', theme.colors.foreground);

                // Update favicon
                const favicon = document.querySelector("link[rel*='icon']");
                if (favicon) {
                    favicon.href = theme.favicon;
                }

                // Update page title
                document.title = `${theme.name} | RAG Platform`;
            }
        }
    }, [tenant]);

    return <>{children}</>;
}
