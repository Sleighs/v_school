import React, { useContext } from 'react'
import { DataContext } from '../../Contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';
import './style.css'

export default function BountyForm(props) {
  const { 
    bountyData, 
    setBountyData, 
    postRequest
  } = useContext(DataContext);

  const handleChange = (e) => {
    setBountyData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }
  
  const onSubmit = (e) => { 
    e.preventDefault()  

    let newId = uuidv4()

    setBountyData(prevData => {
      return {
        ...prevData,
        id: newId
      }
    })

    postRequest()
  }

  return (
    <div>
        <form 
          name="bounty-form" 
          className="bounty-form" 
          onSubmit={onSubmit}
        >
        <input
          className="form-input input__first-name"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={bountyData.firstName}
        />
        <input
          className="form-input input__last-name"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={bountyData.lastName}
        />
        <input
          className="form-input input__bounty"
          type="text"
          placeholder="Bounty"
          onChange={handleChange}
          name="bounty"
          value={bountyData.bounty}
        />
        <input
          className="form-input input__deceased"
          type="text"
          placeholder="Deceased?"
          onChange={handleChange}
          name="living"
          value={bountyData.living}
        />
        <input
          className="form-input input__faction"
          type="input"
          placeholder="Faction"
          onChange={handleChange}
          name="type"
          value={bountyData.type}
        />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}
