import { Header } from '@/components/organisms/Header/Header';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { WordbookSelectModalContent } from '@/components/organisms/WordbookSelectModal/WordbookSelectModalContent';
import { WordList } from '@/components/organisms/WordList/WordList';
import type { Word } from '@/domain/word';
import type { Wordbook } from '@/domain/wordbook';
import type { RefObject } from 'react';

type Props = {
  words: Word[];
  handleNavigate: () => Promise<void> | void;
  isKebabMenuOpen: boolean;
  handleKebabMenuOpen: (flag: boolean) => Promise<void> | void;
  kebabAnchorRef: RefObject<HTMLButtonElement | null>;
  openWordbookSelectModal: () => void;
  closeWordbookSelectModal: () => void;
  wordbookSelectModalId: string;
  myWordbooks: Wordbook[];
  selectMode: boolean;
  selectedWordbook?: Wordbook;
  setSelectedWordbook: (wordbook: Wordbook) => Promise<void> | void;
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

      {/* 선택 제출 모드 */}

      {/* 메인 스크롤 영역 */}
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={props.words} />
      </div>

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
      {/* 단어장 선택 모달 */}
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
