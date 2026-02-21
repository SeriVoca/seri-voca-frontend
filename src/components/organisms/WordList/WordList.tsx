import type { Word } from '../../../domain/word';
import { WordItem } from '../../molecules/WordItem/WordItem';

type Props = {
  words: Word[];
  mode?: 'view' | 'select';
};

export const WordList = ({ words, mode = 'view' }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[0.25rem] bg-gray-100">
      {words.map((word) => (
        <WordItem key={word.id} word={word} />
      ))}
    </div>
  );
};
