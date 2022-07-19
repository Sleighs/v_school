import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [colorData, setColorData] = useState('')
  const [color, setColor] = useState('000')

  async function getColors() {
    var num = String('1') + String(Math.floor(Math.random() * 12))
    const res = await fetch(`https://www.colr.org/json/color/random?timestamp=${num}`)
    const data = await res.json()
    //console.log(data.colors[0])
    setColor(data.colors[0].hex)
    setColorData(data.colors[0]);
  }

  useEffect(function() {
    getColors()
  }, [])

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor:`#${color}`,
    }} className="App">
      <div style={{height: 'fit-contents', width: 'fit-contents'}}>
        <button 
          style={{
            padding: '25px 50px',
            margin: '3%',
            backgroundColor: 'rgb(0,0,0,.5)',
            color: 'white',
            borderRadius: '5px',
            fontSize: '1.5em',
            fontFamily: 'monospace'
          }}
          onClick={()=>{
            getColors()
          }}
        >New Background</button>
        <p style={{
          width: '500px',
          color: 'gray',
          display: 'none',
        }}>{JSON.stringify(colorData)}</p>
      </div>
    </div>
  );
}

export default App;
