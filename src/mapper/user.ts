import type { GetUserProfileDataResponse } from '@/apis/user/types';
import type { Profile } from '@/domain/user';

export const mapUserProfileResponseToDomain = (response: GetUserProfileDataResponse): Profile => {
  return {
    id: response.id,
    email: response.email,
    name: response.nickname,
    profile_image_url: response.avatar_url,
  };
};
