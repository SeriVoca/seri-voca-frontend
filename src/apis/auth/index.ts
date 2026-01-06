import { supabase } from '@/apis/supabase';
import { ROUTES } from '@/router/path';

const BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_CLIENT_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

export const signInWithKakao = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: BASE_URL + ROUTES.HOME,
      },
    });
  } catch (error) {
    console.error('[ERROR] 로그인 실패: ', error);
    throw error;
  }
};
