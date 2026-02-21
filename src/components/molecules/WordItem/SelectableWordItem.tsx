import type { Word } from '@/domain/word';
import { mapPosToLabel } from '@/mapper/word';

type Props = {
  word: Word;
  selected: boolean;
  onToggle: () => Promise<void> | void;
};

export const SelectableWordItem = ({ word, selected, onToggle }: Props) => {
  return (
    <div className="flex w-full bg-white px-[0.75rem] py-[1.25rem]">
      <div className="flex flex-[1] items-center justify-center">
        <div className="flex-[2]">{word.textEn}</div>
        <div className="flex flex-[3]">
          {word.meanings
            .map((meaning) => `${mapPosToLabel(meaning.partOfSpeech)}. ${meaning.textKo}`)
            .join(', ')}
        </div>
      </div>
      <input
        type="checkbox"
        className="h-[1.5rem] w-[1.5rem]"
        checked={selected}
        onChange={onToggle}
      />
    </div>
  );
};
