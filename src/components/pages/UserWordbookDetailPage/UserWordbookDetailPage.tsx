import type { PartOfSpeech, Word } from '@/domain/word';
import { useModalStore } from '@/store/useModalStore';
import React, { useRef, useState } from 'react';
import { UserWordbookDetailPageTemplate } from '@/components/templates/UserWordbookDetailPageTemplate/UserWordbookDetailPageTemplate';
import { ROUTES } from '@/router/path';
import { useNavigate } from 'react-router-dom';

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
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState<Word>(createEmptyWord());

  // Header kebab menu
  const [isKebabMenuOpen, setIsKebabMenuOpen] = useState<boolean>(false);
  const kebabButtonRef = useRef<HTMLButtonElement | null>(null);

  const openCreateWordModal = useModalStore((s) => s.open);
  const closeCreateWordModal = useModalStore((s) => s.close);

  const isCreateWordValid =
    newWord.textEn.trim() !== '' &&
    newWord.meanings.every((meaning) => meaning.textKo.trim() !== '');

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

  const CREATE_WORD_MODAL = 'create-word-modal';

  const resetCreateWordForm = () => {
    setNewWord(createEmptyWord());
  };

  const handleCreateWordSubmit = () => {
    setWords((prev) => [...prev, newWord]);

    resetCreateWordForm();
    closeCreateWordModal(CREATE_WORD_MODAL);
  };

  const handleCreateWordCancel = () => {
    resetCreateWordForm();
    closeCreateWordModal(CREATE_WORD_MODAL);
  };

  const handleOpenCreateWordModal = () => {
    resetCreateWordForm();
    openCreateWordModal(CREATE_WORD_MODAL);
  };

  const handleNavigate = () => {
    const path = ROUTES.WORDBOOKS; // TODO: '나의 단어장' 탭이 보여야 하는지 확인 필요
    navigate(path);
  };
  return (
    <UserWordbookDetailPageTemplate
      words={words}
      // kebab menu props
      isKebabMenuOpen={isKebabMenuOpen}
      handleKebabMenuOpen={handleKebabMenuOpen}
      kebabAnchorRef={kebabButtonRef}
      // create word modal props
      createWordModalId={CREATE_WORD_MODAL}
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
    />
  );
};
