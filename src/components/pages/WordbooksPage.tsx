import Header from '../organisms/Header/Header';
import TabSwitcher from '../organisms/TabSwitcher';
import { useEffect, useState } from 'react';
import { WordbookList } from '../organisms/WordbookList/WordbookList';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/path';
import { getWordbookList } from '../../apis/wordbook';
import type { Wordbook } from '../../domain/wordbook';
import type { AsyncState } from '../../shared/types/asyncState';

const WordbooksPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [wordbooks, setWordbooks] = useState<AsyncState<Wordbook[]>>({ status: 'idle' });

  const handleNavigate = (id: string) => {
    const path = ROUTES.WORDBOOK_DETAIL.replace(':wordbookId', String(id));
    navigate(path);
  };

  useEffect(() => {
    async function fetchWordbookList() {
      try {
        setWordbooks({ status: 'loading' });
        const data = await getWordbookList();
        setWordbooks({ status: 'success', data: data });
      } catch (_) {
        // TODO : 에러 발생 시 UI/UX 기획 필요
        setWordbooks({ status: 'error' });
        alert('단어장 목록을 불러오는 데에 실패했습니다. 다시 시도해주세요.');
      }
    }
    fetchWordbookList();
  }, []);

  switch (wordbooks.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>Error occurred while fetching words.</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center bg-gray-100">
      <Header title="Wordbooks Page" variant="basic" />
      <main className="mt-[2.25rem] flex min-h-0 w-full flex-1 flex-col items-center px-[1.25rem]">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="mt-[1.25rem] mb-[2.25rem] w-full flex-1 overflow-y-auto">
          <WordbookList wordbooks={wordbooks.data} handleNavigate={handleNavigate} />
        </div>
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
