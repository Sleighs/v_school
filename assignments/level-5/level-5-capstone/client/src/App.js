import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, MainNav } from './Components';
import { HomePage, HeroesPage, HeroInfoPage, CountersPage, LineUpAnalyzerPage, TierListPage } from './Pages';

function App() {
  return (
    <div className="App">
      <MainNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/heroes" element={<HeroesPage />} />
        <Route path="/heroes/:hero" element={<HeroInfoPage />} />
        <Route path="/counters" element={<CountersPage />} />
        <Route path="/lineup-analyzer" element={<LineUpAnalyzerPage />} />
        {/* 
        <Route path="/dictionary" element={<HeroesPage />} />
        <Route path="/strategy" element={<HeroesPage />} />
        <Route path="/tierlist" element={<TierListPage />} />
        */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
