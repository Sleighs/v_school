import React from 'react'
import './style.css'

export default function Card(props) {
    const {
        place,
        price,
        timeToGo,
        key
    } = props

    var backgroundColor = 'gray'
    var priceSymbol = '$'

    switch (timeToGo){
        case 'Spring':
            backgroundColor = 'lightgreen'
            break;
        case 'Summer':
            backgroundColor = 'orangered'
            break;
        case 'Fall':
            backgroundColor = 'orange'
            break;
        case 'Winter':
            backgroundColor = 'lightblue'
            break;
    }

    if (price >= 1000){
        priceSymbol = '$$$'
    } else if (price >= 500){
        priceSymbol = '$$'
    }

    return (
        <div className='card-container' style={{backgroundColor: backgroundColor,}}>
            <div className='card-place'>
                <div className='card-place-title'>{place}</div>
                <div className='card-price-symbol'>{priceSymbol}</div>
            </div>
            <div className='card-price'>${price}</div> 
            
            <div className='card-time'>{timeToGo}</div>
        </div>
    )
}
