'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, MessageSquare, Zap, Shield, TrendingUp, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 -z-10 animated-gradient opacity-30" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/20 via-background to-background" />

                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium"
                    >
                        <Zap className="h-4 w-4" />
                        AI-Powered Document Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
                    >
                        Enterprise RAG
                        <br />
                        Platform
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Transform your documents into intelligent conversations. Upload PDFs, get instant insights, and chat with your data using advanced RAG technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/register">
                            <Button variant="gradient" size="xl" className="group">
                                Get Started Free
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="xl">
                                Sign In
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
                    >
                        <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success-500" />
                            No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-success-500" />
                            Free tier available
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose RAG Platform?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Built for enterprises, designed for simplicity
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Zap className="w-10 h-10 text-yellow-500" />}
                        title="Lightning Fast"
                        description="Process and retrieve information from millions of documents in milliseconds with our optimized vector search."
                        delay={0}
                    />
                    <FeatureCard
                        icon={<FileText className="w-10 h-10 text-blue-500" />}
                        title="Smart Analysis"
                        description="Our AI understands context, structure, and intent within your proprietary data for accurate responses."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<MessageSquare className="w-10 h-10 text-green-500" />}
                        title="Natural Chat"
                        description="Interact with your knowledge base as naturally as speaking to a colleague. Get instant, contextual answers."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Shield className="w-10 h-10 text-purple-500" />}
                        title="Enterprise Security"
                        description="Bank-grade encryption, role-based access control, and compliance with SOC 2, GDPR, and HIPAA."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-10 h-10 text-pink-500" />}
                        title="Analytics Dashboard"
                        description="Track usage, monitor performance, and gain insights into how your team interacts with documents."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={<Users className="w-10 h-10 text-cyan-500" />}
                        title="Team Collaboration"
                        description="Share documents, chat sessions, and insights across your organization with granular permissions."
                        delay={0.5}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <Card className="glass-card bg-gradient-brand/10 border-brand-500/20 text-center p-12">
                        <CardHeader>
                            <CardTitle className="text-4xl md:text-5xl font-bold mb-4">
                                Ready to Transform Your Documents?
                            </CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">
                                Join thousands of teams already using RAG Platform to unlock the power of their data
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <Link href="/register">
                                <Button variant="gradient" size="xl" className="group">
                                    Start Free Trial
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <Card hover className="h-full">
                <CardContent className="p-8">
                    <div className="mb-6 p-4 inline-block bg-secondary rounded-2xl shadow-sm">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
