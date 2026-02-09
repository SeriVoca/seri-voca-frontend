import { Header } from '@/components/organisms/Header/Header';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { WordList } from '@/components/organisms/WordList/WordList';
import type { Word } from '@/domain/word';
import type { RefObject } from 'react';

type Props = {
  words: Word[];
  handleNavigate: () => Promise<void> | void;
  isKebabMenuOpen: boolean;
  handleKebabMenuOpen: (flag: boolean) => Promise<void> | void;
  kebabAnchorRef: RefObject<HTMLButtonElement | null>;
};

export const WordbookDetailPageTemplate = ({
  words,
  handleNavigate,
  isKebabMenuOpen,
  handleKebabMenuOpen,
  kebabAnchorRef,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={handleNavigate}
        RCTAIcon="DotsVertical"
        onRCTAClick={() => handleKebabMenuOpen(true)}
        RCTARef={kebabAnchorRef}
      />
      <KebabMenu
        open={isKebabMenuOpen}
        anchorRef={kebabAnchorRef}
        onClose={() => handleKebabMenuOpen(false)}
        UIProps={[
          {
            label: '나의 단어장에 단어 추가하기',
            handleCLick: () => {
              // 바텀 시트 여는 함수
            },
          },
        ]}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>
    </div>
  );
};
