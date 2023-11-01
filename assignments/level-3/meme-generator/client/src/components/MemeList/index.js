import React, {useEffect} from 'react'

export default function MemeList(props) {
  const { 
    memeData, 
    getMeme, 
    createdMemes, 
    setCurrentMeme,
    memeList
  } = props

  return (
    <div className="meme-list">
      {memeList && memeData ? memeData.map((item,i) => (
          <div key={i} onClick={(e) => {
            getMeme(i)
          }}>
            <img 
              className={"meme-option-image"} 
              src={item.url} 
              alt='' 
              title={item.name} 
            />
          </div>
      )) : <></>}
      {createdMemes !== null ? createdMemes.map((item,j) => (
          <div key={j} onClick={(e) => {
            // Get meme info from memeData
            const index = memeData.findIndex(object => {
              return object.name === item.name;
            });
            getMeme(index)
            // Set current meme
            setCurrentMeme(item.url)
          }}>
            <img 
              className={"meme-option-image"} 
              src={item.url} 
              alt='' 
              title={item.name} 
            />
          </div>
      )) : <></>}
    </div>
  )
}
