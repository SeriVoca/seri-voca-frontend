import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/apis/supabase';
import { NATIVE_AUTH_CALLBACK } from '@/apis/auth';

const applySessionFromUrl = async (url: string) => {
  // PKCE flow: ?code=... 로 돌아오는 경우
  const query = url.split('?')[1]?.split('#')[0] ?? '';
  const code = new URLSearchParams(query).get('code');
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return;
  }

  // implicit flow: #access_token=...&refresh_token=... 로 돌아오는 경우
  const hash = url.split('#')[1] ?? '';
  const params = new URLSearchParams(hash);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }
};

/**
 * 네이티브 앱에서 OAuth 딥링크 콜백을 수신해 Supabase 세션을 설정한다.
 * 세션이 설정되면 App.tsx의 onAuthStateChange가 나머지를 처리한다.
 * 반환값은 리스너 해제 함수(웹에서는 no-op).
 */
export const initNativeAuthListener = (): (() => void) => {
  if (!Capacitor.isNativePlatform()) return () => {};

  const handlePromise = App.addListener('appUrlOpen', async ({ url }) => {
    if (!url.startsWith(NATIVE_AUTH_CALLBACK)) return;

    try {
      await applySessionFromUrl(url);
    } catch (error) {
      console.error('[ERROR] 딥링크 세션 처리 실패: ', error);
    } finally {
      // OAuth용 인앱 브라우저 닫기
      await Browser.close().catch(() => {});
    }
  });

  return () => {
    handlePromise.then((handle) => handle.remove());
  };
};
