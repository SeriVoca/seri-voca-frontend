import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header/Header';
import type { WordDetailProps } from '../molecules/WordDetail/WordDetail';
import { WordList } from '../organisms/WordList/WordList';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={() => navigate(-1)}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={mockWordList} />
      </div>
    </div>
  );
};

export const mockWordList: WordDetailProps[] = [
  { engWord: 'abstract', korWord: '추상적인' },
  { engWord: 'benevolent', korWord: '자애로운' },
  { engWord: 'contemplate', korWord: '숙고하다' },
  { engWord: 'diligent', korWord: '성실한' },
  { engWord: 'elevate', korWord: '향상시키다' },
  { engWord: 'abstract', korWord: '추상적인' },
  { engWord: 'benevolent', korWord: '자애로운' },
  { engWord: 'contemplate', korWord: '숙고하다' },
  { engWord: 'diligent', korWord: '성실한' },
  { engWord: 'elevate', korWord: '향상시키다' },
  { engWord: 'abstract', korWord: '추상적인' },
  { engWord: 'benevolent', korWord: '자애로운' },
  { engWord: 'contemplate', korWord: '숙고하다' },
  { engWord: 'diligent', korWord: '성실한' },
  { engWord: 'elevate', korWord: '향상시키다' },
];
