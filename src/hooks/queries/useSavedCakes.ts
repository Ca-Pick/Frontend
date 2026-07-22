import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSavedCakes,
  saveCake,
  unsaveCake,
} from '../../api/services/saveService';

const SAVED_CAKES_KEY = ['savedCakes'];

// 저장한 케이크 목록 조회
export const useSavedCakes = () => {
  return useQuery({
    queryKey: SAVED_CAKES_KEY,
    queryFn: () => getSavedCakes(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};

// 케이크 저장 (좋아요)
export const useSaveCakeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referenceId: number) => saveCake(referenceId),
    onSuccess: () => {
      // 저장된 케이크 목록 갱신
      queryClient.invalidateQueries({ queryKey: SAVED_CAKES_KEY });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        console.error('로그인이 필요합니다');
      } else if (error.response?.status === 404) {
        console.error('해당 케이크를 찾을 수 없습니다');
      }
    },
  });
};

// 케이크 저장 취소 (좋아요 취소)
export const useUnsaveCakeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referenceId: number) => unsaveCake(referenceId),
    onSuccess: () => {
      // 저장된 케이크 목록 갱신
      queryClient.invalidateQueries({ queryKey: SAVED_CAKES_KEY });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        console.error('로그인이 필요합니다');
      }
    },
  });
};
