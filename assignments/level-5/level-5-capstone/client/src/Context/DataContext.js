import React, {useState} from "react"

const DataContext = React.createContext()

function DataContextProvider(props){ 
  const [heroData, setHeroData] = useState(null)
  const [currentHero, setCurrentHero] = useState(null)
  const [lineUpHeroes, setLineUpHeroes] = useState(['Reinhardt', 'Tracer', 'Widowmaker', 'Kiriko', 'Lucio' ])
  
  const apiUrl = 'https://hero-matchups-api.herokuapp.com'
  
  async function getCharacterData () {
    const res = await fetch(apiUrl + '/heroes')
    const data = await res.json()

    //console.log(data)

    setHeroData(data)
  }

  async function getSingleHero(heroName) {
      const res = await fetch(apiUrl + '/heroes/' + heroName)
      const data = await res.json()

      //console.log(data[0])

      setCurrentHero(data[0])
    }

  return (
    <DataContext.Provider value={{
        heroData, setHeroData,
        currentHero, setCurrentHero,
        lineUpHeroes, setLineUpHeroes,
        getCharacterData,
        getSingleHero
    }}>
        {props.children}
    </DataContext.Provider>
  )
}

export {DataContext, DataContextProvider}