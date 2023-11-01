import { useState } from 'react'
import './App.css';

function NameBadge() {
  const [badgeCreated, setBadgeCreated] = useState(false)
  const [badgeData, setBadgeData] = useState(null)
  const [formData, setFormData] = useState(
    {
        firstName: "", 
        lastName: "", 
        email: "", 
        placeOfBirth:"",
        phone: "",
        favoriteFood: "",
        about: ""
    }
  )

  return (
    <div className="app">
      <h1 style={{
        textAlign:'center',
        fontSize: '1.2em',
      }}>Name Badge Form</h1>
      <Form 
        formData={formData} 
        setFormData={setFormData}
        setBadgeCreated={setBadgeCreated}
        setBadgeData={setBadgeData}
      />

      {badgeCreated 
        ? <Badge 
            data={badgeData} 
            setBadgeCreated={setBadgeCreated}
          /> 
        : <></>  
      }
    </div>
  );
}

const Form = props => {
  const { formData, setFormData, setBadgeCreated, setBadgeData} = props

  const handleSubmit = event => {
    event.preventDefault()
    setBadgeData(formData)
    setBadgeCreated(true)
  }

  const handleChange = event => {
    setFormData(previousData => {
      return {
        ...previousData,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form-input input__first-name"
        type="text"
        placeholder="First Name"
        onChange={handleChange}
        name="firstName"
      />
      <input
        className="form-input input__last-name"
        type="text"
        placeholder="Last Name"
        onChange={handleChange}
        name="lastName"
      />
      <input
        className="form-input input__email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
      />
      <input
        className="form-input input__place-of-birth"
        type="text"
        placeholder="Place of Birth"
        onChange={handleChange}
        name="placeOfBirth"
      />
      <input
        className="form-input input__phone"
        type="tel"
        placeholder="Phone"
        onChange={handleChange}
        name="phone"
      />
      <input
        className="form-input input__favorite-food"
        type="text"
        placeholder="Favorite Food"
        onChange={handleChange}
        name="favoriteFood"
      />
      <textarea
        className="form-input input__about"
        type="text"
        rows="5"
        cols="1"
        placeholder="Tell us about yourself"
        onChange={handleChange}
        name="about"
      ></textarea>
      <button className="form__submit-btn" type="submit">Submit</button>
    </form>
  )
}

const Badge = props => {
  const { data, setBadgeCreated } = props

  return (
    <div className="badge__container">
      <div className="badge__header">Badge</div>
      <div className="badge">
        <div className="badge__name">{'Name: ' + data.firstName + ' ' + data.lastName}</div>
        <div className="badge__phone">{'Phone: ' + data.phone}</div>
        <div className="badge__place-of-birth">{'Place of Birth: ' + data.placeOfBirth}</div>
        <div className="badge__favorite-food">{'Favorite Food: ' + data.favoriteFood}</div>
        <div className="badge__email">{'Email: ' + data.email}</div>
        <div className="badge__about">
          <p>About:</p>
          <div className="badge__about-text">{data.about}</div>
        </div>

        <button  className="badge__clear-btn"onClick={event => {setBadgeCreated(false)}}>Clear Badge</button>
      </div>
    </div>
  )
}

export default NameBadge;
