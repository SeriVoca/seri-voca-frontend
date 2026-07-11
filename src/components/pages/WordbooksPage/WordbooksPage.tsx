import { type Tab } from '@/components/organisms/TabSwitcher/TabSwitcher';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/path';
import { createUserWordbook, getUserWordbookList, getWordbookList } from '@/apis/wordbook';
import type { Wordbook } from '@/domain/wordbook';
import { type AsyncState } from '@/shared/types/asyncState';
import { WordbooksPageTemplate } from '@/components/templates/WordbooksPageTemplate/WordbooksPageTemplate';
import { useModalStore } from '@/store/useModalStore';
import { CreateWordbookModal } from '@/components/organisms/CreateWordbookModal/CreateWordbookModal';

export const WordbooksPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [systemWordbooks, setSystemWordbooks] = useState<AsyncState<Wordbook[]>>({
    status: 'idle',
  });
  const [userWordbooks, setUserWordbooks] = useState<AsyncState<Wordbook[]>>({
    status: 'idle',
  });

  // 사용자 단어장 생성 플로우 - 단어장 이름 상태 및 모달 open/close 핸들러
  const [userWordbookName, setUserWordbookName] = useState<string>('');
  const open = useModalStore((s) => s.open);
  const close = useModalStore((s) => s.close);

  const handleSystemWordbookNavigate = (id: string) => {
    const path = ROUTES.WORDBOOK_DETAIL.replace(':wordbookId', id);
    navigate(path);
  };

  const handleUserWordbookNavigate = (id: string) => {
    const path = ROUTES.USER_WORDBOOK_DETAIL.replace(':wordbookId', id);
    navigate(path);
  };

  useEffect(() => {
    const fetchSystemWordbookList = async () => {
      try {
        setSystemWordbooks({ status: 'loading' });
        const data = await getWordbookList();
        setSystemWordbooks({ status: 'success', data: data });
      } catch (_) {
        // TODO : 에러 발생 시 UI/UX 기획 필요
        setSystemWordbooks({ status: 'error' });
        alert('단어장 목록을 불러오는 데에 실패했습니다. 다시 시도해주세요.');
      }
    };
    fetchSystemWordbookList();
  }, []);

  const fetchUserWordbookList = useCallback(async () => {
    try {
      setUserWordbooks({ status: 'loading' });
      const data = await getUserWordbookList();
      setUserWordbooks({ status: 'success', data: data });
    } catch (error) {
      // TODO : 에러 발생 시 UI/UX 기획 필요
      // 호출부에서 alert 처리하기 위해 에러 throw만 수행
      setUserWordbooks({ status: 'error' });
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchUserWordbookList().catch(() => {
      // TODO : 에러 발생 시 UI/UX 기획 필요
      alert('단어장 목록을 불러오는 데에 실패했습니다. 다시 시도해주세요.');
    });
  }, [fetchUserWordbookList]);

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) {
      alert('서비스 준비중입니다.');
    } else {
      setActiveTab(tab.id);
    }
  };

  const CREATE_WORDBOOK_MODAL_ID = 'create-wordbook-modal';

  const resetCreateWordbookForm = () => {
    setUserWordbookName('');
  };

  const handleCreateWordbookSubmit = async () => {
    if (userWordbookName.trim() === '') {
      alert('단어장 이름을 입력해주세요.');
      return;
    }
    // TODO: 에러 발생 시 UI/UX 기획 필요
    try {
      await createUserWordbook(userWordbookName, null);
    } catch {
      alert('단어장 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }

    alert(`단어장 "${userWordbookName}"이(가) 생성되었습니다!`);
    resetCreateWordbookForm();
    close(CREATE_WORDBOOK_MODAL_ID);

    try {
      await fetchUserWordbookList();
    } catch {
      alert('단어장 목록을 불러오는 데에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCreateWordbookCancel = () => {
    resetCreateWordbookForm();
    close(CREATE_WORDBOOK_MODAL_ID);
  };

  const createWordbookModalContent = () => {
    return (
      <CreateWordbookModal
        value={userWordbookName}
        onChange={setUserWordbookName}
        onSubmit={handleCreateWordbookSubmit}
        onCancel={handleCreateWordbookCancel}
      />
    );
  };

  const isCurriculumTab = tabs.find((tab) => tab.id === activeTab)?.label === '커리큘럼';
  const currentTabState = isCurriculumTab ? systemWordbooks : userWordbooks;

  switch (currentTabState.status) {
    case 'idle':
    case 'loading':
      return <div>Loading...</div>;
    case 'error':
      return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const wordbooksData = currentTabState.data;

  return (
    <WordbooksPageTemplate
      tabs={tabs}
      activeTab={activeTab}
      handleTabClick={handleTabClick}
      wordbooks={wordbooksData}
      handleNavigate={isCurriculumTab ? handleSystemWordbookNavigate : handleUserWordbookNavigate}
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
