export type WordDetailProps = {
  engWord: string;
  korWord: string;
};

export const WordDetail = ({ engWord, korWord }: WordDetailProps) => {
  return (
    <div className="flex w-full bg-white px-[0.75rem] py-[1.25rem]">
      <div className="flex-[2]">{engWord}</div>
      <div className="flex-[3]">{korWord}</div>
    </div>
  );
};
