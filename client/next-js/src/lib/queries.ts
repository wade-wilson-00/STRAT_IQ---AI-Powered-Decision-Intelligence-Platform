import { useMutation, useQuery } from '@tanstack/react-query';
import {
  postForecast,
  postChurn,
  fetchRAGInsights,
  fetchStrategyAdvice,
  askAdvisor,
  type ForecastInput,
  type ChurnInput,
} from './api';

// ─── Queries ───

export function useForecastQuery(input?: ForecastInput) {
  return useQuery({
    queryKey: ['forecast', input],
    queryFn: () => postForecast(input!),
    enabled: !!input,
    staleTime: 1000 * 60 * 5,
  });
}

export function useChurnRiskQuery(input?: ChurnInput) {
  return useQuery({
    queryKey: ['churnRisk', input],
    queryFn: () => postChurn(input!),
    enabled: !!input,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRAGQuery(query: string) {
  return useQuery({
    queryKey: ['rag', query],
    queryFn: () => fetchRAGInsights(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 10,
  });
}

export function useStrategyQuery(metrics: Record<string, number>) {
  return useQuery({
    queryKey: ['strategy', metrics],
    queryFn: () => fetchStrategyAdvice(metrics),
    enabled: Object.keys(metrics).length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Mutations ───

export function useChurnMutation() {
  return useMutation({
    mutationFn: postChurn,
  });
}

export function useForecastMutation() {
  return useMutation({
    mutationFn: postForecast,
  });
}

export function useAdvisorMutation() {
  return useMutation({
    mutationFn: askAdvisor,
  });
}
