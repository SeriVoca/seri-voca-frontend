import { Button } from '../components/atoms/Button/Button';

const TestPage = () => {
  return (
    <div className="flex h-screen flex-col items-center bg-[#f2f4f0]">
      <div className="flex h-screen w-[400px] flex-col items-center bg-white">
        <header className="flex h-1/12 w-full items-center justify-center bg-[#a4ec13]/50">
          <h1 className="text-2xl font-semibold text-gray-600">Test Page</h1>
        </header>
        <main className="flex h-11/12 w-full flex-col items-center justify-end p-4">
          <div className="mb-4 flex w-full flex-1 flex-col items-center justify-center rounded-xl bg-[#f2f4f0]"></div>
          <div className="flex w-full items-center justify-between">
            <Button onClick={() => alert('Test Button Clicked!')}>제출하기</Button>
            <Button variant="secondary" onClick={() => alert('Test Button Clicked!')}>
              취소
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestPage;
