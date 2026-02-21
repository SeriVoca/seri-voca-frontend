import { SelectableWordItem } from '@/components/molecules/WordItem/SelectableWordItem';
import type { Word } from '../../../domain/word';
import { WordItem } from '../../molecules/WordItem/WordItem';

type CommonProps = {
  words: Word[];
};

type ViewModeProps = {
  mode?: 'view';
  selectedIds?: never;
  toggleWordSelection?: never;
};

type SelectModeProps = {
  mode: 'select';
  selectedIds: Set<string>;
  toggleWordSelection: (id: string) => Promise<void> | void;
};

type Props = CommonProps & (ViewModeProps | SelectModeProps);

export const WordList = (props: Props) => {
  const { words } = props;

  return (
    <div className="flex w-full flex-col gap-[0.25rem] bg-gray-100">
      {words.map((word) =>
        props.mode === 'select' ? (
          <SelectableWordItem
            key={word.id}
            word={word}
            selected={props.selectedIds.has(word.id)}
            onToggle={() => props.toggleWordSelection(word.id)}
          />
        ) : (
          <WordItem key={word.id} word={word} />
        ),
      )}
    </div>
  );
};
