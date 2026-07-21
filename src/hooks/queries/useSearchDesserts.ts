import { useQuery, useMutation } from '@tanstack/react-query';
import { searchDesserts } from '../../api/services/referenceService';
import type { SearchRequest } from '../../types/api';

// useQuery 버전 (자동 실행)
export const useSearchDesserts = (params?: SearchRequest) => {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchDesserts(params),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    enabled: !!params, // params가 있을 때만 자동 실행
  });
};

// useMutation 버전 (수동 실행)
export const useSearchDessertsMutation = () => {
  return useMutation({
    mutationFn: (params: SearchRequest) => searchDesserts(params),
  });
};
