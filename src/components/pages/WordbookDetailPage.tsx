import { useNavigate, useParams } from 'react-router-dom';
import Header from '../organisms/Header/Header';
import { WordList } from '../organisms/WordList/WordList';
import { ROUTES } from '../../router/path';
import { useEffect, useState } from 'react';
import type { Word } from '../../domain/word';
import { getWordList } from '../../api/word';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<Word[]>([]);
  const { wordbookId } = useParams<{ wordbookId: string }>();

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS;
    navigate(path);
  };

  useEffect(() => {
    if (!wordbookId) return;

    const fetchWords = async () => {
      try {
        const data = await getWordList(wordbookId!);
        setWords(data);
      } catch (_) {
        // TODO: 에러 발생 시 UI/UX 기획 필요
        alert('단어 목록을 불러오는 데에 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchWords();
  }, [wordbookId]);

  // TODO: 로딩 처리
  if (!words) return null;

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={handleNavigate}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>
    </div>
  );
};
