import { useMutation, useQuery } from '@tanstack/react-query';
import {
  postForecast,
  postChurn,
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
