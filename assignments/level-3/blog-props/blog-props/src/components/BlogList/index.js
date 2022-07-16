import React from 'react'
import './style.css'
import { blogList } from '../../blog-list'
import BlogPost from '../BlogPost'

export default function BlogList() {
    return (
    <div className='blog-list__container'>
        {blogList.map(item => 
            <BlogPost
                title={item.title}
                subTitle={item.subTitle}
                author={item.author}
                date={item.date}
            /> 
        )}
        <div className='blog-list__older-btn'>
            <span className='blog-list__older-text'>{'OLDER POSTS '}</span>
            <span className='blog-list__older-arrow'>&#10132;</span>
        </div>
    </div>
  )
}
