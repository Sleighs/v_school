import React, {useState} from "react"

const StreamerContext = React.createContext()

function StreamerContextProvider(props){ 
  const initState = { 
    streamerList: [],
    streamerOptions: {
      segments: [] ,
      platforms: [],
      traits: [] ,
      socialMedia: [] ,
      topics: [],
      level: null
    },
    
    featuredWeekly: ['Tupperware', 'MaskedBandit', 'Lorde', 'TheFirstDisciple', 'PrinceOfAllSaiyans', 'PokerAlice', 'TheLegend', 'SwimmingBird'],
    featuredMonthly: ['PokerAlice', 'SwimmingBird','BlackDog', 'TheHealingHero','Tupperware', 'TheMightiestDisciple', 'Mysterion', 'TheFirstDisciple'],
    featuredAllTime: ['TheLegend', 'Mysterion', 'SwimmingBird', 'AlienHunter', 'TheGreatSaiyaman', 'TheFirstDisciple'],
    featuredNew: ['PrinceOfAllSaiyans',  'FrançoiseApple', 'TheMightiestDisciple', 'ProfessorChaos','TheFirstDisciple', 'TheHealingHero', 'AlienHunter'],
    featured2023: ['TheFirstDisciple', 'AlienHunter', 'TheGreatSaiyaman', 'Lorde', 'TheLegend', 'Mysterion', 'SwimmingBird'],
  }

  const initBrowseOptions = {
    sort: 'subscribers',
    order: 'desc',
    page: 1,
    pageSize: 10,
  }

  const [streamerState, setStreamerState] = useState(initState)
  const [browseOptions, setBrowseOptions] = useState(initBrowseOptions)
  
  // Get all streamers
  async function getStreamers(){
    const res = await fetch('/streamers/all')
    const data = await res.json()
    
    //console.log('getting list', data)

    setStreamerState(prev => ({
      ...prev,
      streamerList: data
    }))
  }

  // Get favorites of a streamer
  async function getFavoriteCount(streamerTag){
    const res = await fetch(`/favorites/streamer/${streamerTag}`)
    const data = await res.json()
    return data.length
  }

  const getSimilarStreamers = async (streamerTag) => {
    // Get list of streamers
    let newStreamerList = []

    const res = await fetch('/streamers/all')
    const data = await res.json()

    data.forEach(streamer => {
      if(streamer.tag !== streamerTag){
        newStreamerList.push(streamer)
      }
    })
    console.log('newStreamerList: ', newStreamerList)

    // First find streamers who like similar topics
    // Second find streamers who do similar segments

    // Return a list of streamers
    return newStreamerList
  }


  
  return (
    <StreamerContext.Provider value={{
      streamerState,
      setStreamerState,
      getStreamers,
      browseOptions,
      setBrowseOptions,
      getFavoriteCount,
      getSimilarStreamers,
    }}>
      {props.children}
    </StreamerContext.Provider>
  )
}

export {StreamerContext, StreamerContextProvider}