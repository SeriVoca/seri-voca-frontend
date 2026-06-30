import { type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/path';
import { getWordbookList } from '@/apis/wordbook';
import type { Wordbook } from '@/domain/wordbook';
import type { AsyncState } from '@/shared/types/asyncState';
import { WordbooksPageTemplate } from '@/components/templates/WordbooksPageTemplate/WordbooksPageTemplate';
import { useModalStore } from '@/store/useModalStore';
import { CreateWordbookModal } from '@/components/organisms/CreateWordbookModal/CreateWordbookModal';

export const WordbooksPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [wordbooks, setWordbooks] = useState<AsyncState<Wordbook[]>>({ status: 'idle' });

  // 단어장 생성 플로우 - 단어장 이름 상태 및 모달 open/close 핸들러
  const [wordbookName, setWordbookName] = useState<string>('');
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);

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
    } else {
      setActiveTab(tab.id);
    }
  };

  const CREATE_WORDBOOK_MODAL_ID = 'create-wordbook-modal';

  const resetCreateWordbookForm = () => {
    setWordbookName('');
  };

  const handleCreateWordbookCancel = () => {
    resetCreateWordbookForm();
    close(CREATE_WORDBOOK_MODAL_ID);
  };

  const createWordbookModalContent = () => {
    return (
      <CreateWordbookModal
        value={wordbookName}
        onChange={setWordbookName}
        onSubmit={() => {
          if (wordbookName.trim() === '') {
            alert('단어장 이름을 입력해주세요.');
            return;
          }
          // TODO: 단어장 생성 API 연동 및 라우팅 로직 추가
          alert(`단어장 "${wordbookName}"이(가) 생성되었습니다!`);
          resetCreateWordbookForm();
          close(CREATE_WORDBOOK_MODAL_ID);
        }}
        onCancel={handleCreateWordbookCancel}
      />
    );
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
      wordbooks={wordbooks.data.filter((wordbook) =>
        tabs.find((tab) => tab.id === activeTab)?.label === '커리큘럼'
          ? wordbook.type === 'SYSTEM'
          : wordbook.type === 'USER',
      )}
      handleNavigate={handleNavigate}
      createWordbookModalId={CREATE_WORDBOOK_MODAL_ID}
      onOpenWordbookCreateModal={() => open(CREATE_WORDBOOK_MODAL_ID)}
      onClose={resetCreateWordbookForm}
      createWordbookModalContent={createWordbookModalContent()}
    />
  );
};

// 정적 데이터
const tabs: Tab[] = [
  { id: 1, label: '커리큘럼' },
  { id: 2, label: '내 단어장' },
];
