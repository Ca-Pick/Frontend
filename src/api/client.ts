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

// 공유 인터셉터
const setupInterceptors = (instance: typeof axios, label: string) => {
  instance.interceptors.request.use(
    (config) => {
      console.log(`🚀 [${label}] 요청:`, config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error(`❌ [${label}] 요청 에러:`, error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(`✅ [${label}] 응답:`, response.status, response.config.url);
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.warn(`⚠️ [${label}] 인증 실패 (401) - 토큰 갱신 필요`);
      }
      console.error(`❌ [${label}] 응답 에러:`, error.response?.status, error.message);
      return Promise.reject(error);
    }
  );
};

setupInterceptors(publicClient, 'PUBLIC');
setupInterceptors(authClient, 'AUTH');

// 하위호환성을 위해 기본값 export
export default publicClient;
