import { supabase } from '@/apis/supabase';
import { ROUTES } from '@/router/path';
import { LoginPageTemplate } from '@/components/templates/LoginPageTemplate/LoginPageTemplate';

const BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_CLIENT_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

export const LoginPage = () => {
  // TODO : api 컨벤션 논의
  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: BASE_URL + ROUTES.HOME,
      },
    });
    if (error) {
      // TODO : 로그인 실패 UX 기획 필요
      console.error('[ERROR] 로그인 실패: ', error);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return <LoginPageTemplate handleSignIn={signInWithKakao} />;
};
