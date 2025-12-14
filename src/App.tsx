import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import supabase from './apis/supabase'; // 경로 확인
import { useAuthStore } from './store/useAuthStore';
import router from './router';
import { authTokenStore } from './store/authTokenStore';

function App() {
  const { setLogin, setLogout } = useAuthStore();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    // 1. 앱 켜지자마자 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setLogin(session.user);
        authTokenStore.set(session.access_token);
      } else {
        setLogout();
        authTokenStore.set(null);
      }
      setIsAuthInitialized(true); // 초기화 완료
    });

    // 2. 로그인 상태 변화 실시간 감지 (로그인, 로그아웃 시 자동 실행)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setLogin(session.user); // 스토어 업데이트
        authTokenStore.set(session.access_token);
      } else {
        setLogout(); // 스토어 초기화
        authTokenStore.set(null);
      }
      setIsAuthInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, [setLogin, setLogout]);

  // 인증 상태 확인 전에는 아무것도 안 보여주거나 로딩 스피너 노출
  // TODO: 로딩 스피너 UI 개발
  if (!isAuthInitialized) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
