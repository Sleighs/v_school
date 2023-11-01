import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [background, setBackground] = useState({
    color1: 'red',
    color2: 'blue',
    color3: '',
    angle: '55'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setBackground(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>CSS Gradient Color Generator</h1>
      </header>
      <div className="main-content">
        <div className="color-area" style={{
          background: 'linear-gradient(' 
          + background.angle
          + 'deg, '
          + background.color1
          + ', '
          + background.color2
          + (background.color3.length > 1 ? ', ' + background.color3 : '')
          + ')'
        }}></div>
        <div>
          <textarea 
            className="color-textarea"
            value={
            'background: linear-gradient(' 
            + background.angle + 'deg, '
            + background.color1 + ', ' + background.color2
            + (background.color3.length > 1 ? ', ' + background.color3 : '')
            + '); '

            + '-moz-background: linear-gradient(' 
            + background.angle + 'deg, '
            + background.color1 + ', ' + background.color2
            + (background.color3.length > 1 ? ', ' + background.color3 : '')
            + '); '

            + '-webkit: linear-gradient(' 
            + background.angle + 'deg, '
            + background.color1 + ', ' + background.color2
            + (background.color3.length > 1 ? ', ' + background.color3 : '')
            + ');'
          }
          readOnly
          />
        </div>
        <div className="options-container">
          <div className="title">
            <h2>Options</h2>
          </div>
          <div className="option-row"> 
            <div className="option-name">Color 1</div>
            <label 
              className="option-label" 
              name="color1"
              style={{backgroundColor: background.color1}}
            >{background.color1}</label>
            <input 
              className="option-input"
              name="color1"
              onChange={handleChange}
            />
          </div>
          <div className="option-row"> 
            <div className="option-name">Color 2</div>
            <label 
              className="option-label" 
              name="color2"
              style={{backgroundColor: background.color2}}
            >{background.color2}</label>
            <input
              className="option-input"
              name="color2"
              onChange={handleChange}
            />
          </div>
          <div className="option-row">
            <div className="option-name">Angle</div>
            <input
              className="option-angle-input"
              name="angle"
              onChange={handleChange}
              type="number"
              value={background.angle}
            />
          </div>
        </div>
        <div className="code-area"></div>
      </div>
    </div>
  );
}

export default App;
