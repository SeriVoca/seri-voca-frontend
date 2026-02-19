import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';
import { PartOfSpeechDropdown } from '@/components/organisms/PartOfSpeechDropdown/PartOfSpeechDropdown';
import { Header } from '@/components/organisms/Header/Header';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { WordList } from '@/components/organisms/WordList/WordList';
import type { Word } from '@/domain/word';
import { useModalStore } from '@/store/useModalStore';
import React, { useState } from 'react';
import { Icon } from '@/components/atoms/Icon/Icon';

export const UserWordbookDetailPage = () => {
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

  const openCreateWordModal = useModalStore((s) => s.open);
  const closeCreateWordModal = useModalStore((s) => s.close);

  const handleEngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewWord((prev) => ({ ...prev, textEn: value }));
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

  const handleCreateWordSubmit = () => {
    setWords((prev) => [...prev, newWord]);

    setNewWord(createEmptyWord()); // 입력 폼 초기화
    closeCreateWordModal(CREATE_WORD_MODAL);
  };

  const handleCreateWordCancel = () => {
    setNewWord(createEmptyWord());
    closeCreateWordModal(CREATE_WORD_MODAL);
  };

  const handleOpenCreateWordModal = () => {
    setNewWord(createEmptyWord());
    openCreateWordModal(CREATE_WORD_MODAL);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={() => {}}
        RCTAIcon="Plus"
        onRCTAClick={handleOpenCreateWordModal}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>
    </div>
  );
};
