import React, { useEffect, useRef } from 'react'
import logo1 from '../../assets/react-logo.png'

//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';

import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import './style.css'

export default function LandingCarousel() {
  const carouselElement = useRef()

  const stopPlay = () => {
    carouselElement.current.pause();
    //carouselElement.current.toggleIsPlaying()
  };

  const carouselContainer = document.getElementById("landing-carousel")
  const dotBtns = document.querySelectorAll(`
    button[aria-label="Stay on Slide 1"]
  `)
    /*,
    button[aria-label="Stay on Slide 2"],
    button[aria-label="Stay on Slide 3"],
    button[aria-label="Stay on Slide 4"]  
  */
  
  const slides = [
    {
      name: 'slide 1',
      src: logo1,
      alt: 'Crunch Bean Coffee',
      title: `An ${'\xa0'.repeat(1)} extra ${'\xa0'.repeat(1)} caffeinated ${'\xa0'.repeat(1)} new ${'\xa0'.repeat(1)} year`,
      text: '2x the caffeine',
      button: true,
      buttonText: 'Shop Now',
      link: '2x strength coffee'
    },
    {
      name: 'slide 2',
      src: logo1,
      alt: 'Crunch Bean Coffee',
      title: `You ${'\xa0'.repeat(1)} thought ${'\xa0'.repeat(1)} our ${'\xa0'.repeat(1)} coffee ${'\xa0'.repeat(1)} was ${'\xa0'.repeat(1)} amazing`,
      text: 'Check out our incredible teas',
      button: true,
      buttonText: 'Shop Now',
      link: 'teas'
    },
    {
      name: 'slide 3',
      src: logo1,
      alt: 'Crunch Bean Coffee',
      title: `CBC${'\xa0'.repeat(1)} Premium ${'\xa0'.repeat(1)} Hand ${'\xa0'.repeat(1)} Grinder`,
      text: 'Just Launched!',
      button: true,
      buttonText: 'Shop Now',
      link: 'hand grinder'
    },
    {
      name: 'slide 4',
      src: logo1,
      alt: 'Crunch Bean Coffee',
      title: `Quality ${'\xa0'.repeat(1)} coffee ${'\xa0'.repeat(1)} with ${'\xa0'.repeat(1)} no ${'\xa0'.repeat(1)} gimmicks`,
      text: 'Fresh roasted to order.',
      button: true,
      buttonText: 'Get it Now!',
      link: 'teas'
    }
  ]

  const thumbnails = slides.map((slide, index) => (
    <span style={{ fontSize: 20, fontWeight: 'bold' }} key={index}>
      {index + 1}
    </span>
  ));

  const imageElements = slides.map((slide, index) => (
    <div className={`carousel-slide slide-container${index}`} key={index}>
      {/*<img
        src={slide.src}
        alt={slide.alt}
        className='carousel-slide-img image-responsive'
        key={index}
      />*/}
      <h1 className={`carousel-slide-title carousel-slide-title${index}`}>{slide.title}</h1>
      <div className={`carousel-slide-sub-title carousel-slide-sub-title${index}`}>
        <h3 className={`carousel-slide-text carousel-slide-text${index}`}>{slide.text}</h3>
        <button className='carousel-slide-btn' onClick={()=>{
          stopPlay()
        }}>{slide.buttonText}</button>
      </div>
    </div>
  ));

  /*
  useEffect(()=> {
    //dotBtns[0].parentNode.style.padding = '12px';
    dotBtns[0].addEventListener("click", () => {
      stopPlay()
    });
    dotBtns.forEach((item, index) => {
      console.log(item)
    })
  }, []);
  */

  return (
    <div className='landing-carousel' id="landing-carousel">
      <Carousel 
        ref={carouselElement}
        className="carousel-container" 
        thumbnails={thumbnails}

        canAutoPlay={true}
        isAutoPlaying={true}
        autoPlayInterval={7000}

        hasThumbnails={false}
        hasDotButtons={'bottomRight'}
        hasMediaButton={false}
        hasMediaButtonAtMax={false}
        hasSizeButton={false}
        hasLeftButton={false}
        hasRightButton={false}
        hasIndexBoard={false}
        
      >  
        {imageElements}
      </Carousel>
    </div>
  )
}