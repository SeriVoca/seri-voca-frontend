import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { supabase } from '@/apis/supabase';
import { ROUTES } from '@/router/path';

const BASE_URL = import.meta.env.VITE_CLIENT_BASE_URL;

// 네이티브(iOS/Android) 앱에서 OAuth 완료 후 돌아올 딥링크 주소.
// AndroidManifest / iOS Info.plist 및 Supabase Redirect URL 허용목록과 반드시 일치해야 함.
export const NATIVE_AUTH_CALLBACK = 'com.serivoca.app://login-callback';

if (!BASE_URL) {
  throw new Error('VITE_CLIENT_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

export const signInWithKakao = async () => {
  const isNative = Capacitor.isNativePlatform();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // 웹은 기존 웹 주소로, 네이티브는 딥링크로 복귀
        redirectTo: isNative ? NATIVE_AUTH_CALLBACK : BASE_URL + ROUTES.HOME,
        // 네이티브는 자동 리다이렉트 대신 URL을 받아 인앱 브라우저로 직접 연다
        skipBrowserRedirect: isNative,
      },
    });

    if (error) throw error;

    if (isNative && data?.url) {
      await Browser.open({ url: data.url });
    }
  } catch (error) {
    console.error('[ERROR] 로그인 실패: ', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.log('[ERROR] 로그아웃 실패: ', error);
    throw error;
  }
};
