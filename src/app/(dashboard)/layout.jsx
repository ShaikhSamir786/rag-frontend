'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DashboardLayout({ children }) {
    const sidebarRef = useRef(null);
    const headerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(sidebarRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(headerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.4'
            )
            .fromTo(contentRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            );
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <div ref={sidebarRef} className="opacity-0">
                <Sidebar className="w-64 border-r hidden md:block" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <div ref={headerRef} className="opacity-0">
                    <Header />
                </div>
                <main ref={contentRef} className="flex-1 overflow-auto opacity-0">
                    <div className="container py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
