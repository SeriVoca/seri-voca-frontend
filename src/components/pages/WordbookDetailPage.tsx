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
      } catch (error) {
        console.error('Failed to fetch words:', error);
      }
    };
    fetchWords();
  }, [wordbookId]);

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
