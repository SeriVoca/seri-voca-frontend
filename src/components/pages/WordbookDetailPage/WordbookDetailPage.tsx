import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Word } from '@/domain/word';
import { getWordList } from '@/apis/word';
import type { AsyncState } from '@/shared/types/asyncState';
import { combineAsyncStates } from '@/shared/types/asyncState';
import { WordbookDetailPageTemplate } from '@/components/templates/WordbookDetailPageTemplate/WordbookDetailPageTemplate';
import { ROUTES } from '@/router/path';
import { useModalStore } from '@/store/useModalStore';
import type { Wordbook } from '@/domain/wordbook';
import { useWordSelection } from '@/hooks/useWordSelection';
import { getUserWordbookList, createUserWordbook } from '@/apis/wordbook';

export const WordbookDetailPage = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<AsyncState<Word[]>>({ status: 'idle' });
  const { wordbookId } = useParams<{ wordbookId: string }>();

  // Header kebab menu
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);
  const kebabButtonRef = useRef<HTMLButtonElement | null>(null);

  // Wordbook select modal
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  const wordbookSelectModalId = 'wordbook-select-modal';
  const [userWordbooks, setUserWordbooks] = useState<AsyncState<Wordbook[]>>({ status: 'idle' });

  // Wordbook create modal
  const wordbookCreateModalId = 'wordbook-create-modal';
  const isWordbookCreateModalOpen = useModalStore((s) => s.isOpen(wordbookCreateModalId));
  const [wordbookName, setWordbookName] = useState<string>('');

  // Select mode
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedWordbook, setSelectedWordbook] = useState<Wordbook | null>(null);
  const allIds = words.status === 'success' ? words.data.map((word) => word.id) : [];
  const { selectedIds, selectAll, toggle, clear } = useWordSelection(allIds);
  const selectModeClear = () => {
    setSelectMode(false);
    setSelectedWordbook(null);
    clear();
  };

  const fetchUserWordbooks = useCallback(async () => {
    try {
      const data = await getUserWordbookList();
      setUserWordbooks({ status: 'success', data });
    } catch (_) {
      setUserWordbooks({ status: 'error' });
    }
  }, []);

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS;
    navigate(path);
  };

  const handleKebabMenuOpen = (flag: boolean) => {
    if (flag) setIsKebabMenuOpen(true);
    else setIsKebabMenuOpen(false);
  };

  const handleSelectTargetWordbook = (wordbook: Wordbook) => {
    selectModeClear(); // 선택 제출 모드와 관련된 상태를 전부 초기화
    setSelectedWordbook(wordbook);
    setSelectMode(true);
    close(wordbookSelectModalId);
  };

  const handleWordsAdditionConfirm = () => {
    if (!selectedWordbook) {
      alert('단어장을 선택해주세요.');
      return;
    }
    if (selectedIds.size === 0) {
      alert('선택된 단어가 없습니다.');
      return;
    }

    // POST /wordbooks/:wordbookId/words/system api 요청
    alert('POST /wordbooks/:wordbookId/words/system api 요청');

    selectModeClear();
  };

  const handleWordsAdditionCancel = () => {
    selectModeClear();
  };

  const handleWordbookCreateModalSubmit = async () => {
    if (wordbookName.trim() === '') {
      alert('단어장 이름을 입력해주세요.');
      return;
    }
    try {
      await createUserWordbook(wordbookName, null);
      await fetchUserWordbooks(); // 생성 후 사용자 단어장 목록 갱신
      setWordbookName('');
      close(wordbookCreateModalId);
    } catch (_) {
      // TODO: 에러 발생 시 UI/UX 기획 필요
      alert('단어장 생성 중에 오류가 발생했습니다.');
    }
  };

  const handleWordbookCreateModalCancel = () => {
    setWordbookName('');
    close(wordbookCreateModalId);
  };

  // fetch data
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

  useEffect(() => {
    fetchUserWordbooks();
  }, [fetchUserWordbooks]);

  // page에서 모든 fetch data의 예외처리를 끝내고, template 이하는 완결된 데이터를 가정한다.
  // TODO: 로딩, 에러 UI/UX 기획 필요
  const pageData = combineAsyncStates(words, userWordbooks);

  switch (pageData.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const [wordsData, userWordbooksData] = pageData.data;

  return (
    <WordbookDetailPageTemplate
      words={wordsData}
      handleNavigate={handleNavigate}
      // kebab menu props
      isKebabMenuOpen={isKebabMenuOpen}
      handleKebabMenuOpen={handleKebabMenuOpen}
      kebabAnchorRef={kebabButtonRef}
      openWordbookSelectModal={() => open(wordbookSelectModalId)}
      // wordbook select modal props
      wordbookSelectModal={{
        id: wordbookSelectModalId, // modal id
        wordbooks: userWordbooksData, // fetch data
        handleSelectTargetWordbook, // action
        handleWordbookCreateModalOpen: () => open(wordbookCreateModalId), // action
      }}
      // wordbook create modal props
      wordbookCreateModal={{
        isOpen: isWordbookCreateModalOpen,
        value: wordbookName,
        onChange: setWordbookName,
        onSubmit: handleWordbookCreateModalSubmit,
        onCancel: handleWordbookCreateModalCancel,
      }}
      // select mode props
      selectMode={selectMode}
      selectedWordbook={selectedWordbook}
      // select mode dashboard props
      selectedIds={selectedIds}
      toggleWordSelection={toggle}
      onAllSelect={selectAll}
      onConfirm={handleWordsAdditionConfirm}
      onCancel={handleWordsAdditionCancel}
    />
  );
};
