import React, { useContext } from 'react'
import { DataContext } from '../../Contexts/DataContext'
import './style.css'

export default function List() {
  const { apiData } = useContext(DataContext)

  return (
    <div className='list__container'>
        {apiData ? apiData.map((item,i) => 
            <div className='list-item' key={i}>
              <div className='list-item__title'>{item.title}</div>
              <div>{item.description}</div>
              <img 
                className="list-item__image"
                src={item.imgUrl} 
                alt='' 
                title={item.title} 
              />
            
            </div>
        ) : <div className="list-item__description">List will display here</div>}
    </div>
  )
}
