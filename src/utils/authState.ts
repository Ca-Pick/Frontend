// accessToken이 httpOnly 쿠키라 JS에서 직접 읽을 수 없어서,
// 로그인/로그아웃 시점에 명시적으로 갱신하는 간단한 인증 상태 플래그
let authenticated: boolean | null = null;

export function setAuthenticated(value: boolean) {
  authenticated = value;
}

export function getAuthenticated() {
  return authenticated;
}
