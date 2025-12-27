import KakaoLoginButton from '@/components/molecules/KakaoLoginButton/KakaoLoginButton';

type Props = {
  handleSignIn: () => void;
};

export const LoginPageTemplate = ({ handleSignIn }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-white">
      <div className="mt-[12.5rem] text-[3rem]">Serivoca</div>
      <div className="mt-auto w-full p-5">
        <KakaoLoginButton handleClick={handleSignIn} />
      </div>
    </div>
  );
};

export default LoginPageTemplate;
