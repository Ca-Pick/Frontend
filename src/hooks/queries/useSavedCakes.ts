import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import {
  getSavedCakes,
  saveCake,
  unsaveCake,
} from '../../api/services/saveService';
import type { SavedCakesResponse } from '../../types/api';

export const SAVED_CAKES_KEY = ['savedCakes'];

// 캐시에 저장/취소 결과를 직접 반영 - 쿼리가 한 번도 자동으로 불려온 적 없어도(enabled: false라
// old가 비어있을 수 있음) 빈 목록에서부터 채워나갈 수 있도록 old가 없는 경우도 처리한다.
// 로그인 성공 후 대기 액션을 복원하는 Home 쪽에서도 mutation 훅 없이 이 함수를 재사용한다.
export function setSavedCakeInCache(queryClient: QueryClient, referenceId: number, saved: boolean) {
  queryClient.setQueryData<SavedCakesResponse>(SAVED_CAKES_KEY, (old) => {
    const cakes = old?.data.cakes ?? [];
    const nextCakes = saved
      ? cakes.some((cake) => cake.cakeId === referenceId)
        ? cakes
        : [...cakes, { cakeId: referenceId, instagramEmbed: '', cakedetailtags: [] }]
      : cakes.filter((cake) => cake.cakeId !== referenceId);

    return {
      success: true,
      timestamp: new Date().toISOString(),
      ...old,
      data: { cakes: nextCakes },
    };
  });
}

// 저장한 케이크 목록 조회. 마운트 시 자동으로 호출하지 않음 - 좋아요 클릭(mutation)이 캐시를 직접 채우므로,
// 클릭 전까지는 각 화면이 넘겨준 initialSaved로 하트를 표시하고 불필요한(비회원 401) 요청을 만들지 않음
export const useSavedCakes = () => {
  return useQuery({
    queryKey: SAVED_CAKES_KEY,
    queryFn: () => getSavedCakes(),
    enabled: false,
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
      setSavedCakeInCache(queryClient, referenceId, true);
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
      setSavedCakeInCache(queryClient, referenceId, false);
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
