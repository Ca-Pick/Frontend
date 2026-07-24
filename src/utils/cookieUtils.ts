export function getCookie(name: string): string | null {
  const matches = document.cookie.split(';').map((cookie) => cookie.trim());
  const cookie = matches.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.substring(name.length + 1) : null;
}

export function isLoggedIn(): boolean {
  const token = getCookie('accessToken');
  return !!token;
}
