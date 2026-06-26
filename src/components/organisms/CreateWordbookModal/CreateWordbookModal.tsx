import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';

export interface CreateWordbookModalProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const CreateWordbookModal = ({
  value,
  onChange,
  onSubmit,
  onCancel,
}: CreateWordbookModalProps) => {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <h2 className="text-lg">단어장 이름을 정해주세요</h2>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      <div className="flex justify-center gap-[0.5rem]">
        <Button content="생성" variant="primary" onClick={onSubmit} />
        <Button content="취소" variant="secondary" onClick={onCancel} />
      </div>
    </div>
  );
};
