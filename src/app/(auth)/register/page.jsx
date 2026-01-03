'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Check, X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { authApi } from '@/features/auth/api/authApi';
import { getFieldErrors } from '@/lib/utils/errorHandler';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

// Password strength validation
const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

// Registration schema
const registerSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email address'),
        password: passwordSchema,
        confirmPassword: z.string(),
        terms: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        control,
        setError: setFormError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const password = watch('password');

    // Calculate password strength
    const getPasswordStrength = (pwd) => {
        if (!pwd) return { score: 0, label: '', color: '' };

        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;

        const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['bg-error-500', 'bg-warning-500', 'bg-warning-400', 'bg-success-400', 'bg-success-500'];

        return {
            score: (score / 4) * 100,
            label: labels[score - 1] || '',
            color: colors[score - 1] || 'bg-muted',
        };
    };

    const passwordStrength = getPasswordStrength(password);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await authApi.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response) {
                toast.success('Account created successfully! Please check your email to verify your account.');
                // Redirect to login or verification page
                router.push('/login?verified=false');
            }
        } catch (err) {
            const errorMessage = err.message || 'Registration failed. Please try again.';
            setError(errorMessage);

            // Set field-level errors if available
            if (err.details && Array.isArray(err.details)) {
                const fieldErrors = getFieldErrors(err);
                Object.keys(fieldErrors).forEach((field) => {
                    setFormError(field, { message: fieldErrors[field] });
                });
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
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
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow"
                        >
                            <span className="text-3xl font-bold text-white">R</span>
                        </motion.div>
                        <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
                        <CardDescription className="text-white/70">
                            Start your journey with RAG Platform
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4 bg-error-500/10 border-error-500/50">
                                <AlertDescription className="text-white">{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white">
                                    Full Name <span className="text-error-400">*</span>
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                        {...register('name')}
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.name && (
                                    <p id="name-error" className="text-sm text-error-400" role="alert">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

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
                                    />
                                </div>
                                {errors.email && (
                                    <p id="email-error" className="text-sm text-error-400" role="alert">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white">
                                    Password <span className="text-error-400">*</span>
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                        {...register('password')}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        aria-describedby={errors.password ? 'password-error password-strength' : 'password-strength'}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {password && (
                                    <div id="password-strength" className="space-y-2" aria-live="polite">
                                        <Progress value={passwordStrength.score} className="h-2" />
                                        <p className="text-xs text-white/70">
                                            Password strength: <span className="font-medium">{passwordStrength.label}</span>
                                        </p>
                                    </div>
                                )}
                                {errors.password && (
                                    <p id="password-error" className="text-sm text-error-400" role="alert">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-white">
                                    Confirm Password <span className="text-error-400">*</span>
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                        {...register('confirmPassword')}
                                        aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                                        aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p id="confirm-password-error" className="text-sm text-error-400" role="alert">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-start space-x-2">
                                <Controller
                                    name="terms"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="terms"
                                            ref={field.ref}
                                            checked={field.value}
                                            onCheckedChange={(c) => {
                                                const isChecked = c === true;
                                                console.log('Checkbox changed:', c, '->', isChecked);
                                                field.onChange(isChecked);
                                            }}
                                            disabled={isLoading}
                                            className="mt-0.5 border-white/20 data-[state=checked]:bg-brand-500"
                                            aria-invalid={errors.terms ? 'true' : 'false'}
                                            aria-describedby={errors.terms ? 'terms-error' : undefined}
                                        />
                                    )}
                                />
                                <div className="space-y-1">
                                    <Label htmlFor="terms" className="text-sm text-white/70 cursor-pointer font-normal leading-relaxed">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-white hover:text-white/80 underline" tabIndex={isLoading ? -1 : 0}>
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="text-white hover:text-white/80 underline" tabIndex={isLoading ? -1 : 0}>
                                            Privacy Policy
                                        </Link>
                                    </Label>
                                    {errors.terms && (
                                        <p id="terms-error" className="text-sm text-error-400" role="alert">
                                            {errors.terms.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-2 my-2 bg-black/80 text-xs font-mono text-yellow-400 rounded border border-yellow-400/30">
                                <p>Terms Value: {String(watch('terms'))} ({typeof watch('terms')})</p>
                                <p>Terms Error: {errors.terms?.message || 'None'}</p>
                            </div>

                            <Button
                                type="submit"
                                variant="gradient"
                                size="lg"
                                className="w-full"
                                disabled={isLoading || isSubmitting}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-white/70">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-white font-medium hover:text-white/80 transition-colors"
                                tabIndex={isLoading ? -1 : 0}
                            >
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
