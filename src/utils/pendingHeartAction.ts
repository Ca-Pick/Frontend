const STORAGE_KEY = 'pendingHeartAction';

export type HeartActionType = 'save' | 'unsave';

export interface PendingHeartAction {
  referenceId: number;
  action: HeartActionType;
}

// 로그인 전에 실패한 하트(찜) 액션을 기록해두고, 로그인 완료 후 그대로 재실행하기 위한 저장소
export function setPendingHeartAction(referenceId: number, action: HeartActionType) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ referenceId, action }));
}

export function consumePendingHeartAction(): PendingHeartAction | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  localStorage.removeItem(STORAGE_KEY);

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const TOAST_STORAGE_KEY = 'pendingHeartToast';

// 로그인 후 대기 액션이 실제로 성공했을 때, 해당 케이크의 HeartToggle이 마운트되면 토스트를 띄우도록 신호를 남김
export function setPendingHeartToast(referenceId: number) {
  localStorage.setItem(TOAST_STORAGE_KEY, String(referenceId));
}

// referenceId가 일치할 때만 소비(제거)한다 - 같은 화면에 다른 케이크의 HeartToggle이 먼저 마운트되어도 신호를 가로채지 않도록
export function consumePendingHeartToast(referenceId: number): boolean {
  const raw = localStorage.getItem(TOAST_STORAGE_KEY);
  if (raw === null || Number(raw) !== referenceId) return false;

  localStorage.removeItem(TOAST_STORAGE_KEY);
  return true;
}
