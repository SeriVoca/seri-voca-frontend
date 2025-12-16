import { useNavigate, useParams } from 'react-router-dom';
import Header from '../organisms/Header/Header';
import { WordList } from '../organisms/WordList/WordList';
import { ROUTES } from '../../router/path';
import { useEffect, useState } from 'react';
import type { Word } from '../../domain/word';
import { getWordList } from '../../api/word';
import type { AsyncState } from '../../shared/types/asyncState';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<AsyncState<Word[]>>({ status: 'idle' });
  const { wordbookId } = useParams<{ wordbookId: string }>();

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS;
    navigate(path);
  };

  useEffect(() => {
    if (!wordbookId) return;

    const fetchWords = async () => {
      try {
        setWords({ status: 'loading' });
        const data = await getWordList(wordbookId);
        setWords({ status: 'success', data });
      } catch (_) {
        // TODO: 에러 발생 시 UI/UX 기획 필요
        setWords({ status: 'error' });
        alert('단어 목록을 불러오는 중에 오류가 발생했습니다.');
      }
    };
    fetchWords();
  }, [wordbookId]);

  // data status가 success가 아닐 때의 처리
  // TODO: 로딩, 에러 UI/UX 기획 필요
  switch (words.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>Error occurred while fetching words.</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={handleNavigate}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words.data} />
      </div>
    </div>
  );
};
