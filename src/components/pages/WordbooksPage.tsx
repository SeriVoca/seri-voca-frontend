import TabSwitcher from '../organisms/TabSwitcher';
import { useState } from 'react';

const WordbooksPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div className="flex w-full flex-col items-center bg-gray-50">
      <h1>Wordbook Page</h1>
      <main className="flex w-full flex-col items-center px-5">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </main>
    </div>
  );
};

export default WordbooksPage;

// 정적 데이터
const tabs = [
  { id: 1, label: '커리큘럼' },
  { id: 2, label: '내 단어장' },
];
