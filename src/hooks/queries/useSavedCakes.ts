import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSavedCakes,
  saveCake,
  unsaveCake,
} from '../../api/services/saveService';
import type { SavedCakesResponse } from '../../types/api';

const SAVED_CAKES_KEY = ['savedCakes'];

// 저장한 케이크 목록 조회 (비회원이면 401로 실패하고 조용히 빈 상태로 남음 - saveService.getSavedCakes 참고)
export const useSavedCakes = () => {
  return useQuery({
    queryKey: SAVED_CAKES_KEY,
    queryFn: () => getSavedCakes(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};

// 화면 전반(홈/검색/상세/저장함)에서 좋아요 상태를 동기화하기 위한 공유 소스
export const useSavedCakeIds = () => {
  const query = useSavedCakes();

  const ids = useMemo(
    () => new Set(query.data?.data?.cakes.map((cake) => cake.cakeId) ?? []),
    [query.data]
  );

  return { ids, isFetched: query.isFetched };
};

// 케이크 저장 (좋아요)
export const useSaveCakeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (referenceId: number) => saveCake(referenceId),
    onSuccess: (_response, referenceId) => {
      // 좋아요 응답엔 목록이 없으므로(success/timestamp만 옴), 기존 캐시에 방금 저장한 케이크만 직접 추가
      queryClient.setQueryData<SavedCakesResponse>(SAVED_CAKES_KEY, (old) => {
        if (!old) return old;
        if (old.data.cakes.some((cake) => cake.cakeId === referenceId)) return old;
        return {
          ...old,
          data: {
            cakes: [...old.data.cakes, { cakeId: referenceId, instagramEmbed: '', cakedetailtags: [] }],
          },
        };
      });
      // 위에서 추가한 항목은 상세 정보가 비어있으므로, 저장함 쿼리를 다시 불러와 정확한 데이터로 채움
      queryClient.invalidateQueries({ queryKey: SAVED_CAKES_KEY });
      // 저장함 탭이 구독하는 쿼리도 함께 갱신
      queryClient.invalidateQueries({ queryKey: ['savedItems'] });
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
    onSuccess: (_response, referenceId) => {
      // 삭제 응답엔 목록이 없으므로 공유 캐시에서 직접 제거해 다른 화면들도 즉시 동기화
      queryClient.setQueryData<SavedCakesResponse>(SAVED_CAKES_KEY, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: { cakes: old.data.cakes.filter((cake) => cake.cakeId !== referenceId) },
        };
      });
      // 저장함 탭이 구독하는 쿼리도 함께 갱신
      queryClient.invalidateQueries({ queryKey: ['savedItems'] });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        console.error('로그인이 필요합니다');
      }
    },
  });
};
