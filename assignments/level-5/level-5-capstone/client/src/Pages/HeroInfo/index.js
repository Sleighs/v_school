import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import './style.css'
import heroPortraits from '../../Assets/overwatch-portraits'
import heroPics from '../../Assets/overwatch-icons'

export default function HeroInfoPage(props) {
  const {hero} = useParams()

  const [heroName, setHeroName] = useState(null)
  const [heroInfo, setHeroInfo] = useState(null)
  const [counterEntries, setCounterEntries] = useState(null)

  const apiUrl = 'https://hero-matchups-api.herokuapp.com'
  
  const  getHeroInfo = async (name) => {
    const res = await fetch(apiUrl + '/heroes/' + name)
    const data = await res.json()

    setHeroInfo(data[0])
    setCounterEntries(Object.entries(data[0].counters))
  }

  const navigate = useNavigate();
  const location = useLocation();

  const goToHero = (name) => {
    navigate('/heroes/' + name)
    
    //console.log(name + " clicked")
  }

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
    //console.log('scrolled to ' + id)
  };

  useEffect(()=>{
    getHeroInfo(hero)

    if (hero === "Dva"){
      setHeroName(prev => "D.Va")
    } else if (hero === "JunkerQueen"){
      setHeroName(prev => "Junker Queen")
    } else if (hero === "WreckingBall"){
      setHeroName(prev => "Wrecking Ball")
    } else if (hero === "Soldier76"){
      setHeroName(prev => "Soldier: 76")
    } else if (hero === "Torbjorn"){
      setHeroName(prev => "Torbjorn")
    } else if (hero === "Cassidy"){
      setHeroName(prev => "Cassidy (McCree)")
    } else {
      setHeroName(prev => hero)
    }

    //get last updated date
    if (heroName) {
      document.title = `${heroName} - Nanome`;
    } else {  
      document.title = `${hero} - Nanome`;
    }
  }, [location])

  return (
    <div className='hero-info__container'>
      <div className="hero-info">
        <div className="content__nav-container">
          <h3>Contents</h3>
          <div 
            className="content__nav"
            onClick={() => {
              scrollTo('hero-info__content-main')
            }}>
              Summary
          </div>
          <div 
            className="content__nav"
            onClick={() => {
              scrollTo('hero-counters')
            }}>
              Counters
          </div>
          <div 
            className="content__nav"
            style={{display: 'none',}}
            onClick={() => {
              scrollTo('hero-synerigies')
            }}>
              Synergies
          </div>
          <div 
            className="content__nav"
            style={{display: 'none',}}
            onClick={() => {
              scrollTo('hero-map-synerigies')
            }}>
              Map Synergies
          </div>
        </div>

        <div className="hero-info__content" id="hero-info__content-main">
          <h3 className="hero-info__title page-title">{heroName}</h3>

          <div>Last updated November 9, 2022</div>

          {heroInfo && <InfoCard heroInfo={heroInfo} hero={hero}/>}

          <div className="content-section hero-info__description" id="hero-summary"
            style={{display:'none',}}>
            <h2>Description</h2>
            <p>Description</p>
          </div>

          <div className="hero-info__counters-section" id="hero-counters">
            {counterEntries && <Counters entries={counterEntries} goToHero={goToHero}/>}

            <div className="content-section" id="hero-synergies"
              style={{display:'none',}}>
              <div>synergizes with</div>
              <div>bad with</div>
            </div>

            <div className="content-section" id="hero-map-synergies"
              style={{display:'none',}}>
              <div>strong on these maps</div>
              <div>weak on these maps</div>
            </div>
          </div>
        </div>

        <div className="hero-info__footer" style={{display:'none',}}>discuss info link </div>
      </div>
    </div>
  )
}


const InfoCard = ({heroInfo, hero}, props) => {
  return(
    <div className="info-card__container">
      <table className="info-card__table" cols="2">
        <thead>
          <th className="info-card__table-head page-title2" colSpan="2">{heroInfo.name}</th> 
        </thead>
        <tbody>
          <tr>
            <td colSpan="2"><img className="info-card__portrait" src={`${heroPortraits[hero]}`} alt={`${heroInfo.name} portrait`}/></td>
          </tr>
          <tr>
            <td className="info-card__table-col-1">Role</td>
            <td className="info-card__table-col-2">{heroInfo.type}</td>
          </tr>
          <tr>
            <td className="info-card__table-col-1">Health</td>
            <td className="info-card__table-col-2">{heroInfo.health}</td>
          </tr>
          <tr>
            <td className="info-card__table-col-1">Armor</td>
            <td className="info-card__table-col-2">{heroInfo.armor}</td>
          </tr>
          <tr>
            <td className="info-card__table-col-1">Shields</td>
            <td className="info-card__table-col-2">{heroInfo.shields}</td>
          </tr>
          <tr>
            <td className="info-card__table-col-1">Archetype</td>
            <td className="info-card__table-col-2">
              {heroInfo.archetype.map((item, i) => {
                if (i > 0) {
                  return (<span>{', ' + item}</span>)
                } else {
                  return (<span>{item}</span>)
                }
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Counters = ({entries, goToHero}, props) => { 
  var strongLength = 0
  var weakLength = 0

  const loadCounters = () => {
    var strongEle = document.querySelectorAll('.strong-against__container')
    var weakEle = document.querySelectorAll('.weak-against__container')

    /*while (strongEle && strongEle.length > 0){
      //strongEle[0].parentNode.removeChild(strongEle[0]);
      strongEle[0].remove()
    }
    while (weakEle && weakEle.length > 0){
      //weakEle[0].parentNode.removeChild(weakEle[0]);
      weakEle[0].remove()
    }*/

    entries.forEach((item, i) => {
      let newEle = document.createElement('div')
      let imgEle = document.createElement('img')

      imgEle.classList.add('counters-img')
      newEle.classList.add('counters-img__container')
      newEle.onclick = (e) => {
        //goToHero(item[0])
      }
      
      let imgSrc = `${heroPics[item[0]]}`
      imgEle.src = imgSrc
      imgEle.alt = item[0]

      newEle.appendChild(imgEle)

      if (strongLength + weakLength + 1 <= entries.length){
        if (item[1] === '++' || item[1] === '+' ){
          strongLength += 1
          strongEle[0].appendChild(newEle)
        }
        if (item[1] === '--' || item[1] === '-'){
          weakLength += 1
          weakEle[0].appendChild(newEle)
        }
      }
    })
  }

  useEffect(() => {
    loadCounters()
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="hero-info__counters" id="hero-info__counters">
      <div className="hero-info__counters-strong">
        <h2>Strong Against</h2>
        <div className="strong-against__container"></div>
      </div>
      <div className="hero-info__counters-weak">
        <h2>Weak Against</h2>
        <div className="weak-against__container"></div>
      </div>
    </div>
  )
}