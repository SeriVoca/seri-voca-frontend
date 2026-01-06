import { useEffect, useState } from 'react';
import { getUserProfileData } from '@/apis/user';
import type { Profile } from '@/domain/user';
import type { AsyncState } from '@/shared/types/asyncState';
import { SettingPageTemplate } from '@/components/templates/SettingPageTemplate/SettingPageTemplate';
import { logout } from '@/apis/auth';

export const SettingPage = () => {
  const [profile, setProfile] = useState<AsyncState<Profile>>({ status: 'idle' });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (_error) {
      // TODO: 로그아웃 실패 UI 필요
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
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
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <SettingPageTemplate
      profile={profile.data}
      handleLogout={handleLogout}
      handleAccountDeletion={handleAccountDeletion}
    />
  );
};
