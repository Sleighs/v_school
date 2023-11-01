import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ContactForm, Landing, About, Nav } from './Components';

const HomePage = props => {
  return (
    <div>
      <Nav />
      <Landing />
    </div>
  )
}
const ContactPage = props => {
  return (
    <div>
      <Nav />
      <ContactForm />
    </div>
  )
}
const AboutPage = props => {
  return (
    <div>
      <Nav />
      <About />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/about" element={<AboutPage />}/>
      </Routes>
    </div>
  );
}

export default App;
