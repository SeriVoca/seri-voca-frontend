import type { PartOfSpeech, Word } from '@/domain/word';
import { useModalStore } from '@/store/useModalStore';
import React, { useEffect, useRef, useState } from 'react';
import { UserWordbookDetailPageTemplate } from '@/components/templates/UserWordbookDetailPageTemplate/UserWordbookDetailPageTemplate';
import { ROUTES } from '@/router/path';
import { useNavigate, useParams } from 'react-router-dom';
import type { AsyncState } from '@/shared/types/asyncState';
import { createUserWord, getWordList } from '@/apis/word';
import { deleteUserWordbook } from '@/apis/wordbook';

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
  const [isDeletingWordbook, setIsDeletingWordbook] = useState<boolean>(false);
  const isDeletingWordbookRef = useRef<boolean>(false);
  const { wordbookId } = useParams<{ wordbookId: string }>();

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

  const handleDeleteWordbook = async () => {
    if (!wordbookId || isDeletingWordbook || isDeletingWordbookRef.current) return;

    // TODO: confirm이 동기 블로킹이라 위 setState가 화면에 반영되기 전에 다이얼로그가 뜬다.
    // 커스텀 모달로 교체하면 해소될 예정.
    setIsKebabMenuOpen(false);

    const shouldDelete = window.confirm(
      '단어장을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?',
    );
    if (!shouldDelete) return;

    isDeletingWordbookRef.current = true;
    setIsDeletingWordbook(true);

    try {
      await deleteUserWordbook(wordbookId);
      alert('단어장이 삭제되었습니다.');
      navigate(ROUTES.WORDBOOKS);
    } catch (_) {
      alert('단어장 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      isDeletingWordbookRef.current = false;
      setIsDeletingWordbook(false);
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
      onDeleteWordbook={handleDeleteWordbook}
    />
  );
};
