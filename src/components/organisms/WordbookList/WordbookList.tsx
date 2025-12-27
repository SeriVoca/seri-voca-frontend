import type { Wordbook } from '@/domain/wordbook';
import { WordbookItem } from '@/components/molecules/WordbookItem/WordbookItem';

type Props = {
  wordbooks: Wordbook[];
  handleNavigate: (id: string) => Promise<void> | void;
};

export const WordbookList = ({ wordbooks, handleNavigate }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[1rem]">
      {wordbooks.map((wordbook) => (
        <WordbookItem
          key={wordbook.id}
          title={wordbook.title}
          caption={wordbook.description}
          handleNavigate={() => handleNavigate(wordbook.id)}
        />
      ))}
    </div>
  );
};
