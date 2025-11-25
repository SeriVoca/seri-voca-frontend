import { WordDetail, type WordDetailProps } from './WordDetail';

type Props = {
  words: WordDetailProps[];
};

export const WordList = ({ words }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[0.25rem] bg-gray-100">
      {words.map((word, idx) => (
        <WordDetail key={idx} engWord={word.engWord} korWord={word.korWord} />
      ))}
    </div>
  );
};
