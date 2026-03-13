import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "https://api.stratiq.mock";
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 6000;

const client = axios.create({
  baseURL,
  timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token when available
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("stratiq_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - centralized error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    const status = error.response?.status;

    const enrichedError = new Error(message);
    enrichedError.status = status;
    enrichedError.response = error.response;
    enrichedError.isNetworkError = !error.response;

    return Promise.reject(enrichedError);
  }
);

// --- Forecast ---
export const postForecast = async (payload) => {
  const {
    currentMRR = 50000,
    activeUsers = 1000,
    churnRate = 5,
    burnRate = 1.2,
    cac = 8,
    marketingSpend = 50,
    previousRevenue = [],
  } = payload ?? {};

  const avgRecent =
    previousRevenue && previousRevenue.length
      ? previousRevenue.reduce((sum, v) => sum + v, 0) / previousRevenue.length
      : currentMRR;

  const baseGrowth =
    avgRecent > 0 ? (currentMRR - avgRecent) / Math.max(avgRecent, 1) : 0.05;
  const churnPenalty = (churnRate - 4) * 0.01;
  const burnPenalty = (burnRate - 1.2) * 0.02;
  const marketingBoost = (marketingSpend - 50) * 0.001;

  const growthRate = Math.max(
    -0.3,
    Math.min(0.4, baseGrowth + marketingBoost - churnPenalty - burnPenalty)
  );

  const baseMRR = currentMRR;

  const series = Array.from({ length: 8 }).map((_, idx) => {
    const monthOffset = idx;
    const mrr = baseMRR * Math.pow(1 + growthRate, monthOffset);
    return {
      label: `M+${monthOffset}`,
      mrr: Math.round(mrr),
    };
  });

  await new Promise((r) => setTimeout(r, 220));

  return {
    metrics: {
      currentMRR: baseMRR,
      predictedMRR: series[1].mrr,
      mrrGrowth: growthRate * 100,
      predictedGrowth: (growthRate + 0.02) * 100,
      churnRate,
      burnMultiple: burnRate,
      activeUsers,
      cac,
      marketingSpend,
    },
    series,
  };
};

// --- Churn ---
export const postChurn = async (payload) => {
  const {
    activeUsers = 800,
    cac = 8,
    engagementScore = 0.6,
    customerAgeMonths = 12,
    supportTickets = 3,
  } = payload ?? {};

  const base = 0.15;
  const engagementEffect = (0.7 - engagementScore) * 0.4;
  const ageEffect = customerAgeMonths < 6 ? 0.08 : -0.04;
  const supportEffect = Math.min(0.12, supportTickets * 0.01);
  const cacEffect = cac > 12 ? 0.03 : -0.01;

  const probability = Math.max(
    0.02,
    Math.min(0.6, base + engagementEffect + ageEffect + supportEffect + cacEffect)
  );

  const level = probability > 0.35 ? "high" : probability > 0.2 ? "medium" : "low";

  const summaryByLevel = {
    low: "Churn risk appears contained for current cohorts. Maintain existing engagement programs and monitor leading indicators.",
    medium:
      "Churn risk is elevated for some cohorts. Improving onboarding and in-product engagement could materially reduce churn.",
    high: "Churn probability is high. Consider prioritizing retention workstreams before scaling acquisition spend.",
  };

  await new Promise((r) => setTimeout(r, 180));

  return {
    probability,
    level,
    summary: summaryByLevel[level],
  };
};

// --- Simulation ---
export const postSimulate = async (params) => {
  const { churn, cac, burn, marketing } = params;

  const sensitivity = (churn - 4.5) * 0.4 + (burn - 1.2) * 12;
  const adjustedGrowth = Math.max(
    0,
    0.05 + (marketing - 60) * 0.0007 - churn * 0.002
  );

  const baseMRR = 48000;

  const series = Array.from({ length: 8 }).map((_, idx) => {
    const monthOffset = idx;
    const mrr =
      baseMRR * Math.pow(1 + adjustedGrowth, monthOffset) -
      monthOffset * burn * 400;
    return {
      label: `M+${monthOffset}`,
      mrr: Math.max(0, Math.round(mrr)),
    };
  });

  const riskLevel =
    sensitivity < 4 ? "low" : sensitivity < 10 ? "medium" : "high";

  const riskSummaryByLevel = {
    low: "Runway impact remains contained across simulated ranges. Current mix of growth and burn is sustainable under most scenarios.",
    medium:
      "Runway is sensitive to churn and CAC shifts. Tightening retention programs and improving payback periods can materially reduce risk.",
    high: "Several scenarios show runway compression under 12 months. Prioritize retention and CAC efficiency before scaling spend.",
  };

  await new Promise((r) => setTimeout(r, 200));

  return {
    series,
    predictedMRR: series[1].mrr,
    churnRate: churn,
    burnMultiple: burn,
    risk: {
      level: riskLevel,
      summary: riskSummaryByLevel[riskLevel],
    },
    notes: { cac, marketing },
  };
};

// --- Convenience wrappers ---
export const getForecast = () => postForecast({});
export const getChurnRisk = () => postChurn({});
export const simulateScenario = (params) => postSimulate(params);

// --- AI / RAG endpoints (mock for now, ready for backend) ---
const ragUrl = import.meta.env.VITE_RAG_API_URL;
const strategyUrl = import.meta.env.VITE_STRATEGY_API_URL;
const advisorUrl = import.meta.env.VITE_ADVISOR_API_URL;

export const fetchRAGInsights = async (query, context = {}) => {
  if (ragUrl) {
    const res = await client.post(ragUrl, { query, context });
    return res.data;
  }
  // Mock RAG response
  await new Promise((r) => setTimeout(r, 400));
  return {
    insights: [
      "Cohort retention curves suggest early churn spikes in months 2–3. Consider strengthening onboarding flows.",
      "MRR growth correlates positively with engagement score above 0.65. Focus on in-product activation.",
    ],
    sources: [
      { id: "kb-001", title: "Startup Retention Benchmarks", relevance: 0.92 },
      { id: "kb-002", title: "SaaS Cohort Analysis", relevance: 0.88 },
    ],
  };
};

export const fetchStrategyAdvice = async (metrics, context) => {
  if (strategyUrl) {
    const res = await client.post(strategyUrl, { metrics, context });
    return res.data;
  }
  await new Promise((r) => setTimeout(r, 500));
  return {
    advice: [
      {
        title: "Optimize CAC payback",
        recommendation:
          "Your CAC payback is above 9 months. Consider testing lifecycle emails and product-led expansion to reduce payback to 6–7 months.",
        priority: "high",
      },
      {
        title: "Retention focus",
        recommendation:
          "Churn risk is elevated. Prioritize success touchpoints and in-app nudges for at-risk cohorts before scaling acquisition.",
        priority: "medium",
      },
    ],
    confidence: 0.87,
  };
};

export const askAdvisor = async (question) => {
  if (advisorUrl) {
    const res = await client.post(advisorUrl, { question });
    return res.data;
  }
  await new Promise((r) => setTimeout(r, 800));
  return {
    answer:
      "Based on your current metrics, I recommend focusing on retention before scaling acquisition. Your churn rate suggests room for improvement in onboarding and engagement. I've analyzed your forecast, churn probability, and risk scenarios.",
    toolsUsed: ["forecast", "churn", "risk"],
    followUps: [
      "What specific retention tactics would help?",
      "How does my CAC compare to benchmarks?",
    ],
  };
};

export default client;
