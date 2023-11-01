import React from 'react'

export default function SegmentBox(props) {
  return (
    <div className='segment-box'>
      <div className='segment-box__text'>{props.segment}</div>
    </div>
  )
}
