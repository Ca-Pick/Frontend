import axios from 'axios';
import { getAuthenticated, setAuthenticated } from '../utils/authState';

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: import.meta.env.VITE_API_TIMEOUT || 600000,
};

// 공개 API (로그인 불필요) - 주문서, 검색 등
export const publicClient = axios.create({
  ...baseConfig,
  withCredentials: false,
});

// 인증 API (로그인 필요) - 사용자 정보, 저장된 항목 등
export const authClient = axios.create({
  ...baseConfig,
  withCredentials: true,
});

// 토큰 재발급용 (Interceptor 없음 - 무한 루프 방지)
const refreshClient = axios.create({
  ...baseConfig,
  withCredentials: true,
});

// 토큰 재발급 관련 상태
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 토큰 재발급 요청
const refreshToken = async () => {
  try {
    const startTime = performance.now();
    console.log('🔄 토큰 재발급 요청 중...');
    // ✅ refreshClient 사용 (Interceptor 없음)
    const response = await refreshClient.post('/auth/reissue', {});
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(`✅ 토큰 재발급 성공 (${duration}ms)`);
    setAuthenticated(true);
    return true;
  } catch (error: any) {
    const endTime = performance.now();
    console.error('❌ 토큰 재발급 실패:', error.response?.data?.code);
    setAuthenticated(false);
    // 토큰 재발급 실패 → 로그인 페이지로 이동 (redirect URL 포함)
    // replace 사용: href로 이동하면 현재 페이지(보호된 라우트)가 히스토리에 남아
    // 로그인 화면에서 뒤로가기 시 그 페이지로 되돌아갔다가 다시 401로 튕겨나오는 루프가 생김
    const currentPath = window.location.pathname + window.location.search;
    window.location.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return false;
  }
};

// publicClient 인터셉터 (간단한 로그만)
publicClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 [PUBLIC] 요청:`, config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error(`❌ [PUBLIC] 요청 에러:`, error);
    return Promise.reject(error);
  }
);

publicClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [PUBLIC] 응답:`, response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(`❌ [PUBLIC] 응답 에러:`, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// authClient 인터셉터 (401 처리 + 토큰 재발급)
authClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 [AUTH] 요청:`, config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error(`❌ [AUTH] 요청 에러:`, error);
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [AUTH] 응답:`, response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 로그인 여부가 확실치 않은 상태에서 "혹시 저장되어있나" 확인만 하는 요청 - 실패해도 재발급/리다이렉트 없이 조용히 실패 처리 (콘솔 로그도 생략)
    if (error.response?.status === 401 && originalRequest?.skipAuthRedirect) {
      return Promise.reject(error);
    }

    // 명시적으로 로그아웃된 상태 (직전에 logout() 호출됨) - 재발급 시도 없이 바로 에러 처리
    if (error.response?.status === 401 && getAuthenticated() === false) {
      console.error(`❌ [AUTH] 응답 에러:`, error.response?.status, error.message);
      return Promise.reject(error);
    }

    // 401 에러이고 이미 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        // 토큰 재발급 시도
        const refreshed = await refreshToken();
        isRefreshing = false;

        if (refreshed) {
          // 대기 중인 요청들 재시도
          onRefreshed('');
          // 원래 요청 재시도
          return authClient(originalRequest);
        }
        // 토큰 재발급 실패는 refreshToken()에서 처리
      } else {
        // 재발급 중인 경우 대기
        return new Promise((resolve) => {
          addRefreshSubscriber(async () => {
            await authClient(originalRequest).then(resolve);
          });
        });
      }
    }

    console.error(`❌ [AUTH] 응답 에러:`, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// 하위호환성을 위해 기본값 export
export default publicClient;
