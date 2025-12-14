import type { Profile } from '../../domain/user';
import { mapUserProfileResponseToDomain } from '../../mapper/user';
import { api } from '../axiosInstance';

export const getUserProfileData = async (): Promise<Profile> => {
  try {
    const res = await api.get('user/profile');
    return mapUserProfileResponseToDomain(res.data);
  } catch (error) {
    console.error('[ERROR] 사용자 프로필 정보 조회 실패: ', error);
    throw error;
  }
};
