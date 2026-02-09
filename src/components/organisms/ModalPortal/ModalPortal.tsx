'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useModalStore } from '@/store/useModalStore';
import { ModalFrame } from '@/components/organisms/ModalPortal/ModalFrame';

export type ModalPortalProps = {
  /** 어떤 모달인지 식별하는 id (store와 1:1) */
  id: string;

  /** 모달 내용 */
  children: React.ReactNode;

  /** 오버레이 클릭 시 닫을지 */
  closeOnOverlay?: boolean;

  /** 닫힐 때 호출(선택) */
  onClose?: () => void;
};

/**
 * ModalPortal
 * - store의 isOpen(id) 상태를 보고 열려있을 때만 렌더
 * - ModalFrame(overlay 포함)을 portal root에 붙여줌
 * - close는 store.close(id)로 수행
 */
export function ModalPortal({ id, children, closeOnOverlay = true, onClose }: ModalPortalProps) {
  const isOpen = useModalStore((s) => s.isOpen(id));
  const close = useModalStore((s) => s.close);

  // root element 확보
  const rootEl = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;

  useEffect(() => {
    if (!isOpen) return;

    // 모달 열리면 스크롤 lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      // 다른 모달이 여전히 열려있으면 unlock하지 않도록
      // cleanup 시점의 openCount는 stale일 수 있어서, getState로 확인
      const stillOpen = useModalStore.getState().openIds.size > 0;
      if (!stillOpen) document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || !rootEl) return null;

  const handleClose = () => {
    close(id);
    onClose?.();
  };

  return createPortal(
    <ModalFrame onOverlayClick={closeOnOverlay ? handleClose : undefined}>{children}</ModalFrame>,
    rootEl,
  );
}
