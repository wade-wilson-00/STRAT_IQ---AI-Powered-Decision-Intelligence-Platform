'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, Variants } from 'framer-motion';
import { Settings, Bell, Palette, Trash2, User, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { settingsSchema, type SettingsFormData } from '@/lib/schemas';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: 'Alex Johnson',
      email: 'alex@stratiq.com',
      notifications: true,
    },
  });

  const notifications = watch('notifications');

  const onSubmit = async (data: SettingsFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success('Settings saved');
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile Section */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="glass-card relative overflow-hidden rounded-2xl p-6 border-t-accent-purple"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-transparent" />

          <div className="relative mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
              <User className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-slate-100">Profile</h2>
              <p className="text-xs text-slate-400">Manage your account information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400 font-medium">Display Name</Label>
              <div className="input-glow rounded-lg transition-all duration-200">
                <Input
                  {...register('displayName')}
                  className="border-slate-700/40 bg-slate-900/40 text-slate-100"
                />
              </div>
              {errors.displayName && (
                <p className="text-[11px] text-rose-400">{errors.displayName.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] text-slate-400 font-medium">Email</Label>
              <div className="input-glow rounded-lg transition-all duration-200">
                <Input
                  type="email"
                  {...register('email')}
                  className="border-slate-700/40 bg-slate-900/40 text-slate-100"
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-400">{errors.email.message}</p>}
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
            >
              <Save className="mr-2 h-3.5 w-3.5" />
              Save Changes
            </Button>
          </form>
        </motion.div>

        {/* Notifications */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="glass-card relative overflow-hidden rounded-2xl p-6 border-t-accent-cyan"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent" />

          <div className="relative mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Bell className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-slate-100">Notifications</h2>
              <p className="text-xs text-slate-400">Configure your notification preferences</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between rounded-xl bg-slate-900/30 border border-slate-800/30 px-4 py-3.5 transition-all duration-200 hover:bg-slate-900/40">
            <div>
              <p className="text-sm font-medium text-slate-200">Email Notifications</p>
              <p className="text-xs text-slate-400">Receive alerts about predictions and insights</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={(checked) => setValue('notifications', checked)}
            />
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="glass-card relative overflow-hidden rounded-2xl p-6 border-t-accent-indigo"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent" />

          <div className="relative mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Palette className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-slate-100">Appearance</h2>
              <p className="text-xs text-slate-400">Customize the look and feel</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between rounded-xl bg-slate-900/30 border border-slate-800/30 px-4 py-3.5 transition-all duration-200 hover:bg-slate-900/40">
            <div>
              <p className="text-sm font-medium text-slate-200">Dark Mode</p>
              <p className="text-xs text-slate-400">Currently active as the default theme</p>
            </div>
            <Switch checked={true} disabled />
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="glass-card relative overflow-hidden rounded-2xl p-6 border-t-accent-purple"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent" />

          <div className="relative mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-slate-100">Security</h2>
              <p className="text-xs text-slate-400">Manage your security settings</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between rounded-xl bg-slate-900/30 border border-slate-800/30 px-4 py-3.5 transition-all duration-200 hover:bg-slate-900/40">
            <div>
              <p className="text-sm font-medium text-slate-200">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
            </div>
            <Switch checked={false} disabled />
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative overflow-hidden rounded-2xl border border-rose-500/15 p-6 border-t-accent-rose"
          style={{
            background: 'linear-gradient(to bottom right, rgba(244,63,94,0.04), rgba(15,23,42,0.8))',
          }}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
              <Trash2 className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <h2 className="font-heading text-base font-semibold text-rose-300">Danger Zone</h2>
              <p className="text-xs text-slate-400">Irreversible actions</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200"
            onClick={() => toast.error('Account deletion is not available in demo mode.')}
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Delete Account
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
