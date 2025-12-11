import supabase from '../../apis/supabaseInstance';
import KakaoLoginButton from '../molecules/KakaoLoginButton/KakaoLoginButton';

const LoginPage = () => {
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:5173/wordbooks',
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
