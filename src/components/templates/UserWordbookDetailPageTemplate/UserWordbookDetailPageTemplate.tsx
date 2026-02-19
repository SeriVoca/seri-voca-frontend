import React from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { WordList } from '@/components/organisms/WordList/WordList';
import { CreateWordModalContent } from '@/components/organisms/CreateWordModal/CreateWordModalContent';
import type { Word } from '@/domain/word';

interface Props {
  title?: string;
  words: Word[];
  /** ModalPortal id */
  createWordModalId: string;
  /** CreateWordModalContent props */
  newWord: Word;
  isCreateWordValid: boolean;
  onEngChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMeaningChange: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMeaning: () => void;
  onDeleteMeaning: (idxToDelete: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  /** Header actions */
  onNavigate: () => void;
  onOpenCreateWordModal: () => void;
}

export const UserWordbookDetailPageTemplate = ({
  title = '단어장 상세 페이지',
  words,
  createWordModalId,
  newWord,
  isCreateWordValid,
  onEngChange,
  onMeaningChange,
  onAddMeaning,
  onDeleteMeaning,
  onSubmit,
  onCancel,
  onNavigate,
  onOpenCreateWordModal,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title={title}
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={onNavigate}
        RCTAIcon="Plus"
        onRCTAClick={onOpenCreateWordModal}
      />

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>

      <ModalPortal id={createWordModalId}>
        <CreateWordModalContent
          newWord={newWord}
          isCreateWordValid={isCreateWordValid}
          onAddMeaning={onAddMeaning}
          onDeleteMeaning={onDeleteMeaning}
          onEngChange={onEngChange}
          onMeaningChange={onMeaningChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </ModalPortal>
    </div>
  );
};
