import { Header } from '@/components/organisms/Header/Header';
import { TabSwitcher, type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { WordbookList } from '@/components/organisms/WordbookList/WordbookList';
import type { Wordbook } from '@/domain/wordbook';

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
  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Wordbooks Page" variant="basic" />
      <main className="mt-[2.25rem] flex min-h-0 w-full flex-1 flex-col items-center px-[1.25rem]">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={handleTabClick} />
        <div className="mt-[1.25rem] mb-[2.25rem] w-full flex-1 overflow-y-auto">
          <WordbookList wordbooks={wordbooks} handleNavigate={handleNavigate} />
        </div>
      </main>
    </div>
  );
};
