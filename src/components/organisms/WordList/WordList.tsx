import type { Word } from '../../../domain/word';
import { WordDetail } from '../../molecules/WordDetail/WordDetail';

type Props = {
  words: Word[];
};

export const WordList = ({ words }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[0.25rem] bg-gray-100">
      {words.map((word) => (
        <WordDetail key={word.id} word={word} />
      ))}
    </div>
  );
};
