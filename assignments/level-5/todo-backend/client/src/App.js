import './App.css';
import React, { useContext, useEffect } from 'react'
import { Header, Notes } from './Components';
import { ApiContext } from './Context/apiContext';

function App() {
  const { getTodos } = useContext(ApiContext)

  useEffect(()=>{
    // Get todos from server
    getTodos()
  }, [])
  return (
    <div className="App">
      <Header />
      <Notes />
    </div>
  );
}

export default App;
