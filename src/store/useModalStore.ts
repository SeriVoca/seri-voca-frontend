import { create } from 'zustand';

type ModalId = string;

type ModalStore = {
  /** 열린 모달들의 id 집합 */
  openIds: Set<ModalId>;

  /** 열기 */
  open: (id: ModalId) => void;

  /** 닫기 */
  close: (id: ModalId) => void;

  /** 토글 */
  toggle: (id: ModalId) => void;

  /** 전체 닫기 */
  closeAll: () => void;

  /** 열려있는지 */
  isOpen: (id: ModalId) => boolean;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  openIds: new Set(),

  open: (id) =>
    set((state) => {
      const next = new Set(state.openIds); // 객체 참조 바꾸기 위해 복사본 생성
      next.add(id); // id 추가
      return { openIds: next };
    }),

  close: (id) =>
    set((state) => {
      const next = new Set(state.openIds);
      next.delete(id);
      return { openIds: next };
    }),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.openIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { openIds: next };
    }),

  closeAll: () => set({ openIds: new Set() }),

  isOpen: (id) => get().openIds.has(id),
}));
