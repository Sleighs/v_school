import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FavoriteIcon, Footer, Nav } from '../../components';
import { UserContext } from '../../Contexts/UserContext';
import { StreamerContext } from '../../Contexts/StreamerContext';
import { capitalizeFirstLetter } from '../../js';
import './style.css';
import './background.css';

export default function StreamerProfilePage(props) {
  const navigate = useNavigate()
  
  const pageParams = useParams()
  const { streamer } = pageParams
  
  const { userState } = useContext(UserContext)

  const [loaded, setLoaded] = useState(false)
  const [streamerData, setStreamerData] = useState(null)
  const [favoriteData, setFavoriteData] = useState(null)
  const [favoriteState, setFavoriteState] = useState(null)
  const [similarStreamers, setSimilarStreamers] = useState(null)

  async function getStreamerData() {
    const res = await fetch(`/streamer/${streamer}`, {
      method: "GET",
    })
    const data = await res.json()
    
    //console.log('getting streamer...', data)
    
    setStreamerData(data) 
    getFavoriteData(data.streamer_tag)

    showSimilarStreamers(data)

    if (data){
      setLoaded(true)
    }
  }

  const getFavoriteData = async (streamerTag) => {
    const res = await fetch(`/favorites/streamer/${streamerTag || streamerData.streamer_tag}`, {
      method: "GET",
    })
    const data = await res.json()
    
    //console.log('getting favorites...', data)

    // get number of favoriteData items with status = true
    // set that number to the favoriteData.count
    let count = 0
    let favorited = false
    let exists = false

    // Count favorites
    data.forEach(favorite => {
      if (favorite.status) {
        count++
      } 

      if (userState.token){
        if (favorite.user_tag === userState.user.user_tag) {
          favorited = favorite.status
          exists = true
        } 
      }
    })

    // Store favorite info to state
    setFavoriteState({
      count: count,
      status: favorited,
      exists: exists,
    })
    setFavoriteData(data)
  }

  /*async function getStreamersByTopic(topic) {
    const res = await fetch(`/streamers/topics/${topic}`)
    const data = await res.json()
    console.log('getting streamers by topics...', data)
  }*/

  const handleFavorite = async (streamerTag, userTag, status, exists) => {
    // Update database
    if (exists) {
      const res = await fetch(`/api/favorites/update/${streamerTag}/${userTag}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userState.token}`
        },
        body: JSON.stringify({
          //streamer_tag: streamerTag,
          //user_tag: userState.user.user_tag,
          status: status
        })
      })
      const data = await res.json()
      //console.log('favorite data', data)
      
    } else if (!exists){
      const res = await fetch(`/api/favorites/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userState.token}`
        },
        body: JSON.stringify({
          streamer_tag: streamerTag,
          user_tag: userState.user.user_tag,
          status: status
        })
      })
      const data = await res.json()
      //console.log('favorite data', data)
    }
    getFavoriteData(streamerTag)
  }

  const showSimilarStreamers = async (streamer) => {
    //console.log('streamer: ', streamer)
    let newStreamerList = []

    const res = await fetch('/streamers/all')
    const data = await res.json()

    data.forEach(item => {
      if(item.streamer_tag !== streamer.streamer_tag){
        newStreamerList.push(item)
      }
    })

    // filter out streamers that cover different topics
    newStreamerList = newStreamerList.filter((item) => {
      if (item.topics){
        // Check if item.topics array has any items from streamer.topics array
        return item.topics.some(r=> streamer.topics.includes(r))
      }
    })

    //console.log('newStreamerList: ', newStreamerList)
    setSimilarStreamers(newStreamerList)
  }

  useEffect(()=>{
    getStreamerData()
  }, [
    //favoriteData, 
    //favoriteState
  ])

  return (
    <div className="streamer-profile streamer-profile-background">
      <Nav />
      {
        loaded
          ?
            <div className='streamer-profile__content'>
              <div
                style={{
                  display:'grid', 
                  flexDirection:'row',
                  gridTemplateColumns: '1fr 2fr',
                  //gridTemplateRows: 'auto',
                  margin: 'auto',
                  marginTop: '60px',
                  marginBottom: '60px',
                  width: '50%',
              }}>
                <img
                  className='streamer-profile__portrait'
                  src={streamerData.logo_url} 
                  alt={`${streamerData.streamer_name}'s logo`} 
                />
                <div>
                  <h2>{'@' + streamerData.streamer_tag}</h2>
                  <div className='streamer-profile__'>Platforms</div>
                  <div className='streamer-profile__item-container'>
                    {streamerData.platforms.map(
                      (platform, index) => { 
                        return (
                          <div className='streamer-profile__name' key={index}>{platform}</div>
                        )}
                    )}
                  </div>
                  {favoriteState && <div style={{
                    margin: '20px auto',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                    <FavoriteIcon 
                      streamer={streamerData.streamer_tag}
                      user={userState.user && userState.user.user_tag}
                      toggleState={favoriteState.status} 
                      handleFavorite={handleFavorite}
                      exists={favoriteState.exists}
                    />
                    <div className='streamer-profile__favorite-count'>{favoriteState.count}</div>
                  </div>}
                </div>
              </div>
              <hr className='streamer-profile__divider' />
              
              <div 
                style={{
                  display:'grid', 
                  flexDirection:'row',
                  gridTemplateColumns: '1fr 1fr',
              }}>
                <div>
                  <div className='streamer-profile__title'>Name</div>
                  <div className='streamer-profile__name'>{capitalizeFirstLetter(streamerData.real_name)}</div>
                </div>
                <div>
                  <div className='streamer-profile__title'>Nickname</div>
                  <div className='streamer-profile__name'>{capitalizeFirstLetter(streamerData.streamer_name)}</div>
                </div>
              </div>
              <hr className='streamer-profile__divider' />
              
              <div className='streamer-profile__title'>Topics</div>
              <div className='streamer-profile__item-container'>
                {streamerData.topics.map(
                  (topic, index) => { return(<div className='streamer-profile__name' key={index}>{capitalizeFirstLetter(topic)}</div>)}
                )}
              </div>
              <hr className='streamer-profile__divider' />
              
              <div className='streamer-profile__title'>Segments</div>
              <div className='streamer-profile__item-container'>
                {streamerData.segments.map(
                  (segment, index) => { return(<div className='streamer-profile__name' key={index}>{capitalizeFirstLetter(segment)}</div>)}
                )}
              </div>
              <hr className='streamer-profile__divider' />

              <div className='streamer-profile__title'>Similar Streamers</div>
              <div className='streamer-profile__item-container streamer-profile__similar-streamer-wrapper'>
                {!similarStreamers 
                ? <div className='loading-ele'>Loading...</div> 
                
                : similarStreamers.map((item, index) => 
                  <div className='streamer-profile__similar-streamer' key={index}
                    onClick={()=> {
                      navigate(`/profile/${item.streamer_tag}`)
                      //navigate(0)
                      window.location.reload()
                      window.scrollTo(0, 0)
                    }}
                  >
                    <img className='streamer-profile__similar-streamer-pic' src={item.logo_url} alt='streamer profile' />
                    <div>{item.streamer_tag}</div>
                  </div>             
                  )}
              </div>
            </div>
        : <div className='streamer-profile__content loading-ele' 
            style={{
              textAlign: 'center',
              minHeight: '90vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: '0.5',
            }}>
              <p>Loading...</p>
          </div>
      }
      <Footer />
    </div>
  );
}
