import React, { type RefObject } from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { WordList } from '@/components/organisms/WordList/WordList';
import { CreateWordModalContent } from '@/components/organisms/CreateWordModal/CreateWordModalContent';
import type { PartOfSpeech, Word } from '@/domain/word';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';

interface Props {
  title?: string;
  words: Word[];

  /** kebab menu props */
  isKebabMenuOpen: boolean;
  handleKebabMenuOpen: (flag: boolean) => Promise<void> | void;
  kebabAnchorRef: RefObject<HTMLButtonElement | null>;

  /** ModalPortal id */
  createWordModalId: string;

  /** CreateWordModalContent props */
  newWord: Word;
  isCreateWordValid: boolean;
  onEngChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPartOfSpeechChange: (idx: number, next: PartOfSpeech) => void;
  onMeaningChange: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMeaning: () => void;
  onDeleteMeaning: (idxToDelete: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onClose: () => void;

  /** Header actions */
  onNavigate: () => void;
  onOpenCreateWordModal: () => void;
}

export const UserWordbookDetailPageTemplate = ({
  title = '단어장 상세 페이지',
  words,
  isKebabMenuOpen,
  handleKebabMenuOpen,
  kebabAnchorRef,
  createWordModalId,
  newWord,
  isCreateWordValid,
  onEngChange,
  onPartOfSpeechChange,
  onMeaningChange,
  onAddMeaning,
  onDeleteMeaning,
  onSubmit,
  onCancel,
  onClose,
  onNavigate,
  onOpenCreateWordModal,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100">
      <Header
        title={title}
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={onNavigate}
        RCTAIcon="DotsVertical"
        onRCTAClick={() => handleKebabMenuOpen(true)}
        RCTARef={kebabAnchorRef}
      />

      <div className="mt-[0.5rem] flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>

      {/* 휘발성 오버레이 */}
      <KebabMenu
        open={isKebabMenuOpen}
        anchorRef={kebabAnchorRef}
        onClose={() => handleKebabMenuOpen(false)}
        UIProps={[
          {
            label: '단어 생성하기',
            handleClick: onOpenCreateWordModal,
          },
          {
            label: '단어 삭제하기',
            handleClick: () => alert('준비 중입니다.'),
          },
          {
            label: '단어장 삭제하기',
            handleClick: () => alert('준비 중입니다.'),
          },
        ]}
      />

      <ModalPortal id={createWordModalId} onClose={onClose}>
        <CreateWordModalContent
          newWord={newWord}
          isCreateWordValid={isCreateWordValid}
          onAddMeaning={onAddMeaning}
          onDeleteMeaning={onDeleteMeaning}
          onEngChange={onEngChange}
          onPartOfSpeechChange={onPartOfSpeechChange}
          onMeaningChange={onMeaningChange}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </ModalPortal>
    </div>
  );
};
