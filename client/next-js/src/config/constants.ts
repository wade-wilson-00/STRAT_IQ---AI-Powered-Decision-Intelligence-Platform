// ─── Design tokens ───
export const colors = {
  primary: '#a855f7',       // Purple
  primaryLight: '#c084fc',
  secondary: '#22d3ee',     // Cyan
  secondaryLight: '#67e8f9',
  accent: '#818cf8',        // Indigo
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#f43f5e',
  bgDeep: '#0F172A',        // Deep Navy
  bgCard: '#1E293B',        // Card surface
  bgPanel: '#0f1729',
  textPrimary: '#F1F5F9',
  textMuted: '#94A3B8',
  border: 'rgba(51,65,85,0.6)',
} as const;

// ─── Navigation links (landing) ───
export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'AI Insights', href: '#ai-insights' },
] as const;

// ─── Sidebar links (dashboard) ───
export const SIDEBAR_LINKS = [
  { label: 'Dashboard',          href: '/dashboard',          icon: 'LayoutDashboard' },
  { label: 'Revenue Forecast',   href: '/revenue-forecast',   icon: 'TrendingUp' },
  { label: 'Churn Prediction',   href: '/churn-prediction',   icon: 'UserMinus' },
  { label: 'AI Advisor',         href: '/ai-advisor',         icon: 'Brain' },
  { label: 'Settings',           href: '/settings',           icon: 'Settings' },
] as const;

// ─── App metadata ───
export const APP_NAME = 'STRAT_IQ';
export const APP_TAGLINE = 'AI-Powered Decision Intelligence';
export const APP_DESCRIPTION =
  'Strategic finance intelligence platform powered by AI. Predict churn, forecast revenue, and get actionable insights.';
