import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChurnResult, ForecastResult } from './api';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

interface PredictionState {
  latestChurn: ChurnResult | null;
  latestForecast: ForecastResult | null;
  setLatestChurn: (result: ChurnResult) => void;
  setLatestForecast: (result: ForecastResult) => void;
}

interface SettingsState {
  displayName: string;
  email: string;
  notifications: boolean;
  theme: 'dark' | 'light';
  twoFactor: boolean;
  updateSettings: (settings: Partial<SettingsState>) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

export const usePredictionStore = create<PredictionState>((set) => ({
  latestChurn: null,
  latestForecast: null,
  setLatestChurn: (result) => set({ latestChurn: result }),
  setLatestForecast: (result) => set({ latestForecast: result }),
}));

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      displayName: 'Alex Johnson',
      email: 'alex@stratiq.com',
      notifications: true,
      theme: 'dark',
      twoFactor: false,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'stratiq-settings',
    }
  )
);
