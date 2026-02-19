const mock = {
  title: '테스트 단어장',
  selectedNum: 1,
  totalNum: 30,
};

export const SelectModeDashboard = () => {
  return (
    <div className="fixed bottom-0 left-1/2 z-10 w-full -translate-x-1/2 shadow-[0_-8px_30px_rgb(0,0,0,0.2)] sm:max-w-[360px]">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-5 py-4">
        {/* 진행 상황 섹션 */}
        <ProgressSection
          title={mock.title}
          selectedNum={mock.selectedNum}
          totalNum={mock.totalNum}
        />

        {/* 액션 버튼 섹션 */}
        <ActionSection />
      </div>
    </div>
  );
};

type ProgressSectionProps = {
  title: string;
  selectedNum: number;
  totalNum: number;
};

const ProgressSection = ({ title, selectedNum, totalNum }: ProgressSectionProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>{title}</div>
      <div>
        {selectedNum}/{totalNum}
      </div>
    </div>
  );
};

const ActionSection = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <button>전체 선택</button>
      <button>확인</button>
      <button>취소</button>
    </div>
  );
};
