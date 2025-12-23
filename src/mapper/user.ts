import type { GetUserProfileDataResponse } from '@/apis/user/types';
import type { Profile } from '@/domain/user';

export const mapUserProfileResponseToDomain = (response: GetUserProfileDataResponse): Profile => {
  return {
    email: response.email,
    name: response.name,
    profile_image_url: response.profile_image_url,
  };
};
