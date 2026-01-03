'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { toast } from '@/components/ui/toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Simulate email not found error
            if (Math.random() > 0.8) {
                throw new Error('No account found with this email address');
            }

            setIsSubmitted(true);
            setResendTimer(60); // 60 second cooldown
            toast.success('Password reset link sent!');

            // Start countdown timer
            const interval = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setError(err.message || 'Failed to send reset link. Please try again.');
            toast.error('Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = () => {
        if (resendTimer > 0) return;
        const email = getValues('email');
        onSubmit({ email });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animated-gradient">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card glass className="backdrop-blur-xl bg-white/10">
                    <CardHeader className="text-center">
                        {!isSubmitted ? (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow"
                                >
                                    <Mail className="h-8 w-8 text-white" />
                                </motion.div>
                                <CardTitle className="text-3xl font-bold text-white">Forgot Password?</CardTitle>
                                <CardDescription className="text-white/70">
                                    No worries, we'll send you reset instructions
                                </CardDescription>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-success-500 flex items-center justify-center shadow-glow"
                                >
                                    <Check className="h-8 w-8 text-white" />
                                </motion.div>
                                <CardTitle className="text-3xl font-bold text-white">Check Your Email</CardTitle>
                                <CardDescription className="text-white/70">
                                    We've sent a password reset link to <strong className="text-white">{getValues('email')}</strong>
                                </CardDescription>
                            </>
                        )}
                    </CardHeader>

                    <CardContent>
                        {!isSubmitted ? (
                            <>
                                {error && (
                                    <Alert variant="destructive" className="mb-4 bg-error-500/10 border-error-500/50">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className="text-white">{error}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-white">
                                            Email <span className="text-error-400">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                                {...register('email')}
                                                aria-invalid={errors.email ? 'true' : 'false'}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                                disabled={isLoading}
                                                autoFocus
                                            />
                                        </div>
                                        {errors.email && (
                                            <p id="email-error" className="text-sm text-error-400" role="alert">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="gradient"
                                        size="lg"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </Button>

                                    <Link href="/login">
                                        <Button
                                            variant="glass"
                                            size="lg"
                                            className="w-full text-white"
                                            type="button"
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft className="h-5 w-5" />
                                            Back to Login
                                        </Button>
                                    </Link>
                                </form>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <Alert className="bg-info-500/10 border-info-500/50">
                                    <AlertDescription className="text-white/90">
                                        <p className="mb-2">Didn't receive the email? Check your spam folder.</p>
                                        <p className="text-sm text-white/70">
                                            The link will expire in 15 minutes for security reasons.
                                        </p>
                                    </AlertDescription>
                                </Alert>

                                <Button
                                    onClick={handleResend}
                                    variant="outline"
                                    size="lg"
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                    disabled={resendTimer > 0}
                                >
                                    {resendTimer > 0 ? (
                                        <>Resend available in {resendTimer}s</>
                                    ) : (
                                        'Resend Email'
                                    )}
                                </Button>

                                <Link href="/login">
                                    <Button
                                        variant="glass"
                                        size="lg"
                                        className="w-full text-white"
                                        type="button"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
