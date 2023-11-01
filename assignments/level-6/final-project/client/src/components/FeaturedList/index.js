import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

export default function FeaturedList(props) {
  const { title, streamers } = props

  const navigate = useNavigate();

  const [streamerData, setStreamerData] = useState(null)
    
  const getFeaturedStreamers = () => {
    return streamerData.map((streamer, index) => {
      return (
        <Link className='featured-list__item' key={index}
          to={`/profile/${streamer.streamer_tag}`}
          onClick={() => {
            //navigate(`/profile/${streamer.streamer_tag}`)
            //window.location.reload()
          // window.scrollTo(0, 0)
          }}
        >
          <img className='featured-list__item-image' src={streamer.logo_url} alt='streamer profile' />
          <div>{streamer.streamer_tag}</div>
        </Link>
      )} 
    )
  }

  async function getStreamerData(names) {
    const response = await fetch('/streamers/featured/sorted',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({names})
    })
    const data = await response.json()

    //console.log('get featured data', data)

    setStreamerData(data)
  }

  useEffect(() => {
    getStreamerData(streamers)
  }, [])

  if (streamerData) {
    return (
      <div className='featured-list'>
        <h1 className='featured-list__title'>{title}</h1>
        <div className='featured-list__container'>
          <div className='featured-list__wrapper'>
            {streamerData.length > 0
              ? getFeaturedStreamers() 
              : 
              <div className='featured-list__item'>
                <p>No streamers found</p>
              </div>}
          </div>
          <div className='featured-list__right-arrow'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='featured-list'>
        <div 
          style={{
            textAlign: 'center',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.5',
          }}>
            Loading...
          </div>
      </div>
    )
  }
}
