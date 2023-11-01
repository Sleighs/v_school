import React, {useState} from "react"

const DataContext = React.createContext()

function DataContextProvider(props){ 
    const initialData = {
        title: 'Game art',
        description: 'Halo Combat Evolved poster',
        imgUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/86d83729-9337-470e-b0ab-236d36ec6f57/d8li4u6-94b7820f-d972-4f94-afa7-c76872431fbc.jpg/v1/fill/w_734,h_1088,q_75,strp/the_master___halo_poster_by_edwardjmoran-d8li4u6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi84NmQ4MzcyOS05MzM3LTQ3MGUtYjBhYi0yMzZkMzZlYzZmNTcvZDhsaTR1Ni05NGI3ODIwZi1kOTcyLTRmOTQtYWZhNy1jNzY4NzI0MzFmYmMuanBnIiwid2lkdGgiOiI8PTczNCIsImhlaWdodCI6Ijw9MTA4OCJ9XV19.hNtwgsHvYgEXeONe4mFpjM2RYnlMAZdRK9BZ7kEcNa0'
    }
    var newThing = {
        title: "My car",
        description: "1968 Mustang GT/CS",
        imgUrl: "https://i.imgur.com/bEdLCGR.jpeg"
    };
    var anotherThing = {
        title: "Scuba Steve",
        description: "Diving through trench",
        imgUrl: "https://i.imgur.com/8QHmwDT.jpeg"
    };
    const [apiData, setApiData] = useState([
        initialData, newThing, anotherThing, 
        newThing, anotherThing, initialData,
    ])
    const [postData, setPostData] = useState(newThing)
    
    const handleFormChange = e => {
        setPostData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    const postRequest = () => {
        let formData = new FormData();
        formData.append('title', postData.title)
        formData.append('description', postData.description)
        formData.append('imgUrl', postData.imgUrl)
    
        console.log('postData', postData)
        fetch(`https://api.vschool.io/samuelwright/thing`, {
            method: 'POST',
            headers: {'Accept': '/'},
            mode: 'cors',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
          var created = JSON.parse(result)
          // If post successful
          if (created.success){
            console.log('fetch success')
          } else {
            console.log('fetch failed')
          }
          console.log('result', JSON.parse(result))
        })
        .catch(error => console.log('error', error));
      }

    return(
        <DataContext.Provider value={{
            apiData, 
            setApiData,
            postData, 
            setPostData,
            handleFormChange,
            postRequest
        }}>
           {props.children}
        </DataContext.Provider>
    )
}

export {DataContext, DataContextProvider}