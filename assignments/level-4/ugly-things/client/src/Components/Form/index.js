import React, { useContext } from 'react'
import { DataContext } from '../../Contexts/DataContext'
import './style.css'

export default function Form() {
  const { 
    postData, 
    handleFormChange,
    setApiData,
    postRequest
  } = useContext(DataContext);


  return (
    <div className="form__container">
        <form className="form__form" name='form' 
          onSubmit={(e)=>{
            e.preventDefault()
            postRequest()
          }}>
            <div>
              <span>Title </span>
              <input name='title' value={postData.title} onChange={handleFormChange}/>
            </div>
            <div>
              <span>Description </span>
              <input name='description' value={postData.description} onChange={handleFormChange}/>
            </div>
            <div>
              <span>URL </span>
              <input name='imgUrl' value={postData.imgUrl} onChange={handleFormChange}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
