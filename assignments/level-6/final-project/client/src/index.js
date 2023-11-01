import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
//import App from './App';
import { UserContextProvider } from './Contexts/UserContext';
import { BrowsePage, ErrorPage, HomePage, LoginPage, ShopPage, StreamerProfilePage, UserPage } from './pages';
import { StreamerContextProvider } from './Contexts/StreamerContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:streamer",
    element: <StreamerProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accounts/login",
    element: <LoginPage type='login'/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/accounts/signup",
    element: <LoginPage type='signup'/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <UserPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/browse",
    element: <BrowsePage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <StreamerContextProvider>
        <RouterProvider router={router} />
      </StreamerContextProvider>
    </UserContextProvider>   
  </React.StrictMode>
);