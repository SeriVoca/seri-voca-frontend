type Props = {
  handleClick: () => void;
};

const KakaoLoginButton = ({ handleClick }: Props) => {
  return (
    <button
      onClick={handleClick}
      className="flex h-[3rem] w-full items-center rounded-[0.75rem] bg-[#FEE500] px-[1.5rem]"
    >
      <img src="src/assets/chat-bubble.svg" alt="카카오 로고" />
      <div className="flex-1 text-[15px] font-semibold">카카오 로그인</div>
    </button>
  );
};

export default KakaoLoginButton;
