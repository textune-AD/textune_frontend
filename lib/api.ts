// 📁 lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export const API = {
  ANALYZE: process.env.NEXT_PUBLIC_API_ANALYZE_ENDPOINT ?? `${API_BASE_URL}/analyze`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  USER_CREATE: `${API_BASE_URL}/users`, // 사용자 정보를 POST로 보내기
};