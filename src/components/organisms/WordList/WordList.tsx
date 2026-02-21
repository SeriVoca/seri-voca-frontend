import { SelectableWordItem } from '@/components/molecules/WordItem/SelectableWordItem';
import type { Word } from '../../../domain/word';
import { WordItem } from '../../molecules/WordItem/WordItem';

type Props = {
  words: Word[];
  mode?: 'view' | 'select';
  selectedIds: Set<string>;
  toggleWordSelection: (id: string) => Promise<void> | void;
};

export const WordList = ({ words, mode = 'view', selectedIds, toggleWordSelection }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[0.25rem] bg-gray-100">
      {words.map((word) =>
        mode === 'select' ? (
          <SelectableWordItem
            key={word.id}
            word={word}
            selected={selectedIds.has(word.id)}
            onToggle={() => toggleWordSelection(word.id)}
          />
        ) : (
          <WordItem key={word.id} word={word} />
        ),
      )}
    </div>
  );
};
