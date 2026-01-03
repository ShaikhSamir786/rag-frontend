'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, MessageSquare, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const heroRef = useRef(null);
    const headlineRef = useRef(null);
    const subheadlineRef = useRef(null);
    const ctaRef = useRef(null);
    const featuresRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                headlineRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
            )
                .fromTo(
                    subheadlineRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    '-=0.8'
                )
                .fromTo(
                    ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    '-=0.6'
                );

            // Features Scroll Animation
            gsap.fromTo(
                '.feature-card',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: featuresRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

                <h1 ref={headlineRef} className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                    Enterprise <br className="hidden md:block" /> Intelligence.
                </h1>

                <p ref={subheadlineRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                    Unlock the power of your documents with AI-driven RAG technology.
                    Secure, scalable, and built for the future.
                </p>

                <div ref={ctaRef} className="flex gap-4">
                    <Link
                        href="/chat"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    </Link>

                    <Link
                        href="/documents"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-medium text-lg transition-all hover:bg-secondary/80"
                    >
                        Manage Docs
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-32 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-20">Why RAG Platform?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-10 h-10 text-yellow-500" />}
                        title="Lightning Fast"
                        description="Process and retrieve information from millions of documents in milliseconds."
                    />
                    <FeatureCard
                        icon={<FileText className="w-10 h-10 text-blue-500" />}
                        title="Smart Analysis"
                        description="Our AI understands context, structure, and intent within your proprietary data."
                    />
                    <FeatureCard
                        icon={<MessageSquare className="w-10 h-10 text-green-500" />}
                        title="Natural Chat"
                        description="Interact with your knowledge base as natural as speaking to a colleague."
                    />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="feature-card p-8 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-border/50 hover:bg-secondary/50 transition-colors">
            <div className="mb-6 p-4 inline-block bg-background rounded-2xl shadow-sm">{icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
