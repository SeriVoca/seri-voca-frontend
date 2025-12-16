import { useEffect, useState } from 'react';
import supabase from '../../apis/supabase';
import Header from '../organisms/Header/Header';
import { SettingList } from '../organisms/SettingList/SettingList';
import { UserProfileCard } from '../organisms/UserProfileCard/UserProfileCard';
import { getUserProfileData } from '../../apis/user';
import type { Profile } from '../../domain/user';
import type { AsyncState } from '../../shared/types/asyncState';

const SettingPage = () => {
  const [profile, setProfile] = useState<AsyncState<Profile>>({ status: 'idle' });

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
        setProfile({ status: 'loading' });
        const data = await getUserProfileData();
        setProfile({ status: 'success', data: data });
      } catch (_) {
        // TODO : 에러 발생 시 UI/UX 기획 필요
        setProfile({ status: 'error' });
        alert('사용자 프로필 정보를 불러오는 데에 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchProfileData();
  }, []);

  switch (profile.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>Error occurred while fetching words.</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Setting Page" />
      <div className="h-[0.75rem] w-full"></div>
      <UserProfileCard
        profileImage={profile.data.profile_image_url}
        email={profile.data.email}
        name={profile.data.name}
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
