import { WordbookItem } from '../../molecules/WordbookItem/WordbookItem';

type WordbookLabel = {
  order_index: number;
  id: string;
  title: string;
  description: string;
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
          key={wordbook.id}
          title={wordbook.title}
          caption={wordbook.description}
          handleNavigate={() => handleNavigate(wordbook.id)}
        />
      ))}
    </div>
  );
};
