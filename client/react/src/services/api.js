import axios from "axios";

const client = axios.create({
  baseURL: "https://api.stratiq.mock",
  timeout: 6000,
});

export const postForecast = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 220));

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

export const postChurn = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 180));

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

  return {
    probability,
    level,
    summary: summaryByLevel[level],
  };
};

export const postSimulate = async (params) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

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

  return {
    series,
    predictedMRR: series[1].mrr,
    churnRate: churn,
    burnMultiple: burn,
    risk: {
      level: riskLevel,
      summary: riskSummaryByLevel[riskLevel],
    },
    notes: {
      cac,
      marketing,
    },
  };
};

export const getForecast = () => postForecast({});
export const getChurnRisk = () => postChurn({});
export const simulateScenario = (params) => postSimulate(params);

export default client;

