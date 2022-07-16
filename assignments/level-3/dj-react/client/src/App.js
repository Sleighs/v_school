import React, { useState, useEffect } from 'react'
import clap1 from './assets/ElecK03-Clap01.wav'
import openHat1 from './assets/ElecK03-OpHat.wav'
import tom1 from './assets/ElecK03-Tom01.wav'
import kick1 from './assets/Kurz01-Kick01.wav'
import ride1 from './assets/Kurz01-Ride01.wav'
import snare1 from './assets/Kurz01-Snr03.wav'
import closedHat1 from './assets/K1close_ClHat-04.wav'

import './App.css';

function App() {
  const [colors, setColors] = useState(['white', 'white', 'white', 'white'])

  return (
    <div className="App">
      <Squares colors={colors} setColors={setColors}/>
      <Buttons colors={colors} setColors={setColors}/>
    </div>
  );
}

const Squares = props => {
  const { colors, setColors } = props

  return (
    <div className="squares" >
      {colors.map((item, i) => 
        <Square color={colors[i]} number={i} key={i}/>
      )}
    </div>
  )

}

const Square = props => {
  const { color, number } = props

  return (
    <div className={'square-' + (number + 1) + ' square'}
      style={{
        backgroundColor: color
      }}>
    </div>
  )
}

const Buttons = props => {
  const { colors, setColors } = props

  const colorsArr = [
    'red', 
    'blue',
    'rgb(191, 255, 0)',
    'gold',
    'yellow',
    'orange',
    'purple',
    'white',
    'black',
    'gray',
    'lightskyblue',
    'navy',
    'lawngreen',
    'aqua',
    'hotpink',
  ]

  const getRandomColor = max => {
    return Math.floor(Math.random() * max)
  }

  const smallTime = () => {
    if (colors[0] !== 'white') {
      setColors(['white', 'white', 'white', 'white'])
    } else {
      setColors(['black', 'black', 'black', 'black'])
    }

    var audio = new Audio(clap1)
    audio.play();
  }

  const partyDj = () => {
    setColors(['purple', 'purple', colors[2], colors[3]])

    var audio = new Audio(openHat1)
    audio.play();
  }

  const pro = type => {
    if (type === 1){
      setColors([colors[0], colors[1], 'blue', colors[3]])
    }
    if (type === 2){
      setColors([colors[0], colors[1], colors[2], 'blue'])
    }

    var audio = new Audio(tom1)
    audio.play();
  }

  const bigTime = type => {
    var randomNum = getRandomColor(colorsArr.length)

    var prevColors = [colors[0], colors[1], colors[2], colors[3]]
    var audio;

    if (type === 1){
      setColors([colorsArr[randomNum], colors[1], colors[2], colors[3]])

      audio = new Audio(kick1)
      audio.play();
    }
    if (type === 2){
      setColors([colors[0], colorsArr[randomNum], colors[2], colors[3]])
      
      audio = new Audio(ride1)
      audio.play();
    }
    if (type === 3){
      setColors([colorsArr[randomNum], prevColors[0], prevColors[1], prevColors[2]])
      
      audio = new Audio(snare1)
      audio.play();
    }
    if (type === 4){
      setColors([prevColors[1], prevColors[2], prevColors[3], colorsArr[randomNum]])
      
      audio = new Audio(closedHat1)
      audio.play();
    }
  }

  return (
    <div className="btn__container">
      <button className="btn__small-time btn__dj"
        onClick={()=>{
          smallTime()
        }}>Small Time</button>
      <button className="btn__party-dj btn__dj"
        onClick={()=>{
          partyDj()
        }}>Party Dj</button>
      <button className="btn__pro-1 btn__dj"
        onClick={()=>{
          pro(1)
        }}>Pro 1</button>
      <button className="btn__pro-2 btn__dj"
        onClick={()=>{
          pro(2)
        }}>Pro 2</button>
      <button className="btn__big-time-1 btn__dj"
        onClick={()=>{
          bigTime(1)
        }}>Big Time 1</button>
      <button className="btn__big-time-2 btn__dj"
        onClick={()=>{
          bigTime(2)
        }}>Big Time 2</button>
      <button className="btn__big-time-3 btn__dj"
        onClick={()=>{
          bigTime(3)
        }}>{'Big Time >>'}</button>
      <button className="btn__big-time-4 btn__dj"
        onClick={()=>{
          bigTime(4)
        }}>{'Big Time <<'}</button>
    </div>
  )
}

export default App;
