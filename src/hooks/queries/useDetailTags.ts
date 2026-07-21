import { useQuery } from '@tanstack/react-query';
import { getDetailTags } from '../../api/services/referenceService';

export const useDetailTags = () => {
  return useQuery({
    queryKey: ['detail-tags'],
    queryFn: () => getDetailTags(),
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60 * 24, // 24시간
  });
};
