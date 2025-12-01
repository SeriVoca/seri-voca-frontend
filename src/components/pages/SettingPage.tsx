import Header from '../organisms/Header/Header';
import { SettingList } from '../organisms/SettingList/SettingList';
import { UserProfileCard } from '../organisms/UserProfileCard/UserProfileCard';

const SettingPage = () => {
  const handleLogout = () => {
    console.log('[미구현] 로그아웃 액션');
  };

  const handleAccountDeletion = () => {
    console.log('[미구현] 회원탈퇴 액션');
  };

  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Setting Page" />
      <div className="h-[0.75rem] w-full"></div>
      <UserProfileCard
        profileImage={profileData.profileImage}
        email={profileData.email}
        name={profileData.name}
      />
      <div className="h-[0.5rem] w-full"></div>
      <SettingList
        items={[
          { label: '로그아웃', handleNavigate: handleLogout },
          { label: '회원탈퇴', handleNavigate: handleAccountDeletion },
        ]}
      />
    </div>
  );
};

export default SettingPage;

// mock data

const profileData = {
  profileImage: '',
  email: 'hong@example.com',
  name: '박진주',
};
