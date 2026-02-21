import type { Word } from '@/domain/word';
import { mapPosToLabel } from '@/mapper/word';

export type WordDetailProps = {
  word: Word;
};

export const WordItem = ({ word }: WordDetailProps) => {
  return (
    <div className="flex w-full bg-white px-[0.75rem] py-[1.25rem]">
      <div className="flex-[2]">{word.textEn}</div>
      <div className="flex flex-[3]">
        {word.meanings
          .map((meaning) => `${mapPosToLabel(meaning.partOfSpeech)}. ${meaning.textKo}`)
          .join(', ')}
      </div>
    </div>
  );
};
