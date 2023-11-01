import React, { useContext, useEffect } from 'react'
import { IssueContext } from '../../Contexts/IssueContext'
import Issue from '../Issue'
import './style.css'

export default function IssuesList() {
  const { allIssues, getAllIssues } = useContext(IssueContext)

  var num = 0;

  useEffect(() => {
    getAllIssues();
    //console.log('allIssues: ', allIssues)
    num++;
  }, [num])

  return (
    <div className="issue-list__container">
      {allIssues && 
        allIssues.map((item, index) => 
          <Issue item={item} index={index} key={index}/>
        )
      }
    </div>
  )
}
