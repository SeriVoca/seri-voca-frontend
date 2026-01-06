import { LoginPageTemplate } from '@/components/templates/LoginPageTemplate/LoginPageTemplate';
import { signInWithKakao } from '@/apis/auth';

export const LoginPage = () => {
  const handleSignIn = async () => {
    try {
      await signInWithKakao();
    } catch (_error) {
      // TODO: 로그인 실패 UI 필요
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return <LoginPageTemplate handleSignIn={handleSignIn} />;
};
