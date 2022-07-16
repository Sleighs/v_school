import React, { useState } from 'react'
import { getRandomNumber } from './main';
import './App.css';
import { FlashOffRounded } from '@material-ui/icons';

function DiceBox() {
  const [numbers, setNumbers] = useState([
    /*getRandomNumber(6), 
    getRandomNumber(6), 
    getRandomNumber(6), 
    getRandomNumber(6), 
    getRandomNumber(6)*/
    null,null,null,null,null
  ])
  // Save which numbers are held
  const [held, setHeld] = useState([false, false, false, false, false,])
  // Stores current turn
  const [turn, setTurn] = useState(null)
  // For yahtzee mode toggle
  const [yahtzee, setYahtzee] = useState(false)

  // Gets a new set of numbers for dice
  const rollDice = () => {
    var diceArr = []

    for (var a = 0; a < 5; a++){
      var newDie = getRandomNumber(6)

      if (held[a] === false){
        diceArr.push(newDie)
      } else {
        diceArr.push(numbers[a])
      }
    }

    setNumbers(diceArr)

    if (yahtzee === true){
      if (turn < 3){
        setTurn(turn + 1)
      } else {
        setTurn(1)
      }
    }
  }

  // Clears out numbers, held dice and turn count
  const resetDice = () => {
    setHeld([false, false, false, false, false])
    setNumbers([null, null, null, null, null])
    setTurn(null)
  }

  return (
    <div className="App">
      <div className="dice__container">
        {numbers.map((item, i) => 
          <Die 
            number={item} 
            die={i} 
            key={i} 
            held={held} 
            setHeld={setHeld}
          />
        )}
      </div>
      <div className="turn-info" style={{
        opacity: yahtzee === false ? '0' : '1'
        }}>
        {' Turn:' + (turn !== null ? turn : '') + ''}
      </div>
      <div className="btn__container">
        <button className="roll-btn" 
          style={{
            display: turn === null || turn < 3 ? 'block' : 'none',
          }}
          onClick={()=>{rollDice()}}>
            {'Roll'}
        </button>
        <button className="reset-btn" 
          style={{
            display: turn !== null ? 'block' : 'none',
          }}
          onClick={()=>{resetDice()}}>
            {'Reset'}
        </button>
      </div>
      <button className="yahtzee-toggle" onClick={()=>{
        if (yahtzee){
          setYahtzee(false)
        } else {
          setYahtzee(true)
        }
      }}>
        {'Yahtzee ' + (yahtzee ? '(On)' : '(Off)')}
      </button>
    </div>
  );
}
  
const Die = props => {
  const { number, die, held, setHeld } = props

  var border = 'solid 3pt white'

  if (held[die] === true){
    border = 'solid 3pt gold'
  }

  return (
    <div className={'die__container'} style={{border: border,}}>
      <div className={'die__number die-' + die} 
        onClick={()=>{
          if (held[die] === false){
            switch (die){
              case 0:
                setHeld([true, held[1], held[2], held[3], held[4]])
                break;
              case 1:
                setHeld([held[0], true, held[2], held[3], held[4]])
                break;
              case 2:
                setHeld([held[0], held[1], true, held[3], held[4]])
                break;
              case 3:
                setHeld([held[0], held[1], held[2], true, held[4]])
                break;
              case 4:
                setHeld([held[0], held[1], held[2], held[3], true])
                break;
              default:
            }
          } else {
            switch (die){
              case 0:
                setHeld([false, held[1], held[2], held[3], held[4]])
                break;
              case 1:
                setHeld([held[0], false, held[2], held[3], held[4]])
                break;
              case 2:
                setHeld([held[0], held[1], false, held[3], held[4]])
                break;
              case 3:
                setHeld([held[0], held[1], held[2], false, held[4]])
                break;
              case 4:
                setHeld([held[0], held[1], held[2], held[3], false])
                break;
              default:

            }
          }
        }}>{number}</div>
    </div>
  )
}

export default DiceBox;
