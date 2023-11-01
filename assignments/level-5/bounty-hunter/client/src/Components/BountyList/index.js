import React, { useContext, useState } from 'react'
import { DataContext } from '../../Contexts/DataContext'
import UpdateBountyForm from '../UpdateBountyForm'
import './style.css'

export default function BountyList(props) {
  const {
    bounties,
    setCurrentBounty, 
  } = useContext(DataContext)

  return (
    <div className='bounty-list'>
        {bounties && bounties.map((item, index) => {
          return (
            <div 
              key={index} 
              className='bounty-list__item-container'
              onClick={() => {setCurrentBounty(item)}}
            >
              <ListItem item={item}/>
            </div>)
        })}
    </div>
  )
}

const ListItem = props => {
  const {
    setBountyUpdateData, 
    editToggle, 
    setEditToggle,
    deleteRequest
  } = useContext(DataContext)

  const {item} = props

  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {showForm 
        ? <UpdateBountyForm setShowForm={setShowForm} />
        : <div className='bounty-list__list'>
            <div className='bounty-list__list-item'>{`Bounty: ${item.bounty}`}</div>
            <div className='bounty-list__list-item'>{`Name: ${item.firstName} ${item.lastName}`}</div>
            <div className='bounty-list__list-item'>{`Deceased: ${item.living}`}</div>
            <div className='bounty-list__list-item'>{`Faction: ${item.type}`}</div>
            <button onClick={()=>{
              if(!editToggle){
                setShowForm(true)
                setBountyUpdateData(item)
                setEditToggle(true)
              }
            }}>Edit</button>
            <button onClick={()=>{
              deleteRequest(item)
              setShowForm(false)
            }}>Delete</button>
          </div>
        }
    </>
  )
}