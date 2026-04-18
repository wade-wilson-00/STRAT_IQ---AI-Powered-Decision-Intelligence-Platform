// ─── Types ───
export interface ForecastInput {
  current_mrr: number;
  mrr_growth_rate: number;
  churn_rate: number;
  expansion_rate: number;
  months: number;
  previous_revenues?: number[];
}

export interface ForecastResult {
  predicted_mrr: number;
  metrics: {
    net_revenue_retention: number;
    annual_run_rate: number;
    ltv_cac_ratio: number;
    months_to_target: number;
  };
  time_series: { month: string; revenue: number; projected: number }[];
  ai_insight: string;
}

export interface ChurnInput {
  nps_score: number;
  login_frequency: number;
  support_tickets: number;
  usage_hours: number;
  contract_length: number;
  monthly_spend: number;
}

export interface ChurnResult {
  probability: number;
  level: 'low' | 'medium' | 'high';
  summary: string;
  ai_insight: string;
}

export interface RAGInsight {
  insights: { text: string; relevance: number }[];
  sources: { name: string; type: string }[];
}

export interface StrategyAdvice {
  recommendations: { text: string; priority: 'high' | 'medium' | 'low' }[];
  confidence: number;
}

export interface AdvisorAnswer {
  answer: string;
  tools_used: string[];
  follow_up_questions: string[];
}

// ─── Mock helpers ───
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── API Functions ───

export async function postForecast(input: ForecastInput): Promise<ForecastResult> {
  await delay(1200);
  const { current_mrr, mrr_growth_rate, churn_rate, expansion_rate, months } = input;
  const net_growth = (mrr_growth_rate + expansion_rate - churn_rate) / 100;
  const predicted_mrr = Math.round(current_mrr * Math.pow(1 + net_growth / 12, months));
  const time_series = Array.from({ length: months }, (_, i) => ({
    month: `M+${i + 1}`,
    revenue: Math.round(current_mrr * Math.pow(1 + net_growth / 12, i)),
    projected: Math.round(current_mrr * Math.pow(1 + net_growth / 12, i + 1)),
  }));

  return {
    predicted_mrr,
    metrics: {
      net_revenue_retention: Math.round((100 + mrr_growth_rate + expansion_rate - churn_rate) * 10) / 10,
      annual_run_rate: predicted_mrr * 12,
      ltv_cac_ratio: Math.round(((predicted_mrr * 24) / (current_mrr * 0.3)) * 10) / 10,
      months_to_target: Math.ceil(months * 0.7),
    },
    time_series,
    ai_insight:
      net_growth > 0.08
        ? 'Strong trajectory — maintain current levers and explore upsell motions.'
        : net_growth > 0
          ? 'Positive but moderate growth. Consider improving expansion or reducing churn.'
          : 'Contraction detected. Immediate action on churn and retention is advised.',
  };
}

export async function postChurn(input: ChurnInput): Promise<ChurnResult> {
  await delay(1000);
  const { nps_score, login_frequency, support_tickets, usage_hours, contract_length, monthly_spend } = input;
  const raw =
    (10 - nps_score) * 0.15 +
    Math.max(0, 5 - login_frequency) * 0.1 +
    support_tickets * 0.08 +
    Math.max(0, 10 - usage_hours) * 0.05 +
    Math.max(0, 6 - contract_length) * 0.07 +
    Math.max(0, 500 - monthly_spend) * 0.0002;
  const probability = Math.min(0.95, Math.max(0.05, raw));
  const level: ChurnResult['level'] = probability > 0.6 ? 'high' : probability > 0.3 ? 'medium' : 'low';
  return {
    probability: Math.round(probability * 1000) / 1000,
    level,
    summary:
      level === 'high'
        ? 'Critical churn risk detected. Immediate intervention recommended.'
        : level === 'medium'
          ? 'Moderate churn risk. Monitor engagement and satisfaction closely.'
          : 'Low churn risk. Customer health is stable.',
    ai_insight:
      level === 'high'
        ? 'Key drivers: low NPS, declining usage, frequent support requests. Prioritize white-glove onboarding.'
        : level === 'medium'
          ? 'Watch login frequency and ticket spikes. Trigger automated re-engagement campaigns.'
          : 'Strong fundamentals. Consider referral program to leverage satisfied customers.',
  };
}

export async function fetchRAGInsights(query: string): Promise<RAGInsight> {
  await delay(1500);
  return {
    insights: [
      { text: `Based on analysis of "${query}": Companies in similar positions see 15-20% improvement with data-driven decision making.`, relevance: 0.92 },
      { text: 'Historical patterns suggest focusing on customer lifetime value optimization yields best ROI.', relevance: 0.87 },
      { text: 'Industry benchmarks indicate top-quartile performers achieve 120%+ net revenue retention.', relevance: 0.81 },
    ],
    sources: [
      { name: 'SaaS Benchmarks 2024', type: 'report' },
      { name: 'Customer Success Playbook', type: 'guide' },
      { name: 'Revenue Analytics Framework', type: 'whitepaper' },
    ],
  };
}

export async function fetchStrategyAdvice(metrics: Record<string, number>): Promise<StrategyAdvice> {
  await delay(1300);
  const recommendations: StrategyAdvice['recommendations'] = [];
  if (metrics.churn_rate > 5) recommendations.push({ text: 'Implement proactive churn intervention — target at-risk cohorts with personalized engagement.', priority: 'high' });
  if (metrics.nrr < 100) recommendations.push({ text: 'Focus on expansion revenue — upsell and cross-sell to existing base.', priority: 'high' });
  recommendations.push({ text: 'Optimize CAC payback by improving conversion funnel efficiency.', priority: 'medium' });
  recommendations.push({ text: 'Build product-led growth loops with viral coefficients above 1.0.', priority: 'low' });
  return { recommendations, confidence: 0.85 };
}

export async function askAdvisor(question: string): Promise<AdvisorAnswer> {
  await delay(1800);
  return {
    answer: `Regarding "${question}": Based on multi-source analysis, I recommend a data-driven approach. Current market signals indicate opportunity for proactive optimization. Key actions include improving retention metrics, optimizing operational efficiency, and leveraging predictive analytics for strategic planning.`,
    tools_used: ['Revenue Model', 'Churn Predictor', 'Market Research', 'Benchmark Engine'],
    follow_up_questions: [
      'What specific retention strategies should we prioritize?',
      'How does our performance compare to industry benchmarks?',
      'What are the key risks in the current market environment?',
    ],
  };
}

// Health check
export async function getHealth(): Promise<{ status: string }> {
  await delay(200);
  return { status: 'healthy' };
}
