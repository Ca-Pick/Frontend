import axios from 'axios';

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
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
    console.log('🔄 토큰 재발급 요청 중...');
    const response = await authClient.post('/auth/reissue', {});
    console.log('✅ 토큰 재발급 성공');
    return true;
  } catch (error: any) {
    console.error('❌ 토큰 재발급 실패:', error.response?.data?.code);
    // 토큰 재발급 실패 → 로그인 페이지로
    window.location.href = '/login';
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
        } else {
          // 토큰 재발급 실패 → 로그인 페이지로 이동 (현재 경로 저장)
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
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
