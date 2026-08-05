import { useState, useEffect } from 'react';
import { IconButton, Snackbar, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSaveCakeMutation, useUnsaveCakeMutation, useSavedCakeIds } from '../hooks';
import { setPendingHeartAction, consumePendingHeartToast, subscribePendingHeartToast } from '../utils/pendingHeartAction';
import filledHeartSvg from '../assets/images/fiiledheart.svg';
import cherrySvg from '../assets/images/cherry.svg';

interface HeartToggleProps {
  referenceId: number;
  initialSaved?: boolean;
  onClick?: (isSaved: boolean) => void;
  // 로그인 필요 시 되돌아올 경로. 홈 화면의 상세뷰처럼 URL이 바뀌지 않는 곳에서
  // 쓰일 때는 location.pathname이 실제 상세 경로를 반영하지 못하므로 명시적으로 지정한다.
  redirectPath?: string;
}

export function HeartToggle({ referenceId, initialSaved = false, onClick, redirectPath }: HeartToggleProps) {
  // 저장/취소 직후 서버 응답을 기다리는 동안 즉시 반영할 낙관적 업데이트 값
  const [optimisticSaved, setOptimisticSaved] = useState<boolean | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const saveMutation = useSaveCakeMutation();
  const unsaveMutation = useUnsaveCakeMutation();
  // 홈/검색/상세/저장함이 공유하는 좋아요 상태. 아직 로드 전이면 각 화면이 넘겨준 initialSaved로 대체
  const { ids: savedCakeIds, isFetched } = useSavedCakeIds();
  const sharedSaved = isFetched ? savedCakeIds.has(referenceId) : initialSaved;
  const isSaved = optimisticSaved ?? sharedSaved;

  useEffect(() => {
    // 케이크가 바뀌거나(캐러셀 등에서 컴포넌트 재사용) 공유 상태가 갱신되면 로컬 낙관적 값을 비우고 공유 상태를 그대로 따름
    setOptimisticSaved(null);
  }, [referenceId, sharedSaved]);

  useEffect(() => {
    // 화면 전환(마운트)으로 신호를 받는 경우 - 상세/검색 등
    if (consumePendingHeartToast(referenceId)) {
      setOpenToast(true);
    }

    // 이미 마운트되어 있어 위 체크 타이밍을 놓친 경우 - 홈 등
    return subscribePendingHeartToast(referenceId, () => {
      consumePendingHeartToast(referenceId);
      setOpenToast(true);
    });
  }, [referenceId]);

  const handleClick = async () => {
    const newState = !isSaved;
    const previousState = isSaved;

    // 즉시 UI 업데이트 (Optimistic Update)
    setOptimisticSaved(newState);

    try {
      if (newState) {
        await saveMutation.mutateAsync(referenceId);
        setOpenToast(true);
      } else {
        await unsaveMutation.mutateAsync(referenceId);
      }
      onClick?.(newState);
    } catch (error: any) {
      // 에러가 발생하면 이전 상태로 복구
      setOptimisticSaved(previousState);

      if (error.response?.status === 401) {
        // 로그인이 필요한 경우 - 이어서 실행할 액션을 기록해두고 로그인 페이지로 이동
        setPendingHeartAction(referenceId, newState ? 'save' : 'unsave');
        navigate('/login', { state: { from: redirectPath ?? (location.pathname + location.search) } });
      } else {
        console.error('API 호출 실패:', error);
      }
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const handleViewSaved = () => {
    navigate('/saved');
  };

  const isLoading = saveMutation.isPending || unsaveMutation.isPending;

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={isLoading}
        sx={{
          padding: 0,
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        }}
      >
        <img
          src={isSaved ? filledHeartSvg : cherrySvg}
          alt="heart toggle"
          style={{ width: 24, height: 24 }}
        />
      </IconButton>

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
            color: '#fff',
            padding: '4px 16px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '94px',
          }}
        >
          <Typography variant="label_4">저장함에 담았어요</Typography>
          <Button
            size="small"
            variant='text'
            color="primary"
            onClick={handleViewSaved}
          >
            보러가기
          </Button>
        </Box>
      </Snackbar>
    </>
  );
}
