import { useQuery } from '@tanstack/react-query';
import { getDessertDetail } from '../../api/services/referenceService';

export const useDessertDetail = (cakeId: number) => {
  return useQuery({
    queryKey: ['dessert-detail', cakeId],
    queryFn: () => getDessertDetail(cakeId),
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분
    enabled: !!cakeId, // cakeId가 있을 때만 요청
  });
};
