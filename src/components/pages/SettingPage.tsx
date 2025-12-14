import { useEffect, useState } from 'react';
import supabase from '../../apis/supabase';
import Header from '../organisms/Header/Header';
import { SettingList } from '../organisms/SettingList/SettingList';
import { UserProfileCard } from '../organisms/UserProfileCard/UserProfileCard';
import { getUserProfileData } from '../../apis/user';
import type { Profile } from '../../domain/user';

const SettingPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const handleAccountDeletion = () => {
    console.log('[미구현] 회원탈퇴 액션');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfileData();
        setProfile(data);
      } catch (_) {
        // TODO : 에러 발생 시 UI/UX 기획 필요
        alert('사용자 프로필 정보를 불러오는 데에 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchProfileData();
  }, []);

  // TODO : 로딩 스피너 같은 거 필요할 듯
  if (!profile) return null;

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
          { label: '회원탈퇴', handleNavigate: handleAccountDeletion },
        ]}
      />
    </div>
  );
};

export default SettingPage;
