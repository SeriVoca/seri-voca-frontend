import {
  CreateWordbookModal,
  type CreateWordbookModalProps,
} from '@/components/organisms/CreateWordbookModal/CreateWordbookModal';
import { Header } from '@/components/organisms/Header/Header';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { SelectModeDashboard } from '@/components/organisms/SelectModeDashboard/SelectModeDashboard';
import { type WordbookSelectModalProps } from '@/components/organisms/WordbookSelectModal/WordbookSelectModal';
import { WordbookSelectModal } from '@/components/organisms/WordbookSelectModal/WordbookSelectModal';
import { WordList } from '@/components/organisms/WordList/WordList';
import type { Word } from '@/domain/word';
import type { Wordbook } from '@/domain/wordbook';
import type { RefObject } from 'react';

type Props = {
  words: Word[];
  handleNavigate: () => Promise<void> | void;

  // kebab menu props
  isKebabMenuOpen: boolean;
  handleKebabMenuOpen: (flag: boolean) => Promise<void> | void;
  kebabAnchorRef: RefObject<HTMLButtonElement | null>;
  openWordbookSelectModal: () => void;

  // wordbook select modal props
  wordbookSelectModal: WordbookSelectModalProps & { id: string };

  // wordbook create modal props
  wordbookCreateModal: CreateWordbookModalProps & { isOpen: boolean };

  // select mode props
  selectMode: boolean;
  selectedWordbook: Wordbook | null;
  toggleWordSelection: (id: string) => Promise<void> | void;

  // select mode - dashboard props
  selectedIds: Set<string>;
  onAllSelect: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
};

export const WordbookDetailPageTemplate = ({
  words,
  handleNavigate,
  isKebabMenuOpen,
  handleKebabMenuOpen,
  kebabAnchorRef,
  openWordbookSelectModal,
  wordbookSelectModal,
  wordbookCreateModal,
  selectMode,
  selectedWordbook,
  toggleWordSelection,
  selectedIds,
  onAllSelect,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100">
      {/* 메인 헤더 */}
      <Header
        title="단어장 상세 페이지"
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={handleNavigate}
        RCTAIcon="DotsVertical"
        onRCTAClick={() => handleKebabMenuOpen(true)}
        RCTARef={kebabAnchorRef}
      />

      {/* 선택 제출 모드 전용 대시보드 */}
      {selectMode && selectedWordbook && (
        <SelectModeDashboard
          words={words}
          title={selectedWordbook.title}
          statusText="에 추가 중"
          selectedIds={selectedIds}
          onAllSelect={onAllSelect}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}

      {/* 메인 스크롤 영역 */}
      <div
        className={`mt-[0.5rem] flex min-h-0 w-full flex-1 flex-col overflow-y-auto ${selectMode ? 'pb-[6rem]' : ''}`}
      >
        {selectMode ? (
          <WordList
            words={words}
            mode="select"
            selectedIds={selectedIds}
            toggleWordSelection={toggleWordSelection}
          />
        ) : (
          <WordList words={words} mode="view" />
        )}
      </div>

      {/* 휘발성 오버레이 */}
      <KebabMenu
        open={isKebabMenuOpen}
        anchorRef={kebabAnchorRef}
        onClose={() => handleKebabMenuOpen(false)}
        UIProps={[
          {
            label: '나의 단어장에 단어 추가하기',
            handleClick: openWordbookSelectModal,
          },
        ]}
      />

      <ModalPortal id={wordbookSelectModal.id}>
        {!wordbookCreateModal.isOpen ? (
          <WordbookSelectModal
            wordbooks={wordbookSelectModal.wordbooks}
            handleSelectTargetWordbook={wordbookSelectModal.handleSelectTargetWordbook}
            handleWordbookCreateModalOpen={wordbookSelectModal.handleWordbookCreateModalOpen}
          />
        ) : (
          <CreateWordbookModal {...wordbookCreateModal} />
        )}
      </ModalPortal>
    </div>
  );
};
