import React from 'react'
import './style.css'

export default function BlogPost(props) {
    const {
        title,
        subTitle,
        author,
        date
    } = props

  return (
    <div className='blog-post'>
        <div className='blog-post__container'>
            <div className='blog-post__title-container'>
                <p className='blog-post__title'>{title}</p>
                <p className='blog-post__subtitle'>{subTitle}</p>
            </div>
            <p className='blog-post__text'>
                Posted by <span className='blog-post__author'>{author}</span> on <span className='blog-post__date'>{date}</span>
            </p>
        </div>
        <hr style={{opacity: .25,}}/>
    </div>
  )
}
