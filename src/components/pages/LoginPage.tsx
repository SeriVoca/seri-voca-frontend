import supabase from '../../apis/supabaseInstance';
import { ROUTES } from '../../router/path';
import KakaoLoginButton from '../molecules/KakaoLoginButton/KakaoLoginButton';

const BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL!;

const LoginPage = () => {
  // TODO : api 컨벤션 논의
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: BASE_URL + ROUTES.WORDBOOKS,
      },
    });
    console.log(data, error);
  };

  return (
    <div className="flex h-full w-full flex-col items-center bg-white">
      <div className="mt-[12.5rem] text-[3rem]">Serivoca</div>
      <div className="mt-auto w-full p-5">
        <KakaoLoginButton handleClick={signInWithKakao} />
      </div>
    </div>
  );
};

export default LoginPage;
