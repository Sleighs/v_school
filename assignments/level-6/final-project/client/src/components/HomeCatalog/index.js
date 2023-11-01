import React from 'react'
import './style.css'

export default function HomeCatalog() {
  return (
    <div className="home-catalog">
      <h1 className="home-catalog__title">Explore our catalog</h1>

      <div className="home-catalog__content">
        <div className="home-catalog__content-item home-catalog__item1">coffee</div>
        <div className="home-catalog__content-item home-catalog__item2">tea</div>
        <div className="home-catalog__content-item home-catalog__item3">cocoa</div>
        <div className="home-catalog__content-item home-catalog__item4">accessories & merchandise</div>
        <div className="home-catalog__content-item home-catalog__item5">kcups</div>
      </div>    

    </div>
  )
}
