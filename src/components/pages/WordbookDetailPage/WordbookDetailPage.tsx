import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { Word } from '@/domain/word';
import { getWordList } from '@/apis/word';
import type { AsyncState } from '@/shared/types/asyncState';
import { WordbookDetailPageTemplate } from '@/components/templates/WordbookDetailPageTemplate/WordbookDetailPageTemplate';
import { ROUTES } from '@/router/path';
import { useModalStore } from '@/store/useModalStore';
import { MOCK_WORDBOOKS_10 } from '@/components/pages/WordbookDetailPage/mock';
import type { Wordbook } from '@/domain/wordbook';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<AsyncState<Word[]>>({ status: 'idle' });
  const { wordbookId } = useParams<{ wordbookId: string }>();

  // interactive ui state

  // Header kebab menu
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);
  const kebabButtonRef = useRef<HTMLButtonElement | null>(null);

  // Wordbook select modal
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const wordbookSelectModalId = 'wordbook-select-modal';

  // Select mode
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedWordbook, setSelectedWordbook] = useState<Wordbook>();

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS;
    navigate(path);
  };

  const handleKebabMenuOpen = (flag: boolean) => {
    if (flag) setIsKebabMenuOpen(true);
    else setIsKebabMenuOpen(false);
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
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  console.log('[WordbookDetailPage] ', selectedWordbook);

  return (
    <WordbookDetailPageTemplate
      words={words.data}
      handleNavigate={handleNavigate}
      isKebabMenuOpen={isKebabMenuOpen}
      handleKebabMenuOpen={handleKebabMenuOpen}
      kebabAnchorRef={kebabButtonRef}
      openWordbookSelectModal={() => open(wordbookSelectModalId)}
      closeWordbookSelectModal={() => close(wordbookSelectModalId)}
      wordbookSelectModalId={wordbookSelectModalId}
      myWordbooks={MOCK_WORDBOOKS_10}
      selectMode={selectMode}
      selectedWordbook={selectedWordbook}
      setSelectedWordbook={setSelectedWordbook}
    />
  );
};
