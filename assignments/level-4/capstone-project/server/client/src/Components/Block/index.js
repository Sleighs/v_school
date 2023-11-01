import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'

export default function Block(props) {
  return (
    <div className="block">
      <CopyBlock
        text={props.code}
        language={props.language}
        showLineNumbers={props.showLineNumbers}
        startingLineNumber={props.startingLineNumber}
        theme={props.theme ? props.theme : dracula }
        wrapLines
      />
    </div>
  )
}
