import React from 'react'
import { useRouteError } from "react-router-dom";
import { Footer, Nav } from '../../components';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div id="error-page" >
      <Nav />
      <div style={{
        color: 'white',
        width: '80%',  
        height: '100vh',
        margin: '60px auto',
      }}>
        <h1>Oops!</h1>
        <h3>Sorry, an unexpected error has occurred.</h3>
        <p>
          <i>{`"${error.statusText || error.message}"`}</i>
        </p>
      </div>
      <Footer />
    </div>
  )
}
