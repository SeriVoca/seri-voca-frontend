/*
    # 단어장 페이지
*/

import TabItem from '../molecules/TabItem';

type Tab = {
  id: number;
  label: string;
};

type Props = {
  tabs: Tab[];
  activeTab: number;
  onChange: (tabId: number) => void;
};

const TabSwitcher = ({ tabs, activeTab, onChange }: Props) => {
  return (
    <div className="flex h-[2.5rem] w-full items-center justify-center gap-[0.75rem] rounded-full bg-white px-[0.75rem] py-[o.375rem]">
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          label={tab.label}
          active={tab.id === activeTab}
          onClick={() => onChange(tab.id)}
        />
      ))}
    </div>
  );
};

export default TabSwitcher;

// # 클릭 이벤트에 대해 필요한 정보를 조립하는 가장 상위 컴포넌트에서 연결시켜서 하위 컴포넌트에서는 신경 쓸 필요가 없음
