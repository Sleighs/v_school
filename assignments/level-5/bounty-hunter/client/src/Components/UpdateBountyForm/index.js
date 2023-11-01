import React, { useContext } from 'react'
import { DataContext } from '../../Contexts/DataContext';
import './style.css'

export default function UpdateBountyForm(props) {
  const { 
    bountyUpdateData, 
    setBountyUpdateData, 
    setEditToggle,
    putRequest
  } = useContext(DataContext);

  const {setShowForm} = props

  const handleChange = (e) => {
    setBountyUpdateData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })
  }
  
  function onSubmit(e) {
    e.preventDefault()

    setBountyUpdateData(prevData => {
      return {
        ...prevData,
      }
    })

    putRequest()

    setShowForm(false)
    setEditToggle(false)
  }
  
  return (
    <div>
        <form name="bounty-form" className="bounty-form" onSubmit={onSubmit}>
        <input
          className="form-input input__first-name"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={bountyUpdateData.firstName}
        />
        <input
          className="form-input input__last-name"
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={bountyUpdateData.lastName}
        />
        <input
          className="form-input input__bounty"
          type="text"
          placeholder="Bounty"
          onChange={handleChange}
          name="bounty"
          value={bountyUpdateData.bounty}
        />
        <input
          className="form-input input__deceased"
          type="text"
          placeholder="Deceased?"
          onChange={handleChange}
          name="living"
          value={bountyUpdateData.living}
        />
        <input
          className="form-input input__faction"
          type="input"
          placeholder="Faction"
          onChange={handleChange}
          name="type"
          value={bountyUpdateData.type}
        />
        <input type="button" value="Cancel" onClick={()=>{
          setShowForm(false)
          setEditToggle(false)
        }}></input>
        <input type="submit" value="Update"></input>
      </form>
    </div>
  )
}
