import { useMemo, useRef, useState } from 'react';
import { KebabMenu } from '@/components/organisms/KebabMenu/KebabMenu';
import { Icon } from '@/components/atoms/Icon/Icon';
import { type PartOfSpeech, PARTS_OF_SPEECH } from '@/domain/word';
import { POS_DOMAIN_LABEL_MAP } from '@/mapper/word';

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
        label: POS_DOMAIN_LABEL_MAP[pos],
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
        className="flex min-w-[2.5rem] items-center justify-between gap-[0.5rem]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {POS_DOMAIN_LABEL_MAP[selected]}
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
