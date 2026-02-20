import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Input } from '@/components/atoms/Input/Input';
import { PartOfSpeechDropdown } from '@/components/organisms/PartOfSpeechDropdown/PartOfSpeechDropdown';
import type { PartOfSpeech, Word } from '@/domain/word';

export interface Props {
  newWord: Word;
  isCreateWordValid: boolean;
  onAddMeaning: () => void;
  onDeleteMeaning: (idxToDelete: number) => void;
  onEngChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPartOfSpeechChange: (idx: number, next: PartOfSpeech) => void;
  onMeaningChange: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const CreateWordModalContent = ({
  newWord,
  isCreateWordValid,
  onAddMeaning,
  onDeleteMeaning,
  onEngChange,
  onPartOfSpeechChange,
  onMeaningChange,
  onSubmit,
  onCancel,
}: Props) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <h2 className="text-lg font-semibold">단어를 생성해주세요.</h2>
      <div className="flex flex-col gap-[0.5rem]">
        <h3 className="font-semibold">영어</h3>
        <Input value={newWord.textEn} onChange={onEngChange} />
        <h3 className="font-semibold">뜻</h3>
        {newWord.meanings.map((meaning, idx) => (
          <div key={idx} className="flex gap-2">
            <PartOfSpeechDropdown
              selected={meaning.partOfSpeech}
              onChange={(next) => onPartOfSpeechChange(idx, next)}
            />
            <Input value={meaning.textKo} onChange={(e) => onMeaningChange(idx, e)} />
            <button onClick={() => onDeleteMeaning(idx)} className="flex items-center">
              <Icon name="Trash" color="#FF8C8C" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="text-left text-sm text-[#9d9d9d]" onClick={onAddMeaning}>
        뜻 추가하기
      </button>
      <div className="flex justify-center gap-[0.5rem]">
        <Button
          content="생성"
          variant={isCreateWordValid ? 'primary' : 'disabled'}
          onClick={onSubmit}
        />
        <Button content="취소" variant="secondary" onClick={onCancel} />
      </div>
    </div>
  );
};
