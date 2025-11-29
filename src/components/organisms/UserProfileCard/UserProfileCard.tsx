type Props = {
  profileImage: string | null;
  name: string;
  email: string;
};

export const UserProfileCard = ({ profileImage, name, email }: Props) => {
  return (
    <section className="flex py-[1.25rem] pr-[3.62rem] pl-[1.75rem]">
      <div className="flex items-center gap-[1.75rem]">
        <div className="h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full">
          {profileImage ? (
            <img src={profileImage} alt="프로필 이미지" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="text-xl font-semibold">{name}님</h2>
          <p className="text-gray-400">{email}</p>
        </div>
      </div>
    </section>
  );
};
