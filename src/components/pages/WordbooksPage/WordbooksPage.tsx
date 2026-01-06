import { type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/path';
import { getWordbookList } from '@/apis/wordbook';
import type { Wordbook } from '@/domain/wordbook';
import type { AsyncState } from '@/shared/types/asyncState';
import { WordbooksPageTemplate } from '@/components/templates/WordbooksPageTemplate/WordbooksPageTemplate';

export const WordbooksPage = () => {
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

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) {
      alert('서비스 준비중입니다.');
    } else if (tab.disabled === false) {
      setActiveTab(tab.id);
    }
  };

  switch (wordbooks.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <WordbooksPageTemplate
      tabs={tabs}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
      wordbooks={wordbooks.data}
      handleNavigate={handleNavigate}
    />
  );
};

// 정적 데이터
const tabs: Tab[] = [
  { id: 1, label: '커리큘럼' },
  { id: 2, label: '내 단어장', disabled: true },
];
