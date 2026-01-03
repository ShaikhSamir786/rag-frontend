'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TenantProvider } from '@/lib/tenant/TenantContext';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { store } from '@/store';
import { apolloClient } from '@/lib/api/graphql/client/apollo.client';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
        },
    },
});

export function Providers({ children }) {
    return (
        <ErrorBoundary>
            <ReduxProvider store={store}>
                <ApolloProvider client={apolloClient}>
                    <QueryClientProvider client={queryClient}>
                        <TenantProvider>
                            <ThemeProvider>
                                {children}
                                <Toaster />
                            </ThemeProvider>
                        </TenantProvider>
                    </QueryClientProvider>
                </ApolloProvider>
            </ReduxProvider>
        </ErrorBoundary>
    );
}
