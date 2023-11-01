
import { useContext, useEffect } from 'react';
import './App.css';
import { List, Form } from './Components';
import { DataContext } from './Contexts/DataContext';
import axios from 'axios'

function App() {
  const { 
    apiData, 
    setApiData 
  } = useContext(DataContext)

  async function getApiData() {
    const res = await fetch(`https://api.vschool.io/samuelwright/thing`)
    const data = await res.json()
    console.log(data)
    //setApiData(data.data)
  }

  useEffect(()=>{
    getApiData()
  }, [])

  return (
    <div className="App">
      <Form />
      <List />
    </div>
  );
}

export default App;
