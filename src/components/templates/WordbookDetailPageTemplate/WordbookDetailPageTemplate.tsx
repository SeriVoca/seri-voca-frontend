import { Header } from '@/components/organisms/Header/Header';
import { WordList } from '@/components/organisms/WordList/WordList';
import type { Word } from '@/domain/word';

type Props = {
  words: Word[];
  handleNavigate: () => Promise<void> | void;
};

export const WordbookDetailPageTemplate = ({ words, handleNavigate }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="단어장 상세 페이지"
        variant="LRCTA"
        LCTAIcon="ChevronLeft"
        onLCTAClick={handleNavigate}
        RCTAIcon="DotsVertical"
        onRCTAClick={() => {}}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
        <WordList words={words} />
      </div>
    </div>
  );
};
