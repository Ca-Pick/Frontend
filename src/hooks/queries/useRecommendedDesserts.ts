import { useQuery } from '@tanstack/react-query';
import { getRecommendedDesserts } from '../../api/services/referenceService';

export const useRecommendedDesserts = () => {
  return useQuery({
    queryKey: ['recommended'],
    queryFn: () => getRecommendedDesserts(),
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분
  });
};
