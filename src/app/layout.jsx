import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { SmoothScroller } from '@/components/common/SmoothScroller';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'RAG Platform - Enterprise Document Intelligence',
    description: 'AI-powered document analysis and intelligent search',
    keywords: ['RAG', 'AI', 'Documents', 'Search'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <SmoothScroller>
                    <Providers>{children}</Providers>
                </SmoothScroller>
            </body>
        </html>
    );
}
