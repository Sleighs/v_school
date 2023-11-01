import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { About, ChatBot, Nav, StudyGuide } from './Components';

function App() {
  const HomePage = props => {
    return (
      <div className="page-container">
        <Nav />
        <div className="main-form">
          <h1 className="main-form__title">JavaScript Assistant</h1>
          <ChatBot />
        </div>
      </div>
    )
  }
  const AboutPage = props => {
    return (
      <div className="page-container">
        <Nav />
        <About />
      </div>
    )
  }
  const StudyGuidePage = props => {
    return (
      <div className="page-container">
        <Nav />
        <StudyGuide />
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/studyguide" element={<StudyGuidePage />}/>
      </Routes>
    </div>
  );
}

export default App;
