import React, { useContext, useEffect, useState } from 'react'
import { Nav, Footer, TopicBox, SegmentBox} from '../../components'
import FeaturedList from '../../components/FeaturedList'
import { StreamerContext } from '../../Contexts/StreamerContext'
import './style.css'
import './landing-image.css'
import { Link } from 'react-router-dom'

const topics = [
  'Movies',
  'Video Games',
  'Politics',
  'News',
  'Music',
  'Law',
  'Finance',
  'Education',
  'Racing',
  'Fitness',
  'Martial Arts',
  'Aviation',
  'Gaming',
  'Pop Culture',
  'Beauty',
  'Sports',
  'Cooking',
  'Travel',
  'Fashion',
  'Science',
  'Technology',
  'Art',
  'History',
  'Health',
  'Pets',
  'Food',
  'Crafts',
  'Celebs',
  'Home Improvement',
  'DIY',
  'Parenting',
]

const segments = [
  'Gaming',
  'Discussion',
  'News',
  'Q and A',
  'Interviews',
  'Podcast',
  'Comedy',
  'Cooking',
  'Live Coverage',
  'Vlog',
  'Music',
  'Movies',
  'Sports',
  'Dance',
  'Fitness',
]

export default function HomePage() {
  const { streamerState } = useContext(StreamerContext)

  //useEffect(()=>{
    //console.log({ userState, streamerState})

  //}, [])

  return (
    <div className="home-page page-width">    
      <Nav />
      <div className="home-landing-wrapper">
        <h1 style={{fontSize: '3em',}}>Find your favorite streamers</h1>
        <p style={{fontSize: '1.5em',}}>Discover new streamers and follow your favorites</p>
      </div>
      <FeaturedList 
        title={'Top Streamers This Week'}
        streamers={streamerState.featuredWeekly}
      />
      <FeaturedList 
        title={'Most Popular Streamers'}
        streamers={streamerState.featuredAllTime}
      />
      <FeaturedList 
        title={'Newly Added Streamers'}
        streamers={streamerState.featuredNew}
      />    
      <FeaturedList 
        title={'Top Streamers This Month'}
        streamers={streamerState.featuredMonthly}
      />
      <FeaturedList 
        title={'Top Streamers Of 2023'}
        streamers={streamerState.featured2023}
      />

      <div className='home-page__content'>
        <h2 className='home-page__content-title'>{'Browse by Topics'}</h2>
        <div className='home-topics__container'>
          {topics.map((topic, index) => {
            return (
              <div className='home-topics__item' key={index} >
                <TopicBox topic={topic} />
              </div>
            )})
          }
        </div>
      </div>

      <div className='home-page__content'>
        <h2 className='home-page__content-title'>{'Popular Segments'}</h2>
        <div className='home-segments__container'>
          {segments.map((segment, index) => {
            return (
              <div className='home-segments__item' key={index}>
                <SegmentBox segment={segment} />
              </div>
            )})
          }
        </div>
      </div>

      <div className='home-page__content' style={{textAlign: 'center',}}>
        <h2 className='home-page__content-title'>{'Random Streamer'}</h2>
        <p >{'Use the randomizer below to find a streamer to watch.'}</p>
        {<Randomizer />}
      </div>

      <Footer />
    </div>
  )
}

const Randomizer = () => {
  const { streamerState } = useContext(StreamerContext)

  const [randomStreamer, setRandomStreamer] = useState(null)

  const getRandomStreamer = async () => {
    const res = await fetch('/streamers/all')
    const streamers = await res.json()

    const randomIndex = Math.floor(Math.random() * streamers.length)
    setRandomStreamer(streamers[randomIndex])

    return streamers[randomIndex]
  }

  return (
    <div className='randomizer'>

      <button className='randomizer__button' 
        onClick={() => {getRandomStreamer()}}
      >
        {'Randomize'}
      </button>
      {randomStreamer &&
        <Link 
          className='randomizer__link'
          to={`/profile/${randomStreamer.streamer_tag}`}>
          {randomStreamer.streamer_tag}
        </Link>
      }
    </div>
  )
}