import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserContext } from './Contexts/UserContext';
import { CreatePost, HomePage, IssuePage, IssuesPage, LoginPage, ProfilePage } from './Pages';

function App() {
  const { userState } = useContext(UserContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' 
          element={
            !userState.token 
            ? <LoginPage /> 
            : <HomePage />
          }/>
        <Route path='/issues' 
          element={
            !userState.token 
              ? <Navigate to="/"/> 
              : <IssuesPage />
          }/>
        <Route path='/issue/:issueId' 
          element={
            !userState.token 
              ? <Navigate to="/"/> 
              : <IssuePage />
          }/>
        <Route path='/profile'
          element={
            !userState.token 
              ? <Navigate to="/"/> 
              : <ProfilePage />
          }/>
        <Route path='/login' 
          element={
            !userState.token 
              ? <LoginPage /> 
              : <Navigate to="/"/>
          }/>
        <Route path='/createpost'
          element={
            !userState.token 
              ? <Navigate to="/"/> 
              : <CreatePost />
          }/>
      </Routes>
    </div>
  );
}

export default App;
