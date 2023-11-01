import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

export default function Search() {  
  const searchRef = useRef()

  const navigate = useNavigate();

  const initState = {
    query: '',
    data: [],
    filteredData: [],
    loaded: false
  }

  const [searchState, setSearchState] = useState(initState)
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = event => {
    const query = event.target.value;

    setSearchState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.streamer_tag.toLowerCase().includes(query.toLowerCase());
      });

      return {
        ...prevState,
        query,
        filteredData
      };
    });

    //console.log('Search handleInputChange', searchState)

  }; 

  async function getData() {
    await fetch(`/streamers/all`)
      .then(response => response.json())
      .then(data => {
        const { query } = searchState;
        const filteredData = data.filter(element => {
          return element.streamer_tag.toLowerCase().includes(query.toLowerCase());
        });
        setSearchState(prevState => ({
          ...prevState,
          data,
          filteredData,
        }));
      })
      .catch(err => console.log(err));

      //console.log('Search getData', searchState)
  };

  // Handle clicks outside of component
  const handleClickOutside = event => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowResults(false)
      setSearchState(prevState => ({
        ...prevState,
        loaded: false,
        })
      )
    }
  }


  useEffect(() => {
    getData();

    // Add event listener for clicking outside of component
    document.addEventListener('click', handleClickOutside, true);
    
    return () => {
      // Cleanup the event listener
      document.removeEventListener('click', handleClickOutside, true);
    };
    //console.log('Search', streamerState)
  }, [/*handleClickOutside*/]);

  return (
    <div className='search-wrapper' ref={searchRef} onClick={()=>{setShowResults(true)}}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <input  
          className='search-input' 
          placeholder={'Search'} 
          value={searchState.query}
          onChange={handleInputChange}
        />
        <SearchIcon />
      </div>

      <button className='search-button' 
        style={{display: 'none'}}
        onClick={() => {
          getData()
          console.log('Search button clicked', searchState)
      }}>Go</button>

      {(showResults && searchState.query !== '') &&  
        <div className='search-results'
        style={{
          marginTop: searchRef.current.clientHeight,
        }}>
          {(searchState.filteredData.map((streamer, index) => {
            return (
              <div className='search-result' key={index}
                onClick={() => {
                  /*setSearchState(prevState => ({
                    ...prevState,
                    filteredData: []
                  }))*/
                  navigate(`/profile/${streamer.streamer_tag}`)
                  window.location.reload()
                }}
              >
                <div className='search-result-name'>
                  {streamer.streamer_tag}
                </div>
              </div>
            );
          }))}
        </div>
      }

     
    </div>
  )
}

const SearchIcon = (props) => {
  const { size } = props

  const initState = {
    size: !size ? 16 : size
  }

  const [iconState, setIconState] = useState(initState)

  return (
    <div className='search-icon'>
      <svg xmlns="http://www.w3.org/2000/svg" width={iconState.size} height={iconState.size} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    </div>
  )
  
}