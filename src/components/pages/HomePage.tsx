import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../router/path';

const HomePage = () => {
  // home page 미구현
  // 구현 전까지는 wordbooks page 로 redirect
  return <Navigate to={ROUTES.WORDBOOKS} replace />;
};

export default HomePage;
