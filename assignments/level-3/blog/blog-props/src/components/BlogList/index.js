import React from 'react'
import './style.css'
import { blogList } from '../../blog-list'
import BlogPost from '../BlogPost'

export default function BlogList() {
    return (
    <div className='bloglist-container'>
        {blogList.map(item => 
            <BlogPost
                title={item.title}
                subTitle={item.subTitle}
                author={item.author}
                date={item.date}
            /> 
        )}
    </div>
  )
}
