import Header from '@/components/organisms/Header/Header';
import { SettingList } from '@/components/organisms/SettingList/SettingList';
import { UserProfileCard } from '@/components/organisms/UserProfileCard/UserProfileCard';
import type { Profile } from '@/domain/user';

type Props = {
  profile: Profile;
  handleLogout: () => Promise<void> | (() => void);
  handleAccountDeletion: () => void;
};

export const SettingPageTemplate = ({ profile, handleLogout }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Setting Page" />
      <div className="h-[0.75rem] w-full"></div>
      <UserProfileCard
        profileImage={profile.profile_image_url}
        email={profile.email}
        name={profile.name}
      />
      <div className="h-[0.5rem] w-full"></div>
      <SettingList
        items={[
          { label: '로그아웃', handleNavigate: handleLogout },
          // TODO : 회원 탈퇴 API 개발 시 복구
          // { label: '회원탈퇴', handleNavigate: handleAccountDeletion },
        ]}
      />
    </div>
  );
};

export default SettingPageTemplate;
