import React, {useState} from "react"

const UserContext = React.createContext()

function UserContextProvider(props){ 
  const initState = { 
    user: JSON.parse(localStorage.getItem('rtv-user')) || {}, 
    token: localStorage.getItem('rtv-token') || null, 
    isAuth: localStorage.getItem('rtv-token') ? true : false, 
  }

  const [userState, setUserState] = useState(initState)

  async function signup(credentials){
    // Create token and user 
    const res = await fetch('/auth/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })

    const data = await res.json()

    const { user, token } = data

    // Save token and user to local storage
    if (user){
      localStorage.setItem('rtv-token', token)
      localStorage.setItem('rtv-user', JSON.stringify(user))
    }

    // Update state
    setUserState(prevState => ({
      ...prevState,
      user: user,
      token: token,
      isAuth: true,
    })) 

    console.log('Sign up data', data)

    window.location.reload()
  }

  async function login(credentials){
    // Retrieve token and user from server
    const res = await fetch('/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    })

    const data = await res.json()

    const { user, token } = data

    // Save token and user to local storage
    if (user){
      localStorage.setItem('rtv-token', token)
      localStorage.setItem('rtv-user', JSON.stringify(user))
    }
    
    // Update state
    setUserState(prevState => ({
      ...prevState,
      user: user,
      token: token,
      isAuth: true,
    }))

    console.log('Log in data', data)

    window.location.reload()
  }

  async function logout(credentials){    
    // Remove from local storage
    localStorage.removeItem('rtv-token')
    localStorage.removeItem('rtv-user')
    
    // Update state
    setUserState(prevState => ({
      ...prevState,
      user: {},
      token: null,
      isAuth: false,
    }))
  }
  
  return (
    <UserContext.Provider value={{
      userState, 
      setUserState,
      signup,
      login,
      logout
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}