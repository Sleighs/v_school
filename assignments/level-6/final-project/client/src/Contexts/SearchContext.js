import React, {useState} from "react"

const SearchContext = React.createContext()

function SearchContextProvider(props){ 
  const initState = { 
    query: '',
    data: [],
    filteredData: []
  }

  const [searchState, setSearchState] = useState(initState)
  
  return (
    <SearchContext.Provider value={{
      searchState,
      setSearchState
    }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export {SearchContext, SearchContextProvider}