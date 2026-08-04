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

// 로그인을 취소(뒤로가기 등)했을 때 대기 중인 하트 액션을 폐기하기 위한 함수
export function clearPendingHeartAction() {
  localStorage.removeItem(STORAGE_KEY);
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
const TOAST_EVENT_NAME = 'pendingHeartToast';

// 로그인 후 대기 액션이 실제로 성공했을 때, 해당 케이크의 HeartToggle이 마운트되면 토스트를 띄우도록 신호를 남김.
// 이미 마운트되어 있는 HeartToggle(예: 홈 화면)은 마운트 타이밍을 놓쳐 신호를 못 읽으므로,
// 커스텀 이벤트로도 즉시 알려서 리마운트 없이도 토스트를 띄울 수 있게 한다.
export function setPendingHeartToast(referenceId: number) {
  localStorage.setItem(TOAST_STORAGE_KEY, String(referenceId));
  window.dispatchEvent(new CustomEvent<number>(TOAST_EVENT_NAME, { detail: referenceId }));
}

export function subscribePendingHeartToast(referenceId: number, onSignal: () => void) {
  const handler = (event: Event) => {
    if ((event as CustomEvent<number>).detail === referenceId) {
      onSignal();
    }
  };

  window.addEventListener(TOAST_EVENT_NAME, handler);
  return () => window.removeEventListener(TOAST_EVENT_NAME, handler);
}

// referenceId가 일치할 때만 소비(제거)한다 - 같은 화면에 다른 케이크의 HeartToggle이 먼저 마운트되어도 신호를 가로채지 않도록
export function consumePendingHeartToast(referenceId: number): boolean {
  const raw = localStorage.getItem(TOAST_STORAGE_KEY);
  if (raw === null || Number(raw) !== referenceId) return false;

  localStorage.removeItem(TOAST_STORAGE_KEY);
  return true;
}
