import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type UIProp = {
  label: string;
  handleClick: () => Promise<void> | void;
};

type Props = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => Promise<void> | void;
  UIProps: UIProp[];
};

export function KebabMenu({ open, anchorRef, onClose, UIProps }: Props) {
  const [pos, setPos] = useState<{ top: number } | null>(null);

  const rootEl = typeof document !== 'undefined' ? document.getElementById('dropdown-root') : null;

  // ✅ 열릴 때 / 스크롤/리사이즈 시 위치 재계산
  useEffect(() => {
    if (!open) return;

    const update = () => {
      const el = anchorRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      // 메뉴를 버튼 "오른쪽 아래"로 붙임
      setPos({
        top: r.bottom + 8, // 아래로 8px
      });
    };

    update();

    window.addEventListener('scroll', update, true); // 중요: 내부 스크롤도 잡기 위해 capture
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, anchorRef]);

  if (!open || !pos || !rootEl) return null;

  return createPortal(
    <div className="pointer-events-auto flex h-full w-full items-center justify-center sm:w-[360px]">
      {/* ✅ 바깥 클릭 닫기용 backdrop */}
      <button
        type="button"
        aria-label="Close dropdown"
        className="absolute inset-0"
        onMouseDown={onClose}
      />
      {/* ✅ 실제 메뉴 */}
      <div className="pointer-events-none relative h-full w-full">
        <div
          className={`pointer-events-auto absolute right-3 rounded-xl bg-white shadow-lg`}
          style={{ top: pos.top }}
          onMouseDown={(e) => e.stopPropagation()} // 메뉴 클릭은 닫히지 않게
          role="menu"
          tabIndex={-1}
        >
          {UIProps.map((prop) => {
            return (
              <button
                key={null}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
                role="menuitem"
                onClick={prop.handleClick}
              >
                {prop.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    rootEl,
  );
}
