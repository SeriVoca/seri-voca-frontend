import { useMemo, useRef, useState } from 'react';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { Icon } from '@/components/atoms/Icon/Icon';
import { type PartOfSpeech, PARTS_OF_SPEECH } from '@/domain/word';

interface PartOfSpeechDropdownProps {
  selected: PartOfSpeech;
  onChange: (next: PartOfSpeech) => void;
}

export const PartOfSpeechDropdown = ({ selected, onChange }: PartOfSpeechDropdownProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const UIProps = useMemo(
    () =>
      PARTS_OF_SPEECH.map((pos) => ({
        label: pos,
        handleClick: () => onChange(pos),
      })),
    [onChange],
  );

  return (
    <div className="relative flex">
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {selected}
        <Icon name="ChevronDown" size={16} className="items-center" />
      </button>

      <KebabMenu
        open={open}
        align="left"
        anchorRef={anchorRef}
        onClose={() => setOpen(false)}
        UIProps={UIProps}
      />
    </div>
  );
};
