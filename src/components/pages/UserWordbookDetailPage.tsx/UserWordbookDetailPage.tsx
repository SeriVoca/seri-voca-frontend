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

      {/* 단어장 선택 모달 */}
      <ModalPortal id={CREATE_WORD_MODAL}>
        <div className="flex flex-col gap-[1rem]">
          <h2 className="text-lg font-semibold">단어를 생성해주세요.</h2>
          <div className="flex flex-col gap-[0.5rem]">
            <h3 className="font-semibold">영어</h3>
            <Input value={newWord.textEn} onChange={handleEngChange} />
            <h3 className="font-semibold">뜻</h3>
            {newWord.meanings.map((meaning, idx) => (
              <div key={idx} className="flex gap-2">
                <PartOfSpeechDropdown selected={meaning.partOfSpeech} />
                <Input value={meaning.textKo} onChange={(e) => handleMeaningChange(idx, e)} />
                <button onClick={() => handleDeleteMeaning(idx)} className="flex items-center">
                  <Icon name="Trash" color="#FF8C8C" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="text-left text-sm text-[#9d9d9d]"
            onClick={handleAddMeaning}
          >
            뜻 추가하기
          </button>
          <div className="flex justify-center gap-[0.5rem]">
            <Button content="생성" variant="primary" onClick={handleCreateWordSubmit} />
            <Button content="취소" variant="secondary" onClick={handleCreateWordCancel} />
          </div>
        </div>
      </ModalPortal>
    </div>
  );
};
