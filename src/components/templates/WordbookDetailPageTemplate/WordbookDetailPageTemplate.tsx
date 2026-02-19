import { Header } from '@/components/organisms/Header/Header';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { SelectModeDashboard } from '@/components/organisms/SelectModeDashboard/SelectModeDashboard';
import { WordbookSelectModalContent } from '@/components/organisms/WordbookSelectModal/WordbookSelectModalContent';
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
  closeWordbookSelectModal: () => void;
  setSelectedWordbook: (wordbook: Wordbook) => Promise<void> | void;
  wordbookSelectModalId: string;
  myWordbooks: Wordbook[];

  // select mode props
  selectMode: boolean;
  selectedWordbook?: Wordbook | null;

  // select mode - dashboard props
  onAllSelect: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
};

export const WordbookDetailPageTemplate = ({ ...props }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      {/* 메인 헤더 */}
      <Header
        title="단어장 상세 페이지"
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={props.handleNavigate}
        RCTAIcon="DotsVertical"
        onRCTAClick={() => props.handleKebabMenuOpen(true)}
        RCTARef={props.kebabAnchorRef}
      />

      {/* 선택 제출 모드 전용 대시보드 */}
      <SelectModeDashboard
        selectMode={props.selectMode}
        onAllSelect={props.onAllSelect}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />

      {/* 메인 스크롤 영역 */}
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={props.words} />
      </div>

      {/* 휘발성 오버레이 */}
      <KebabMenu
        open={props.isKebabMenuOpen}
        anchorRef={props.kebabAnchorRef}
        onClose={() => props.handleKebabMenuOpen(false)}
        UIProps={[
          {
            label: '나의 단어장에 단어 추가하기',
            handleClick: props.openWordbookSelectModal,
          },
        ]}
      />

      <ModalPortal id={props.wordbookSelectModalId}>
        <WordbookSelectModalContent
          wordbooks={props.myWordbooks}
          setSelectedWordbook={props.setSelectedWordbook}
          closeModal={props.closeWordbookSelectModal}
        />
      </ModalPortal>
    </div>
  );
};
