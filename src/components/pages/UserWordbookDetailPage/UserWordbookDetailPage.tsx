import type { PartOfSpeech, Word } from '@/domain/word';
import { useModalStore } from '@/store/useModalStore';
import React, { useEffect, useRef, useState } from 'react';
import { UserWordbookDetailPageTemplate } from '@/components/templates/UserWordbookDetailPageTemplate/UserWordbookDetailPageTemplate';
import { ROUTES } from '@/router/path';
import { useNavigate, useParams } from 'react-router-dom';
import type { AsyncState } from '@/shared/types/asyncState';
import { createUserWord, deleteUserWordList, getWordList } from '@/apis/word';
import { useWordSelection } from '@/hooks/useWordSelection';

export const UserWordbookDetailPage = () => {
  const navigate = useNavigate();
  const createEmptyWord = (): Word => ({
    id: crypto.randomUUID(),
    textEn: '',
    meanings: [
      {
        partOfSpeech: 'noun',
        textKo: '',
      },
    ],
  });
  const [words, setWords] = useState<AsyncState<Word[]>>({ status: 'idle' });
  const [newWord, setNewWord] = useState<Word>(createEmptyWord());
  const { wordbookId } = useParams<{ wordbookId: string }>();

  // Delete mode
  const [deleteMode, setDeleteMode] = useState(false);
  const allWordIds = words.status === 'success' ? words.data.map((word) => word.id) : [];
  const { selectedIds, selectAll, toggle, clear } = useWordSelection(allWordIds);

  // Header kebab menu
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);
  const kebabButtonRef = useRef<HTMLButtonElement | null>(null);

  const openCreateWordModal = useModalStore((s) => s.open);
  const closeCreateWordModal = useModalStore((s) => s.close);

  const isCreateWordValid =
    newWord.textEn.trim() !== '' &&
    newWord.meanings.every((meaning) => meaning.textKo.trim() !== '');

  useEffect(() => {
    if (!wordbookId) return;

    const fetchWords = async () => {
      try {
        setWords({ status: 'loading' });
        const data = await getWordList(wordbookId);
        setWords({ status: 'success', data });
      } catch (_) {
        setWords({ status: 'error' });
      }
    };
    fetchWords();
  }, [wordbookId]);

  const handleKebabMenuOpen = (flag: boolean) => {
    if (flag) setIsKebabMenuOpen(true);
    else setIsKebabMenuOpen(false);
  };

  const handleEngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewWord((prev) => ({ ...prev, textEn: value }));
  };
  const handlePartOfSpeechChange = (idx: number, nextPartOfSpeech: PartOfSpeech) => {
    setNewWord((prev) => {
      const updated = [...prev.meanings];
      updated[idx] = {
        ...updated[idx],
        partOfSpeech: nextPartOfSpeech,
      };
      return { ...prev, meanings: updated };
    });
  };
  const handleMeaningChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewWord((prev) => {
      const updated = [...prev.meanings];
      updated[idx] = {
        ...updated[idx],
        textKo: value,
      };

      return {
        ...prev,
        meanings: updated,
      };
    });
  };
  const handleAddMeaning = () => {
    setNewWord((prev) => ({
      ...prev,
      meanings: [
        ...prev.meanings,
        {
          partOfSpeech: 'noun',
          textKo: '',
        },
      ],
    }));
  };
  const handleDeleteMeaning = (idxToDelete: number) => {
    setNewWord((prev) => {
      const nextMeanings = prev.meanings.filter((_, idx) => idx !== idxToDelete);

      // 최소 1개는 항상 유지
      if (nextMeanings.length === 0) {
        return {
          ...prev,
          meanings: [
            {
              partOfSpeech: 'noun',
              textKo: '',
            },
          ],
        };
      }

      return { ...prev, meanings: nextMeanings };
    });
  };

  const CREATE_WORD_MODAL_ID = 'create-word-modal';

  const resetCreateWordForm = () => {
    setNewWord(createEmptyWord());
  };

  const handleCreateWordSubmit = async () => {
    if (!wordbookId || !isCreateWordValid) return;

    try {
      const createdWord = await createUserWord(wordbookId, newWord);
      alert('단어 생성에 성공했습니다.');

      setWords((prev) => {
        if (prev.status !== 'success') {
          return prev;
        }

        return { status: 'success', data: [...prev.data, createdWord] };
      });
    } catch (_) {
      // TODO: 에러 UI/UX 기획 필요
      alert('단어 생성에 실패했습니다. 다시 시도해주세요.');
    }

    resetCreateWordForm();
    closeCreateWordModal(CREATE_WORD_MODAL_ID);
  };

  const handleCreateWordCancel = () => {
    resetCreateWordForm();
    closeCreateWordModal(CREATE_WORD_MODAL_ID);
  };

  const handleOpenCreateWordModal = () => {
    resetCreateWordForm();
    openCreateWordModal(CREATE_WORD_MODAL_ID);
  };

  const clearDeleteMode = () => {
    setDeleteMode(false);
    clear();
  };

  const handleOpenDeleteMode = () => {
    handleKebabMenuOpen(false);
    clear();
    setDeleteMode(true);
  };

  const handleDeleteWords = async () => {
    if (!wordbookId || selectedIds.size === 0) {
      alert('삭제할 단어를 선택해주세요.');
      return;
    }

    try {
      const requestedWordIds = Array.from(selectedIds);
      const { wordIds: deletedWordIds } = await deleteUserWordList(wordbookId, requestedWordIds);
      const deletedWordIdSet = new Set(deletedWordIds);

      setWords((prev) => {
        if (prev.status !== 'success') return prev;
        return {
          status: 'success',
          data: prev.data.filter((word) => !deletedWordIdSet.has(word.id)),
        };
      });
      clearDeleteMode();

      if (requestedWordIds.length !== deletedWordIds.length) {
        const failedWordCount = requestedWordIds.length - deletedWordIds.length;
        alert(`${failedWordCount}개의 단어 삭제에 실패했습니다.`);
        return;
      }

      alert('단어 삭제에 성공했습니다.');
    } catch (_) {
      // TODO: 에러 UI/UX 기획 필요
      alert('단어 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS; // TODO: '나의 단어장' 탭이 보여야 하는지 확인 필요
    navigate(path);
  };

  switch (words.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <UserWordbookDetailPageTemplate
      words={words.data}
      // kebab menu props
      isKebabMenuOpen={isKebabMenuOpen}
      handleKebabMenuOpen={handleKebabMenuOpen}
      kebabAnchorRef={kebabButtonRef}
      // create word modal props
      createWordModalId={CREATE_WORD_MODAL_ID}
      newWord={newWord}
      isCreateWordValid={isCreateWordValid}
      onEngChange={handleEngChange}
      onPartOfSpeechChange={handlePartOfSpeechChange}
      onMeaningChange={handleMeaningChange}
      onAddMeaning={handleAddMeaning}
      onDeleteMeaning={handleDeleteMeaning}
      onSubmit={handleCreateWordSubmit}
      onCancel={handleCreateWordCancel}
      onClose={resetCreateWordForm}
      onNavigate={handleNavigate}
      onOpenCreateWordModal={handleOpenCreateWordModal}
      // delete word dashboard props
      deleteMode={deleteMode}
      selectedIds={selectedIds}
      onToggleWordSelection={toggle}
      onAllSelect={selectAll}
      onDeleteWords={handleDeleteWords}
      onCancelDelete={clearDeleteMode}
      onOpenDeleteMode={handleOpenDeleteMode}
    />
  );
};
