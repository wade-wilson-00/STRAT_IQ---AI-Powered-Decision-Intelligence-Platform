'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/common/Logo';
import { signupSchema, type SignupFormData } from '@/lib/schemas';
import { createClient } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const supabase = createClient();

  // Redirect already-authenticated users
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/dashboard');
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  // Email + password sign-up
  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success('Account created! Check your email to confirm.');
    router.push('/login');
  };

  // OAuth sign-up (Google / GitHub)
  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(error.message);
      setOauthLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-strat-bg px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-elevated relative w-full max-w-md rounded-2xl border border-slate-800/40 bg-strat-card/80 p-8"
      >
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-slate-50">Create your account</h1>
        <p className="mb-6 text-center text-sm text-slate-400">Start your STRAT_IQ journey</p>

        {/* ─── OAuth Buttons ─── */}
        <div className="mb-6 flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={oauthLoading !== null}
            onClick={() => handleOAuth('google')}
            className="w-full border-slate-700/60 bg-slate-900/40 text-slate-200 hover:bg-slate-800/60 hover:text-white"
          >
            {oauthLoading === 'google' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={oauthLoading !== null}
            onClick={() => handleOAuth('github')}
            className="w-full border-slate-700/60 bg-slate-900/40 text-slate-200 hover:bg-slate-800/60 hover:text-white"
          >
            {oauthLoading === 'github' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            Continue with GitHub
          </Button>
        </div>

        {/* ─── Divider ─── */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/40" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-strat-card/80 px-3 text-slate-500">or sign up with email</span>
          </div>
        </div>

        {/* ─── Email/Password Form ─── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-400">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="John Doe"
                {...register('name')}
                className="border-slate-700/60 bg-slate-900/60 pl-10 text-slate-100 placeholder:text-slate-600"
              />
            </div>
            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-400">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="border-slate-700/60 bg-slate-900/60 pl-10 text-slate-100 placeholder:text-slate-600"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-400">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="border-slate-700/60 bg-slate-900/60 pl-10 text-slate-100 placeholder:text-slate-600"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-400">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-slate-400">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="border-slate-700/60 bg-slate-900/60 pl-10 text-slate-100 placeholder:text-slate-600"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || oauthLoading !== null}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
