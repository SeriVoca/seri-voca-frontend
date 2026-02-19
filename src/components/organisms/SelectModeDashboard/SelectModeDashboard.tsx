import type { Word } from '@/domain/word';
import type { Wordbook } from '@/domain/wordbook';

type Props = {
  words: Word[];
  selectedWordbook: Wordbook;
  selectedIds: Set<string>;
  onAllSelect: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
};

export const SelectModeDashboard = ({
  words,
  selectedWordbook,
  selectedIds,
  onAllSelect,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className="fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 shadow-[0_-8px_30px_rgb(0,0,0,0.2)] sm:max-w-[360px]">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-5 py-4">
        {/* 진행 상황 섹션 */}
        <ProgressSection
          title={selectedWordbook.title}
          selectedNum={selectedIds.size}
          totalNum={words.length}
        />

        {/* 액션 버튼 섹션 */}
        <ActionSection onAllSelect={onAllSelect} onConfirm={onConfirm} onCancel={onCancel} />
      </div>
    </div>
  );
};

type ProgressSectionProps = {
  title: string;
  selectedNum: number;
  totalNum: number;
};

const ProgressSection = ({ title, selectedNum, totalNum }: ProgressSectionProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>{title}</div>
      <div>
        {selectedNum}/{totalNum}
      </div>
    </div>
  );
};

type ActionSectionProps = {
  onAllSelect: () => Promise<void> | void;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
};

const ActionSection = ({ onAllSelect, onConfirm, onCancel }: ActionSectionProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <button onClick={onAllSelect}>전체 선택</button>
      <button onClick={onConfirm}>확인</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};
