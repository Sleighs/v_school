import React, {useState} from "react"

const ApiContext = React.createContext()

function ApiContextProvider(props){ 
    const [todos, setTodos] = useState(null)

    async function getTodos() {
        const response = await fetch('/todos')
        const data = await response.json()
        //console.log('getTodos', data)
        setTodos(data)
    }

    async function postTodo(newTodo) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:  JSON.stringify({ todo: newTodo })
        })
        const data = await response.json()
        console.log('postTodo', data)
        setTodos(data)
    }

    async function updateTodo(todo) {
        const response = await fetch('/todos/update', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:  JSON.stringify({ todo: todo})
        })
        const data = await response.json()
        console.log('updateTodo', data)
        setTodos(data)
    }

    async function deleteTodo(id) {
        const response = await fetch('/todos/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:  JSON.stringify({ id: id })
        })
        const data = await response.json()
        console.log('deleteTodo', data)
        setTodos(data)
    }

    return(
        <ApiContext.Provider value={{
            todos,
            setTodos,
            getTodos,
            postTodo,
            deleteTodo,
            updateTodo
        }}>
           {props.children}
        </ApiContext.Provider>
    )
}

export { ApiContext, ApiContextProvider }