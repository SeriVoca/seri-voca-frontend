// 내 단어장 목록
// 추가 버튼 상호 작용

import { WordbookItem } from '@/components/molecules/WordbookItem/WordbookItem';
import type { Wordbook } from '@/domain/wordbook';

export type WordbookSelectModalProps = {
  wordbooks: Wordbook[];
  handleSelectTargetWordbook: (wordbook: Wordbook) => Promise<void> | void;
  handleWordbookCreateModalOpen: () => Promise<void> | void;
};

export const WordbookSelectModal = ({
  wordbooks,
  handleSelectTargetWordbook,
  handleWordbookCreateModalOpen,
}: WordbookSelectModalProps) => {
  return (
    <div className="flex max-h-[400px] flex-col">
      <div className="mb-5 text-2xl font-semibold">추가할 단어장</div>

      {/* 나의 단어장 리스트 */}
      <div className="mb-5 min-h-0 flex-1 overflow-y-auto">
        {wordbooks.map((wordbook) => {
          return (
            <WordbookItem
              key={wordbook.id}
              title={wordbook.title}
              caption={wordbook.description}
              handleNavigate={() => handleSelectTargetWordbook(wordbook)}
            />
          );
        })}
      </div>

      <button
        onClick={handleWordbookCreateModalOpen}
        className="flex h-[36px] items-center justify-center rounded-full bg-[#e9e9e9] py-[8px] text-lg text-[#9d9d9d]"
      >
        <div className="flex items-center justify-center leading-none">+</div>
      </button>
    </div>
  );
};
