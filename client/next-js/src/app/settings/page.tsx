'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Palette, Trash2, User, Shield, Save, Key, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { settingsSchema, type SettingsFormData } from '@/lib/schemas';
import { useSettingsStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [mounted, setMounted] = useState(false);
  const settings = useSettingsStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      displayName: settings.displayName,
      email: settings.email,
      notifications: settings.notifications,
    },
  });

  useEffect(() => {
    setMounted(true);
    reset({
      displayName: settings.displayName,
      email: settings.email,
      notifications: settings.notifications,
    });
  }, [settings.displayName, settings.email, settings.notifications, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    await new Promise((r) => setTimeout(r, 600));
    settings.updateSettings({
      displayName: data.displayName,
      email: data.email,
      notifications: data.notifications,
    });
    toast.success('Profile settings updated successfully');
  };

  const toggleTwoFactor = () => {
    settings.updateSettings({ twoFactor: !settings.twoFactor });
    toast.success(`Two-factor authentication ${!settings.twoFactor ? 'enabled' : 'disabled'}`);
  };

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100 font-heading">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account preferences and configurations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Settings Sidebar */}
          <div className="md:col-span-3 space-y-2">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'preferences', icon: Settings, label: 'Preferences' },
              { id: 'security', icon: Shield, label: 'Security' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  activeTab === tab.id 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="md:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="glass-card overflow-hidden rounded-2xl p-6 border-t-accent-cyan">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-slate-100">Profile Information</h2>
                      <p className="text-sm text-slate-400">Update your account's profile information and email address.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-400 font-medium">Display Name</Label>
                        <div className="input-glow-cyan rounded-lg transition-all duration-200 max-w-md">
                          <Input
                            {...register('displayName')}
                            className="border-slate-700/40 bg-slate-900/40 text-slate-100"
                          />
                        </div>
                        {errors.displayName && (
                          <p className="text-[11px] text-rose-400">{errors.displayName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-slate-400 font-medium">Email Address</Label>
                        <div className="input-glow-cyan rounded-lg transition-all duration-200 max-w-md">
                          <Input
                            type="email"
                            {...register('email')}
                            className="border-slate-700/40 bg-slate-900/40 text-slate-100"
                          />
                        </div>
                        {errors.email && <p className="text-[11px] text-rose-400">{errors.email.message}</p>}
                      </div>

                      <div className="pt-4 border-t border-slate-800/50 flex justify-end">
                        <Button
                          type="submit"
                          disabled={!isDirty}
                          className="bg-cyan-500 hover:bg-cyan-400 text-white transition-all duration-300"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Notifications */}
                  <div className="glass-card overflow-hidden rounded-2xl p-6 border-t-accent-purple">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <Bell className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-100">Notifications</h2>
                        <p className="text-sm text-slate-400">Manage how you receive alerts and updates.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-900/40 border border-slate-800/50 px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">Email Alerts</p>
                        <p className="text-xs text-slate-400 mt-1">Receive strategic insights and forecast anomalies directly in your inbox.</p>
                      </div>
                      <Switch
                        checked={settings.notifications}
                        onCheckedChange={(checked) => {
                          settings.updateSettings({ notifications: checked });
                          toast.success('Notification preferences updated');
                        }}
                      />
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="glass-card overflow-hidden rounded-2xl p-6 border-t-accent-indigo">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Palette className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-100">Appearance</h2>
                        <p className="text-sm text-slate-400">Customize the interface theme.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-900/40 border border-slate-800/50 px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">Dark Mode Enforced</p>
                        <p className="text-xs text-slate-400 mt-1">STRAT_IQ is optimized for dark mode to reduce eye strain during deep analysis.</p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="glass-card overflow-hidden rounded-2xl p-6 border-t-accent-indigo">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Key className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-100">Authentication</h2>
                        <p className="text-sm text-slate-400">Secure your account with additional layers of protection.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-xl bg-slate-900/40 border border-slate-800/50 px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-slate-400 mt-1">Protect your financial data with an extra security step.</p>
                      </div>
                      <Switch 
                        checked={settings.twoFactor} 
                        onCheckedChange={toggleTwoFactor} 
                      />
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="rounded-2xl border border-rose-500/20 p-6 bg-rose-500/[0.02]">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <AlertCircle className="w-5 h-5 text-rose-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-rose-300">Danger Zone</h2>
                        <p className="text-sm text-rose-400/70">Irreversible account actions.</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-xl bg-rose-950/20 border border-rose-900/30 px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-200">Delete Account & Data</p>
                        <p className="text-xs text-slate-400 mt-1">Permanently remove your account and all associated prediction data.</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200 whitespace-nowrap"
                        onClick={() => toast.error('Account deletion is not available in demo mode.')}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
