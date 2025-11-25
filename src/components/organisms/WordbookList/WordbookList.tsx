import { WordbookItem } from '../../molecules/WordbookItem/WordbookItem';

type WordbookLabel = {
  id: number;
  title: string;
  caption: string;
};

type Props = {
  wordbooks: WordbookLabel[];
  handleNavigate: (id: number) => void;
};

export const WordbookList = ({ wordbooks, handleNavigate }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {wordbooks.map((wordbook) => (
        <WordbookItem
          key={wordbook.id}
          title={wordbook.title}
          caption={wordbook.caption}
          handleNavigate={() => handleNavigate(wordbook.id)}
        />
      ))}
    </div>
  );
};
