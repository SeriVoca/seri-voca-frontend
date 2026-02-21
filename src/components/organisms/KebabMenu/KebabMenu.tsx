import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type UIProp = {
  label: string;
  handleClick: () => Promise<void> | void;
};

type Props = {
  open: boolean;
  align?: 'left' | 'right';
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => Promise<void> | void;
  UIProps: UIProp[];
};

type Pos = {
  top: number;
  left?: number;
};

export function KebabMenu({ open, align = 'right', anchorRef, onClose, UIProps }: Props) {
  const [pos, setPos] = useState<Pos | null>(null);

  const rootEl = typeof document !== 'undefined' ? document.getElementById('dropdown-root') : null;

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const el = anchorRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();

      const top = r.bottom + 8;

      let left: number;

      if (align === 'left') {
        // anchor 왼쪽 기준
        left = r.left;
      } else {
        // anchor 오른쪽 기준
        left = r.right;
      }

      setPos({ top, left });
    };

    update();

    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, anchorRef, align]);

  if (!open || !pos || !rootEl) return null;

  return createPortal(
    <div className="pointer-events-auto fixed inset-0">
      <button
        type="button"
        aria-label="Close dropdown"
        className="absolute inset-0"
        onMouseDown={onClose}
      />

      <div
        className="absolute max-h-[10rem] w-max overflow-y-auto rounded-xl bg-white shadow-lg"
        style={{
          top: pos.top,
          left:
            align === 'right'
              ? pos.left // anchor.right 기준
              : pos.left, // anchor.left 기준
          transform: align === 'right' ? 'translateX(-100%)' : 'none',
        }}
        onMouseDown={(e) => e.stopPropagation()}
        role="menu"
        tabIndex={-1}
      >
        {UIProps.map((prop, index) => (
          <button
            key={index}
            className="flex w-full px-4 py-3 text-left hover:bg-gray-50"
            role="menuitem"
            onClick={async () => {
              await prop.handleClick();
              await onClose();
            }}
          >
            {prop.label}
          </button>
        ))}
      </div>
    </div>,
    rootEl,
  );
}
