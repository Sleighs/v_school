import React, {useState} from "react"

const DataContext = React.createContext()

function DataContextProvider(props){ 
    const initialBounty = {
        firstName: 'Jon',
        lastName: 'Snow',
        bounty: 10000000,
        living: false,
        type: 'jedi',
        id: 1
      }
      const [bountyData, setBountyData] = useState(initialBounty)
      const [bounties, setBounties] = useState(null)
      const [currentBounty, setCurrentBounty] = useState(null)
      const [bountyUpdateData, setBountyUpdateData] = useState(null)
      const [editToggle, setEditToggle] = useState(false)

      async function getData() {
        const res = await fetch('/bounty')
        const data = await res.json()
    
        console.log('get request', data)

        setBounties(data)
      }

      async function postRequest(){
        const response = await fetch('/bounty', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //"Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify(bountyData)
        })
    
        const data = await response.json()
        
        console.log('post request', data)

        getData()
      }

      async function putRequest(){
        const response = await fetch('/bounty', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"
          },
          body: JSON.stringify(bountyUpdateData)
        })
        const data = await response.json()
        
        console.log('put request', data)

        getData()
      }

      async function deleteRequest(item) {
        const res = await fetch('/bounty', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item)
        })
        const data = await res.json()
        console.log('delete request', data)

        getData()
      }

      return(
        <DataContext.Provider value={{
            bountyData,
            setBountyData,
            bounties, 
            setBounties,
            currentBounty, 
            setCurrentBounty,
            bountyUpdateData, 
            setBountyUpdateData,
            editToggle, 
            setEditToggle,
            postRequest,
            deleteRequest,
            putRequest,
            getData
        }}>
           {props.children}
        </DataContext.Provider>
    )
}

export {DataContext, DataContextProvider}