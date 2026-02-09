import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => Promise<void> | void;
};

export function KebabMenu({ open, anchorRef, onClose }: Props) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

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
        right: r.left, // 메뉴 폭(예: 220) 기준 오른쪽 정렬
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

  if (!open || !pos) return null;

  return createPortal(
    <>
      {/* ✅ 바깥 클릭 닫기용 backdrop */}
      <div className="fixed inset-0 z-40" onMouseDown={onClose} aria-hidden="true" />

      {/* ✅ 실제 메뉴 */}
      <div
        className="fixed z-50 w-[220px] rounded-xl bg-white shadow-lg"
        style={{ top: pos.top, right: pos.right }}
        onMouseDown={(e) => e.stopPropagation()} // 메뉴 클릭은 닫히지 않게
        role="menu"
        tabIndex={-1}
      >
        <button className="w-full px-4 py-3 text-left hover:bg-gray-50" role="menuitem">
          나의 단어장에 단어 추가하기
        </button>
      </div>
    </>,
    document.body,
  );
}
