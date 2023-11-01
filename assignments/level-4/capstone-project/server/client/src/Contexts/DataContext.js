import React, {useState} from "react"

const DataContext = React.createContext()

function DataContextProvider(props){ 
    const [answerType, setAnswerType] = useState("chat")
    const [chat, setChat] = useState([
        {person: 'bot', text: 'Hi. How can I assist you?'}
    ])
    const [chatTheme, setChatTheme] = useState("dynasty")
    const [navTheme, setNavTheme] = useState("dynasty")


    const changeTheme = () => {
        if (chatTheme === 'editor'){
            setChatTheme('shore')
        } else if (chatTheme === 'shore'){ 
            setChatTheme('dynasty')
        } else if(chatTheme === 'dynasty'){
            setChatTheme('marker')
        } else {
            setChatTheme('editor')
        }
    }
    const changeNavTheme = () => {
        if (navTheme === 'editor'){
            setNavTheme('shore')
        } else if (navTheme === 'shore'){ 
            setNavTheme('dynasty')
        } else if(navTheme === 'dynasty'){
            setNavTheme('marker')
        } else {
            setNavTheme('editor')
        }
    }

    return(
        <DataContext.Provider value={{
            answerType, 
            setAnswerType,
            chat,
            setChat,
            chatTheme,
            setChatTheme,
            navTheme,
            setNavTheme,
            changeTheme,
            changeNavTheme
        }}>
           {props.children}
        </DataContext.Provider>
    )
}

export {DataContext, DataContextProvider}