import { Header } from '@/components/organisms/Header/Header';
import { ModalPortal } from '@/components/organisms/ModalPortal/ModalPortal';
import { TabSwitcher, type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { WordbookList } from '@/components/organisms/WordbookList/WordbookList';
import type { Wordbook } from '@/domain/wordbook';

type Props = {
  tabs: Tab[];
  activeTab: number;
  handleTabClick: (tab: Tab) => Promise<void> | void;
  wordbooks: Wordbook[];
  handleNavigate: (id: string) => Promise<void> | void;
  openWordbookCreateModal: (modalId: string) => void;
  createWordbookModalContent: React.ReactNode;
};

export const WordbooksPageTemplate = ({
  tabs,
  activeTab,
  handleTabClick,
  wordbooks,
  handleNavigate,
  openWordbookCreateModal,
  createWordbookModalContent,
}: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Wordbooks Page" variant="basic" />
      <main className="mt-[2.25rem] flex min-h-0 w-full flex-1 flex-col items-center px-[1.25rem]">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={handleTabClick} />
        <div className="mt-[1.25rem] mb-[2.25rem] flex w-full flex-1 flex-col gap-[1rem] overflow-y-auto">
          {tabs.find((tab) => tab.id === activeTab)?.label === '내 단어장' && (
            <button
              className="flex h-[36px] items-center justify-center rounded-full bg-[#e9e9e9] py-[8px] text-lg text-[#9d9d9d]"
              onClick={() => openWordbookCreateModal('wordbook-create-modal')}
            >
              <div className="flex items-center justify-center leading-none">+</div>
            </button>
          )}
          <WordbookList wordbooks={wordbooks} handleNavigate={handleNavigate} />
        </div>
      </main>
      <ModalPortal id="wordbook-create-modal">{createWordbookModalContent}</ModalPortal>
    </div>
  );
};
