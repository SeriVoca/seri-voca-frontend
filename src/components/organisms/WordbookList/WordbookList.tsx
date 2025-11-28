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
    <div className="flex w-full flex-col gap-[1rem]">
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
