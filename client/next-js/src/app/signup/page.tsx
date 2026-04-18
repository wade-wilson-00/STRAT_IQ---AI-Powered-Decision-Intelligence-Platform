'use client';

import { useState } from 'react';
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

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Account created! Redirecting...');
    router.push('/dashboard');
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
        <p className="mb-8 text-center text-sm text-slate-400">Start your STRAT_IQ journey</p>

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
            disabled={loading}
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
