import Header from '../organisms/Header/Header';
import TabSwitcher from '../organisms/TabSwitcher';
import { useState } from 'react';
import { WordbookList } from '../organisms/WordbookList/WordbookList';
import { useNavigate } from 'react-router-dom';

const WordbooksPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleNavigate = (id: number) => {
    navigate(`/wordbooks/${id}/wordbook-detail`);
  };
  return (
    <div className="flex w-full flex-col items-center bg-gray-100">
      <Header title="Wordbooks Page" variant="basic" />
      <main className="mt-[2.25rem] flex w-full flex-col items-center px-[1.25rem]">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex-1 overflow-hidden py-[1.25rem]">
          <WordbookList wordbooks={mockBooks} handleNavigate={() => handleNavigate} />
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

const mockBooks = [
  { id: 1, title: 'Day 1 - Basic Vocabulary', caption: '기초 단어 20개 학습' },
  { id: 2, title: 'Day 2 - Essential Verbs', caption: '기초 동사 중심 단어장' },
  { id: 3, title: 'Day 3 - Travel Words', caption: '여행 갈 때 꼭 쓰는 표현 모음' },
  { id: 4, title: 'Day 4 - Food & Restaurant', caption: '카페/식당에서 자주 쓰는 단어' },
  { id: 5, title: 'Day 5 - Daily Conversation', caption: '일상 회화 필수 단어' },
  { id: 6, title: 'Day 6 - Emotion Words', caption: '감정 표현 관련 단어 모음' },
  { id: 7, title: 'Day 7 - Work & Office', caption: '직장/업무 관련 영어 단어' },
  { id: 8, title: 'Day 8 - Shopping', caption: '쇼핑 상황에서 쓰는 표현' },
  { id: 9, title: 'Day 9 - School', caption: '학교 생활 단어 세트' },
  { id: 10, title: 'Day 10 - Weather & Nature', caption: '날씨/자연 관련 단어장' },
];
