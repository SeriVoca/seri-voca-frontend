import type { Word } from '@/domain/word';
import { mapPosToLabel } from '@/mapper/word';
import { Icon } from '@/components/atoms/Icon/Icon';

type Props = {
  word: Word;
  selected: boolean;
  onToggle: () => Promise<void> | void;
};

export const SelectableWordItem = ({ word, selected, onToggle }: Props) => {
  return (
    <div className="flex w-full items-center bg-white px-[0.75rem] py-[1.25rem]">
      {/* 텍스트 영역 */}
      <div className="flex flex-1 items-center">
        <div className="flex-[2] font-medium">{word.textEn}</div>
        <div className="flex flex-[3] text-sm text-gray-600">
          {word.meanings
            .map((meaning) => `${mapPosToLabel(meaning.partOfSpeech)}. ${meaning.textKo}`)
            .join(', ')}
        </div>
      </div>

      {/* 커스텀 체크 버튼 */}
      <button
        type="button"
        role="checkbox"
        aria-checked={selected}
        onClick={onToggle}
        className={`flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-full border-2 transition-colors ${
          selected ? 'border-[#b4e35a] bg-[#b4e35a]' : 'border-gray-300 bg-white'
        } `}
      >
        {selected && <Icon name="Check" size={14} color="white" />}
      </button>
    </div>
  );
};
