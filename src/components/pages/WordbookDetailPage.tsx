import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header/Header';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={() => navigate(-1)}
      />
      <div>WordbookDetailPage</div>
    </div>
  );
};
