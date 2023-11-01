import { useState, useEffect } from 'react'
import './App.css';
import { MemeList, TextInput } from './components';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // State
  const [memeData, setMemeData] = useState(null);
  const [meme, setMeme] = useState(null);
  const [memeText, setMemeText] = useState({
    template_id: '',
    text0: '',
    text1: '',
    username: 'swright987',
    password: 'Kk$-ahLtX2',
  });
  const [createdMemes, setCreatedMemes] = useState([])
  const [currentMeme, setCurrentMeme] = useState(null)
  // Boxes mode, for memes with more than 2 text boxes
  const [boxesOn, setBoxesOn] = useState(false)

  // Get request
  async function getMemeData() {
    const res = await fetch(`https://api.imgflip.com/get_memes`)
    const data = await res.json()
    var memes = data.data.memes;
    // Filter out memes with more than 2 text boxes
    var filtered = memes.filter((item, i)=> item.box_count < 3)
    // Save memes to state  
    getMeme(null, filtered);
    setMemeData(filtered);
  }

  // Post request
  async function postMeme() {
    const formData = new FormData();
    formData.append('template_id', memeText.template_id)
    formData.append('username', 'swright987')
    formData.append('password', 'Kk$-ahLtX2')
    formData.append('text0', memeText.text0)
    formData.append('text1', memeText.text1)
    //formData.append('boxes', memeText.boxes)

    const res = await fetch(`https://api.imgflip.com/caption_image`, {
      method: 'POST',
      headers: {'Accept': '/'},
      mode: 'cors',
      body: formData,
    })
    .then(response => response.text())
    .then(result => {
      console.log('result', JSON.parse(result))
      var created = JSON.parse(result)
      // If post successful, add meme to list and set as current meme
      if (created.success){
        var newId = uuidv4()
        setCreatedMemes(prevData => {return[...prevData, {
          url: created.data.url,
          name: meme.name,
          uid: newId,
        }]})
        setCurrentMeme(created.data.url)
      }
    })
    .catch(error => console.log('error', error));
  }

  // Get random meme
  const getMeme = (memeIndex, data) => {
    // Clear current meme
    setCurrentMeme(null)

    // Get new meme
    var newMeme;
    if (data){
      // Get meme if meme list is given
      let randomNum = Math.floor(Math.random() * data.length)
      newMeme = data[randomNum]
    } else if (memeIndex === null || !memeIndex){
      // Get random meme
      let randomNum = Math.floor(Math.random() * memeData.length)
      newMeme = memeData[randomNum]
    } else {
      // Use given index
      newMeme = memeData[memeIndex]
    }

    // Store meme
    setMeme(newMeme)

    // Generate text box array
    var boxesArr = []
    for (var a = 0; a < newMeme.box_count; a++){
      var boxesItem = {
        text: 'text',
        color: "#ffffff",
        outline_color: "#000000",
      }
      boxesArr.push(boxesItem)
    }

    // Create form data template
    setMemeText(previousData => {
      return {
        ...previousData,
        //boxes: boxesArr,
        template_id: newMeme.id,
      }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Run post api fetch
    postMeme()
  }

  /*
  const handleChange = event => {
    setMemeText(previousData => {
      return {
        ...previousData,
        [event.target.name]: event.target.value
      }
    })
  }*/

  useEffect(function() {
    // Get meme data
    getMemeData()
  }, [])

  return (
    <div className="App">
      <Header/>

      <div className="main-content">
        <div className="meme-options-container">
          <MemeList 
            memeData={memeData} 
            getMeme={getMeme}
            createdMemes={null}
            setCurrentMeme={setCurrentMeme}
            memeList={true}
          />
          <div className='meme-btns'>
            <button 
              className="random-meme-btn"
              onClick={() => {
                getMeme();
              }}
            >
              Random Meme
            </button>
            <button 
              className="refresh-meme-btn"
              onClick={() => {
                //get current meme index
                if (currentMeme !== null){
                  const m = createdMemes.filter(object => {
                    return object.url === currentMeme;
                  });
                  const index = memeData.findIndex(object => {
                    return object.name === m[0].name;
                  });
                  getMeme(index);
                }
              }}
            >
              Refresh Meme
            </button>
          </div>
          
          { currentMeme || meme ?
            <form name="meme-text" onSubmit={handleSubmit}>
              <TextInput
                memeText={memeText}
                setMemeText={setMemeText}
                boxesOn={boxesOn}
                setBoxesOn={setBoxesOn}
              />
              <button type='submit' className='create-meme-btn'>
                Generate Meme
              </button>
            </form> : <></>
          }

          <MemeList 
            memeData={memeData} 
            getMeme={getMeme} 
            createdMemes={createdMemes}
            setCurrentMeme={setCurrentMeme}
            memeList={false}
          />
        </div>

        <div className='meme-container'>
          <img 
            className='meme-image' 
            id='meme-1' src={currentMeme !== null ? currentMeme : meme ? meme.url : ''} 
            alt=''
          />
        </div>
      </div>

      <Footer 
        createdMemes={createdMemes}
        currentMeme={currentMeme}
        setCreatedMemes={setCreatedMemes}
        setCurrentMeme={setCurrentMeme}
      />
    </div>
  );
}

const Header = props => {
  return (
    <div className='header'>
      <h2 className='header-title'>Meme Generator</h2>
    </div>
  )
}

const Footer = props => {
  const {
    createdMemes,
    currentMeme,
    setCreatedMemes,
    setCurrentMeme
  } = props

  return (
    <div 
      className='footer'>
      {currentMeme ? <button 
        className="delete-meme-btn"
        onClick={()=>{
          // Remove meme from created memes array
          let list = createdMemes.filter((item,index)=> item.url !== currentMeme)
          setCreatedMemes(list)
          setCurrentMeme(null)
        }} 
      >
        Delete
      </button> : <></>}
    </div>
  )
}

export default App;
