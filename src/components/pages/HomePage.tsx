import Header from '../organisms/Header/Header';

const HomePage = () => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <header>
        <Header title="Seri Voca" variant="basic" />
      </header>
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
