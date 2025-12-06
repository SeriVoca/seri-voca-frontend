import { WordbookItem } from '../../molecules/WordbookItem/WordbookItem';

type WordbookLabel = {
  order_index: number;
  wordbook: {
    id: string;
    title: string;
    description: string;
  };
};

type Props = {
  wordbooks: WordbookLabel[];
  handleNavigate: (id: string) => void;
};

export const WordbookList = ({ wordbooks, handleNavigate }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[1rem]">
      {wordbooks.map((wordbook) => (
        <WordbookItem
          key={wordbook.wordbook.id}
          title={wordbook.wordbook.title}
          caption={wordbook.wordbook.description}
          handleNavigate={() => handleNavigate(wordbook.wordbook.id)}
        />
      ))}
    </div>
  );
};
