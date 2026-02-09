import { Header } from '@/components/organisms/Header/Header';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { TabSwitcher, type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { WordbookList } from '@/components/organisms/WordbookList/WordbookList';
import type { Wordbook } from '@/domain/wordbook';
import { useModalStore } from '@/store/useModalStore';

type Props = {
  tabs: Tab[];
  activeTab: number;
  handleTabClick: (tab: Tab) => Promise<void> | void;
  wordbooks: Wordbook[];
  handleNavigate: (id: string) => Promise<void> | void;
};

export const WordbooksPageTemplate = ({
  tabs,
  activeTab,
  handleTabClick,
  wordbooks,
  handleNavigate,
}: Props) => {
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);
  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Wordbooks Page" variant="basic" />
      <main className="mt-[2.25rem] flex min-h-0 w-full flex-1 flex-col items-center px-[1.25rem]">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={handleTabClick} />
        <button type="button" onClick={() => open('wordbooks-test-modal')}>
          Open Modal (test)
        </button>
        <div className="mt-[1.25rem] mb-[2.25rem] w-full flex-1 overflow-y-auto">
          <WordbookList wordbooks={wordbooks} handleNavigate={handleNavigate} />
        </div>
      </main>
      <ModalPortal id="wordbooks-test-modal">
        <div className="flex flex-col gap-4">
          <h2>Modal 테스트</h2>
          <p>내용을 자유롭게 구성할 수 있습니다.</p>

          <div className="flex justify-end">
            <button type="button" onClick={() => close('wordbooks-test-modal')}>
              닫기
            </button>
          </div>
        </div>
      </ModalPortal>
    </div>
  );
};
