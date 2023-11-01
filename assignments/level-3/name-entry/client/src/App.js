import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState([])
  const [currentName, setCurrentName] = useState(null)

  const handleChange = event => {
    setCurrentName(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    console.log(formData)

    setFormData(prevFormData => {
      return [
          ...prevFormData,
          currentName
      ]
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="fullName"
        />
        <button>Submit</button>
      </form>
      <NameList names={formData}/>
    </div>
  );
}

const NameList = props => {
  const { names } = props

  return (
    <div className="name-list">
      {names.map((item, i) => 
        <Name name={item} key={i}
      />)}
    </div>
  )
}

const Name = props => {
  const { name } = props

  return (
    <div className="name">{name}</div>
  )
}

export default App;
