import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [stateVar, setStateVar] = useState(0)

  useEffect(function(){



    //setStateVar(prevCount => prevCount + 1)
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <p>
          {`the stateVar is ${stateVar}`}
        </p>
        <button 
          style={{
            padding: '10px, 25px',
            margin: 'auto'
          }} 
          onClick={()=> {
            setStateVar(prevCount => prevCount + 1)
          }}
        >
          stateVar++
        </button>
      
      </header>

      <Stuff stateVar={stateVar} setStateVar={setStateVar}/>
    </div>
  );
}

const Stuff = props => {
  const { stateVar, setStateVar } = props

  return (
    <div className="stuff-container">
      <div className='stuff'>{`the stuff variable is ${stateVar}`}</div>
    </div>
  )
}

export default App;
