import KakaoLoginButton from '../molecules/KakaoLoginButton/KakaoLoginButton';

const LoginPage = () => {
  const handleClick = () => {
    // login
  };

  return (
    <div className="flex h-full w-full flex-col items-center bg-white">
      <div className="mt-[12.5rem] text-[3rem]">Serivoca</div>
      <div className="mt-auto w-full p-5">
        <KakaoLoginButton handleClick={handleClick} />
      </div>
    </div>
  );
};

export default LoginPage;
